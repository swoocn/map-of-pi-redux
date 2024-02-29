const Shop = require("../models/shopModel");
const Product = require("../models/productModel");

const search = async (req, res) => {
    try {
        const { businessType, priceRange, shopName, productName } = req.query;
        
        let shopQuery = {};
        // let productQuery = {};

        if (businessType) {
            shopQuery.businessType = { $regex: new RegExp(businessType, "i") };
        }

        if (shopName) {
            shopQuery.name = { $regex: new RegExp(shopName, "i") };
        }

        if (productName) {
            productQuery.name = { $regex: new RegExp(productName, "i") };
        }

        let shops = await Shop.find(shopQuery);

        if (priceRange) {
            const [minPrice, maxPrice] = priceRange.split("-");
            const products = await Product.find({
                ...productQuery,
                price: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) }
            });
            const shopIds = products.map(product => product.shop);
            shops = await Shop.find({ _id: { $in: shopIds } });
        }

        res.status(200).json({ shops });
    } catch (error) {
        console.log("Internal server error while searching: " + error.message);
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = { search };
