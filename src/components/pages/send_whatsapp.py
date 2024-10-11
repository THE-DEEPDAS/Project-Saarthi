# File: src/components/pages/send_whatsapp.py

from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time

app = Flask(__name__)

# Path to your webdriver
driver_path = 'path_to_your_chromedriver'

@app.route('/send-whatsapp', methods=['POST'])
def send_whatsapp():
    data = request.get_json()

    name = data['name']
    mobile = data['mobile']
    email = data['email']
    institute = data['institute']
    className = data['className']
    message = data['message']

    # Construct message to send via WhatsApp
    whatsapp_message = f"Name: {name}\nMobile: {mobile}\nEmail: {email}\nInstitute: {institute}\nClass: {className}\nMessage: {message}"

    try:
        # Open WhatsApp Web
        driver = webdriver.Chrome(executable_path=driver_path)
        driver.get("https://web.whatsapp.com/")
        
        # Wait for QR scan
        print("Please scan the QR code on WhatsApp Web")
        time.sleep(15)

        # Search for the contact
        search_box = driver.find_element("xpath", "//div[@title='Search input textbox']")
        search_box.click()
        search_box.send_keys(mobile)
        search_box.send_keys(Keys.ENTER)

        time.sleep(2)

        # Send the message
        message_box = driver.find_element("xpath", "//div[@title='Type a message']")
        message_box.send_keys(whatsapp_message)
        message_box.send_keys(Keys.ENTER)

        time.sleep(2)
        driver.quit()
        return jsonify({"status": "success"}), 200

    except Exception as e:
        print("Error:", e)  # Print the error to the console
        return jsonify({"status": "error", "message": str(e)}), 500  # Return the error message

if __name__ == '__main__':
    app.run(debug=True)
