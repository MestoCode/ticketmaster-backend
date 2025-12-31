const Order = require('../../schemas/order');

module.exports = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).json({
      message: 'Orders retrieved successfully',
      orders,
      count: orders.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

