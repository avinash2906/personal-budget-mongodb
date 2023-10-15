const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const mongoose = require('mongoose');

const titleModel = require('./models/title-schema');

const mongoDBUrl = 'mongodb://127.0.0.1:27017/pb-data';

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch((connectionError) => {
    console.log(connectionError);
  });

app.use('/', express.static('public'));

app.get('/data', async (req, res) => {
  try {
    const documents = await titleModel.find({});
    res.json(documents);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Error retrieving data');
  }
});

app.post("/addNewBudget", (req, res) => {
  const newData = new titleModel(req.body);
  newData.save()
    .then((data) => {
      res.send("Data Entered Successfully");
    })
    .catch((connectionError) => {
      res.send(connectionError.message);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
