const express = require('express');
const TelegramBot = require('node-telegram-bot-api');
const app = express();

// Замените на ваш токен бота и ID чата
const TELEGRAM_TOKEN = '8146131784:AAEdYQLp5ihXVv3uLdloNl125_eKC0cMLG4';
const CHAT_ID = '1557542470';

const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: false });

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