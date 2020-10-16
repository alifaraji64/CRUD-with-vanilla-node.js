const Product = require("../models/productModels");

//for getting all products
async function getProducts(req, res) {
  try {
    const products = await Product.findAll();
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(products));
    res.end();
  } catch (err) {
    console.log(err);
  }
}

//get single products
async function getProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.write(JSON.stringify({ message: "Product Not Found" }));
      res.end();
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.write(JSON.stringify(product));
      res.end();
    }
  } catch (err) {
    console.log(err);
  }
}
//for creating new product
async function createProduct(req, res) {
  try {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", async () => {
      const { title, description, price } = JSON.parse(body);
      console.log(title);
      const product = {
        title,
        description,
        price,
      };
      const newProduct = await Product.create(product);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(newProduct));
    });
  } catch (err) {
    console.log(err);
  }
}

//for updating product
async function updateProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    //console.log(product);
    if (!product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      let body = "";
      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", async () => {
        const { title, description, price } = JSON.parse(
          JSON.parse(JSON.stringify(body))
        );
        //console.log(JSON.parse(JSON.parse(JSON.stringify(body))));
        const productData = {
          title: title || product.title,
          desription: description || product.description,
          price: price || product.price,
        };
        const updProduct = await Product.update(id, productData);
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(updProduct));
      });
    }
  } catch (err) {
    console.log(err);
  }
}

async function deleteProduct(req, res, id) {
  try {
    const product = await Product.findById(id);
    //console.log(product);
    if (!product) {
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Product Not Found" }));
    } else {
      const delProduct = await Product.deleteP(id);
      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(JSON.stringify(delProduct));
    }
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
