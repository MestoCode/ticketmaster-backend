const Order = require('../../schemas/order');
const User = require('../../schemas/user');

module.exports = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'email'] }],
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      message: 'All orders retrieved successfully',
      orders,
      count: orders.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

