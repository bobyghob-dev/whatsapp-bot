const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

client.on('qr', (qr) => {
    console.log('=== MT9 QR ===');
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('MT9 واجد! 🤖');
});

client.on('message', async (msg) => {
    const text = msg.body.toLowerCase().trim();
    const name = msg._data.notifyName || 'صاحبي';

    if (text === 'سلام' || text === 'salam' || text === 'hi' || text === 'hello') {
        msg.reply(`سلام ${name} 👋 أنا *MT9*، بوت ديالك. كتب *منيو* باش تشوف شنو كانعرف ندير.`);
    }
    else if (text === 'منيو' || text === 'menu' || text === 'اوامر') {
        msg.reply(`*🤖 MT9 - المنيو*\n\n1. كتب *سلام* - نسلم عليك\n2. كتب *شكون نتا* - نعرف براسي\n3. كتب *وقت* - نعطيك الوقت\n4. كتب *نكتة* - نضحكك`);
    }
    else if (text === 'شكون نتا') {
        msg.reply(`أنا *MT9* 🤖، بوت واتساب صايبو ليا مولاي. سريع و ناضي!`);
    }
    else if (text === 'وقت') {
        msg.reply(`دابا الساعة هي: ${new Date().toLocaleTimeString('ar-MA')} ⏰`);
    }
    else if (text === 'نكتة') {
        msg.reply(`علاش الكمبيوتر مشا للطبيب؟\nحيت كان فيه فيروس 😂`);
    }
});

client.initialize();
