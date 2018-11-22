/*
 STATEMENT ANALYSER ROUTE DISPATCHER - DISPATCHES THE ROUTES TO THEIR SPECIFIC ROUTE HANDLERS
 ================================================== 
 AUTHOR : CHERIAN SABBY

 THIS MODULE IS RESPONSIBLE FOR HANDLING THE URLS OF THE APPLICATION AND DISPATCHING IT TO THE RESPECTIVE HANDLERS 
 

 */
const routes = require('express').Router();
const payment = require('../controllers/payment');

routes.use('/api/payment', payment)


module.exports = routes;