// BCRYPT for password hassing
const bcrypt = require('bcryptjs');

// JSON Web Token for Authentication and Authoiazation
const jwt = require('jsonwebtoken');



const User = require('../models/user');




const registerUser = async ({ name, email, password }) => {

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashPassword,
  })

  return {
    id: user._id,
    name: user.name,
    email: user.email,
  };

}






const loginUser = async ({ email, password }) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPassword = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPassword) {
    throw new Error("Invalid email or password");
  };

  // CReating token
  const token = jwt.sign(
    {
      userId: user._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",  //Valid 7 Days
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
    },
  };

}



module.exports = {
  registerUser,
  loginUser,
}

