import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import passport from 'passport';
import serveStatic from 'serve-static';
import logger from './utils/logger';

import setupRoutes from './routes';
import getJwtStrategy from './utils/passport';

const port = process.env.PORT;
const env = process.env.NODE_ENV;

// Create Express app
const app = express();

// Define middlewares
app.use(bodyParser.json());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(passport.initialize());

passport.use(getJwtStrategy());

// Routes Config
setupRoutes(app);

// Attach express error to logger
app.use(morgan('combined', { stream: logger.stream }));

logger.info(`PORT :: ${port}`);
logger.info(`ENV :: ${env}`);

if (env === 'production') {
  const staticPath = path.resolve(__dirname, '../../frontend/build');
  
  logger.info('==============staticPath=====================');
  logger.info(staticPath);
  logger.info('===============staticPath====================');

  app.use(serveStatic(staticPath, {
    maxAge: '0',
    setHeaders: function (res, path) {
      res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      res.setHeader('Expires', '-1');
      res.setHeader('Pragma', 'no-cache');
    }
  }));
}

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  next({
    status: 404,
    message: 'Not Found'
  });
});

// Error handler middleware
app.use((err, req, res, next) => {
  console.error(err);
  const error = {
    status: err.status || 500,
    message: err.message || 'Server Error'
  };
  res.status(err.status).json(error);
});

app.listen(port, () => {
  logger.info('Server Started !!!');
});
