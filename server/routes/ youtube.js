// routes/YouTube.js
const express = require('express');
const router = express.Router();

// مسار لتحميل الفيديوهات
router.get('/videos', (req, res) => {
  // هنا يتم استخراج الفيديوهات من قاعدة البيانات أو API
  try {
    res.json({
      message: 'تم جلب الفيديوهات بنجاح',
      videos: [
        { id: 1, title: 'فيديو 1', url: 'https://example.com/video1' },
        { id: 2, title: 'فيديو 2', url: 'https://example.com/video2' }
      ]
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'خطأ في جلب الفيديوهات' });
  }
});

// مسار لتحميل تفاصيل الفيديو
router.get('/videos/:id', (req, res) => {
  const videoId = req.params.id;
  try {
    // هنا يتم جلب تفاصيل الفيديو باستخدام الفيديو ID
    res.json({
      message: 'تم جلب تفاصيل الفيديو بنجاح',
      video: {
        id: videoId,
        title: `تفاصيل الفيديو ${videoId}`,
        description: 'وصف الفيديو'
      }
    });
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).json({ message: 'خطأ في جلب تفاصيل الفيديو' });
  }
});

// مسار لتحميل التعليقات الخاصة بالفيديو
router.get('/comments/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  try {
    // هنا يتم جلب التعليقات للفيديو من قاعدة البيانات
    res.json({
      message: 'تم جلب التعليقات بنجاح',
      comments: [
        { id: 1, user: 'مستخدم 1', comment: 'تعليق رائع!' },
        { id: 2, user: 'مستخدم 2', comment: 'محتوى ممتاز!' }
      ]
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'خطأ في جلب التعليقات' });
  }
});

// مسار لإضافة تعليق على الفيديو
router.post('/comments/:videoId', (req, res) => {
  const videoId = req.params.videoId;
  const { comment } = req.body;
  if (!comment) {
    return res.status(400).json({ message: 'التعليق مطلوب' });
  }

  try {
    // هنا يتم إضافة التعليق إلى قاعدة البيانات
    res.json({
      message: 'تم إضافة التعليق بنجاح',
      comment: { videoId, comment }
    });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: 'خطأ في إضافة التعليق' });
  }
});

module.exports = router;