
// Import authentication services
const { registerUser, loginUser } = require('../services/authService');



// Register a new user

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



// // Login an existing user

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





// Get the currently authenticated user

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



//=============Expot Functions=============

module.exports = {
  register,
  login,
  getCurrentUser
}