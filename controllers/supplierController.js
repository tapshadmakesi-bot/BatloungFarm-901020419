const db = require('../database/db');
exports.getSuppliers = async (req,res)=>{
  try{ const [rows]=await db.query('SELECT * FROM suppliers'); res.json(rows); }
  catch(e){ res.status(500).json({error:e.message}); }
};
exports.addSupplier = async (req,res)=>{
  try{

    const { BusinessName, ContactPerson, Phone, Province, Address, name, phone } = req.body;
    const bName = BusinessName || name || 'New Supplier';
    const contact = ContactPerson || 'Thapelo';
    const ph = Phone || phone || '59000000';
    const prov = Province || 'Maseru';
    const addr = Address || 'Farm Address';
    await db.query('INSERT INTO suppliers (BusinessName, ContactPerson, Phone, Province, Address) VALUES (?,?,?,?,?)', [bName, contact, ph, prov, addr]);
    res.json({message:'Added'});
  }catch(e){ res.status(500).json({error:e.message}); }
};

