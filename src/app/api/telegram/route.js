import axios from 'axios';
import { Telegraf } from 'telegraf';
import { NextApiRequest, NextApiResponse } from 'next';

const TELEGRAM_TOKEN = process.env.NEXT_PUBLIC_TG_TOKEN || "";
const TELEGRAM_API = `https://api.telegram.org/bot${TELEGRAM_TOKEN}`;
const WEB_APP_URL = 'https://demo.superfun.social';

const bot = new Telegraf(TELEGRAM_TOKEN);

bot.start((ctx) => {
    ctx.reply("Welcome to the SuperfunSocial Telegram Mini App!)", {
        reply_markup: {
            keyboard: [[{ text: "SuperFunSocial App", web_app: { url: WEB_APP_URL } }]],
        },
    });
});

const telegrafMiddleware = bot.webhookCallback('/api/telegram');

export default async function handler(req, res) {
    if (req.method === 'POST') {
        return telegrafMiddleware(req, res);
    } else if (req.method === 'GET') {
        try {
            const response = await axios.post(`${TELEGRAM_API}/setWebhook`, {
                url: `${process.env.NEXT_PUBLIC_WEB_APP_URL}/api/telegram`,
            });
            return res.status(200).json({ response: response.data });
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error setting webhook' });
        }
    } else {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export const config = {
    api: {
        bodyParser: false,
    },
};

// No need to call bot.launch() as webhookCallback will handle it
