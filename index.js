const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

// Setup WhatsApp client with LocalAuth to persist session
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', qr => {
    // Print QR code in terminal for first login
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('WhatsApp Client is ready!');
});

client.on('message', message => {
    if (message.body === 'ping') {
        message.reply('pong');
    }
});

client.initialize();

// Simple endpoint to check if server is running
app.get('/', (req, res) => {
    res.send('WA Bot running');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
