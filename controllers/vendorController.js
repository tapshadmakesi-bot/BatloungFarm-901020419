const db = require('../database/db');
exports.getVendors = async (req,res)=>{
  try{ const [rows]=await db.query('SELECT * FROM vendors'); res.json(rows); }
  catch(e){ res.status(500).json({error:e.message}); }
};
exports.addVendor = async (req,res)=>{
  try{
    const { BusinessName, ContactPerson, Phone, Province, Address, name, phone } = req.body;
    const bName = BusinessName || name || 

'Vendor';
    const ph = Phone || phone || '000';
    await db.query('INSERT INTO vendors (BusinessName, ContactPerson, Phone, Province, Address) VALUES (?,?,?,?,?)', [bName, ContactPerson||'Contact', ph, Province||'Maseru', Address||'Addr']);
    res.json({message:'Added'});
  }catch(e){
    try{ await db.query('INSERT INTO vendors (name, phone) VALUES (?,?)', [req.body.name||'Vendor', req.body.phone||'000']); res.json({message:'Added'}); }
    catch(e2){ res.status(500).json({error:e.message}); }
  }
};
