export const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Medicine Verification API",
      version: "1.0.0",
      description: "API documentation for the Medicine Verification project",
    },
    servers: [
      {
        url: "http://localhost:3010", 
        description: "Local server",
      },
    ],
    components: {
      schemas: {
        CreateUserDto: {
          type: "object",
          required: ["name", "email", "password", "role"],
          properties: {
            name: {
              type: "string",
              description: "The user's name",
              example: "John Doe",
            },
            email: {
              type: "string",
              format: "email",
              description: "The user's email address",
              example: "johndoe@example.com",
            },
            password: {
              type: "string",
              format: "password",
              description: "The user's password",
              example: "password123",
            },
            role: {
              type: "string",
              description: "The user's role (ADMIN or MANUFACTURER)",
              enum: ["ADMIN", "MANUFACTURER"],
              example: "MANUFACTURER",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts", "./src/dtos/*.ts"], // Add correct paths
};
