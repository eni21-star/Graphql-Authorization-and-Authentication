import jwt from 'jsonwebtoken';
import env from 'dotenv';
env.config();

export const jwtVerify =  (token) => {
  if (!token) {
    throw new Error('token not found');
  }

  try {
    const user =  jwt.verify(token, process.env.SECRET_KEY);
    console.log(process.env.SECRET_KEY)
    return user;
  } catch (err) {
    throw new Error('token is invalid');
  }
};