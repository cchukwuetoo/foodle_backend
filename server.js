const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');




const app = express();

const port = process.env.PORT || 5000;

// import the router
const authRouter = require('./routes/auth.js');
const userRouter = require('./routes/user.js');
const restaurantRouter = require('./routes/restaurant.js');
const foodRouter = require('./routes/food.js');
const categoryRouter = require('./routes/category.js');
const cartRouter = require('./routes/cart.js');
const addressRouter = require('./routes/address.js');
const orderRouter = require('./routes/order.js');
const driverRouter = require('./routes/driver.js');


//

dotenv.config();



// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => console.log('DB Connected')).catch(err => console.log(err));





// Body parser Middleware

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/', (req, res) => {
    res.send('Hello World');
});

// use the router
app.use('/api/auth', authRouter);

app.use('/api/restaurant', restaurantRouter);

app.use('/api/user', userRouter);

//app.use('/api/user', userRouter);

app.use('/api/food', foodRouter);

app.use('/api/category', categoryRouter);

app.use('/api/cart', cartRouter);

app.use('/api/address', addressRouter);

app.use('/api/order', orderRouter);

app.use('/api/driver', driverRouter);

app.listen(process.env.PORT || 5000, () => {
   console.log(`Server is running on port ${port}`);
});

