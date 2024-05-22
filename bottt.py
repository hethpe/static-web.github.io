
import requests;
from bs4 import BeautifulSoup
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

# Function to scrape the website and check for appointment slots
def check_appointment_availability():
    url = 'https://www.usvisascheduling.com/'  # Replace with the URL of the US portal
    headers = {'User-Agent': 'Mozilla/5.0'}  # User-Agent header to avoid being blocked

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'html.parser')
        # Check for the presence of appointment slots by inspecting the HTML
        appointment_available = soup.find('div', class_='appointment-available')
        if appointment_available:
            send_notification("Appointment slots available!", "Book your appointment now.")
        else:
            print("No appointment slots available.")
    else:
        print("Failed to fetch the webpage.")

# Function to send email notification
def send_notification(subject, body):
    # Email configuration
    sender_email = 'het8169@gmail.com'  # Replace with your sender email
    receiver_email = 'hp747005@gmail.com'  # Replace with your receiver email
    password = 'het@123'  # Replace with your email password

    # Create message container
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = receiver_email
    message['Subject'] = subject

    # Attach body to email
    message.attach(MIMEText(body, 'plain'))

    # Connect to Gmail's SMTP server
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(sender_email, password)

    # Send email
    text = message.as_string()
    server.sendmail(sender_email, receiver_email, text)
    print("Notification email sent.")

    # Close the connection
    server.quit()

# Main function to run the system
def main():
    check_appointment_availability()

if __name__ == "__main__":
    main()