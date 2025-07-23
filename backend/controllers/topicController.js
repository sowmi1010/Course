import Topic from "../models/Topic.js";

// Create Topic
export const createTopic = async (req, res) => {
  try {
    const { title, subtitle, language, code, htmlCode, cssCode, jsCode, subtopics } = req.body;

    const newTopic = await Topic.create({
      title,
      subtitle,
      language,
      code: language !== "javascript" ? code : undefined,
      htmlCode: language === "javascript" ? htmlCode : undefined,
      cssCode: language === "javascript" ? cssCode : undefined,
      jsCode: language === "javascript" ? jsCode : undefined,
      subtopics,
      createdBy: req.user ? req.user._id : null,
    });

    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Topic
export const updateTopic = async (req, res) => {
  try {
    const { title, subtitle, language, code, htmlCode, cssCode, jsCode, subtopics } = req.body;

    const setData = { title, subtitle, language, subtopics };
    const unsetData = {};

    if (language === "javascript") {
      setData.htmlCode = htmlCode;
      setData.cssCode = cssCode;
      setData.jsCode = jsCode;
      unsetData.code = "";
    } else {
      setData.code = code;
      unsetData.htmlCode = "";
      unsetData.cssCode = "";
      unsetData.jsCode = "";
    }

    const updatedTopic = await Topic.findByIdAndUpdate(
      req.params.id,
      { $set: setData, $unset: unsetData },
      { new: true }
    );

    if (!updatedTopic) return res.status(404).json({ message: "Topic not found" });

    res.json(updatedTopic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete Topic
export const deleteTopic = async (req, res) => {
  try {
    const topic = await Topic.findByIdAndDelete(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json({ message: "Topic deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Topics by Language
export const getTopicsByLanguage = async (req, res) => {
  try {
    const topics = await Topic.find({ language: req.params.language }).sort({ createdAt: 1 });
    res.json(topics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Topic by ID
export const getTopicById = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });
    res.json(topic);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Toggle favorite
export const toggleFavorite = async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    if (!topic) return res.status(404).json({ message: "Topic not found" });

    topic.isFavorite = !topic.isFavorite;
    await topic.save();

    res.json({ isFavorite: topic.isFavorite });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all favorites
export const getFavorites = async (req, res) => {
  try {
    const favorites = await Topic.find({ isFavorite: true }).sort({ createdAt: -1 });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
