import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


const app = express();
const port = process.env.PORT || 3000;
const TELEGRAM_TOKEN = "7994428436:AAEKjiFNSC4IMjbYepLsDmruREJfnXI6sUE";
const CHAT_ID = "7378014336";

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/", async (req, res) => {
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
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
