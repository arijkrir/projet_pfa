const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db'); 
const authRoutes = require('./routes/auth');
const tireurRoutes = require('./routes/tireurs');
const deconnexion = require('./routes/Deconnexion');
const seanceRoutes = require('./routes/Calendrier'); 


const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());


app.use(express.static('public'));

connectDB();

app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/tireurs', tireurRoutes);
app.use('/api/deconnexion', deconnexion); 
app.use('/api/seances', seanceRoutes); 


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
