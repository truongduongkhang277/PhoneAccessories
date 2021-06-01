import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import orderRouter from './routers/orderRouter.js';

import path from 'path';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config();

const app = express();

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/accessories', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})


app.get('/', function (req, res) {
    res.send("Server is ready");
});

// Product

app.use('/api/products', productRouter);

app.use('/api/uploads', uploadRouter);

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// app.get('/api/products', function(req, res) {
//     res.send(data.products);
// });

// app.get('/api/products/:id', function(req, res) {
//     const product = data.products.find((x) => Number(x._id) === Number(req.params.id));
//     if(product){
//         res.send(product);
//     }
//     else {
//         res.status(404).send({message:'Product not found'});
//     }
// });

// User

app.use('/api/users', userRouter);

// Order

app.use('/api/orders', orderRouter)

// error

app.use((err, req, res, next) => {
    res.status(500).send({
        message: err.message
    });
})

const port = process.env.port || 5000;

app.listen(port, () => {
    console.log(`Serve at http://localhost:${port}`)
})