var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors');
var path = require('path');
var https = require('https');
var fs = require('fs');

const port = 4000

var app = express()

const routes = require('./api/routes');


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

var whitelist = ['"chrome-extension://fhbjgbiflinjbdggehcddcbncdddomop','http://localhost:4200', 'http://localhost:4300', 'https://lagnakarya.com', 'https://www.lagnakarya.com', 'https://139.59.0.152', 'https://payumoney.com', 'https://www.payumoney.com', "https://sboxcheckout.citruspay.com", "https://www.sboxcheckout.citruspay.com", 'https://test.payu.in/_payment/**']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || origin == undefined || origin == "null") {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

app.use(express.static(path.resolve('public')));
app.use("/uploads", express.static('uploads'));

app.use(cors(corsOptions));

//app.use('/api/stocks', stocks)
app.use('/', routes);
//app.use('/api/userProfile', userProfile)
//app.use('/api/docs', swagger.router)


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  console.error(`Error catched! ${err}`)

  const error = {
    status: err.status || 500,
    message: err.message
  }

  res.status(error.status).send(error)
})

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
    default:
      throw error
  }
}

function onListening() {
  const addr = app.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
  console.log('\nListening on ' + bind)
}

// https.createServer(credentials, app).listen(port)

app.listen(port)
app.on('error', onError)
app.on('listening', onListening)

console.log('Server started on port ' + port)
