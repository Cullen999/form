import axios from "axios";

export default async function handler(req, res) {
  if (req.method === "GET") {
    res.end("Hey");
    return;
  }

  if (req.method === "POST") {
    const { name, telegram, message } = req.body;

    if (!name || !telegram || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const TELEGRAM_TOKEN = "7994428436:AAEKjiFNSC4IMjbYepLsDmruREJfnXI6sUE";
    const CHAT_ID = "7378014336";

    const text = `New Message:\nName: ${name}\nTelegram: ${telegram}\nMessage: ${message}`;

    try {
      await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: CHAT_ID,
        text,
      });

      res.json({ status: "Message sent to Telegram" });
    } catch (error) {
      console.error("Error sending message to Telegram:", error);
      res.status(500).json({ error: "Failed to send message" });
    }
    return;
  }

  res.status(405).json({ error: "Method not allowed" });
}
