export default function handler(req, res) {
  const key = req.headers['x-admin-key'];
  if (key === process.env.ADMIN_API_KEY) {
    return res.status(200).json({ success: true });
  }
  return res.status(401).json({ error: 'Unauthorized' });
}