# Koinpr - A Todayq Product Assignment in MERN Stack

Welcome to Koinpr, a comprehensive project developed using the MERN stack. This project leverages modern web development technologies to create a robust, scalable, and responsive application. Below you will find detailed information on the technologies used, how to set up the development environment, and how to contribute to the project.

## Table of Contents

1. [Technologies Used](#technologies-used)
   - [Frontend](#frontend)
   - [Backend](#backend)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Configuration](#configuration)
3. [Usage](#usage)
4. [Contributing](#contributing)
5. [License](#license)
6. [Contact](#contact)

## Technologies Used

### Frontend
- **ReactJS**: A JavaScript library for building user interfaces.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **TanStack Query**: Powerful data synchronization for React.

### Backend
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **TypeScript**: Ensures robust and maintainable code with type safety.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **Cloudinary**: A cloud-based service for image and video management.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js** (>= 14.x): Install Node.js from [here](https://nodejs.org/).
- **npm or yarn**: npm is installed with Node.js. Yarn can be installed from [here](https://yarnpkg.com/).
- **MongoDB**: Install MongoDB from [here](https://www.mongodb.com/try/download/community).
- **Cloudinary Account**: Create an account at [Cloudinary](https://cloudinary.com/).

### Installation

1. **Clone the repository**
    ```sh
    git clone https://github.com/PavitarSharam/koinpr.git
    ```

2. **Navigate to the project directory**
    ```sh
    cd koinpr
    ```

3. **Install frontend dependencies**
    ```sh
    cd client
    npm install
    ```

4. **Install backend dependencies**
    ```sh
    cd ../server
    npm install
    ```

### Configuration

1. **Frontend Configuration**
    - Navigate to the `client` directory.
    - Create a `.env` file based on the `.env.example` file provided.
    - Add the required environment variables.

2. **Backend Configuration**
    - Navigate to the `server` directory.
    - Create a `.env` file based on the `.env.example` file provided.
    - Add the required environment variables including MongoDB connection string and Cloudinary API credentials.

## Usage

To start the development servers, use the following commands:

### Frontend
```sh
cd client
npm start

Navigate to http://localhost:3000 to view the application in the browser.

### Backend
```sh
cd server
npm start


### Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

### License
Distributed under the MIT License. See LICENSE for more information.

### Contact
Pavitar Sharam - pavitarsharma144@gmail.com

Project Link: https://github.com/PavitarSharam/koinpr




