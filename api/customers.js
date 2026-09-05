const supabase = require('./_supabase');

export default async function handler(req, res) {
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

  res.setHeader('Allow', ['GET']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
