const User = require('../models/User');

// Get all users
const getUsers = async (req, res) => {
    try {
      // Retrieve all users from database
      const users = await User.find();
  
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

// Get one user
const getOneUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Create a new user
const createUser = async (req, res) => {
    try {
      const { email, fullname, gender, image, password, department, permission } = req.body;
  
      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(409).json({ message: 'User already exists' });
      }
  
      // Create new user object
      const newUser = new User({
        email,
        fullname,
        gender,
        image,
        password,
        department,
        permission,
      });
  
      // Save user to database
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Update user
  const updateUser = async (req, res) => {
    try {
      const { email, fullname, gender, image, password, department, permission } = req.body;
  
      // Check if user exists
      const existingUser = await User.findById(req.params.id).exec();
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user object
      existingUser.email = email;
      existingUser.fullname = fullname;
      existingUser.gender = gender;
      existingUser.image = image;
      existingUser.password = password;
      existingUser.department = department;
      existingUser.permission = permission;
  
      // Save updated user to database
      await existingUser.save();
  
      res.json(existingUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };


// Delete a user by ID
const deleteUser = async (req, res) => {
    try {
      const existingUser = await User.findOneAndDelete(req.params.id);
 
      res.json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };

module.exports={
    getUsers: getUsers,
    getOneUser: getOneUser,
    createUser: createUser,
    updateUser: updateUser,
    deleteUser: deleteUser
}