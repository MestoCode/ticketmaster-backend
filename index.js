const express = require('express');
const cors = require('cors');
const adminRouter = require('./routers/admin');
const userRouter = require('./routers/user');
const orderRouter = require('./routers/order');
const { connectDatabase } = require('./database/sequelizeConnection');

const port = process.env.PORT || 3000;
const app = express();

(async () => {
  await connectDatabase();
})();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/order', orderRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
