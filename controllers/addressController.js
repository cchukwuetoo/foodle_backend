
const addressValidationSchema = require('../validations/addressValidation');
const Address = require('../models/Address');


const createAddress = async (req, res) => {
    const address = req.body;
    const {error} = addressValidationSchema.validate(address);
    if (error) {
        return res.status(400).json({status: false, message: error.details[0].message});
    }
    try {

        const newAddress = new Address({
            userId: req.user.id,
            addressLine1: req.body.addressLine1,
            city: req.body.city,
            state: req.body.state,
            district: req.body.district,
            postalCode: req.body.postalCode,
            country: req.body.country,
            deliveryInstructions: req.body.deliveryInstructions,
            default: req.body.default
        });

        if (req.body.default) {
            await Address.updateMany({userId: req.user.id}, {default: false});
        }

        await address.save();

        res.status(201).json({status: true, message: "Address created successfully", address: newAddress});
    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }
}


const deleteAddress = async (req, res) => {
    const addressId = req.params.id;

    try {
        const address = await Address.findById(addressId)
        if (!address) {
            return res.status(404).json({status: false, message: "Address not found"});
        }

        await Address.findByIdAndDelete(addressId);

        res.status(200).json({status: true, message: "Address deleted successfully"});

    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }

}

const updateAddress = async (req, res) => {

    const addressId = req.params.id;
    const {error} = addressValidationSchema.validate(req.body);
    if (error) {
        return res.status(400).json({status: false, message: error.details[0].message});
    }

    const address = new Address({
        userId: req.user.id,
        addressLine1: req.body.addressLine1,
        city: req.body.city,
        state: req.body.state,
        district: req.body.district,
        postalCode: req.body.postalCode,
        country: req.body.country,
        deliveryInstructions: req.body.deliveryInstructions,
        default: req.body.default
    });

    try  {

        if (req.body.default) {
            await Address.updateMany({userId: req.user.id}, {default: false});
        }

        await Address.findByIdAndUpdate(addressId, address, {new: true});

        res.status(201).json({status: true, message: "Address updated successfully", address: address});

    } catch (error) {
     res.status(500).json({status: false, message: error.message})
    }

}

const setDefaultAddress = async (req, res) => {

    const addressId = req.body.addressId;
    const userId = req.user.id;

    try {

        await Address.updateMany({userId: userId}, {default: false});
        const updateAddress = await Address.findByIdAndUpdate(addressId, {default: true}, {new: true})

        if(updateAddress) {
            res.status(200).json({status: true, message: "Address updated successfully"})
        } else {
            res.status(404).json({status: false, message: "Address not found"})
        }


    } catch (error) {
        res.status(500).json({status: false, message: error.message})
    }
}


const getUserAddresses = async (req, res) => {
    const userId = req.user.id;

    try {
        const addresses = await Address.find({userId: userId});

        res.status(200).json({status: true, addresses});

    } catch (error) {
        res.status(500).json({status: false, message: error.message});
    }

}


const getDefaultAddress = async (req, res) => {

    const userId = req.user.id;

    try {
        const address = await Address.findOne({userId: userId, default: true});

        if (!address) {
            return res.status(404).json({status: false, message: "Default address not found"});
        }

        res.status(200).json({status: true, address});
    } catch (error) {
        res.status(500).json({status: false, message: error.message});

    }
}











module.exports = {
    createAddress,
    deleteAddress,
    updateAddress,
    getUserAddresses,
    getDefaultAddress,
    setDefaultAddress

}
