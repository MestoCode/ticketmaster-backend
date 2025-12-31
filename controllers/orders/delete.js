const Order = require('../../schemas/order');
const User = require('../../schemas/user');

module.exports = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: 'Order ID is required' });
    }

    const order = await Order.findByPk(id, {
      include: [{ model: User, as: 'user', attributes: ['id', 'email'] }],
    });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await order.destroy();

    return res.status(200).json({
      message: 'Order deleted successfully',
      deletedOrder: order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

