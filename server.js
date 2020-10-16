const http = require("http");
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("./controllers/productController");
const server = http.createServer((req, res) => {
  if (req.url === "/api/products" && req.method === "GET") {
    getProducts(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "GET"
  ) {
    const id = req.url.split("/")[3];
    console.log(req.url.split("/"));
    getProduct(req, res, id);
  } else if (req.url === "/api/products" && req.method === "POST") {
    createProduct(req, res);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "PUT"
  ) {
    const id = req.url.split("/")[3];
    updateProduct(req, res, id);
  } else if (
    req.url.match(/\/api\/products\/([0-9]+)/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[3];
    deleteProduct(req, res, id);
  } else {
    res.writeHead("404", { "Content-Type": "application/json" });
    res.write(JSON.stringify({ message: "Route Not Found" }));
    res.end();
  }
  //console.log(req,res);
  // res.statusCode = 200;
  // res.setHeader('Content-Type','text/html');
  // //body of the response
  // res.write("<h1 style='color:red'>yooo, hello.</h1>");
  // res.end();
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server is running on port 5000");
});
