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

const corsOptions = {
  origin: 'http://localhost:5173', // Allow only this origin to access the server
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Allow cookies to be sent
  optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', AccountRouter);
app.use('/api', AccountUnitRouter);
app.use('/api', MaterialRouter);
app.use('/api', MaterialCategoryRouter);
app.use('/api', MaterialInventoryRouter);
app.use('/api', MaterialUpdatesRouter);
app.use('/api', ToolRouter);
app.use('/api', ToolCategoryRouter);
app.use('/api', ToolInventoryRouter);
app.use('/api', ToolUpdatesRouter);
app.use('/api', VehicleRouter);
app.use('/api', VehicleVariantRouter);
app.use('/api', RequestRouter);
app.use('/api', RequestItemRouter);

app.listen(port, () => {
  console.log('Server aktif');
  console.log(`http://localhost:${port}`);
});

module.exports = app;
