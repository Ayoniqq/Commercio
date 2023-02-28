const router = require("express").Router();

const Order = require("../models/Order");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

//CREATE ORDER (USER)
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(400).json(err);
  }
});

//UPDATE ORDER (ADMIN ONLY)
router.put("/cart/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    //Update User
    const updatedOrder = await Order.findByIdAndUpdate(
      req.user.id,
      { $set: req.body },
      { new: true }
    );
    updatedOrder.save();
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //Delete Order (ADMIN ONLY)
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

// // //GET ALL Cart (ADMIN ONLY)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
