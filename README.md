

# Full Stack Car App - Backend

This is the backend part of the Full Stack Car App project. It is built with Node.js, Express.js, and Sequelize as the ORM for interacting with the PostgreSQL database. The backend handles API requests, database operations, authentication, and serves as the server for the frontend client.

## Getting Started

To get started with the backend of the Full Stack Car App, follow these steps:

### Prerequisites

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository from GitHub.

\`\`\`bash
git clone https://github.com/your-username/fullstactcarapp.git
\`\`\`

2. Navigate to the backend directory.

\`\`\`bash
cd fullstactcarapp/backend
\`\`\`

3. Install the required dependencies.

\`\`\`bash
npm install
\`\`\`

4. Set up the database

   - Create a PostgreSQL database for the project.
   - Update the database configuration in the \`config/config.json\` file to match your database settings.

5. Run the database migrations to create the required tables.

\`\`\`bash
npx sequelize-cli db:migrate
\`\`\`

6. (Optional) If you want to seed the database with some initial data, you can run the database seeders.

\`\`\`bash
npx sequelize-cli db:seed:all
\`\`\`

### Configuration

Before starting the server, you need to configure some environment variables. Create a \`.env\` file in the backend directory and add the following configurations:

\`\`\`dotenv
PORT=3001
DATABASE_URL=postgres://username:password@localhost:5432/dbname
ACCESS_TOKEN_SECRET=mysecretaccesstokensecret
REFRESH_TOKEN_SECRET=mysecretrefreshtokensecret
\`\`\`

Replace \`username\`, \`password\`, \`dbname\`, \`mysecretaccesstokensecret\`, and \`mysecretrefreshtokensecret\` with your own values.

### Running the Server

After completing the installation and configuration, you can start the server by running the following command:

\`\`\`bash
npm start
\`\`\`

The server will start running at the specified port (default is 3001). You should see a message indicating that the server is listening on the specified port.

## API Endpoints

The backend provides the following API endpoints:

- POST \`/users/register\`: Register a new user. Requires \`name\`, \`email\`, \`phone\`, \`password\`, and \`confPassword\` in the request body.

- POST \`/users/login\`: Authenticate and log in a user. Requires \`email\` and \`password\` in the request body.

- DELETE \`/logout\`: Log out the currently authenticated user.

- GET \`/cars\`: Get a list of all cars.

- GET \`/cars/:id\`: Get a specific car by its ID.

- POST \`/cars\`: Add a new car. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- PUT \`/cars/:id\`: Update an existing car by its ID. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- DELETE \`/cars/:id\`: Delete a car by its ID. Requires authentication.

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication. When a user registers or logs in, they receive an access token and a refresh token. The access token is used for authorizing API requests, while the refresh token is used to obtain a new access token when the current one expires.

The access token has a short expiration time (e.g., 15 minutes) for security purposes, while the refresh token has a longer expiration time (e.g., 1 day). When the access token expires, the user can use the refresh token to obtain a new access token without having to log in again.

## Error Handling

The backend handles errors and sends appropriate responses with status codes. In case of errors during API requests, you will receive a JSON response with an error message and a corresponding status code.

## Conclusion

The backend of the Full Stack Car App provides a robust API for managing cars and user authentication. It is designed to work seamlessly with the frontend client to create a fully functional and responsive web application for car management. If you encounter any issues or have suggestions for improvement, feel free to contribute or reach out to the project maintainers.





# Full Stack Car App - Backend

This is the backend part of the Full Stack Car App project. It is built with Node.js, Express.js, and Sequelize as the ORM for interacting with the PostgreSQL database. The backend handles API requests, database operations, authentication, and serves as the server for the frontend client.

## Getting Started

To get started with the backend of the Full Stack Car App, follow these steps:

### Prerequisites

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository from GitHub.

\`\`\`bash
git clone https://github.com/your-username/fullstactcarapp.git
\`\`\`

2. Navigate to the backend directory.

\`\`\`bash
cd fullstactcarapp/backend
\`\`\`

3. Install the required dependencies.

\`\`\`bash
npm install
\`\`\`

4. Set up the database

   - Create a PostgreSQL database for the project.
   - Update the database configuration in the \`config/config.json\` file to match your database settings.

5. Run the database migrations to create the required tables.

\`\`\`bash
npx sequelize-cli db:migrate
\`\`\`

6. (Optional) If you want to seed the database with some initial data, you can run the database seeders.

\`\`\`bash
npx sequelize-cli db:seed:all
\`\`\`

### Configuration

Before starting the server, you need to configure some environment variables. Create a \`.env\` file in the backend directory and add the following configurations:

\`\`\`dotenv
PORT=3001
DATABASE_URL=postgres://username:password@localhost:5432/dbname
ACCESS_TOKEN_SECRET=mysecretaccesstokensecret
REFRESH_TOKEN_SECRET=mysecretrefreshtokensecret
\`\`\`

Replace \`username\`, \`password\`, \`dbname\`, \`mysecretaccesstokensecret\`, and \`mysecretrefreshtokensecret\` with your own values.

### Running the Server

After completing the installation and configuration, you can start the server by running the following command:

\`\`\`bash
npm start
\`\`\`

The server will start running at the specified port (default is 3001). You should see a message indicating that the server is listening on the specified port.

## API Endpoints

The backend provides the following API endpoints:

- POST \`/users/register\`: Register a new user. Requires \`name\`, \`email\`, \`phone\`, \`password\`, and \`confPassword\` in the request body.

- POST \`/users/login\`: Authenticate and log in a user. Requires \`email\` and \`password\` in the request body.

- DELETE \`/logout\`: Log out the currently authenticated user.

- GET \`/cars\`: Get a list of all cars.

- GET \`/cars/:id\`: Get a specific car by its ID.

- POST \`/cars\`: Add a new car. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- PUT \`/cars/:id\`: Update an existing car by its ID. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- DELETE \`/cars/:id\`: Delete a car by its ID. Requires authentication.

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication. When a user registers or logs in, they receive an access token and a refresh token. The access token is used for authorizing API requests, while the refresh token is used to obtain a new access token when the current one expires.

The access token has a short expiration time (e.g., 15 minutes) for security purposes, while the refresh token has a longer expiration time (e.g., 1 day). When the access token expires, the user can use the refresh token to obtain a new access token without having to log in again.

## Error Handling

The backend handles errors and sends appropriate responses with status codes. In case of errors during API requests, you will receive a JSON response with an error message and a corresponding status code.

## Conclusion

The backend of the Full Stack Car App provides a robust API for managing cars and user authentication. It is designed to work seamlessly with the frontend client to create a fully functional and responsive web application for car management. If you encounter any issues or have suggestions for improvement, feel free to contribute or reach out to the project maintainers.





# Full Stack Car App - Backend

This is the backend part of the Full Stack Car App project. It is built with Node.js, Express.js, and Sequelize as the ORM for interacting with the PostgreSQL database. The backend handles API requests, database operations, authentication, and serves as the server for the frontend client.

## Getting Started

To get started with the backend of the Full Stack Car App, follow these steps:

### Prerequisites

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository from GitHub.

\`\`\`bash
git clone https://github.com/your-username/fullstactcarapp.git
\`\`\`

2. Navigate to the backend directory.

\`\`\`bash
cd fullstactcarapp/backend
\`\`\`

3. Install the required dependencies.

\`\`\`bash
npm install
\`\`\`

4. Set up the database

   - Create a PostgreSQL database for the project.
   - Update the database configuration in the \`config/config.json\` file to match your database settings.

5. Run the database migrations to create the required tables.

\`\`\`bash
npx sequelize-cli db:migrate
\`\`\`

6. (Optional) If you want to seed the database with some initial data, you can run the database seeders.

\`\`\`bash
npx sequelize-cli db:seed:all
\`\`\`

### Configuration

Before starting the server, you need to configure some environment variables. Create a \`.env\` file in the backend directory and add the following configurations:

\`\`\`dotenv
PORT=3001
DATABASE_URL=postgres://username:password@localhost:5432/dbname
ACCESS_TOKEN_SECRET=mysecretaccesstokensecret
REFRESH_TOKEN_SECRET=mysecretrefreshtokensecret
\`\`\`

Replace \`username\`, \`password\`, \`dbname\`, \`mysecretaccesstokensecret\`, and \`mysecretrefreshtokensecret\` with your own values.

### Running the Server

After completing the installation and configuration, you can start the server by running the following command:

\`\`\`bash
npm start
\`\`\`

The server will start running at the specified port (default is 3001). You should see a message indicating that the server is listening on the specified port.

## API Endpoints

The backend provides the following API endpoints:

- POST \`/users/register\`: Register a new user. Requires \`name\`, \`email\`, \`phone\`, \`password\`, and \`confPassword\` in the request body.

- POST \`/users/login\`: Authenticate and log in a user. Requires \`email\` and \`password\` in the request body.

- DELETE \`/logout\`: Log out the currently authenticated user.

- GET \`/cars\`: Get a list of all cars.

- GET \`/cars/:id\`: Get a specific car by its ID.

- POST \`/cars\`: Add a new car. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- PUT \`/cars/:id\`: Update an existing car by its ID. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- DELETE \`/cars/:id\`: Delete a car by its ID. Requires authentication.

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication. When a user registers or logs in, they receive an access token and a refresh token. The access token is used for authorizing API requests, while the refresh token is used to obtain a new access token when the current one expires.

The access token has a short expiration time (e.g., 15 minutes) for security purposes, while the refresh token has a longer expiration time (e.g., 1 day). When the access token expires, the user can use the refresh token to obtain a new access token without having to log in again.

## Error Handling

The backend handles errors and sends appropriate responses with status codes. In case of errors during API requests, you will receive a JSON response with an error message and a corresponding status code.

## Conclusion

The backend of the Full Stack Car App provides a robust API for managing cars and user authentication. It is designed to work seamlessly with the frontend client to create a fully functional and responsive web application for car management. If you encounter any issues or have suggestions for improvement, feel free to contribute or reach out to the project maintainers.





# Full Stack Car App - Backend

This is the backend part of the Full Stack Car App project. It is built with Node.js, Express.js, and Sequelize as the ORM for interacting with the PostgreSQL database. The backend handles API requests, database operations, authentication, and serves as the server for the frontend client.

## Getting Started

To get started with the backend of the Full Stack Car App, follow these steps:

### Prerequisites

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository from GitHub.

\`\`\`bash
git clone https://github.com/your-username/fullstactcarapp.git
\`\`\`

2. Navigate to the backend directory.

\`\`\`bash
cd fullstactcarapp/backend
\`\`\`

3. Install the required dependencies.

\`\`\`bash
npm install
\`\`\`

4. Set up the database

   - Create a PostgreSQL database for the project.
   - Update the database configuration in the \`config/config.json\` file to match your database settings.

5. Run the database migrations to create the required tables.

\`\`\`bash
npx sequelize-cli db:migrate
\`\`\`

6. (Optional) If you want to seed the database with some initial data, you can run the database seeders.

\`\`\`bash
npx sequelize-cli db:seed:all
\`\`\`

### Configuration

Before starting the server, you need to configure some environment variables. Create a \`.env\` file in the backend directory and add the following configurations:

\`\`\`dotenv
PORT=3001
DATABASE_URL=postgres://username:password@localhost:5432/dbname
ACCESS_TOKEN_SECRET=mysecretaccesstokensecret
REFRESH_TOKEN_SECRET=mysecretrefreshtokensecret
\`\`\`

Replace \`username\`, \`password\`, \`dbname\`, \`mysecretaccesstokensecret\`, and \`mysecretrefreshtokensecret\` with your own values.

### Running the Server

After completing the installation and configuration, you can start the server by running the following command:

\`\`\`bash
npm start
\`\`\`

The server will start running at the specified port (default is 3001). You should see a message indicating that the server is listening on the specified port.

## API Endpoints

The backend provides the following API endpoints:

- POST \`/users/register\`: Register a new user. Requires \`name\`, \`email\`, \`phone\`, \`password\`, and \`confPassword\` in the request body.

- POST \`/users/login\`: Authenticate and log in a user. Requires \`email\` and \`password\` in the request body.

- DELETE \`/logout\`: Log out the currently authenticated user.

- GET \`/cars\`: Get a list of all cars.

- GET \`/cars/:id\`: Get a specific car by its ID.

- POST \`/cars\`: Add a new car. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- PUT \`/cars/:id\`: Update an existing car by its ID. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- DELETE \`/cars/:id\`: Delete a car by its ID. Requires authentication.

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication. When a user registers or logs in, they receive an access token and a refresh token. The access token is used for authorizing API requests, while the refresh token is used to obtain a new access token when the current one expires.

The access token has a short expiration time (e.g., 15 minutes) for security purposes, while the refresh token has a longer expiration time (e.g., 1 day). When the access token expires, the user can use the refresh token to obtain a new access token without having to log in again.

## Error Handling

The backend handles errors and sends appropriate responses with status codes. In case of errors during API requests, you will receive a JSON response with an error message and a corresponding status code.

## Conclusion

The backend of the Full Stack Car App provides a robust API for managing cars and user authentication. It is designed to work seamlessly with the frontend client to create a fully functional and responsive web application for car management. If you encounter any issues or have suggestions for improvement, feel free to contribute or reach out to the project maintainers.





# Full Stack Car App - Backend

This is the backend part of the Full Stack Car App project. It is built with Node.js, Express.js, and Sequelize as the ORM for interacting with the PostgreSQL database. The backend handles API requests, database operations, authentication, and serves as the server for the frontend client.

## Getting Started

To get started with the backend of the Full Stack Car App, follow these steps:

### Prerequisites

1. Make sure you have Node.js and npm (Node Package Manager) installed on your system.

### Installation

1. Clone the repository from GitHub.

\`\`\`bash
git clone https://github.com/your-username/fullstactcarapp.git
\`\`\`

2. Navigate to the backend directory.

\`\`\`bash
cd fullstactcarapp/backend
\`\`\`

3. Install the required dependencies.

\`\`\`bash
npm install
\`\`\`

4. Set up the database

   - Create a PostgreSQL database for the project.
   - Update the database configuration in the \`config/config.json\` file to match your database settings.

5. Run the database migrations to create the required tables.

\`\`\`bash
npx sequelize-cli db:migrate
\`\`\`

6. (Optional) If you want to seed the database with some initial data, you can run the database seeders.

\`\`\`bash
npx sequelize-cli db:seed:all
\`\`\`

### Configuration

Before starting the server, you need to configure some environment variables. Create a \`.env\` file in the backend directory and add the following configurations:

\`\`\`dotenv
PORT=3001
DATABASE_URL=postgres://username:password@localhost:5432/dbname
ACCESS_TOKEN_SECRET=mysecretaccesstokensecret
REFRESH_TOKEN_SECRET=mysecretrefreshtokensecret
\`\`\`

Replace \`username\`, \`password\`, \`dbname\`, \`mysecretaccesstokensecret\`, and \`mysecretrefreshtokensecret\` with your own values.

### Running the Server

After completing the installation and configuration, you can start the server by running the following command:

\`\`\`bash
npm start
\`\`\`

The server will start running at the specified port (default is 3001). You should see a message indicating that the server is listening on the specified port.

## API Endpoints

The backend provides the following API endpoints:

- POST \`/users/register\`: Register a new user. Requires \`name\`, \`email\`, \`phone\`, \`password\`, and \`confPassword\` in the request body.

- POST \`/users/login\`: Authenticate and log in a user. Requires \`email\` and \`password\` in the request body.

- DELETE \`/logout\`: Log out the currently authenticated user.

- GET \`/cars\`: Get a list of all cars.

- GET \`/cars/:id\`: Get a specific car by its ID.

- POST \`/cars\`: Add a new car. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- PUT \`/cars/:id\`: Update an existing car by its ID. Requires authentication and \`car_name\`, \`description\`, \`mileage\`, \`price\`, \`address\`, \`promotion_end_date\`, and \`car_picture\` in the request body.

- DELETE \`/cars/:id\`: Delete a car by its ID. Requires authentication.

## Authentication

The backend uses JWT (JSON Web Tokens) for authentication. When a user registers or logs in, they receive an access token and a refresh token. The access token is used for authorizing API requests, while the refresh token is used to obtain a new access token when the current one expires.

The access token has a short expiration time (e.g., 15 minutes) for security purposes, while the refresh token has a longer expiration time (e.g., 1 day). When the access token expires, the user can use the refresh token to obtain a new access token without having to log in again.

## Error Handling

The backend handles errors and sends appropriate responses with status codes. In case of errors during API requests, you will receive a JSON response with an error message and a corresponding status code.

## Conclusion

The backend of the Full Stack Car App provides a robust API for managing cars and user authentication. It is designed to work seamlessly with the frontend client to create a fully functional and responsive web application for car management. If you encounter any issues or have suggestions for improvement, feel free to contribute or reach out to the project maintainers.



