const router = require("express").Router();
const User = require("../models/user");
const { authenticaionToken } = require("./userAuth");

//add book to favourite list
//Put ka use is lye krein gein kyu ki user ka schema hum ne phele se banaya hua hai aur jab vo favourite mei add karega toh usme update karna hai toh hum put ka use krein gein.
router.put("/add-book-to-favourite", authenticaionToken, async (req, res) => {
  try {
    const { bookId, id } = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookId);
    if (isBookFavourite) {
      return res
        .status(200)
        .json({ message: "Book already added to favourite list" });
    }
    await User.findByIdAndUpdate(id, { $push: { favourites: bookId } });
    return res.status(200).json({ message: "Book added to favourite list" });
  } catch (error) {
    res.status(500).json({ message: "Inrenal Server Error" });
  }
});

//Deleting book from favourite list
router.delete(
  "/remove-book-to-favourite",
  authenticaionToken,
  async (req, res) => {
    try {
      const { bookId, id } = req.headers;
      const userData = await User.findById(id);
      const isBookFavourite = userData.favourites.includes(bookId);
      if (isBookFavourite) {
        await User.findByIdAndUpdate(id, { $pull: { favourites: bookId } });
      }
      return res
        .status(200)
        .json({ message: "Book removed from favourite list" });
    } catch (error) {
      res.status(500).json({ message: "Inrenal Server Error" });
    }
  }
);
//get favourites books of a paricular user
router.get("/get-favourites-books", authenticaionToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const userData = await User.findById(id).populate("favourites");
    const favouriteBooks = userData.favourites;
    return res.json({ status: "Success", data: favouriteBooks });
  } catch (error) {
    res.status(500).json({ message: "Inrenal Server Error" });
  }
});

module.exports = router;
