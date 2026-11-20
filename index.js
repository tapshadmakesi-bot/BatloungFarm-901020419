
const express = require('express');
const cors = require('cors');
const db = require('./database/db.js');
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req,res)=>res.json({message:"Batloung API OK"}));

app.get("/api/fruits", async (req,res)=>{
  try{
    const [rows] = await db.query("SELECT * FROM fruits");
    res.json(rows);
  }catch(e){res.status(500).json({error:e.message})}
});

app.post("/api/fruits", async (req,res)=>{

  const name = req.body.FruitName || req.body.name;
  const desc = req.body.Description || "";
  await db.query("INSERT INTO fruits (FruitName, Description, Status) VALUES (?,?,?)", [name, desc, "available"]);
  res.json({message:"Added"});
});

app.delete("/api/fruits/:id", async (req,res)=>{
  await db.query("DELETE FROM fruits WHERE FruitID=?", [req.params.id]);
  res.json({message:"Deleted"});
});

app.get("/api/suppliers", async (req,res)=>{
  try{const [rows]=await db.query("SELECT * FROM suppliers"); res.json(rows);}catch(e){res.json([])}
});


app.post("/api/suppliers", async (req,res)=>{
  const name=req.body.SupplierName||req.body.name;
  await db.query("INSERT INTO suppliers (SupplierName) VALUES (?)", [name]);
  res.json({message:"Added"});
});

app.delete("/api/suppliers/:id", async (req,res)=>{
  await db.query("DELETE FROM suppliers WHERE SupplierID=?", [req.params.id]);
  res.json({message:"Deleted"});
});

app.get("/api/vendors", async (req,res)=>{
  try{const [rows]=await db.query("SELECT * FROM vendors"); res.json(rows);}catch(e){res.json([])}

});

app.post("/api/vendors", async (req,res)=>{
  const name=req.body.VendorName||req.body.name;
  await db.query("INSERT INTO vendors (VendorName) VALUES (?)", [name]);
  res.json({message:"Added"});
});

app.delete("/api/vendors/:id", async (req,res)=>{
  await db.query("DELETE FROM vendors WHERE VendorID=?", [req.params.id]);
  res.json({message:"Deleted"});
});

app.get("/api/purchases", async (req,res)=>{
  try{const [r]=await db.query("SELECT * FROM purchases"); res.json(r)}catch(e)

{res.json([])}
});

app.get("/api/sales", async (req,res)=>{
  try{const [r]=await db.query("SELECT * FROM sales"); res.json(r)}catch(e){res.json([])}
});

app.get("/api/reports", async (req,res)=>{
  try{
    const [f]=await db.query("SELECT COUNT(*) as c FROM fruits");
    res.json([{report:"Fruits", value:f[0].c}]);
  }catch(e){res.json([{report:"Fruits", value:5}])}
});

app.listen(5000, ()=>console.log("Server running on port 5000"));
