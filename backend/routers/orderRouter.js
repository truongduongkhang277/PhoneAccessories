import express from 'express'
import expressAsyncHandler from "express-async-handler";
import Order from '../models/orderModels.js';
import User from '../models/userModels.js';
import Product from '../models/productModels.js';
import {
  isAuth,
  isAdmin
} from '../util.js';

const orderRouter = express.Router();

orderRouter.post(
  '/',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    if (req.body.orderItems.length === 0) {
      res.status(400).send({
        message: 'Cart is empty'
      });
    } else {
      const order = new Order({
        orderItems: req.body.orderItems,
        shippingAddress: req.body.shippingAddress,
        paymentMethod: req.body.paymentMethod,
        itemsPrice: req.body.itemsPrice,
        shippingPrice: req.body.shippingPrice,
        taxPrice: req.body.taxPrice,
        totalPrice: req.body.totalPrice,
        user: req.user._id,
      });
      const createOrder = await order.save();
      res.status(201).send({
        message: 'New order created: ',
        order: createOrder
      });
    }
  })
);

orderRouter.get(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'name');
    res.send(orders);
  })
);

orderRouter.get(
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({
      user: req.user._id
    });
    res.send(orders);
  })
);

orderRouter.get('/:id', isAuth, expressAsyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    res.send(order);
  } else {
    res.status(400).send({
      message: 'Order not found'
    });
  }
}))

orderRouter.get(
  '/summary',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.aggregate([{
      $group: {
        _id: null,
        numOrders: {
          $sum: 1
        },
      },
    }, ]);
    const users = await User.aggregate([{
      $group: {
        _id: null,
        numUsers: {
          $sum: 1
        },
      },
    }, ]);
    const dailyOrders = await Order.aggregate([{
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d',
              date: '$createdAt'
            }
          },
          orders: {
            $sum: 1
          },
        },
      },
      {
        $sort: {
          _id: 1
        }
      },
    ]);
    const productCategories = await Product.aggregate([{
      $group: {
        _id: '$category',
        count: {
          $sum: 1
        },
      },
    }, ]);
    res.send({
      users,
      orders,
      dailyOrders,
      productCategories
    });
  })
);

orderRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      const deleteOrder = await order.remove();
      res.send({
        message: 'Order Deleted',
        order: deleteOrder
      });
    } else {
      res.status(404).send({
        message: 'Order Not Found'
      });
    }
  })
);

export default orderRouter;