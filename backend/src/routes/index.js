import express from 'express';
import setupAuthRoutes from './auth';

function setupRoutes(app) {
  
  // Auth Routes
  const authRouter = express.Router();
  setupAuthRoutes(authRouter);
  app.use('/api/auth', authRouter);  
  
}

export default setupRoutes;
