const { getTikTokBuffer } = require('../scraper');

module.exports = async (req, res) => {
  const { url } = req.query;

  if (!url || !/https:\/\/(www\.)?tiktok\.com/.test(url)) {
    return res.status(400).json({
      error: 'URL no válida',
      message: 'Proporciona una URL de TikTok válida.'
    });
  }

  try {
    const videoBuffer = await getTikTokBuffer(url);
    if (videoBuffer.error) {
      return res.status(500).json(videoBuffer);
    }

    // Si es un buffer, lo enviamos como video mp4
    res.setHeader('Content-Type', 'video/mp4');
    return res.send(videoBuffer);
  } catch (error) {
    return res.status(500).json({
      error: 'Error interno del servidor',
      message: error.message
    });
  }
};