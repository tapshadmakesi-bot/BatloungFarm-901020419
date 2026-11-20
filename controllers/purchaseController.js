const db = require('../database/db');
exports.getPurchases = async (req,res)=>{
  try{ const [rows]=await db.query('SELECT * FROM purchases'); res.json(rows); }
  catch(e){ res.status(500).json({error:e.message}); }
};
exports.addPurchase = async (req,res)=>{
  try{
    const { FruitID, SupplierID, Quantity, Price } = req.body;
    await db.query('INSERT INTO purchases (FruitID, SupplierID, Quantity, Price, PurchaseDate) VALUES (?,?,?,?, NOW())', [FruitID||1, SupplierID||1, Quantity||1, Price||10]);
    res.json({message:'Purchase added'});
  }catch(e){ res.status(500).json({error:e.message}); }
};

