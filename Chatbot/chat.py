from dotenv import load_dotenv
import streamlit as st
import os
import google.generativeai as genai

load_dotenv()  # Take environment variables from .env.
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to load the Gemini model and get responses
model = genai.GenerativeModel('gemini-pro')
chat = model.start_chat(history=[])

def get_gemini_response(question):
    response = chat.send_message(question, stream=True)
    return response

# Initialize the Streamlit app
st.set_page_config(page_title="Connect Care AI", layout="wide")
st.title("Connect Care AI")
st.markdown("### Engage with our chatbot:")

# Initialize session state for chat history if it doesn't exist
if 'chat_history' not in st.session_state:
    st.session_state['chat_history'] = []

input_text = st.text_input("Input your question:", key="input", placeholder="Type your question here...")
submit = st.button("Ask the Question", key="submit")

if submit and input_text:
    response = get_gemini_response(input_text)
    st.session_state['chat_history'].append(("You", input_text))
    st.subheader("The Response is:")
    for chunk in response:
        st.write(chunk.text)
        st.session_state['chat_history'].append(("Bot", chunk.text))

st.markdown("---")
st.subheader("Chat History:")
for role, text in st.session_state['chat_history']:
    st.write(f"**{role}:** {text}")
