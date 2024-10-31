import swaggerJsDoc from "swagger-jsdoc";

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Book Management API",
      version: "1.0.0",
      description: "API untuk manajemen buku",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.ts"], // path to the API docs
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default swaggerDocs;
