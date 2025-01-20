const Food = require('../models/Foods');
const {foodValidation} = require('../validations/foodValidation');



const addFood = async (req, res) => {

    const {error} = foodValidation.validate(req.body);

    const newFood = new Food(req.body);

    try {

        await newFood.save();
        res.status(201).json({message: 'Food created successfully'});

    } catch (error) {

        res.status(500).json({status: false, message: 'Error creating food', error: error.message});

    }

}


    const getFoodById = async (req, res) => {

        const foodId = req.params.id; // get the food id from the request parameter

        try {
            const food = await Food.findById(foodId);

            if (!food) {
                return res.status(404).json({message: 'Food not found'});
            }

            res.status(200).json(food); // return the food object

        } catch (error) {

            res.status(500).json({status: false, message: "failed to get a food items"})

        }
    }


    const getAllFood = async (req, res) => {

        try {
            const food = await Food.find({}, {__v: 0});
            res.status(200).json(food);

        } catch (error) {

            res.status(500).json({status: false, message: "failed to get all food items"})

        }
    }


    const getFoodByRestaurant = async (req, res) => {

    const restaurantId = req.params.restaurantId; // get the restaurant id from the request parameter

        try {
        const foods = await Food.find({restaurant: restaurantId});
        if (!foods || foods.length === 0) {
            return res.status(404).json({status: false, message: "No food items found"});
        }

        res.status(200).json(foods)

        } catch (error) {

            res.status(500).json({status: false, message: "failed to get food items"})

        }

    }








module.exports = {addFood, getAllFood, getFoodById}
