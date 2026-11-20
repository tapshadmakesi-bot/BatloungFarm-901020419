
import React, { useState, useEffect } from 'react'

function DataPage({ title, endpoint, fields, idField }){
  const [data,setData] = useState([])
  const [form,setForm] = useState({})
  const load=()=>fetch(`http://localhost:5000/api/${endpoint}`).then(r=>r.json()).then(setData)
  useEffect(()=>{load()},[])
  const add=async(e)=>{
    e.preventDefault()
    await fetch(`http://localhost:5000/api/${endpoint}`,{method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form)})
    setForm({}); load()
  }
  const del=async(id)=>{
    await fetch(`http://localhost:5000/api/$

{endpoint}/${id}`,{method:'DELETE'})
    load()
  }
  return (
    <div style={{padding:20}}>
      <h2 style={{color:'#14532d', fontSize:28}}>{title} - Fresh produce dist management</h2>
      <form onSubmit={add} style={{background:'white', padding:15, borderRadius:10, marginBottom:20, display:'flex', gap:10, flexWrap:'wrap'}}>
        {fields.map(f=>(
          <input key={f} placeholder={f} value={form[f]||''} onChange={e=>setForm({...form,[f]:e.target.value})} style={{padding:10, borderRadius:8, border:'1px solid #ccc'}} required />
        ))}
        <button style={{background:'#16a34a', color:'white', padding:'10px 20px', 

borderRadius:8, border:'none'}}>Add {title}</button>
      </form>
      <div style={{background:'white', borderRadius:12, padding:10}}>
        {data.map((row,i)=>(
          <div key={i} style={{display:'flex', justifyContent:'space-between', padding:12, borderBottom:'1px solid #eee'}}>
            <span>{Object.values(row).join(' - ')}</span>
            <button onClick={()=>del(row[idField]||Object.values(row)[0])} style={{background:'#ef4444', color:'white', border:'none', padding:'5px 10px', borderRadius:6}}>Delete</button>
          </div>
        ))}
        {data.length===0 && <p>No data yet</p>}

      </div>
    </div>
  )
}

export default function App(){
  const [page,setPage]=useState('fruits')
  const menu=[['fruits',' Fruits'],['suppliers',' Suppliers'],['vendors',' Vendors'],['purchases',' Purchases'],['sales',' Sales'],['reports',' Reports']]
  return (
    <div style={{display:'flex', minHeight:'100vh', background:'#f0fdf4'}}>
      <div style={{width:220, background:'#14532d', color:'white', padding:20}}>
        <h2> Batloung Farm</h2>
        {menu.map(([k,label])=>(
          <div key={k} onClick={()=>setPage(k)} 

style={{padding:12, margin:'8px 0', borderRadius:8, cursor:'pointer', background:page===k?'#16a34a':''}}>{label}</div>
        ))}
        <p style={{marginTop:30, fontSize:12, opacity:0.7}}>901020419</p>
      </div>
      <div style={{flex:1}}>
        {page==='fruits' && <DataPage title="Fruits" endpoint="fruits" fields={['FruitName','Description']} idField="FruitID" />}
        {page==='suppliers' && <DataPage title="Suppliers" endpoint="suppliers" fields={['SupplierName']} idField="SupplierID" />}
        {page==='vendors' && <DataPage title="Vendors" endpoint="vendors" fields={['VendorName']} idField="VendorID" />}

        {page==='purchases' && <DataPage title="Purchases" endpoint="purchases" fields={['FruitName']} idField="PurchaseID" />}
        {page==='sales' && <DataPage title="Sales" endpoint="sales" fields={['FruitName']} idField="SaleID" />}
        {page==='reports' && <DataPage title="Reports" endpoint="reports" fields={['report']} idField="report" />}
      </div>
    </div>
  )
}


