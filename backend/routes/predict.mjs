// File: /routes/predict.mjs
import express from 'express';
import { spawn } from 'child_process';

const router = express.Router();

// POST route to handle predictions
router.post('/', (req, res) => {
  const { animalType, steroidClass, steroidName, age, weight } = req.body;

  // Spawn a new Python process to run the prediction
  const python = spawn('python', [
    'models/predict.py', 
    animalType, 
    steroidClass, 
    steroidName, 
    age, 
    weight
  ]);

  let dataToSend = '';
  let errorData = '';

  // Collect data from the Python script
  python.stdout.on('data', (data) => {
    dataToSend += data.toString();
  });

  // Collect error output from the Python script
  python.stderr.on('data', (data) => {
    errorData += data.toString();
  });

  // Handle when the Python script ends
  python.on('close', (code) => {
    if (code !== 0) {
      console.error('Python script error:', errorData); // Log error details
      return res.status(500).json({ error: 'Python script failed', details: errorData });
    }

    // Send the prediction result back to the client
    res.status(200).json({ prediction: dataToSend });
  });

  // Handle Python script error
  python.on('error', (error) => {
    console.error('Failed to start Python process:', error); // Log error details
    return res.status(500).json({ error: 'Python process failed to start' });
  });
});

export default router;
