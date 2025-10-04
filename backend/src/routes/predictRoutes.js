import express from 'express';
import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get directory name for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// POST route to handle predictions
router.post('/', (req, res) => {
    const { animalType, steroidClass, steroidName, age, weight } = req.body;

    // Validate input data
    if (!animalType || !steroidClass || !steroidName || !age || !weight) {
        return res.status(400).json({ 
            error: 'Missing required fields',
            message: 'All fields (animalType, steroidClass, steroidName, age, weight) are required'
        });
    }

    // Validate data types
    if (typeof age !== 'number' || typeof weight !== 'number') {
        return res.status(400).json({ 
            error: 'Invalid data types',
            message: 'Age and weight must be numbers'
        });
    }

    if (age <= 0 || weight <= 0) {
        return res.status(400).json({ 
            error: 'Invalid values',
            message: 'Age and weight must be positive numbers'
        });
    }

    // Path to the Python prediction script
    const pythonScriptPath = path.join(__dirname, '../models/predict.py');

    // Spawn a new Python process to run the prediction
    const python = spawn('python', [
        pythonScriptPath,
        animalType,
        steroidClass,
        steroidName,
        age.toString(),
        weight.toString()
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
            console.error('Python script error:', errorData);
            return res.status(500).json({ 
                error: 'Prediction failed',
                message: 'Failed to process prediction',
                details: errorData
            });
        }

        try {
            // Parse the prediction result
            const prediction = parseFloat(dataToSend.trim());
            
            if (isNaN(prediction)) {
                return res.status(500).json({ 
                    error: 'Invalid prediction result',
                    message: 'Prediction returned invalid data'
                });
            }

            // Send the prediction result back to the client
            res.status(200).json({ 
                success: true,
                prediction: prediction,
                input: {
                    animalType,
                    steroidClass,
                    steroidName,
                    age,
                    weight
                }
            });

        } catch (parseError) {
            console.error('Error parsing prediction result:', parseError);
            res.status(500).json({ 
                error: 'Failed to parse prediction result',
                message: 'Invalid response from prediction model'
            });
        }
    });

    // Handle Python script error
    python.on('error', (error) => {
        console.error('Failed to start Python process:', error);
        res.status(500).json({ 
            error: 'Python process failed',
            message: 'Failed to start prediction process'
        });
    });

    // Set timeout for the Python process
    setTimeout(() => {
        if (!python.killed) {
            python.kill();
            res.status(408).json({ 
                error: 'Request timeout',
                message: 'Prediction process took too long'
            });
        }
    }, 30000); // 30 seconds timeout
});

export default router;
