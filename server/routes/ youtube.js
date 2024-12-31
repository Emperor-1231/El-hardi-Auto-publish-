// routes/youtube.js
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const path = require('path');
const fs = require('fs');

// الدالة المساعدة لقراءة ملفات الفيديو من قاعدة بيانات وهمية
const readVideoData = () => {
  // لمحاكاة قاعدة بيانات حقيقية أو API
  return [
    { id: 1, title: 'فيديو 1', url: 'https://example.com/video1', views: 100, likes: 15, dislikes: 2, description: 'وصف الفيديو 1' },
    { id: 2, title: 'فيديو 2', url: 'https://example.com/video2', views: 300, likes: 20, dislikes: 3, description: 'وصف الفيديو 2' },
    { id: 3, title: 'فيديو 3', url: 'https://example.com/video3', views: 150, likes: 5, dislikes: 1, description: 'وصف الفيديو 3' }
  ];
};

// الدالة المساعدة لحساب إحصائيات الفيديو
const calculateVideoStats = (video) => {
  const { likes, dislikes } = video;
  const totalVotes = likes + dislikes;
  const likePercentage = totalVotes === 0 ? 0 : (likes / totalVotes) * 100;
  return { likePercentage, totalVotes };
};

// مسار لتحميل الفيديوهات مع إحصائيات
router.get('/videos', async (req, res) => {
  try {
    const videos = readVideoData();
    const videosWithStats = videos.map(video => {
      const stats = calculateVideoStats(video);
      return { ...video, ...stats };
    });

    res.json({
      message: 'تم جلب الفيديوهات بنجاح',
      videos: videosWithStats
    });
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'خطأ في جلب الفيديوهات' });
  }
});

// مسار لتحميل تفاصيل الفيديو مع بيانات إضافية
router.get('/videos/:id', async (req, res) => {
  const videoId = req.params.id;
  try {
    const videos = readVideoData();
    const video = videos.find(v => v.id === parseInt(videoId));

    if (!video) {
      return res.status(404).json({ message: 'الفيديو غير موجود' });
    }

    const stats = calculateVideoStats(video);

    res.json({
      message: 'تم جلب تفاصيل الفيديو بنجاح',
      video: { ...video, ...stats }
    });
  } catch (error) {
    console.error('Error fetching video details:', error);
    res.status(500).json({ message: 'خطأ في جلب تفاصيل الفيديو' });
  }
});

// مسار لتحميل التعليقات الخاصة بالفيديو مع إحصائيات التعليقات
router.get('/comments/:videoId', async (req, res) => {
  const videoId = req.params.videoId;
  try {
    // يتم جلب التعليقات من قاعدة البيانات أو API
    const comments = [
      { id: 1, user: 'مستخدم 1', comment: 'تعليق رائع!', timestamp: new Date().toISOString() },
      { id: 2, user: 'مستخدم 2', comment: 'محتوى ممتاز!', timestamp: new Date().toISOString() }
    ];

    const videoCommentsStats = {
      totalComments: comments.length,
      latestComment: comments[comments.length - 1],
      mostActiveUser: comments.reduce((acc, comment) => {
        acc[comment.user] = (acc[comment.user] || 0) + 1;
        return acc;
      }, {})
    };

    res.json({
      message: 'تم جلب التعليقات بنجاح',
      comments,
      videoCommentsStats
    });
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).json({ message: 'خطأ في جلب التعليقات' });
  }
});

// مسار لتحميل تفاصيل التعليق
router.get('/comments/:videoId/:commentId', async (req, res) => {
  const { videoId, commentId } = req.params;
  try {
    const comments = [
      { id: 1, videoId: 1, user: 'مستخدم 1', comment: 'تعليق رائع!', timestamp: new Date().toISOString() },
      { id: 2, videoId: 1, user: 'مستخدم 2', comment: 'محتوى ممتاز!', timestamp: new Date().toISOString() }
    ];

    const comment = comments.find(c => c.id === parseInt(commentId) && c.videoId === parseInt(videoId));

    if (!comment) {
      return res.status(404).json({ message: 'التعليق غير موجود' });
    }

    res.json({
      message: 'تم جلب تفاصيل التعليق بنجاح',
      comment
    });
  } catch (error) {
    console.error('Error fetching comment details:', error);
    res.status(500).json({ message: 'خطأ في جلب تفاصيل التعليق' });
  }
});

// مسار لإضافة تعليق مع تحقق من صحة البيانات
router.post('/comments/:videoId', [
  check('comment').notEmpty().withMessage('التعليق مطلوب').isLength({ max: 500 }).withMessage('التعليق لا يجب أن يتجاوز 500 حرف')
], async (req, res) => {
  const videoId = req.params.videoId;
  const { comment } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // هنا يتم إضافة التعليق إلى قاعدة البيانات
    const newComment = {
      id: Date.now(), // استخدام الـ timestamp كـ id فريد
      videoId,
      user: 'مستخدم جديد',
      comment,
      timestamp: new Date().toISOString()
    };

    // حفظ التعليق في قاعدة البيانات أو الملف
    const commentsPath = path.join(__dirname, 'comments.json');
    let comments = [];
    if (fs.existsSync(commentsPath)) {
      comments = JSON.parse(fs.readFileSync(commentsPath));
    }
    comments.push(newComment);
    fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2));

    res.json({
      message: 'تم إضافة التعليق بنجاح',
      comment: newComment
    });
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: 'خطأ في إضافة التعليق' });
  }
});

// مسار لتحميل الملفات المرفقة مع التعليقات (إذا وجدت)
router.get('/comments/:videoId/:commentId/attachment', async (req, res) => {
  const { videoId, commentId } = req.params;
  try {
    const filePath = path.join(__dirname, 'attachments', `${videoId}_${commentId}.jpg`);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'الملف غير موجود' });
    }

    res.sendFile(filePath);
  } catch (error) {
    console.error('Error fetching comment attachment:', error);
    res.status(500).json({ message: 'خطأ في جلب الملف المرفق' });
  }
});

// مسار لتحميل التعليقات المتقدمة بناء على تصنيف
router.get('/comments/:videoId/advanced', async (req, res) => {
  const { videoId } = req.params;
  const { sortBy, filterByUser } = req.query;

  try {
    let comments = [
      { id: 1, user: 'مستخدم 1', comment: 'تعليق رائع!', timestamp: new Date().toISOString() },
      { id: 2, user: 'مستخدم 2', comment: 'محتوى ممتاز!', timestamp: new Date().toISOString() }
    ];

    // فلترة التعليقات حسب المستخدم
    if (filterByUser) {
      comments = comments.filter(c => c.user.includes(filterByUser));
    }

    // فرز التعليقات حسب التاريخ أو حسب أي معايير أخرى
    if (sortBy === 'date') {
      comments = comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }

    res.json({
      message: 'تم جلب التعليقات المتقدمة بنجاح',
      comments
    });
  } catch (error) {
    console.error('Error fetching advanced comments:', error);
    res.status(500).json({ message: 'خطأ في جلب التعليقات المتقدمة' });
  }
});

module.exports = router;

// مسار لتحميل فيديوهات مع تصنيف عالي
router.get('/videos/high-rating', async (req, res) => {
  try {
    const videos = readVideoData();
    // تصنيف الفيديوهات حسب النسبة المئوية للإعجابات
    const highRatingVideos = videos.filter(video => {
      const stats = calculateVideoStats(video);
      return stats.likePercentage >= 80; // تصنيف الفيديوهات التي تحتوي على نسبة إعجاب 80% أو أكثر
    });

    res.json({
      message: 'تم جلب الفيديوهات ذات التصنيف العالي بنجاح',
      videos: highRatingVideos
    });
  } catch (error) {
    console.error('Error fetching high rating videos:', error);
    res.status(500).json({ message: 'خطأ في جلب الفيديوهات ذات التصنيف العالي' });
  }
});

// مسار لتحميل أكثر الفيديوهات مشاهدة
router.get('/videos/most-viewed', async (req, res) => {
  try {
    const videos = readVideoData();
    // ترتيب الفيديوهات حسب عدد المشاهدات
    const sortedVideos = videos.sort((a, b) => b.views - a.views);

    res.json({
      message: 'تم جلب أكثر الفيديوهات مشاهدة بنجاح',
      videos: sortedVideos.slice(0, 5) // عرض أعلى 5 فيديوهات من حيث عدد المشاهدات
    });
  } catch (error) {
    console.error('Error fetching most viewed videos:', error);
    res.status(500).json({ message: 'خطأ في جلب أكثر الفيديوهات مشاهدة' });
  }
});

// مسار لتحميل الفيديوهات التي تحتوي على وصف معين
router.get('/videos/search', async (req, res) => {
  const { query } = req.query; // جلب النص المطلوب من الطلب
  try {
    const videos = readVideoData();
    // البحث عن الفيديوهات التي تحتوي على النص في العنوان أو الوصف
    const foundVideos = videos.filter(video => video.title.includes(query) || video.description.includes(query));

    res.json({
      message: 'تم جلب الفيديوهات بناءً على البحث بنجاح',
      videos: foundVideos
    });
  } catch (error) {
    console.error('Error fetching videos with search query:', error);
    res.status(500).json({ message: 'خطأ في جلب الفيديوهات بناءً على البحث' });
  }
});

// مسار لتحميل معلومات ملف فيديو (مرفقات الفيديو)
router.get('/videos/:id/file', async (req, res) => {
  const videoId = req.params.id;
  try {
    // افتراض وجود ملف فيديو في مجلد معين بناءً على الـ ID
    const videoFilePath = path.join(__dirname, 'videos', `${videoId}.mp4`);

    if (!fs.existsSync(videoFilePath)) {
      return res.status(404).json({ message: 'ملف الفيديو غير موجود' });
    }

    res.sendFile(videoFilePath);
  } catch (error) {
    console.error('Error fetching video file:', error);
    res.status(500).json({ message: 'خطأ في جلب ملف الفيديو' });
  }
});

// مسار لتحميل إحصائيات الفيديو
router.get('/videos/:id/stats', async (req, res) => {
  const videoId = req.params.id;
  try {
    const videos = readVideoData();
    const video = videos.find(v => v.id === parseInt(videoId));

    if (!video) {
      return res.status(404).json({ message: 'الفيديو غير موجود' });
    }

    const stats = calculateVideoStats(video);

    res.json({
      message: 'تم جلب إحصائيات الفيديو بنجاح',
      stats
    });
  } catch (error) {
    console.error('Error fetching video stats:', error);
    res.status(500).json({ message: 'خطأ في جلب إحصائيات الفيديو' });
  }
});

// مسار لتحميل التعليقات بناء على تاريخ محدد
router.get('/comments/:videoId/date', async (req, res) => {
  const { videoId } = req.params;
  const { from, to } = req.query; // جلب تاريخ البداية والنهاية من الطلب

  try {
    const comments = [
      { id: 1, videoId: 1, user: 'مستخدم 1', comment: 'تعليق رائع!', timestamp: new Date('2024-01-01').toISOString() },
      { id: 2, videoId: 1, user: 'مستخدم 2', comment: 'محتوى ممتاز!', timestamp: new Date('2024-02-01').toISOString() }
    ];

    // فلترة التعليقات بناء على تاريخ البداية والنهاية
    const filteredComments = comments.filter(c => {
      const timestamp = new Date(c.timestamp);
      return timestamp >= new Date(from) && timestamp <= new Date(to);
    });

    res.json({
      message: 'تم جلب التعليقات بناءً على التاريخ بنجاح',
      comments: filteredComments
    });
  } catch (error) {
    console.error('Error fetching comments by date:', error);
    res.status(500).json({ message: 'خطأ في جلب التعليقات بناءً على التاريخ' });
  }
});

// مسار لتحميل تعليقات الفيديو بناءً على تقييم الإعجاب
router.get('/comments/:videoId/likes', async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const comments = [
      { id: 1, user: 'مستخدم 1', comment: 'تعليق رائع!', likes: 10, timestamp: new Date().toISOString() },
      { id: 2, user: 'مستخدم 2', comment: 'محتوى ممتاز!', likes: 5, timestamp: new Date().toISOString() }
    ];

    // تصنيف التعليقات حسب عدد الإعجابات
    const sortedComments = comments.sort((a, b) => b.likes - a.likes);

    res.json({
      message: 'تم جلب التعليقات بناءً على الإعجاب بنجاح',
      comments: sortedComments
    });
  } catch (error) {
    console.error('Error fetching comments by likes:', error);
    res.status(500).json({ message: 'خطأ في جلب التعليقات بناءً على الإعجاب' });
  }
});

// مسار لتحميل إحصائيات الموقع (مثال للتحليل الشامل)
router.get('/site/stats', async (req, res) => {
  try {
    const totalVideos = readVideoData().length;
    const totalComments = 100; // هنا يمكن استخدام قاعدة بيانات حقيقية
    const totalViews = 5000; // هنا يمكن استخدام قاعدة بيانات حقيقية

    res.json({
      message: 'تم جلب إحصائيات الموقع بنجاح',
      stats: {
        totalVideos,
        totalComments,
        totalViews
      }
    });
  } catch (error) {
    console.error('Error fetching site stats:', error);
    res.status(500).json({ message: 'خطأ في جلب إحصائيات الموقع' });
  }
});

// مسار لتحديث الفيديو
router.put('/videos/:id', [
  check('title').notEmpty().withMessage('عنوان الفيديو مطلوب'),
  check('description').notEmpty().withMessage('وصف الفيديو مطلوب'),
], async (req, res) => {
  const videoId = req.params.id;
  const { title, description } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const videos = readVideoData();
    const videoIndex = videos.findIndex(v => v.id === parseInt(videoId));

    if (videoIndex === -1) {
      return res.status(404).json({ message: 'الفيديو غير موجود' });
    }

    // تحديث الفيديو
    videos[videoIndex] = { ...videos[videoIndex], title, description };
    
    res.json({
      message: 'تم تحديث الفيديو بنجاح',
      video: videos[videoIndex]
    });
  } catch (error) {
    console.error('Error updating video:', error);
    res.status(500).json({ message: 'خطأ في تحديث الفيديو' });
  }
});

module.exports = router;