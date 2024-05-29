const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db'); 
const authRoutes = require('./routes/auth');
const tireurRoutes = require('./routes/tireurs');

const app = express();
const port = 5000;

app.use(express.static('public'));

connectDB();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/tireurs', tireurRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
