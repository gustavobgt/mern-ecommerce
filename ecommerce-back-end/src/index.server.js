const express = require('express');
const env = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');

// enviroment variable or you can say constants
env.config();

// mongodb connection

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.0uhhv.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log('Database connected');
  });

// Passing the data in json format
/**
 * body-parser deprecated bodyParser: use individual json/urlencoded middlewares src\index.server.js:10:9
 * body-parser deprecated undefined extended: provide extended option node_modules\body-parser\index.js:105:29
 */
// A chamada via construtor está depreciada, chamar os middlewares individualmente

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

bodyParser.urlencoded({ extended: true });

app.use('/api', authRoutes);
app.use('/api', adminRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
