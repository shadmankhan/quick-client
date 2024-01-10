const express = require("express");
const fs = require("fs").promises; // File system module to read JSON files
const path = require("path");
const app = express();

app.get("/api/translations/:lng", async (req, res) => {
  const { lng } = req.params;
  const filePath = path.join(__dirname, `translations/${lng}.json`);

  try {
    // Read the JSON file based on the requested language
    const data = await fs.readFile(filePath, "utf8");
    const translation = JSON.parse(data);
    res.json(translation);
  } catch (error) {
    // If file doesn't exist for requested language, fallback to English
    console.error("Error reading translations:", error);
    const defaultFilePath = path.join(__dirname, "translations/en.json");
    const defaultData = await fs.readFile(defaultFilePath, "utf8");
    const defaultTranslation = JSON.parse(defaultData);
    res.json(defaultTranslation);
  }
});

const PORT = 5000; // Your desired port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
