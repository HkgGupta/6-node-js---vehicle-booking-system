

export const vehicleValidate = async (req, res, next) => {
    try {
        const vehicleName = req.body.vehicleName;
        const vehicleModel = req.body.vehicleModel;
        const vehicleNumber = req.body.vehicleNumber;
        const vehicleCategory = req.body.vehicleCategory;
        const vehicleCostPerKM = req.body.vehicleCostPerKM;
        if (!vehicleName || vehicleName === "") {
            return res.status(400).json({
                Message: "Vehicle Name is required",
            });
        }
        if (!vehicleModel || vehicleModel === "") {
            return res.status(400).json({
                Message: "Vehicle Model is required",
            });
        }
        if (!vehicleNumber || vehicleNumber === "") {
            return res.status(400).json({
                Message: "Vehicle Number is required",
            });
        }
        if (!vehicleCategory || vehicleCategory === "") {
            return res.status(400).json({
                Message: "Category is required",
            });
        }
        if (!vehicleCostPerKM || vehicleCostPerKM === "") {
            return res.status(400).json({
                Message: "Cost is required",
            });
        }

        next();

    } catch (error) {
        return res.status(400).json({
            Alert: "Error " + error,
        });
    }
};
