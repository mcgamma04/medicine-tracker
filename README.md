# **Medicine Verification App**

A Node.js application developed with TypeScript, PostgreSQL, and Prisma for managing medicine verification. This project allows manufacturers to add and verify medicines in a centralized system. Admins have control over the database, including user management.

## **Table of Contents**

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [License](#license)

## **Features**

- User authentication (Admin and Manufacturer roles).
- CRUD operations for medicine data.
- Medicine verification by manufacturers.
- Prisma ORM for database interaction with PostgreSQL.
- Detailed API documentation using Swagger.

## **Technologies Used**

- **Node.js**: Server-side JavaScript runtime.
- **TypeScript**: Strictly typed superset of JavaScript.
- **Express**: Web framework for Node.js.
- **PostgreSQL**: SQL database for storing medicines and users.
- **Prisma**: ORM to interact with PostgreSQL database.
- **JWT**: Authentication mechanism.
- **Swagger**: API documentation generator.

## **Setup Instructions**

### **1. Prerequisites**

Before you begin, ensure that you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or later)
- npm or yarn
- [PostgreSQL](https://www.postgresql.org/download/)
- [Prisma CLI](https://www.prisma.io/docs/concepts/components/prisma-cli) (`npm i -g prisma`)

### **2. Clone the Repository**

```bash
git clone https://github.com/mcgamma04/medicine-tracker
cd medicine-tracker
