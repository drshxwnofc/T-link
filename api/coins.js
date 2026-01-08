export default async (req, res) => {
  const { amount } = JSON.parse(req.body);
  if (amount > 1000) {
    return res.status(403).json({ error: 'Limit exceeded' });
  }
  res.json({ success: true });
};
