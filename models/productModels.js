const products = require("../data/products.json");
const { v4: uuidv4 } = require("uuid");
const { writeDataToFile } = require("../utils/utils");
function findAll() {
  return new Promise((resolve, reject) => {
    resolve(products);
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    const product = products.find((p) => p.id === id);
    resolve(product);
  });
}
function create(product) {
  return new Promise((resolve, reject) => {
    const newProduct = { id: uuidv4(), ...product };
    products.push(newProduct);
    writeDataToFile("./data/products.json", products);
    resolve(newProduct);
  });
}
function update(id, product) {
  return new Promise((resolve, reject) => {
    const index = products.findIndex((p) => p.id === id);
    products[index] = { id, ...product };
    console.log(product);
    writeDataToFile("./data/products.json", products);
    resolve(products[index]);
  });
}

function deleteP(id) {
  return new Promise((resolve, reject) => {
    //deleting the respective item from array
    const items = products.filter((p) => p.id !== id);
    //console.log(items);
    writeDataToFile("./data/products.json", items);
    resolve(items);
  });
}

module.exports = { findAll, findById, create, update, deleteP };
