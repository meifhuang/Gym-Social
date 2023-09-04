const router = require("express").Router();
const conversation = require("../models/conversation");
const Conversation = require("../models/conversation");

//new conv

router.post("/", async (req, res) => {

  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user

router.get("/:userId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });

    if (conversation) {
      res.status(200).json(conversation);   
    } else {

    }
   
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId

router.get("/find/:firstUserId/:secondUserId", async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    console.log(err)
    res.status(500).json(err);
  } 
});

router.put("/:id", async (req, res) => {
  const { archivedStatus } = req.body;
  const { id } = req.params;
  try {
    const archiveConvo = await Conversation.findByIdAndUpdate(
      id,
      {
        archived: archivedStatus
      },
      { new: true }
    );

    if (archiveConvo) {
      res.status(200).json({
        success: true,
        archiveConvo 
      });
    } else {
      res.status(400).json({ success: false, message: "Conversation was not archived" });
    }
  } catch (err) {
    console.log(err)
  }
});

module.exports = router;
