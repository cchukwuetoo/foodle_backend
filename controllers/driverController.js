const Driver = require('../models/Driver');

module.exports  = {

    registerDriver: async (req, res) => {

        const newDriver = new Driver(req.body);

        try {
            await newDriver.save();
            res.status(201).json({status: true, message: "Driver registered successfully", newDriver});

        } catch (error) {
            res.status(500).json({status: false, message: error.message});
        }
    },

    setDriverAvailability: async (req, res) => {

        const driverId = req.user.id;

        try {

            const driver = await Driver.findById(driverId);

            if (!driver) {
                return res.status(404).json({status: false, message: "Driver not found"});
            }

            driver.isAvailable = !driver.isAvailable;
            await driver.save();

        } catch (error) {

            res.status(500).json({status: false, message: error.message});

        }
    },

    
    getAllDrivers: async (req, res) => {
        try {
            const drivers = await Driver.find();
            res.status(200).json(drivers);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },


    getDriverById: async (req, res) => {
        try {
            const driver = await Driver.findById(req.params.id);
            if (!driver) {
                return res.status(404).json({ message: "Driver not found" });
            }
            res.status(200).json(driver);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    
    updateDriver: async (req, res) => {
        try {
            const updatedDriver = await Driver.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            );
            if (!updatedDriver) {
                return res.status(404).json({ message: "Driver not found" });
            }
            res.status(200).json(updatedDriver);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    
    deleteDriver: async (req, res) => {
        try {
            const deletedDriver = await Driver.findByIdAndDelete(req.params.id);
            if (!deletedDriver) {
                return res.status(404).json({ message: "Driver not found" });
            }
            res.status(200).json({ message: "Driver deleted successfully" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    
    setDriverAvailability: async (req, res) => {
        try {
            const { available } = req.body;
            const updatedDriver = await Driver.findByIdAndUpdate(
                req.driver.id,
                { $set: { available } },
                { new: true }
            );
            res.status(200).json(updatedDriver);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }


}
