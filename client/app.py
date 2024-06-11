import socketio
import subprocess
import requests
import platform
import json
import os

env = open('./env.json', 'r')
login_data = json.load(env)
env.close()

apiUrl = "http://localhost:3000"


response = requests.post(apiUrl+'/auth/loginClient', json=login_data)

# defined jobs
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
# end of defined jobs

# log function
# levels: success, info, warning, danger

def log(message,level):
    logres = requests.post(apiUrl+'/log', json={'message': message,'level': level}, headers={'Authorization': f'Bearer {token}'})
    print(logres.json())

# end of log function


# authenticate
if response.status_code == 200:
    token = response.json()['access_token']
    print(f'Token: {token}')
    myOS()
    myIP()
    updateLastActiveAt()
    log('Authenticated', 'success')
else:
    print("Failed to authenticate")
    exit()
# end of authenticate

sio = socketio.Client()

@sio.event
def connect():
    print('Connection established')
    log('Connected to webSocket', 'success')

@sio.event
def disconnect():
    print('Disconnected from server')
    log('Disconnected from webSocket', 'danger')
    updateLastActiveAt()

@sio.event
def runDefinedJob(data):
    log('Received defined job', 'info')
    print(f'Received defined job: {data}')
    updateLastActiveAt()
    if data == 'reboot':
        os.system("shutdown /r /t 1")
        log('Rebooting', 'success')
    elif data == 'poweroff':
        os.system("shutdown /s /t 1")
        log('Powering off', 'success')
    else:
        print('Unknown job')
        log(f'Unknown job: {data}', 'danger')

@sio.event
def runScript(script):
    log('Received script', 'info')
    print(f'Received script: {script}')
    updateLastActiveAt()
    try:
        result = subprocess.run(['python', '-c', script], capture_output=True, text=True)
        output = result.stdout
        error = result.stderr
        if output:
            log(f'Script Output: {output}', 'success')
            print(f'Script Output: {output}')
            sio.emit('scriptResult', {'client':login_data,'output':output})
        if error:
            log(f'Script Error: {error}', 'danger')
            print(f'Script Error: {error}')
            sio.emit('scriptResult', {'client':login_data,'output':output})
    except Exception as e:
        log(f'Error running script: {e}', 'danger')
        print(f'Error running script: {e}')
        sio.emit('scriptResult', {'client':login_data,'output':output})




sio.connect(apiUrl, headers={'Authorization': f'Bearer {token}'})
sio.wait()
