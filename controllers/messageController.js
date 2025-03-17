
const Message = require("../models/messageModel");
const { validationResult } = require("express-validator");

// Get all messages
exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.getAll();
    res.status(200).json({
      status: 200,
      data: messages
    });
  } catch (error) {
    console.error("Error getting messages:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get a specific message by ID
exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.getById(req.params.id);
    
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({
      status: 200,
      data: message
    });
  } catch (error) {
    console.error("Error getting message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Create a new message
exports.createMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const messageData = {
      sessionId: req.body.sessionId,
      senderId: req.body.senderId,
      content: req.body.content
    };

    const messageId = await Message.create(messageData);
    const message = await Message.getById(messageId);

    res.status(201).json({
      status: 201,
      message: "Message sent successfully",
      data: message
    });
  } catch (error) {
    console.error("Error creating message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a message (e.g., mark as read)
exports.updateMessage = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const messageExists = await Message.getById(req.params.id);
    
    if (!messageExists) {
      return res.status(404).json({ message: "Message not found" });
    }

    const updated = await Message.update(req.params.id, req.body);
    
    if (!updated) {
      return res.status(400).json({ message: "Failed to update message" });
    }

    const updatedMessage = await Message.getById(req.params.id);

    res.status(200).json({
      status: 200,
      message: "Message updated successfully",
      data: updatedMessage
    });
  } catch (error) {
    console.error("Error updating message:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a message
exports.deleteMessage = async (req, res) => {
  try {
    const messageExists = await Message.getById(req.params.id);
    
    if (!messageExists) {
      return res.status(404).json({ message: "Message not found" });
    }

    const deleted = await Message.delete(req.params.id);
    
    if (!deleted) {
      return res.status(400).json({ message: "Failed to delete message" });
    }

    res.status(204).json({
      status: 204,
      message: "Message deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ message: "Server error" });
  }
};
