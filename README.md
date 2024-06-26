
# Device Management and Early Issue Detection System

This project aims to improve and enhance IT department services for businesses. It allows employees to remotely detect and solve issues on their computers through software developed as part of this project. The application can execute Python scripts remotely. The devices being managed are the computers provided to employees.

## Technologies Used

- **Web Interface for IT Department Authorities:** Angular
- **Server Application Managing the Entire System:** NestJS
- **Python Application Installed on Employees' Computers**
- **Communication Protocols:** HTTP and WebSocket
- **Security:** RBAC (Role-Based Access Control)

## Features

- Remote issue detection and resolution
- Real-time communication between the web interface and client devices
- Secure authentication and authorization
- User-friendly interface for IT staff

## System Architecture

1. **Authentication Module:** Authorizes both users and Python client modules.
2. **User Module:** Handles CRUD operations for users logging in through the Angular interface.
3. **Client Module:** Manages CRUD operations and other HTTP requests from Python clients.
4. **Socket Gateway:** Facilitates communication between Angular and Python sides using socket.io.

## Installation

### Prerequisites

- Node.js
- Angular CLI
- NestJS CLI
- Python 3.x

### Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/device-management-system.git
   cd device-management-system
2. **Install server dependencies:**
	```bash
	cd server
	npm install
3. **Install client dependencies:**
	```bash
	cd ../client
	npm install

## Usage
### Starting the Server
1. Navigate to the server directory:
	```bash
	cd server
2. Start the NestJS server:
	```bash
	npm run start
### Starting the Web Interface
1. Navigate to the server directory:
	```bash
	cd ../client
2. Start the NestJS server:
	```bash
	ng serve
### Running the Python Application:
1. Navigate to the python-client directory:
	```bash
	cd ../client
2. Run the Python application:
	```bash
	python app.py
## Contributing
Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature-branch`).
3.  Make your changes.
4.  Commit your changes (`git commit -am 'Add new feature'`).
5.  Push to the branch (`git push origin feature-branch`).
6.  Create a new Pull Request.

## Authors
- [@deniz7erdem](https://www.github.com/deniz7erdem)
