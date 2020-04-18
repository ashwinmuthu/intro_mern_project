const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const eventsApi = require('./apis/events-api');
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://127.0.0.1:27017/events', { useNewUrlParser: true,  useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("MongoDB database connection established successfully");
});

//require('./apis/events-api')(app);
app.use('/events', eventsApi);

app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});
