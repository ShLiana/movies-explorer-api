// eslint-disable-next-line import/no-extraneous-dependencies
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const centralError = require('./middlewares/centralError');
const router = require('./routes');
const { MONGO_URL } = require('./utils/errorsConstantsName');
const limiter = require('./middlewares/rateLimiter');

const { PORT = 3000 } = process.env;
const app = express();
app.use(cors());

mongoose.connect(MONGO_URL);

app.use(limiter);

app.use(helmet());

// подключить логгер запросов
app.use(requestLogger);

// подключить парсеры
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

// подключить логгер ошибок
app.use(errorLogger);

// обработчик ошибок celebrate
app.use(errors());

app.use(centralError);

app.listen(PORT);
