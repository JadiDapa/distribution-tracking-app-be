const fs = require('fs');
const path = require('path');

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const createController = (name) => {
  const controllerName = `${capitalizeFirstLetter(name.toLowerCase())}Controller`;
  const fileName = `controller.${name.toLowerCase()}.js`;
  const directoryPath = path.join(__dirname, '../controllers');
  const filePath = path.join(directoryPath, fileName);
  const fileContent = `class ${controllerName} {\n\t// Coding disini\n}\n\nmodule.exports = ${controllerName};`;

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    return console.error(`File ${fileName} sudah ada`);
  }

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      return console.error('Gagal membuat file:', err);
    }
    return console.log(`${fileName} berhasil dibuat`);
  });
};

const createModel = (name) => {
  const modelName = `${capitalizeFirstLetter(name.toLowerCase())}Model`;
  const fileName = `model.${name.toLowerCase()}.js`;
  const directoryPath = path.join(__dirname, '../models');
  const filePath = path.join(directoryPath, fileName);
  const fileContent = `class ${modelName} {\n\t// Coding disini\n}\n\nmodule.exports = ${modelName};`;

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    return console.error(`File ${fileName} sudah ada`);
  }

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      return console.error('Gagal membuat file:', err);
    }
    return console.log(`${fileName} berhasil dibuat`);
  });
};

const createRouter = (name) => {
  const routerName = `${capitalizeFirstLetter(name.toLowerCase())}Router`;
  const fileName = `route.${name.toLowerCase()}.js`;
  const directoryPath = path.join(__dirname, '../routes');
  const filePath = path.join(directoryPath, fileName);
  const fileContent = `const express = require('express');\nconst ${routerName} = express.Router();\nconst ${capitalizeFirstLetter(name.toLowerCase())}Controller = require('../controllers/controller.${name.toLowerCase()}');\n\n${routerName}.get('/endpointName', ${capitalizeFirstLetter(name.toLowerCase())}Controller.methodName);\n\nmodule.exports = ${routerName};`;

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath, { recursive: true });
  }

  if (fs.existsSync(filePath)) {
    return console.error(`File ${fileName} sudah ada`);
  }

  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      return console.error('Gagal membuat file:', err);
    }
    return console.log(`${fileName} berhasil dibuat`);
  });
};

const args = process.argv.slice(2);
const entity = args[1];

if (!entity) {
  return console.error('Entity tidak boleh kosong');
}

createController(entity);
createModel(entity);
createRouter(entity);
