const axios = require("axios");

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, telegram, message } = req.body;

  if (!name || !telegram || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const text = `New Message:\nName: ${name}\nTelegram: ${telegram}\nMessage: ${message}`;

  try {
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      chat_id: CHAT_ID,
      text: text,
    });

    res.json({ status: "Message sent to Telegram" });
  } catch (error) {
    console.error("Error sending message to Telegram:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
}
