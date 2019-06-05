require('dotenv-safe').load();
const cors = require('cors');

const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

require('./app/controllers/index')(app);

app.listen(3007);