const supabase = require('./_supabase');

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) return res.status(500).json({ error: error.message });
    
    // Map camelCase for frontend
    const formattedData = data.map(o => ({
      orderId: o.id,
      customerName: o.customer_name,
      phone: o.phone,
      email: o.email,
      address: o.address,
      city: o.city,
      province: o.province,
      postalCode: o.postal_code,
      whatsapp: o.whatsapp,
      notes: o.notes,
      items: typeof o.items === 'string' ? JSON.parse(o.items) : o.items,
      subtotal: o.subtotal,
      deliveryCharges: o.delivery_charges,
      total: o.total,
      paymentMethod: o.payment_method,
      status: o.status,
      createdAt: o.created_at
    }));
    
    return res.status(200).json(formattedData);
  }

  if (req.method === 'POST') {
    const o = req.body;
    
    const dbOrder = {
      id: o.orderId,
      customer_name: o.customerName,
      phone: o.phone,
      email: o.email || null,
      address: o.address,
      city: o.city,
      province: o.province,
      postal_code: o.postalCode || null,
      whatsapp: o.whatsapp || null,
      notes: o.notes || null,
      items: JSON.stringify(o.items || []),
      subtotal: o.subtotal,
      delivery_charges: o.deliveryCharges,
      total: o.total,
      payment_method: o.paymentMethod || 'Cash on Delivery',
      status: o.status || 'New',
      created_at: o.createdAt || new Date().toISOString()
    };
    
    const { data, error } = await supabase.from('orders').insert([dbOrder]).select();
    if (error) return res.status(500).json({ error: error.message });
    
    // Attempt to upsert customer
    const { data: customers } = await supabase.from('customers').select('*').eq('phone', o.phone);
    if (customers && customers.length > 0) {
      const existing = customers[0];
      await supabase.from('customers').update({
        total_orders: existing.total_orders + 1,
        total_spent: existing.total_spent + o.total,
        name: o.customerName,
        city: o.city,
        province: o.province,
        updated_at: new Date().toISOString()
      }).eq('id', existing.id);
    } else {
      await supabase.from('customers').insert([{
        name: o.customerName,
        phone: o.phone,
        email: o.email || null,
        city: o.city,
        province: o.province,
        total_orders: 1,
        total_spent: o.total
      }]);
    }

    return res.status(201).json(data);
  }

  if (req.method === 'PUT') {
    const { orderId, status } = req.body;
    if (!orderId || !status) return res.status(400).json({ error: "Missing orderId or status" });

    const { data, error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select();

    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
