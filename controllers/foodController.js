const Food = require('../models/Foods');
const {foodValidation} = require('../validations/foodValidation');



const addFood = async (req, res) => {

    const {error} = foodValidation.validate(req.body);

    if (error) {
        return res.status(400).json({status: false, message: error.details[0].message});
    }

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

    const foodAvailability = async (req, res) => {

    const foodId = req.params.id;

    try {
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({status: false, message: "food not found"});
        }

        food.isAvailable = !food.isAvailable;

        await  food.save();

        res.status(200).json({status: true, message: "food availability updated successfully"});

    } catch (error) {

        res.status(500).json({status: false, message: error.message})

    }
    }



    const updateFoodById = async (req, res) => {

    const foodId = req.params.id;

    const {error} = foodValidation.validate(req.body);

    if (error) {
        return res.status(400).json({status: false, message: error.details[0].message});
    }

    try {

        const updatedFood = await Food.findByIdAndUpdate(foodId, req.body, {new: true});

        if (!updatedFood) {
            return res.status(404).json({status: false, message: "food not found"});
        }

        res.status(200).json({status: true, message: "food updated successfully"});

    } catch (error) {

        res.status(500).json({status: false, message: error.message})

    }


    }


    const addFoodTag =  async (req, res) => {

    const foodId = req.params.id;
    const { tag } = req.body

        try {

        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({status: false, message: "food not found"});
        }

        if (food.foodTags.includes(tag)) {
            return res.status(400).json({status: false, message: "tag already exists"});
        }

        food.foodTags.push(tag);
        await food.save();

        res.status(200).json({status: true, message: "tag added successfully"});

        } catch (error) {
        res.status(500).json({status: false, message: error.message})
        }


}

const deleteFood = async (req, res) => {
    const foodId = req.params.id;

    try {
        const food = await Food.findById(foodId);

        if (!food) {
            return res.status(404).json({status: false, massage: "food item not found"})
        }

        await Food.findByIdAndDelete(foodId);

        res.status(200).json({status: true, message: "Food item deleted successfully"})
    } catch (error) {
        res.status(500).json({status: false, message: error.message })
    }
}




module.exports = {addFood, getAllFood, getFoodById, getFoodByRestaurant, updateFoodById, foodAvailability, addFoodTag, deleteFood}
