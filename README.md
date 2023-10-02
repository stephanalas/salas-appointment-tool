# Salas Appointment Tool

The Salas Appointment Tool is a user-friendly application designed to streamline appointment management for clients and prospects. It empowers users to effortlessly oversee client profiles and associated tasks. With this tool, users can create, update, and cancel appointments at their convenience. Furthermore, the application offers the added convenience of a CSV import feature, allowing users to seamlessly import client profiles. It is also equipped to automatically send email notifications to client profiles when appointments are created, rescheduled, or canceled, and maintains comprehensive transmission logs for all email notifications.

![dashboard](https://github.com/stephanalas/salas-appointment-tool/assets/72700716/d464a8a9-2a65-4fc9-8e51-132a550f0541)
![image](https://github.com/stephanalas/salas-appointment-tool/assets/72700716/353f3339-6ba5-4b96-9415-7119bf03dd06)
![calendar](https://github.com/stephanalas/salas-appointment-tool/assets/72700716/58a61465-87b4-4ef6-8e12-cb21dc754c61)
![taskManagement](https://github.com/stephanalas/salas-appointment-tool/assets/72700716/8010b1d6-a9c6-4663-823a-95c918ab150f)
![csv import](https://github.com/stephanalas/salas-appointment-tool/assets/72700716/97414417-7e6c-4919-a35c-6ef91d009fa8)


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Additional Information](#additional-information)

## Features

- Profile management
- Task management
- Appointment creation and management
- Email notifications
- CSV import
- Transmission logs

## Technologies Used

- Typescript
- Node.js
- Postgresql
- Prisma
- JWT
- React
- Redux Toolkit
- Vite

## Prerequisites

- Node.js (Version 18.16.0)
- PostgreSQL database

## Setup Instructions

1. Clone the repository to your local machine:

```
git clone https://github.com/stephanalas/salas-appointment-tool.git
cd salas-appointment-tool
```

2. Install the required dependencies:

```
npm install
```

3. Set up the PostgresSQL database and ensure you have the connection URL ready. (I used Render.com for postgres db)

4. Create a `.env` file in the root directory of the project and add the following environment variables:

```
SECRET_KEY=your_secret_key_here
DATABASE_URL=your_database_url_here
TEST_PASSWORD=your_test_password_here
// to setup email
EMAIL_SERVICE=email_service
EMAIL_USERNAME=email_username
EMAIL_PASSWORD=email_password
```

5. Generate prisma client, push prisma db and seed db

```
npx prisma generate
npx prisma db push
npx prisma db seed
```

6. start dev server

```
npm run dev
```

The application should now be running locally at http://localhost:5173

7. Sign in with admin@mail.com and your TEST_PASSWORD

## Environment Variables

- `SECRET_KEY`: A secret key used for JWT authentication.
- `DATABASE_URL`: The connection URL for your PostgreSQL database.
- `TEST_PASSWORD`: The password used for running tests.
- `EMAIL_SERVICE`: used by Nodemailer
- `EMAIL_USERNAME`: email should match service provider
- `EMAIL_PASSWORD`: password for authenticating email

  Make sure to set up these environment variables before running the application.

## Additonal Information

For any additional information or inquiries about the project, please contact stephan.j.alas@gmail.com.
