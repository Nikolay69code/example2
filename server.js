const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();
// Замените на ваш токен бота и ID чата
const TELEGRAM_TOKEN = '7317091729:AAGv89OWMPmxpKeYW8q7-Q6NpvHRfMTIM0I';
const CHAT_ID = '8195408385';
                 

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

app.use(express.json());
app.use(express.static('.'));

app.post('/api/submit-form', async (req, res) => {
    try {
        const { name, phone, email, description } = req.body;
        
        const message = `
Новая заявка!
Имя: ${name}
Телефон: ${phone}
Email: ${email}
Описание проекта: ${description}
        `;

        await bot.sendMessage(CHAT_ID, message);
        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 