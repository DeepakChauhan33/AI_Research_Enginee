



const User = require('../models/user');


const { registerUser } = require('../services/authService');




const register = async (req, res) => {

  try {
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
      
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }

}


module.exports = {
  register
}