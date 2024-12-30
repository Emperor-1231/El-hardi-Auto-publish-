// استيراد المكتبات الأساسية
const express = require('express');
const axios = require('axios');
const router = express.Router();

// مفتاح YouTube Data API
const API_KEY = 'AIzaSyCn7D_s4IA63f9pBJDzMHT1Xzn7c9FYd8A';

// استدعاء البيانات من YouTube
router.post('/fetch', async (req, res) => {
  try {
    const { rssLink } = req.body;

    if (!rssLink) {
      return res.status(400).json({
        success: false,
        message: 'يرجى تقديم رابط RSS الخاص بالقناة.'
      });
    }

    // استخراج معرف القناة أو القائمة
    const channelId = extractChannelId(rssLink);
    const playlistId = extractPlaylistId(rssLink);

    if (!channelId && !playlistId) {
      return res.status(400).json({
        success: false,
        message: 'الرابط المقدم غير صالح، المرجوا التأكد من صلاحية الرابط والمحاولة مرة أخرى.'
      });
    }

    const youtubeUrl = playlistId
      ? `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playlistId}&maxResults=10&key=${API_KEY}`
      : `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&order=date&type=video&maxResults=10&key=${API_KEY}`;

    const response = await axios.get(youtubeUrl);

    const videos = response.data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      videoId: item.snippet.resourceId?.videoId || item.id.videoId,
      publishedAt: item.snippet.publishedAt,
      playlist: playlistId ? true : false
    }));

    res.status(200).json({
      success: true,
      message: 'تم جلب الفيديوهات بنجاح.',
      videos
    });
  } catch (error) {
    console.error('Error fetching YouTube data:', error);

    const message =
      error.response?.status === 403
        ? 'لقد تجاوزت الحد المسموح به للطلبات باستخدام YouTube API. يرجى المحاولة لاحقًا.'
        : 'حدث خطأ أثناء جلب البيانات. يرجى المحاولة لاحقًا.';

    res.status(500).json({
      success: false,
      message
    });
  }
});

// استخراج معرف القناة
function extractChannelId(rssLink) {
  const regex = /channel\/([A-Za-z0-9_-]+)/;
  const match = rssLink.match(regex);
  return match ? match[1] : null;
}

// استخراج معرف القائمة
function extractPlaylistId(rssLink) {
  const regex = /playlist\?list=([A-Za-z0-9_-]+)/;
  const match = rssLink.match(regex);
  return match ? match[1] : null;
}

module.exports = router;