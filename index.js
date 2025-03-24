require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const adminRoutes = require('./routes/adminRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const siteconfigRoutes = require('./routes/siteconfigRoutes');
const fileuploadRoutes = require("./routes/fileuploadRoutes");
const contactleadRoutes = require("./routes/contactleadRoutes");
const paymentsettingRoutes = require('./routes/paymentsettingRoutes');
const aboutusRoutes = require('./routes/aboutusRoutes');
const treatmentRoutes = require('./routes/treatmentRoutes');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const prescriptionRoutes = require('./routes/prescriptionRoutes');
const policyRoutes = require('./routes/policyRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS options
const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204
};

// Use CORS middleware with options
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '50mb' }));

app.use('/api/admin', adminRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/siteconfig', siteconfigRoutes);
app.use("/api/file", fileuploadRoutes);
app.use('/api/contactlead', contactleadRoutes);
app.use('/api/paymentsetting', paymentsettingRoutes);
app.use('/api/aboutus', aboutusRoutes);
app.use('/api/treatment', treatmentRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/user', userRoutes);
app.use('/api/appointment', appointmentRoutes);
app.use('/api/prescription', prescriptionRoutes);
app.use('/api/policy', policyRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
