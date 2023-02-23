const router = require("express").Router();

const Product = require("../models/Product");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE PRODUCT
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);

  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE USER INFO
router.put("/product/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    //Update User
    const updatedProduct = await Product.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    );
    updatedProduct.save();
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Delete Product
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ONE User
router.get("/find/:id", async (req, res) => {
  //We omitted verifyTokenAndAdmin here because everyboy should be allowed to view products
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL Products
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    if (qNew) {
      const products = await Product.find();
      res.status(200).json(products);
    }
    elseif(qCategory){
      const 
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET USER STATS (Statistics showing when users visited the platform)
// router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
//   const date = new Date();
//   const lastYear = new Date(date.setFullYear(date.getFullYear() - 1)); //Last year data
//   try {
//     //Getting the month and the number of users that visited
//     const data = await User.aggregate([
//       { $match: { createdAt: { $gte: lastYear } } },
//       {
//         $project: {
//           month: { $month: "$createdAt" },
//         },
//       },
//       {
//         $group: {
//           _id: "$month",
//           total: { $sum: 1 },
//         },
//       },
//     ]);
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
