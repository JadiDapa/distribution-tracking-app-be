const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const AccountRouter = require('./routes/route.account');
const MaterialRouter = require('./routes/route.material');
const MaterialCategoryRouter = require('./routes/route.material-category');
const MaterialInventoryRouter = require('./routes/route.material-inventory');
const MaterialUpdatesRouter = require('./routes/route.material-updates');
const ToolRouter = require('./routes/route.tool');
const ToolCategoryRouter = require('./routes/route.tool-category');
const ToolInventoryRouter = require('./routes/route.tool-inventory');
const ToolUpdatesRouter = require('./routes/route.tool-updates');
const VehicleRouter = require('./routes/route.vehicle');
const VehicleVariantRouter = require('./routes/route.vehicle-variant');
const AccountUnitRouter = require('./routes/route.account-unit');
const RequestRouter = require('./routes/route.request');
const RequestItemRouter = require('./routes/route-request-item');

app.use(cors());
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
