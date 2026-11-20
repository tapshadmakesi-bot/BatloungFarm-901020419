const db = require('../database/db');

exports.getFruits = async (req,res)=>{
  try{
    const [rows] = await db.query('SELECT * FROM fruits');
    res.json(rows);
  }catch(err){ res.status(500).json({error:err.message}); }
};

exports.addFruit = async (req,res)=>{
  try{
    let { FruitName, Description, name, description } = req.body;
    let fName = (FruitName || name || '').toLowerCase().trim();

    
    // Map to allowed ENUM values
    const allowed = ['apples','bananas','oranges','mangoes','grapes'];
    if(!allowed.includes(fName)){
      // if you type "apple" -> make it "apples"
      if(fName.includes('apple')) fName='apples';
      else if(fName.includes('banana')) fName='bananas';
      else if(fName.includes('orange')) fName='oranges';
      else if(fName.includes('mango')) fName='mangoes';
      else if(fName.includes('grape')) fName='grapes';
      else fName='apples'; // default
    }
    
    const desc = Description || description || 

'Fresh farm fruit';
    await db.query('INSERT INTO fruits (FruitName, Description, Status) VALUES (?,?,?)', [fName, desc, 'available']);
    res.json({message:'Added'});
  }catch(err){ 
    res.status(500).json({error:err.message}); 
  }
};
