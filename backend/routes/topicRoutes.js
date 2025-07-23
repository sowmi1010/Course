import express from "express";
import protect from "../middleware/authMiddleware.js";
import {
  createTopic,
  updateTopic,
  getTopicsByLanguage,
  getTopicById,
  deleteTopic,
  toggleFavorite,
  getFavorites,
} from "../controllers/topicController.js";

const router = express.Router();

router.post("/", protect, createTopic);
router.put("/:id", protect, updateTopic);
router.delete("/:id", protect, deleteTopic);
router.get("/:language", protect, getTopicsByLanguage);
router.get("/view/:id", protect, getTopicById);

// Favorites
router.patch("/favorite/:id", protect, toggleFavorite);
router.get("/favorites/all", protect, getFavorites);

export default router;
