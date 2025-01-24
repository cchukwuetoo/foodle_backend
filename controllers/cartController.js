const Cart = require('../models/Cart');



const addProductToCart = async (req, res) => {

    const userId = req.user.id; // get the user id from the request object
    let count;

    const {foodId, totalPrice, quantity, additives, instructions} = req.body

     try {

        const existingProduct = await Cart.findOne({userId, foodId});
        count = await Cart.countDocuments({userId});

        if (existingProduct) {

            existingProduct.quantity += 1; // increment the quantity of the product by 1
            existingProduct.totalPrice += totalPrice;
            await existingProduct.save(); // save the updated product

        } else {
            const newCart = new Cart({
                userId: userId,
                foodId: foodId,
                additives: additives,
                instructions: instructions,
                quantity: quantity,
                totalPrice: totalPrice
            })

            await newCart.save();
            count = await Cart.countDocuments({userId});
        }



     } catch (error) {

        console.log('Error adding product to cart', error);
        return res.status(500).json({message: 'Error adding product to cart'});

     }

}

const removeProductFromCart = async (req, res) => {

        const userId = req.user.id;
        const foodId = req.params.id;
        let count;

        try {

            const cartItem = await Cart.findById(foodId);

            if(!cartItem) {
                return res.status(404).json({status: false, message: "Cart Item not found"})
            }

            await Cart.findByIdAndDelete({_id: foodId});
            count = await Cart.countDocuments({ userId });

            res.status(200).json({status: true, message: "Cart Item deleted successfully", count});

        } catch (error) {

            res.status(500).json({status: false, message: error.message});

        }

}

const fetchUserCart = async (req, res) =>  {

    const userId = req.user.id

    try {
        const userCart = await Cart.find({userId: userId})
            .populate('foodId', 'name price imageUrl')

        res.status(200).json({status: true, cart: userCart})

    } catch (error) {

        res.status(500).json({status: false, message: error.message})

    }

}


const getCartCount = async (req, res) => {

    const userId = req.user.id;

    try {

        const count = await Cart.countDocuments({userId});
        res.status(200).json({status: true, count})

    } catch (error) {
        res.status(500).json({status: false, message: error.message})
    }
}






const clearUserCart = async (req, res) => {

    const userId = req.user.id;
    let count;

    try {
        await Cart.deleteMany({userId});
        count = await Cart.countDocuments({userId});
        res.status(200).json({status: true, message: "Cart cleared successfully", count});

    } catch (error) {
        res.status(500).json({status: false, message: error.message})
    }
}


const decrementProductQty = async (req, res) => {
    const userId = req.user.id; // get the user id from the request object
    const productId = req.body.productId;
    let count;

    try {
        const cartItem = await Cart.find({userId, productId});
        if (!cartItem) {
            return res.status(404).json({status: false, message: "Cart Item not found"})
        }

        const productPrice = cartItem.totalPrice / cartItem.quantity

        if (cartItem.quantity > 1) {
            cartItem.quantity -= 1;
            cartItem.totalPrice -= productPrice;
            await cartItem.save();

            return res.status(200).json({status: true, message: "Product quantity decremented successfully"})
        } else if (cartItem.quantity === 1) {
            await Cart.findByIdAndDelete({userId: userId, productId: productId});
            count = await Cart.countDocuments({userId});
            return res.status(200).json({status: true, message: "Product removed from cart", count})
        }


    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }
}











module.exports = {addProductToCart, removeProductFromCart, fetchUserCart, clearUserCart, getCartCount, decrementProductQty};
