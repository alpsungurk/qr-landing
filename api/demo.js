export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, phone, company, message } = req.body;

  const slackMessage = {
    text: `🎯 *Yeni Demo Talebi!*\n\n*Ad Soyad:* ${name}\n*E-posta:* ${email}\n*Telefon:* ${phone}\n*Şirket:* ${company || '-'}\n*Mesaj:* ${message || '-'}`
  };

  try {
    const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(slackMessage)
    });

    if (!response.ok) {
      throw new Error('Slack webhook failed');
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Slack error:', error);
    return res.status(500).json({ error: 'Mesaj gönderilemedi' });
  }
}
