import React, { useState } from 'react';
import './SteroidDosagePrediction.css'; // Import a CSS file for styling
import axios from 'axios'; // Make sure to install axios for API requests

function SteroidDosagePrediction() {
  const [animalType, setAnimalType] = useState('');
  const [steroidClass, setSteroidClass] = useState('');
  const [steroidName, setSteroidName] = useState('');
  const [averageAge, setAverageAge] = useState('');
  const [averageWeight, setAverageWeight] = useState('');
  const [predictionResult, setPredictionResult] = useState(null); // For storing the prediction result
  const [statusMessage, setStatusMessage] = useState(''); // For storing safety message

  const legalLimits = {
    "17β-Estradiol": 0.02,
    "Estriol": 0.035,
    "Estrone": 0.13,
    "Diethylstilbestrol": 0,
    "Progesterone": 9.81,
    "Melengestrol acetate": 0.11,
    "Megestrol acetate": 0.07,
    "Chlormadinone acetate": 0.3,
    "19-Nortestosterone": 0.21,
    "Metandienone": 0,
    "Boldenone": 0.28,
    "Epitestosterone": 0.51,
    "Testosterone": 0 // Update if a valid limit exists
  };
  
  const handlePredict = async () => {
    try {
      // Construct the payload in the correct JSON format
      const data = {
        animalType,
        steroidClass,
        steroidName,
        age: parseInt(averageAge),
        weight: parseInt(averageWeight),
      };
  
      // Make the API request
      const response = await axios.post('http://localhost:5000/api/predict', data);
  
      // Log the raw API response
      console.log('Raw API Response:', response.data);
  
      // Trim unwanted characters like \r\n or spaces, then convert to float
      const prediction = parseFloat(response.data.prediction.replace(/[\r\n]/g, '').trim());
  
      // Log the cleaned prediction
      console.log('Cleaned Prediction Value:', prediction);
  
      // Set the prediction result
      setPredictionResult(prediction);
  
      // Get the legal limit for the selected steroid
      const legalLimit = legalLimits[steroidName];
  
      if (legalLimit === undefined) {
        setStatusMessage('Error: Legal limit not found for the selected steroid.');
        return;
      }
  
      // Compare the predicted value with the legal limit
      if (prediction > legalLimit) {
        setStatusMessage('Unsafe: Dosage exceeds legal limit.');
      } else {
        setStatusMessage('Safe: Dosage is within legal limit.');
      }
    } catch (error) {
      console.error('Error predicting dosage:', error);
      setStatusMessage('Error in prediction. Please try again.');
    }
  };
   
  
  return (
    <div className="steroid-dosage-prediction">
      <h1>Predict Safe Steroid Dosage for Milk Products</h1>

      <div className="form-inputs">
        <select value={animalType} onChange={(e) => setAnimalType(e.target.value)}>
          <option value="">Select Animal</option>
          <option value="cow">Cow</option>
          <option value="buffalo">Buffalo</option>
          <option value="goat">Goat</option>
        </select>

        <select value={steroidClass} onChange={(e) => setSteroidClass(e.target.value)}>
          <option value="">Select Steroid Class</option>
          <option value="Estrogens">Estrogens</option>
          <option value="Progestogens">Progestogens</option>
          <option value="Androgens">Androgens</option>
        </select>


        <select value={steroidName} onChange={(e) => setSteroidName(e.target.value)}>
          <option value="">Select Steroid Name</option>
          <option value="17β-Estradiol">17β-Estradiol</option>
          <option value="Estriol">Estriol</option>
          <option value="Estrone">Estrone</option>
          <option value="Diethylstilbestrol">Diethylstilbestrol</option>
          <option value="Progesterone">Progesterone</option>
          <option value="Melengestrol acetate">Melengestrol acetate</option>
          <option value="Megestrol acetate">Megestrol acetate</option>
          <option value="Chlormadinone acetate">Chlormadinone acetate</option>
          <option value="19-Nortestosterone">19-Nortestosterone</option>
          <option value="Metandienone">Metandienone</option>
          <option value="Boldenone">Boldenone</option>
          <option value="Epitestosterone">Epitestosterone</option>
          <option value="Testosterone">Testosterone</option>
        </select>

        <input
          type="number"
          placeholder="Average Age (years)"
          value={averageAge}
          onChange={(e) => setAverageAge(e.target.value)}
        />

        <input
          type="number"
          placeholder="Average Weight (kg)"
          value={averageWeight}
          onChange={(e) => setAverageWeight(e.target.value)}
        />
      </div>

      <button className="predict-button" onClick={handlePredict}>
        Predict Safe Dosage
      </button>

      {predictionResult !== null && (
    <div className="prediction-result">
      <h3>Prediction Result</h3>
      <p>Predicted Limit: {predictionResult.toFixed(5)}</p>
      <div
        className={`status-message ${statusMessage.includes('Safe') ? 'safe' : 'unsafe'}`}
      >
        {statusMessage}
      </div>
    </div>
    )}
    </div>
  );
}

export default SteroidDosagePrediction;
