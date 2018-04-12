const express = require('express');

const app = express();
const router = express.Router();
router.get('/', function (req, res, next) {
  req.url = './index.html';
  next();
});
app.use(router);

app.use(express.static('./'));
const server = app.listen(3000)