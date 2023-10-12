

export const adminValidate = async (req, res, next) => {
    try {
        const adminName = req.body.adminName;
        const adminEmail = req.body.adminEmail;
        const adminPhone = req.body.adminPhone;
        const adminPassword = req.body.adminPassword;

        if (!adminName || adminName === "") {
            return res.status(400).json({
                Message: "Name is required",
            });
        }
        if (!adminEmail || adminEmail === "") {
            return res.status(400).json({
                Message: "Email is required",
            });
        }
        if (!adminPhone || adminPhone === "") {
            return res.status(400).json({
                Message: "Phone is required",
            });
        }
        if (!adminPassword || adminPassword === "") {
            return res.status(400).json({
                Message: "Password is required",
            });
        }

        next();

    } catch (error) {
        return res.status(400).json({
            Alert: "Error " + error,
        });
    }
};
