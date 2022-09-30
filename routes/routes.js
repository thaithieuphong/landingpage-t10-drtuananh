const express = require("express");
const adminRouter = require("./admin");

function route(app) {
  app.use("/", adminRouter);
  app.all('*', (req, res) => {
    res.status(404).render('err/404');
  });
}

module.exports = route;
