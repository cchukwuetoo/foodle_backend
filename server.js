const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');




const app = express();

const port = process.env.PORT || 5000;

// import the router
const authRouter = require('./routes/auth.js');
const restaurantRouter = require('./routes/restaurant.js');
const foodRouter = require('./routes/food.js');
const categoryRouter = require('./routes/category.js');


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

app.use('/api/food', foodRouter);

app.listen(process.env.PORT || 5000, () => {
   console.log(`Server is running on port ${port}`);
});

