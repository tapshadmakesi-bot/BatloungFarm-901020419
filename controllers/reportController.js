const db = require('../database/db');
exports.getReports = async (req,res)=>{
  try{

    const [sales]=await db.query('SELECT COUNT(*) as totalSales FROM sales');
    const [purchases]=await db.query('SELECT COUNT(*) as totalPurchases FROM purchases');
    const [suppliers]=await db.query('SELECT COUNT(*) as totalSuppliers FROM suppliers');
    res.json({sales:sales[0], purchases:purchases[0], suppliers:suppliers[0]});
  }catch(e){ res.status(500).json({error:e.message}); }
};
