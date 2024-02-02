const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let dataPoints = [
  { id: 1, x: 10, y: 20, label: 'Point 1' },
  { id: 2, x: 30, y: 40, label: 'Point 2' },
];

app.get('/data', (req, res) => {
  res.json(dataPoints);
});

app.post('/data', (req, res) => {
  const newDataPoint = req.body;
  newDataPoint.id = dataPoints.length + 1;
  dataPoints.push(newDataPoint);
  res.json(newDataPoint);
});

app.put('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedDataPoint = req.body;
  dataPoints = dataPoints.map((point) =>
    point.id === id ? updatedDataPoint : point
  );
  res.json(updatedDataPoint);
});

app.delete('/data/:id', (req, res) => {
  const id = parseInt(req.params.id);
  dataPoints = dataPoints.filter((point) => point.id !== id);
  res.json({ message: 'Data point deleted successfully.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
