const db = require('../database/db');
exports.getSales = async (req,res)=>{

  try{ const [rows]=await db.query('SELECT * FROM sales'); res.json(rows); }
  catch(e){ res.status(500).json({error:e.message}); }
};
exports.addSale = async (req,res)=>{
  try{
    const { FruitID, VendorID, Quantity, Price } = req.body;
    await db.query('INSERT INTO sales (FruitID, VendorID, Quantity, Price, SaleDate) VALUES (?,?,?,?, NOW())', [FruitID||1, VendorID||1, Quantity||1, Price||10]);
    res.json({message:'Sale added'});
  }catch(e){ res.status(500).json({error:e.message}); }
};
