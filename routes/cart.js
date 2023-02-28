const router = require("express").Router();

const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE CART
router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE USER INFO
router.put("/cart/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    //Update User
    const updatedCart = await Cart.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    );
    updatedCart.save();
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //Delete Cart
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ONE Cart /* Note that its User id not Cart id */
router.get("/find/:id", verifyTokenAndAuthorization, async (req, res) => {
  //We omitted verifyTokenAndAdmin here because everybody should be allowed to view cart
  try {
    const cart = await Cart.findOne({ id: req.params.id });
    res.status(200).json(cart); //display cart
  } catch (err) {
    res.status(500).json(err);
  }
});

// // //GET ALL Cart
// router.get("/", verifyTokenAndAdmin, async (req, res) => {
//   const qNew = req.query.new; //New Query
//   const qCategory = req.query.category; //Selected Category
//   try {
//     console.log("FETCHING")
//     if (qNew) {
//       console.log("NEW");
//       products = await Cart.find().sort({ createdAt: -1 }).limit(2); //fetch most recently added products
//       res.status(200).json(products);
//     } else if (qCategory) {
//       console.log(qCategory);
//       const product = await Product.find({
//         categories: {
//           $in: [qCategory],
//         },
//       }); //Fetch products according to Category
//       res.status(200).json(product);
//     } else {
//       console.log("ALL CART ARE DISPLAYED HERE");
//       const cart = await Product.find();
//       res.status(200).json(cart);
//     }
//     //res.status(200).json(users);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
