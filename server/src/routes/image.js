const express = require("express");
const axios = require("axios");
const router = express.Router();

function pollinationsURL(prompt, style = "Realistic", resolution = "512x512", quality = "Standard") {
  const [w,h] = resolution.split("x");
  return `https://image.pollinations.ai/prompt/${encodeURIComponent(`${prompt}, style: ${style}, quality: ${quality}`)}?width=${w}&height=${h}`;
}

async function fetchAsBase64(url) {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  const mime = response.headers["content-type"] || "image/png";
  const base64 = Buffer.from(response.data).toString("base64");
  return `data:${mime};base64,${base64}`;
}

router.post("/generate", async (req, res) => {
  try {
    const { prompt, style = "Realistic", resolution = "512x512", quality = "Standard" } = req.body;
    if (!prompt) return res.status(400).json({ error: "Missing prompt" });

    const url = pollinationsURL(prompt, style, resolution, quality);
    const base64 = await fetchAsBase64(url);
    const image = { prompt, provider: "pollinations", url, base64, createdAt: new Date() };

    res.json({ ok: true, image });
  } catch (err) {
    console.error("Generation error:", err?.message || err);
    res.status(500).json({ error: "Image generation failed" });
  }
});

router.get("/all", (req, res) => {
  res.json([]);
});

module.exports = router;
