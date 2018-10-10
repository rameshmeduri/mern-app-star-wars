import passport from 'passport';
import * as authController from '../controllers/auth';

function setupAuthRoutes(router) {

  router.post('/login', authController.login);

  router.get(
    '/current',
    passport.authenticate('jwt', { session: false }),
    authController.me
  );
  
}

export default setupAuthRoutes;
