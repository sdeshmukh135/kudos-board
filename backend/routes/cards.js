const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CRUD Operations for cards

// GET (not looking for all of the cards but the cards based on a board)
router.get("/", async (req, res) => {
  // if the route is called successfully
  const cards = await prisma.card.findMany();
  res.json(cards); // return the tasks sent in json format
});

// POST
router.post("/", async (req, res) => {
  // add a board to the board database
  const { title, description, gifURL, boardId } = req.body;

  const newCard = await prisma.card.create({
    data: {
      title,
      description,
      gifURL,
      boardId,
    },
  });
  const boardWithCards = await prisma.board.findUnique({
    where: { id: parseInt(boardId) },
    include: {
      cards: true,
    },
  });
  res.json(boardWithCards.cards); // return the cards of the specific board
});

// PUT
router.put("/:id", async (req, res) => {
  // make modifications to an existing pet
  const id = req.params.id;

  const { title, description, gifURL } = req.body;
  const updatedCard = await prisma.card.update({
    where: { id: parseInt(id) },
    data: {
      title,
      description,
      gifURL,
      boardId,
    },
  });
  res.json(updatedCard);
});

// DELETE
router.delete("/:id", async (req, res) => {
  // delete an existing pet
  const id = req.params.id;

  const deletedCard = await prisma.card.delete({
    where: { id: parseInt(id) },
  });

  const cards = await prisma.card.findMany();
  res.json(cards);
});

module.exports = router;
