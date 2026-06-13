from selenium import webdriver
from selenium.webdriver.common.by import By
import time

print("STARTING EDGE TEST")

options = webdriver.EdgeOptions()
options.add_argument("--start-maximized")

driver = webdriver.Edge(options=options)

print("EDGE BROWSER OPENED")

driver.get("http://localhost:5173/login")

time.sleep(3)

email = driver.find_element(By.XPATH, "//input[@type='email']")
email.send_keys("test@gmail.com")

password = driver.find_element(By.XPATH, "//input[@type='password']")
password.send_keys("123456")

login_btn = driver.find_element(By.XPATH, "//button[@type='submit']")
login_btn.click()

time.sleep(3)

# simple validation (IMPORTANT FOR QA)
try:
    driver.find_element(By.XPATH, "//*[contains(text(),'Home')]")
    print("LOGIN TEST PASSED ")
except:
    print("LOGIN TEST FAILED ")

input("Press ENTER to close...")
driver.quit()