const supabase = require('./_supabase');

module.exports = async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('promo_codes')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'POST') {
    const p = req.body;
    
    const dbPromo = {
      code: p.code,
      status: p.status !== undefined ? p.status : true,
      expiry_date: p.expiry_date || null
    };
    
    const { data, error } = await supabase.from('promo_codes').insert([dbPromo]).select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data);
  }

  if (req.method === 'PUT') {
    const p = req.body;
    const dbPromo = {
      code: p.code,
      status: p.status !== undefined ? p.status : true,
      expiry_date: p.expiry_date || null
    };
    
    const { data, error } = await supabase.from('promo_codes').update(dbPromo).eq('id', p.id).select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  if (req.method === 'DELETE') {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Missing promo code ID" });
    
    const { error } = await supabase.from('promo_codes').delete().eq('id', id);
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json({ success: true });
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
