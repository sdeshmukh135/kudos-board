const express = require("express");
const router = express.Router();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// CRUD operations for boards

// GET
router.get("/", async (req, res) => {
  // if the route is called successfully
  const boards = await prisma.board.findMany();
  res.json(boards); // return the tasks sent in json format
});

// GET (but for the cards of a board)
router.get("/:boardID/cards", async (req, res) => {
  // if the route is called successfully
  const boardID = req.params.boardID;
  const boardWithCards = await prisma.board.findUnique({
    where: { id: parseInt(boardID) },
    include: {
      cards: true,
    },
  });
  res.json(boardWithCards.cards); // return the cards of the specific board
});

// POST
router.post("/", async (req, res) => {
  // add a board to the board database
  const { title, category } = req.body;

  const newBoard = await prisma.board.create({
    data: {
      title,
      category,
    },
  });
  const boards = await prisma.board.findMany();
  res.status(201).json(boards);
});

// PUT
router.put("/:id", async (req, res) => {
  // make modifications to an existing pet
  const id = req.params.id;

  const { title, category } = req.body;
  const updatedBoard = await prisma.board.update({
    where: { id: parseInt(id) },
    data: {
      title,
      category,
    },
  });
  res.json(updatedBoard);
});

// DELETE
router.delete("/:id", async (req, res) => {
  // delete an existing pet
  const id = req.params.id;
  await prisma.card.deleteMany({
    where: { boardId: parseInt(id) },
  });
  const deletedBoard = await prisma.board.delete({
    where: { id: parseInt(id) },
  });

  const boards = await prisma.board.findMany();
  res.status(201).json(boards);
});

module.exports = router;
