const Order = require('../../schemas/order');
const User = require('../../schemas/user');
const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  eventDate: Joi.date().required(),
  venue: Joi.string().required(),
  location: Joi.string().required(),
  totalPrice: Joi.number().positive().required(),
  eventID: Joi.string().required(),
  userId: Joi.number().integer().positive().required(),
});

module.exports = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { title, eventDate, venue, location, totalPrice, eventID, userId } = req.body;

    // Verify user exists
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const order = await Order.create({
      title,
      eventDate,
      venue,
      location,
      totalPrice,
      eventID,
      userId,
    });

    // Include user information in response
    const orderWithUser = await Order.findByPk(order.id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'email'] }],
    });

    return res.status(201).json({
      message: 'Order created successfully',
      order: orderWithUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

