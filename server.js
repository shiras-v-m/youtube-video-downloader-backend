const express = require('express');
const ytdl = require('ytdl-core');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/videoInfo', async (req, res) => {
  const url = req.query.url;
  try {
    const info = await ytdl.getInfo(url);
    res.json(info);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/download', (req, res) => {
  const url = req.query.url;
  res.header('Content-Disposition', 'attachment; filename="video.mp4"');
  ytdl(url, { quality: 'highestvideo' }).pipe(res);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
