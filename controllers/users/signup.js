const Joi = require('joi');
const User = require('../../schemas/user');
const bcrypt = require('bcrypt');

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

module.exports = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ email, password: hashedPassword });

    return res
      .status(201)
      .json({ message: 'User created successfully', newUser });
  } catch (error) {
    // Handle Sequelize unique constraint error
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(400).json({ message: 'User with this email already exists' });
    }
    return res.status(500).json({ message: error.message });
  }
};
