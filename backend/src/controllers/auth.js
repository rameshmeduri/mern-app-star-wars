import jwt from 'jsonwebtoken';
import config from '../config';
import db from '../utils/db';

const sixtyDaysInSeconds = 60 * 60 * 24 * 60;

function login(req, res, next) {  
  const { userId, password } = req.body;
  const errors = {};
  if (!userId) {
    errors.userId = `User Id can't be blank`;
    return res.status(422).json(errors);
  }
  if (!password) {
    errors.password = `Password can't be blank`;
    return res.status(422).json(errors);
  }
  let user = db.findById(userId);
  if (!user) {
    errors.userId = 'User Id not found';
    return res.status(404).json(errors);
  }
  if (user.password !== password) {
    errors.password = 'Incorrect Password';
    return res.status(404).json(errors);
  }
  const payload = { id: user.id, name: user.name};

  jwt.sign(
    payload,
    config.secret,
    { expiresIn: sixtyDaysInSeconds },
    (err, token) => {
      res.json({
        ...payload,
        token
      });
    }
  );
}

function me(req, res) {
  res.json({
    id: req.user.id,
    name: req.user.name
  });
}

export { me, login };
