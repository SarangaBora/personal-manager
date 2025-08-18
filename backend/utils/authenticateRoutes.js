import jwt from "jsonwebtoken";
//middleware to authenticate the user who has sent the req via ccokies

export const authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No Token found!!!" });
  }
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
    req.user = payload; //attach user info to request object
    next();
  } catch (error) {
    return res.status(401).json({ message: "User not authenticated!!!" });
  }
};
