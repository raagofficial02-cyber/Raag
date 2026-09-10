const supabase = require('./_supabase');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) return res.status(500).json({ error: error.message });
    
    const formattedData = data.map(c => ({
      id: c.id,
      name: c.name,
      phone: c.phone,
      email: c.email,
      city: c.city,
      province: c.province,
      orders: c.total_orders,
      spent: c.total_spent,
      createdAt: c.created_at
    }));
    
    return res.status(200).json(formattedData);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Missing customer ID" });
    
    const { error } = await supabase.from('customers').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['GET', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
