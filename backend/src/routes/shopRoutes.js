const express = require("express");
const {
  registerShop,
  getAllShops,
  deleteShop,
  updateShop,
  getShopProducts,
  getSingleShop,
} = require("../controllers/shopController");
const isAuthenticated = require("../authMiddleware/isAuthenticated");
const {
  addProductToShop,
  deleteProductFromShop,
  updateProduct,
} = require("../controllers/productControllers");
const { route } = require("./userRoutes");
const { search } = require("../controllers/searchController");

const router = express.Router();

router.get("/", getAllShops);
router.post("/register", isAuthenticated, registerShop);
router.get("/search",search)
router.get("/:shopId", getSingleShop)
router.delete("/:shopId", isAuthenticated, deleteShop);
router.patch("/:shopId", isAuthenticated, updateShop);
router.post("/add-product/:shopId", isAuthenticated, addProductToShop);
router.get("/products/:shopId",isAuthenticated, getShopProducts);
router.post(
  "/remove-product/:productId",
  isAuthenticated,
  deleteProductFromShop
);
router.patch("/update-product/:productId", isAuthenticated, updateProduct);

module.exports = router;
