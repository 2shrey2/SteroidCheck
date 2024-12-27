import pickle
import sys
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

# Load the trained pipeline (ensure it includes the preprocessor and model)
with open('models/milk.pkl', 'rb') as f:
    pipeline = pickle.load(f)

# Read input arguments from Node.js
animal_type = sys.argv[1]
steroid_class = sys.argv[2]
steroid_name = sys.argv[3]
age = float(sys.argv[4])
weight = float(sys.argv[5])

# Create a DataFrame with input values
input_data = pd.DataFrame({
    'Animal Type': [animal_type],
    'Steroid Class': [steroid_class],
    'Steroid Name': [steroid_name],
    'Age': [age],
    'Weight': [weight]
})

# Ensure input_data is passed as a DataFrame for compatibility with the pipeline
if not isinstance(input_data, pd.DataFrame):
    raise ValueError("Input data must be a Pandas DataFrame")

# Predict legal limit using the loaded pipeline
predicted_limit = pipeline.predict(input_data)

# Output the prediction result
print(predicted_limit[0])
