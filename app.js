const express = require("express");
const app = express();
const shoppingRoutes = require('./shopping-routes');
const ExpressError = require("./expressError");
const morgan = require("morgan")


app.use(express.json());

app.use(morgan('dev'));

app.use('/items', shoppingRoutes); 
  


// 404 handler
// app.use(function (req, res, next) {
//     return (new ExpressError("Not Found", 404));
//   });

// // generic error handler
// app.use(function (err, req, res, next) {
//     // the default status is 500 Internal Server Error
//     let status = err.status || 500;
  
//     // set the status and alert the user
//     return res.status(status).json({
//       error: {
//         message: err.message,
//         status: status
//       }
//     });
//   });


module.exports = app;