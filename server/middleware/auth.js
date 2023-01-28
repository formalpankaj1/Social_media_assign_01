import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

const secret = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  try {
    // console.log("auth");
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    // console.log('token',token);
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
      req.username = decodedData?.name;
      req.email = decodedData?.email;

    } else {
      decodedData = jwt.decode(token);
      // console.log('decodedData',decodedData);
      req.userId = decodedData?.sub;
    }

    next();
  } catch (error) {
    console.log("error in auth", error);
    res.send("Authorization Error");
  }
};

export default auth;
