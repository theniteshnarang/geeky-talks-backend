const express = require('express');
var cors = require('cors')
var morgan = require('morgan')
const PORT = 8000
const app = express();

app.use(morgan('tiny'))

const {defaultErrorHandler, defaultRouteHandler} = require('./middlewares/defaultHandler.middleware')
const {authVerify} = require('./middlewares/auth.middleware')
app.use(express.json());
app.use(cors())

const { initializeDBConnection } = require('./db/db.connect.js')

initializeDBConnection()

const videoV1 = require('./routes/video.route');
const likeV1 = require('./routes/like.route');
const saveV1 = require('./routes/save.route');
const userV1 = require('./routes/user.route');
const authV1 = require('./routes/auth.route')

app.use('/video', videoV1)
app.use('/auth', authV1)
app.use('/like', authVerify, likeV1)
app.use('/user', authVerify, userV1)
app.use('/save', authVerify, saveV1)

app.get('/', (req, res) => {
  res.send('Welcome to Geeky Talks!')
});

// Handle All unknown/page not found routes
app.use(defaultRouteHandler)

app.use(defaultErrorHandler)

app.listen(PORT, () => {
  console.log('Server Listening on port:',PORT);
});