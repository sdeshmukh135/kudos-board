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

// GET the comments of a card
router.get("/:cardID/comments", async (req, res) => {
  // if the route is called successfully
  const cardID = req.params.cardID;
  const cardsWithComments = await prisma.card.findUnique({
    where: { id: parseInt(cardID) },
    include: {
      comments: true,
    },
  });
  res.json(cardsWithComments.comments); // return the comments of a specific card
});

// POST
router.post("/", async (req, res) => {
  // add a card to the card database
  const { title, description, gifURL, boardId, upvotes, isPinned, author } = req.body;

  const newCard = await prisma.card.create({
    data: {
      title,
      description,
      gifURL,
      upvotes,
      isPinned,
      boardId,
      author,
    },
  });
  const cards = await prisma.card.findMany({
    where: { boardId: boardId },
  });
  res.status(201).json(cards);
});

// PUT
router.put("/:id", async (req, res) => {
  // make modifications to the upvotes
  const id = req.params.id;

  const { upvotes } = req.body;
  const updatedCard = await prisma.card.update({
    where: { id: parseInt(id) },
    data: {
      upvotes,
    },
  });
  res.json(updatedCard);
});

// PUT (but for pinned)
router.put("/:id/pin", async (req, res) => {
  // make modifications to the upvotes
  const id = req.params.id;
  const { isPinned } = req.body;
  const updatedCard = await prisma.card.update({
    where: { id: parseInt(id) },
    data: {
      isPinned,
      pinnedAt: isPinned ? new Date() : null // sets a timestamp when pinned, don't need it if not
    },
  });
  const newOrderCards = await prisma.card.findMany({
  orderBy: [
    { isPinned: 'desc' },    
    { pinnedAt: 'desc' },     
  ],
});
  res.json(newOrderCards);
});

// DELETE
router.delete("/:id", async (req, res) => {
  // delete an existing card
  const id = req.params.id;

  await prisma.comment.deleteMany({
    where: { cardId: parseInt(id) },
  });

  const deletedCard = await prisma.card.delete({
    where: { id: parseInt(id) },
  });

  const cards = await prisma.card.findMany({
    where: { boardId: deletedCard.boardId },
  });
  res.status(201).json(cards);
});

module.exports = router;
