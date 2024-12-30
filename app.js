// استيراد المكتبات اللازمة
const express = require("express");
const path = require("path");

// إنشاء تطبيق Express
const app = express();

// تحديد المنفذ الذي سيعمل عليه الخادم
const port = process.env.PORT || 3000;

// تقديم الملفات الثابتة من مجلد public
app.use(express.static(path.join(__dirname, "public")));

// المسار الرئيسي الذي يقدم index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// بدء الخادم
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});