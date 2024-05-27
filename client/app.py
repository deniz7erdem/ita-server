import socketio
import subprocess
import requests
import platform
import json

env = open('./env.json', 'r')
login_data = json.load(env)
env.close()

apiUrl = "http://localhost:3000"


response = requests.post(apiUrl+'/auth/loginClient', json=login_data)

def myOS():
    osName = platform.system() + ' ' + platform.release()
    print(f'OS: {osName}')
    osres = requests.post(apiUrl+'/client/update-os', json={'os': osName}, headers={'Authorization': f'Bearer {token}'})
    print(osres.json())

def myIP():
    ip = requests.get('https://api.ipify.org').text
    print(f'IP: {ip}')
    ipres = requests.post(apiUrl+'/client/update-ip', json={'ip': ip}, headers={'Authorization': f'Bearer {token}'})
    print(ipres.json())

def updateLastActiveAt():
    last = requests.post(apiUrl+'/client/update-last-active-at', headers={'Authorization': f'Bearer {token}'})
    print(last.json())

if response.status_code == 200:
    token = response.json()['access_token']
    print(f'Token: {token}')
    myOS()
    myIP()
    updateLastActiveAt()
else:
    print("Failed to authenticate")
    exit()


sio = socketio.Client()

@sio.event
def connect():
    print('Connection established')

@sio.event
def disconnect():
    print('Disconnected from server')
    updateLastActiveAt()

@sio.event
def runScript(script):
    print(f'Received script: {script}')
    updateLastActiveAt()
    try:
        result = subprocess.run(['python', '-c', script], capture_output=True, text=True)
        output = result.stdout
        error = result.stderr
        if output:
            print(f'Script Output: {output}')
        if error:
            print(f'Script Error: {error}')
    except Exception as e:
        print(f'Error running script: {e}')




sio.connect(apiUrl, headers={'Authorization': f'Bearer {token}'})
sio.wait()
