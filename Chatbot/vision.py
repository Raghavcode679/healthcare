from dotenv import load_dotenv
import streamlit as st
import os
from PIL import Image
import google.generativeai as genai

load_dotenv()  # Load environment variables
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to load the Gemini model and get responses
def get_gemini_response(input_prompt, image):
    model = genai.GenerativeModel('gemini-pro-vision')
    if input_prompt:
        response = model.generate_content([input_prompt, image])
    else:
        response = model.generate_content(image)
    return response.text

# Initialize the Streamlit app
st.set_page_config(page_title="Connect Care AI", layout="wide")
st.title("Connect Care AI")
st.markdown("### Analyze images and get insights:")

input_text = st.text_input("Input Prompt:", key="input", placeholder="Describe what you want to know about the image...")
uploaded_file = st.file_uploader("Upload an image:", type=["jpg", "jpeg", "png"])

image = None   
if uploaded_file is not None:
    image = Image.open(uploaded_file)
    st.image(image, caption="Uploaded Image.", use_column_width=True)

submit = st.button("Tell me about the image")

# If ask button is clicked
if submit and image:
    response = get_gemini_response(input_text, image)
    st.subheader("The Response is:")
    st.write(response)
