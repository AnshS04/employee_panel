const { connectMongoDB } = require("./config/db");
const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const cors = require('cors');

require('dotenv').config();

connectMongoDB()

const app = express();
const PORT = 5000;

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello');
});

app.use('/api', adminRoutes);
app.use('/api', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
