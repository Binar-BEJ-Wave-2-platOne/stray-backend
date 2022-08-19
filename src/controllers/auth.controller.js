require('dotenv').config();
const bcrypt = require('bcrypt');
const { Users, Roles } = require('../models');
const jwt = require('jsonwebtoken');

const register = async (req, res, next) => {
  try {
    const { role_id, name, no_telephone, email, alamat, user_name, password } =
      req.body;
    const [isRoleExist, isUserNameExist, isEmailExist] = await Promise.all([
      Roles.findOne({ where: { id: role_id } }),
      Users.findOne({ where: { user_name: user_name } }),
      Users.findOne({ where: { email: email } }),
    ]);

    if (!isRoleExist) {
      return res.status(400).json({
        message: 'Role not exist',
      });
    }

    if (isUserNameExist) {
      return res.status(400).json({
        message: 'User name already exist',
      });
    }

    if (isEmailExist) {
      return res.status(400).json({
        message: 'Email already exist',
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      role_id,
      name,
      no_telephone,
      email,
      alamat,
      user_name,
      password: hashPassword,
    });
    return res.status(201).json({
      message: 'User created',
      data: req.body,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { user_name, password } = req.body;
    const user = await Users.findOne({
      where: { user_name },
      include: [
        {
          model: Roles,
          as: 'role',
          attributes: ['role'],
        },
      ],
    });
    if (!user) {
      return res.status(400).json({
        message: 'User not exist',
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: 'Password not valid',
      });
    }

    const token = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_SECRET,
      {
        expiresIn: '2m',
      }
    );

    const refresh = jwt.sign(
      { email: user.email, user_id: user.id },
      process.env.JWT_REFRESH,
      {
        expiresIn: '60m',
      }
    );

    return res.status(200).json({
      message: 'Login success',
      data: {
        token,
        refresh,
        user: {
          id_users: user.id_users,
          user_name: user.user_name,
          name: user.name,
          email: user.email,
          no_telephone: user.no_telephone,
          alamat: user.alamat,
          role: user.role.role,
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

const refreshToken = async (req, res, next) => {
  const { email, token } = req.body;
  const isTokenValid = refreshToken(email, token);
  if (!isTokenValid) {
    return res.status(401).json({
      message: 'Invalid token',
    });
  }

  const accessToken = jwt.sign(
    { email: email, user_id: isTokenValid.user_id },
    process.env.JWT_SECRET,
    {
      expiresIn: '2m',
    }
  );

  return res.status(200).json({
    message: 'Token refreshed',
    accessToken: accessToken,
  });
};

module.exports = {
  register,
  login,
  refreshToken,
};
