# MongoDB-Database-Application

## Description

This is a Node.js application that uses MongoDB as its database. The application is built with Express.js and Mongoose for managing MongoDB interactions. It also uses Pug as the templating engine to render dynamic web pages.

## Features

- Connects to a MongoDB database using Mongoose
- RESTful routes for managing articles, users, and comments
- Renders dynamic views using Pug
- Environment variable management with dotenv

## Installation

To install and run this project locally, follow these steps:

1. **Clone the repository**:
   
    git clone https://github.com/madymona/MongoDB-Database-Application.git
    cd mongodb-database-application
    

2. **Install dependencies**:
   
    npm install
   

3. **Set up environment variables**:
    Create a `.env` file in the root directory and add your MongoDB connection string and desired port:
   
    ATLAS_URI=your-mongodb-connection-string
    PORT=3000
    

4. **Start the application**:
    Insert sample data into the database:
    node sample_data.js 

    Start the server using nodemon:
    npm start
    

## Usage

Once the application is running, you can access it at `http://localhost:3000`. The following routes are available:

- `/`: Displays a list of articles
- `/articles`: CRUD operations for articles
- `/users`: CRUD operations for users
- `/comments`: CRUD operations for comments




