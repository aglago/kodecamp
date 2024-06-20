import express from 'express';
import { v4 as uuid } from 'uuid';

const app = express();

let tasks = [];

app.use(express.json());

app.get('/', (req, res) => {
  res.end('this is the home route');
});

app.get('/tasks', (req, res) => {
  res.end(tasks);
});

app.post('/tasks', (req, res) => {
  const id = uuid();

  tasks.push({
    id,
    title: req.body.title,
    body: req.body.body,
    status: req.body.status
  });
});
