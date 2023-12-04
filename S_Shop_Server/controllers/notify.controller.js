const admin = require('firebase-admin');
const serviceAccount = require('../sshop-701ec-firebase-adminsdk-qfizk-5fab1e9e3b.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // Thêm các tùy chọn khác nếu cần thiết
});

// Sử dụng messaging() thay vì getMessaging()
const messaging = admin.messaging();

exports.sendNotify = async (req, res, next) => {
  if (req.method === 'POST') {
    const topic = "event";
    const status = 10;
    let content = req.body.content;
    try {
      await sendNotify(topic, content, status);
      console.log('Thông báo đã được gửi thành công');
    } catch (error) {
      console.error('Lỗi khi gửi thông báo:', error);
    }
  }
  res.render("notify/sendNotify");
};

const sendNotify = async (topic, content, status) => {
  const message = {
    data: {
      title: "Có thông báo mới",
      body: content,
      status: status.toString()
    },
    topic: topic
  };

  try {
    const response = await messaging.send(message);
    console.log('Gửi thông báo thành công:', response);
  } catch (error) {
    console.error('Lỗi khi gửi tin nhắn:', error);
    throw error;
  }
};
