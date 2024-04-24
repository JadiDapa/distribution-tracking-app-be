const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const AccountRouter = require('./routes/route.account');
const MaterialRouter = require('./routes/route.material');
const ToolRouter = require('./routes/route.tool');
const VehicleRouter = require('./routes/route.vehicle');
const AccountUnitRouter = require('./routes/route.account-unit');
// const UserRouter = require('./routes/route.user');
// const CartRouter = require('./routes/route.cart');
// const ProductRouter = require('./routes/route.product');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', AccountRouter);
app.use('/api', AccountUnitRouter);
app.use('/api', MaterialRouter);
app.use('/api', ToolRouter);
app.use('/api', VehicleRouter);
// app.use('/api', UserRouter);
// app.use('/api', CartRouter);
// app.use('/api', ProductRouter);

app.listen(port, () => {
  console.log('Server aktif');
  console.log(`http://localhost:${port}`);
});
