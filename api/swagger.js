const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const outputFile = "./swagger.json";
const endpointsFiles = [
  "app.js",
  "./middlewares/index.js",
  "./routes/index.js",
];

swaggerAutogen(outputFile, endpointsFiles);
