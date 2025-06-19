const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CRUD Operations

// GET (get all comments regardless of which card they apply to)
router.get("/", async (req, res) => {
  // if the route is called successfully
  const comments = await prisma.card.findMany();
  res.json(comments); // return the tasks sent in json format
});

// POST (add a comment)
router.post("/", async (req, res) => {
  // add a card to the card database
  const { message, author, cardId } = req.body;

  const newCard = await prisma.comment.create({
    data: {
      message,
      author,
      cardId,
    },
  });
  const comments = await prisma.comment.findMany({
    where: { cardId: cardId },
  });
  res.status(201).json(comments);
});

// DELETE (delete a comment)

module.exports = router;
