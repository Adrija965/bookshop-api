const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const customer_routes = require('./auth_users.js').authenticated;
const genl_routes = require('./general.js').general;

const app = express();

app.use(express.json());

// Strip /api prefix added by the Replit reverse proxy
app.use((req, _res, next) => { if (req.url.startsWith('/api')) req.url = req.url.slice(4) || '/'; next(); });

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

// Middleware: only allow access to /customer/auth/* if logged in with a valid token
app.use("/customer/auth/*splat", function auth(req, res, next) {
  let token;
  const authHeader = req.headers['authorization'];
  if (authHeader && authHeader.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  } else if (req.session.authorization) {
    token = req.session.authorization['accessToken'];
  }
  if (token) {
    jwt.verify(token, "access", (err, user) => {
      if (!err) {
        req.user = user;
        next();
      } else {
        return res.status(403).json({ message: "User not authenticated" });
      }
    });
  } else {
    return res.status(403).json({ message: "User not logged in" });
  }
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running on port " + PORT));
