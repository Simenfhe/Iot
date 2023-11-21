import paho.mqtt.client as mqtt
import logging

logging.basicConfig(level=logging.DEBUG)  # Set the logging level to DEBUG

def on_log(client, userdata, level, buf):
    print("log: ", buf)

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        client.subscribe("count/update")
        client.subscribe("history/set")
        client.subscribe("count/set")
    else:
        print(f"Failed to connect to MQTT broker with code {rc}")

def on_message(client, userdata, msg):
    print(f"Received message on topic {msg.topic}: {msg.payload}")

# Set your MQTT broker details
mqtt_host = 's848853f.ala.us-east-1.emqxsl.com'
mqtt_port = 8084
mqtt_user = 'iotboyz'
mqtt_passw = 'dPBNF2N4AbLnDLv'

client = mqtt.Client(client_id="moratilhåvardskulleværther", clean_session=True, transport='websockets')

# Set username and password
client.username_pw_set(username=mqtt_user, password=mqtt_passw)

# Set TLS
client.tls_set()

# Connect to the broker
client.connect(mqtt_host, mqtt_port, 60)

# Set callback functions
client.on_connect = on_connect
client.on_message = on_message
client.on_log = on_log  # Set the on_log callback

# Start the MQTT loop
client.loop_start()

# Keep the script running to receive messages
try:
    while True:
        pass
except KeyboardInterrupt:
    print("Disconnected from MQTT broker")
    client.disconnect()
    client.loop_stop()