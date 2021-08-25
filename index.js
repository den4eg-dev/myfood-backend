import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import router from './router/index.js';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
// import bodyParser from 'body-parser';
// 1st get the __filename and then __dirname
// both these CommonJs variables are not in ES modules, as per Node.org
// we have to replicate with import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();
// app.use(bodyParser());
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
// TODO set options for fileUpload (fileSize)!
app.use(fileUpload({}));
app.use('/api', router);

const init = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 5000,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

init();
