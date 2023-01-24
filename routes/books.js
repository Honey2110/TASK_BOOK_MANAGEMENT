const express = require("express");
const { books } = require("../data/books.json");
const { users } = require("../data/users.json");

const router = express.Router();

/**
 * Route: /books
 * Method: GET
 * Description: Get all books
 * Access: Public
 * Parameters: none
 */
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: books });
});

/**
 * Route: /books/:id
 * Method: GET
 * Description: Get book by id
 * Access: Public
 * Parameters: id
 */
router.get("/:id", (req, res) => {
  const { id } = req.params;

  const book = books.find((each) => each.id === id);

  if (!book)
    return res.status(404).json({
      success: false,
      message: "Book not found",
    });

  return res.status(200).json({
    success: true,
    data: book,
  });
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 */
router.get("/issued/by-user", (req, res) => {
  const usersWithIssuedBooks = users.filter((each) => {
    if (each.issuedBook) return each;
  });

  const issuedBooks = [];

  usersWithIssuedBooks.forEach((each) => {
    const book = books.find((book) => book.id === each.issuedBook);

    book.issuedBy = each.name;
    book.issuedDate = each.issuedDate;
    book.returnDate = each.returnDate;

    issuedBooks.push(book);
  });

  if (issuedBooks.length === 0)
    return res.status(404).json({
      success: false,
      message: "No books issued yet",
    });

  return res.status(200).json({
    success: true,
    data: issuedBooks,
  });
});

/**
 * Route: /books/issued/by-user
 * Method: GET
 * Description: Get all issued books
 * Access: Public
 * Parameters: none
 * data : author,name,genre,publisher,id
 */
router.post("/", (req, res) => {
  const { data } = req.body;

  if (!data) {
    res.status(404).json({
      success: false,
      message: "Data not found"
    });
  }

  const already = books.find((each) => each.id === books.id);
  if (already) {
    return res.status(404).json({
      success: false,
      message: "Mention id Already present"
    });
  }

  const allbooks = [...books , data];

  return res.status(201).json({
    success: true,
    message: allbooks
  });

});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { data } = req.body;
  const book = books.find((each) => each.id === id);

  if (!book) {
    return res.status(400).json({
      success: false,
      message: "Book not found with this particular id",
    });
  }

  const updateddata = books.map((each) => {
    if (each.id === id) {
      return { ...each, ...data };
    }
    return each;
  });
   return res.status(201).json({
     success: true,
     data : updateddata
   });
});

// default export
module.exports = router;