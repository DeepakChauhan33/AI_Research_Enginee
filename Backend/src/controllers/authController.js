



const User = require('../models/user');


const { registerUser, loginUser } = require('../services/authService');




const register = async (req, res) => {
  console.log("Reached Controller")

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



const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user = await loginUser({ email, password });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      ...user,
    });

  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}






const getCurrentUser = async (req, res) => {

  try {

    return res.status(200).json({
      success: true,
      message: "Authenticated successfully",
      userId: req.user.userId,
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
}


module.exports = {
  register,
  login,
  getCurrentUser
}