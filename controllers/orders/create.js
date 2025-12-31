const Order = require('../../schemas/order');
const Joi = require('joi');

const schema = Joi.object({
  title: Joi.string().required(),
  price: Joi.number().positive().required(),
});

module.exports = async (req, res) => {
  try {
    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const { title, price } = req.body;
    const order = await Order.create({
      title,
      price,
    });

    return res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

