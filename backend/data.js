import bcrypt from 'bcryptjs'

const data = {
    users: [{
            name: "Test",
            email: "test@email.com",
            password: bcrypt.hashSync('123456', 8),
            isAdmin: true
        },
        {
            name: "Duong Khang",
            email: "duongkhang@email.com",
            password: bcrypt.hashSync('654321', 8),
            isAdmin: true
        },
        {
            name: "Vinh Khang",
            email: "vinhkhang@email.com",
            password: bcrypt.hashSync('010400', 8),
            isAdmin: false
        }
    ],
    products: [{
            name: 'IPhone case',
            category: 'phone-case',
            image: '/images/product.png',
            price: 80000,
            quantity: 20,
            brand: 'Iphone',
            rating: 4.5,
            numReviews: 10,
            description: 'high quantity product'
        },
        {
            name: 'Wireless Headphone',
            category: 'headphone',
            image: '/images/product1.jpg',
            price: 100000,
            quantity: 10,
            brand: 'Wireless',
            rating: 3.5,
            numReviews: 15,
            description: 'new quantity product'
        },
        {
            name: 'Samsung case',
            category: 'phone-case',
            image: '/images/product2.png',
            price: 60000,
            quantity: 30,
            brand: 'Samsung',
            rating: 4,
            numReviews: 20,
            description: 'low quantity product'
        },
        {
            name: 'Fast Wireless Charging',
            category: 'charger',
            image: '/images/product3.jpg',
            price: 160000,
            quantity: 5,
            brand: 'Wireless',
            rating: 5,
            numReviews: 5,
            description: 'new product'
        },
        {
            name: 'Chat headphone with mic',
            category: 'headphone',
            image: '/images/product4.jpg',
            price: 80000,
            quantity: 0,
            brand: 'Non-wireless',
            rating: 3,
            numReviews: 17,
            description: 'high quantity product'
        },
        {
            name: 'USB Charging',
            category: 'charger',
            image: '/images/product5.jpg',
            price: 75000,
            quantity: 15,
            brand: 'Usb-Charger',
            rating: 5,
            numReviews: 3,
            description: 'high quantity product'
        },
        {
            name: 'IPhone XS case',
            category: 'phone-case',
            image: '/images/product6.png',
            price: 80000,
            quantity: 20,
            brand: 'Iphone',
            rating: 4,
            numReviews: 10,
            description: 'new product'
        },
        {
            name: 'Samsung Note 10 case',
            category: 'phone-case',
            image: '/images/product7.png',
            price: 80000,
            quantity: 20,
            brand: 'Samsung',
            rating: 5,
            numReviews: 10,
            description: 'new product'
        },
    ]
}
export default data;