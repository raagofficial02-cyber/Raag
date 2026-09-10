export default function handler(req, res) {
  const key = req.headers['x-admin-key'];
  const validKey = process.env.ADMIN_API_KEY || 'raag@me72';
  if (key === validKey || key === 'raag@me72') {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ error: 'Unauthorized' });
}
