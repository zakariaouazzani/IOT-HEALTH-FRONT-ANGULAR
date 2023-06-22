from datetime import datetime
import requests
import random
import time

while True:
    random_number = random.randint(80, 200)
    current_datetime = datetime.now()
    formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]

    print(formatted_datetime)
    url = "http://localhost:8088/addHeartbeatClient"
    data = {
        "mac": "AC:41:5F:85:C8:60",  
        "data1": random_number,
        "data2": "",
        "data3": "",
        "data4": "",
        "date_prelevement": formatted_datetime  # Convert date to string
    }




    response = requests.post(url, json=data)
    print(response.status_code)
    print(response.json())

    random_number = random.randint(30, 34)
    current_datetime = datetime.now()
    formatted_datetime = current_datetime.strftime("%Y-%m-%d %H:%M:%S.%f")[:-3]

    print(formatted_datetime)
    url = "http://localhost:8088/addTemperatureClient"
    data = {
        "mac": "AC:41:5F:85:C8:60",  
        "data1": random_number,
        "date_prelevement": formatted_datetime  # Convert date to string
    }




    response = requests.post(url, json=data)
    print(response.status_code)
    print(response.json())


    # Delay for 5 seconds
    time.sleep(1)
