const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const AccountRouter = require('./routes/route.account');
const MaterialRouter = require('./routes/route.material');
const MaterialCategoryRouter = require('./routes/route.material-category');
const ToolRouter = require('./routes/route.tool');
const ToolCategoryRouter = require('./routes/route.tool-category');
const VehicleRouter = require('./routes/route.vehicle');
const AccountUnitRouter = require('./routes/route.account-unit');
const RequestRouter = require('./routes/route.request');
const RequestItemRouter = require('./routes/route-request-item');

app.use(cors());
app.use(bodyParser.json());
app.use('/api', AccountRouter);
app.use('/api', AccountUnitRouter);
app.use('/api', MaterialRouter);
app.use('/api', MaterialCategoryRouter);
app.use('/api', ToolRouter);
app.use('/api', ToolCategoryRouter);
app.use('/api', VehicleRouter);
app.use('/api', RequestRouter);
app.use('/api', RequestItemRouter);

app.listen(port, () => {
  console.log('Server aktif');
  console.log(`http://localhost:${port}`);
});
