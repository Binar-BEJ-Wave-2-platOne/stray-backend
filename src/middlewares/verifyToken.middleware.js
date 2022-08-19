const jwt = require('jsonwebtoken');

const isTokenValid = (req, res, next) => {
  try {
    let token = req.get('Authorization');
    if (!token) {
      return res.status(404).json({
        message: 'No token provided.',
      });
    }

    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.email = decoded.email;
    req.id_users = decoded.id_users;
  } catch (error) {
    next(error);
  }
};

const refreshToken = (email, token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH);
    return {
      email: decoded.email,
      id_users: decoded.id_users,
    };
  } catch (error) {
    return false;
  }
};

module.exports = {
  isTokenValid,
  refreshToken,
};
