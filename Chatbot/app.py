from dotenv import load_dotenv
import streamlit as st
import os
import textwrap
import google.generativeai as genai

load_dotenv()  # Take environment variables from .env.
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to load the Gemini model and get responses
def get_gemini_response(question):
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(question)
    return response.text

# Initialize the Streamlit app
st.set_page_config(page_title="Connect Care AI", layout="wide")
st.title("Connect Care AI")
st.markdown("### Ask your questions related to health care below:")

input_text = st.text_input("Input your question:", key="input", placeholder="Type your question here...")
submit = st.button("Ask the Question", key="submit")

# If ask button is clicked
if submit and input_text:
    response = get_gemini_response(input_text)
    st.subheader("The Response is:")
    st.write(response)

    st.markdown("---")

from flask import Flask, render_template

# Create the Flask app
app = Flask(__name__)

# Define a route for the index page
@app.route('/')
def home():
    return render_template('index.html')  # This will look for 'index.html' in the 'templates' folder

if __name__ == '__main__':
    # Run the app on a fixed port, e.g., 8080
    app.run(debug=True, host='192.168.1.15', port=8501)
