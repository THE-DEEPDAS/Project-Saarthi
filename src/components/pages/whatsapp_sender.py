from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import sys

def send_whatsapp_message(contact, message):
    driver = webdriver.Chrome(executable_path='path/to/chromedriver')  # Update this path
    driver.get('https://web.whatsapp.com/')
    
    input("Press Enter after scanning the QR code.")

    # Search for the contact
    search_box = driver.find_element_by_xpath('//div[@contenteditable="true"][@data-tab="3"]')
    search_box.send_keys(contact)
    time.sleep(2)  # Wait for contact to appear
    search_box.send_keys(Keys.ENTER)

    # Type the message
    message_box = driver.find_element_by_xpath('//div[@contenteditable="true"][@data-tab="6"]')
    message_box.send_keys(message)
    message_box.send_keys(Keys.ENTER)

    time.sleep(2)  # Wait a bit before closing
    driver.quit()

if __name__ == "__main__":
    contact_name = sys.argv[1]  # Get contact name from command line argument
    message = sys.argv[2]         # Get message from command line argument
    send_whatsapp_message(contact_name, message)
