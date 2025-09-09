const userModel = require("../models/userSchema");

const register = async (req, res) => {
    try {
        const data = req.body;
        console.log(data)
        const newUser = await userModel.create(data)

        return res.status(200).json({ message: "User Regtistered Successfully ", isSave: true, user: newUser });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ message: error.message, isSave: false })
    }
}

module.exports = { register };