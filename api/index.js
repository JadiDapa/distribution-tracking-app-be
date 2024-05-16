const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const AccountRouter = require('../src/routes/route.account');
const MaterialRouter = require('../src/routes/route.material');
const MaterialCategoryRouter = require('../src/routes/route.material-category');
const MaterialInventoryRouter = require('../src/routes/route.material-inventory');
const MaterialUpdatesRouter = require('../src/routes/route.material-updates');
const ToolRouter = require('../src/routes/route.tool');
const ToolCategoryRouter = require('../src/routes/route.tool-category');
const ToolInventoryRouter = require('../src/routes/route.tool-inventory');
const ToolUpdatesRouter = require('../src/routes/route.tool-updates');
const VehicleRouter = require('../src/routes/route.vehicle');
const VehicleVariantRouter = require('../src/routes/route.vehicle-variant');
const AccountUnitRouter = require('../src/routes/route.account-unit');
const RequestRouter = require('../src/routes/route.request');
const RequestItemRouter = require('../src/routes/route-request-item');

app.use(cors());
app.use(bodyParser.json());
app.use('/', AccountRouter);
app.use('/', AccountUnitRouter);
app.use('/', MaterialRouter);
app.use('/', MaterialCategoryRouter);
app.use('/', MaterialInventoryRouter);
app.use('/', MaterialUpdatesRouter);
app.use('/', ToolRouter);
app.use('/', ToolCategoryRouter);
app.use('/', ToolInventoryRouter);
app.use('/', ToolUpdatesRouter);
app.use('/', VehicleRouter);
app.use('/', VehicleVariantRouter);
app.use('/', RequestRouter);
app.use('/', RequestItemRouter);

app.listen(port, () => {
  console.log('Server aktif');
  console.log(`http://localhost:${port}`);
});

module.exports = f;
