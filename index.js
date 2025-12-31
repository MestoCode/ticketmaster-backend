const express = require('express');
const adminRouter = require('./routers/admin');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');
const { connectDatabase } = require('./database/sequelizeConnection');

const port = process.env.PORT || 3000;
const app = express();

(async () => {
  await connectDatabase();
})();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
