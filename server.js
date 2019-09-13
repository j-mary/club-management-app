import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';

import config from './config/config';

// import all routes
import user from './routes/user';

const app = express();
const { port, databaseUrl, env } = config;

mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

if (env === 'production') {
  app.use(express.static('client/build'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// call route definitions with express app as argument
user(app);

app.listen(port, () => {
  console.log(`app running on port ${port}`);
});
