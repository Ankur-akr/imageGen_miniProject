import React, { useEffect, useState } from "react";
import axios from "axios";

const DEFAULT_PROMPT = "A vibrant fantasy landscape, colorful, high detail";

export default function App() {
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [styleOpt, setStyleOpt] = useState("Realistic");
  const [resolution, setResolution] = useState("512x512");
  const [quality, setQuality] = useState("Standard");
  const [count, setCount] = useState("1");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    // no DB, so images list is local session only
  }, []);

  async function generateImages() {
    if (!prompt || !prompt.trim()) {
      alert("Please enter a prompt.");
      return;
    }
    setLoading(true);
    try {
      const payload = { prompt, style: styleOpt, resolution, quality, count: Number(count) || 1 };
      const res = await axios.post("/api/image/generate", payload, { timeout: 300000 });
      if (res?.data?.image) {
        setImages(prev => [res.data.image, ...prev]);
      } else {
        alert("No image returned");
      }
    } catch (err) {
      console.error("Generate error:", err);
      const msg = err?.response?.data?.error || err?.message || "Network Error";
      alert("Generation failed: " + msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page">
      <header className="hero">
        <h1>AI Image Generator</h1>
        <p className="subtitle">Generate images using Pollinations.ai </p>
      </header>

      <main className="container">
        <section className="card input-card">
          <label className="label">Enter your image description</label>
          <textarea className="prompt" rows={5} value={prompt} onChange={e => setPrompt(e.target.value)} />

          <div className="controls">
            <div className="control">
              <label>Art Style</label>
              <select value={styleOpt} onChange={e => setStyleOpt(e.target.value)}>
                <option>Realistic</option>
                <option>Cartoon</option>
                <option>Digital Art</option>
                <option>Photorealistic</option>
                <option>Oil Painting</option>
              </select>
            </div>

            <div className="control">
              <label>Resolution</label>
              <select value={resolution} onChange={e => setResolution(e.target.value)}>
                <option>512x512</option>
                <option>768x768</option>
                <option>1024x1024</option>
              </select>
            </div>

            <div className="control">
              <label>Quality</label>
              <select value={quality} onChange={e => setQuality(e.target.value)}>
                <option>Standard</option>
                <option>High</option>
                <option>Ultra</option>
              </select>
            </div>

            <div className="control">
              <label>Number</label>
              <select value={count} onChange={e => setCount(e.target.value)}>
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
            </div>
          </div>

          <div className="action-row">
            <button className={`generate-btn ${loading ? "loading" : ""}`} onClick={generateImages} disabled={loading}>
              {loading ? "Generating..." : "Generate Images"}
            </button>
          </div>
        </section>

        <section className="card gallery-card">
          <h2>Generated Images</h2>
          {images.length === 0 ? (
            <div className="empty">
              <div className="empty-illustration">🖼️</div>
              <p>Your generated images will appear here</p>
              <small>They are stored in your browser session only</small>
            </div>
          ) : (
            <div className="gallery">
              {images.map((img, i) => (
                <div className="img-wrap" key={i}>
                  <img src={img.base64 || img.url} alt={img.prompt} />
                  <div className="img-caption">{(img.prompt || "").slice(0, 80)}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <small>Powered by Pollinations.ai</small>
        <br />
        <small>Made by Ankur Rai</small>
      </footer>
    </div>
  );
}
