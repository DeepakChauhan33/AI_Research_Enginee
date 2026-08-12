// BCRYPT for password hassing
const bcrypt = require('bcryptjs');


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



module.exports = {
  registerUser
}

