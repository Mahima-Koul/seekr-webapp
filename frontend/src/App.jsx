import React, { useEffect, useMemo, useState } from "react";
import './App.css'; // create this file and paste CSS from below

// ---------- Icon components (clean outline SVGs) ----------
const IconSearch = ({className="ic"}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="6"/><path d="M21 21l-4.35-4.35"/></svg>
);
const IconBell = ({className="ic"}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 00-12 0v3.2a2 2 0 01-.6 1.4L4 17h5"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
);
const IconUser = ({className="ic"}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-3-3.87"/><path d="M4 21v-2a4 4 0 013-3.87"/><circle cx="12" cy="7" r="4"/></svg>
);
const IconPlus = ({className="ic"}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
);
const IconHome = ({className="ic"}) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9.5L12 4l9 5.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1V9.5z"/></svg>
);

// ---------- Sample data ----------
const SAMPLE = [
  { id: 'a1', type: 'lost', title: 'Black Leather Wallet', description: 'Bifold wallet with college ID & small cash. Lost near Central Library.', location: 'Central Library', contact: 'mahima@example.com', timestamp: Date.now() - 1000*60*60*24, likes: 8, comments: 2 },
  { id: 'a2', type: 'found', title: 'Blue Water Bottle', description: 'Stainless steel bottle with sticker. Found at cafeteria.', location: 'Cafeteria', contact: 'finder@example.com', timestamp: Date.now() - 1000*60*60*3, likes: 4, comments: 1 },
  { id: 'a3', type: 'lost', title: 'AirPods Case', description: 'White case, please describe engraving to claim.', location: 'Bus #22', contact: 'user2@example.com', timestamp: Date.now() - 1000*60*30, likes: 2, comments: 0 }
];

const LS_KEY = 'lf_react_v2_items';
const LS_NOTES = 'lf_react_v2_notes';

function timeAgo(ts){
  const s = Math.floor((Date.now()-ts)/1000);
  if(s < 60) return `${s}s`;
  if(s < 3600) return `${Math.floor(s/60)}m`;
  if(s < 86400) return `${Math.floor(s/3600)}h`;
  return `${Math.floor(s/86400)}d`;
}

// ---------- App ----------
export default function App(){
  const [items, setItems] = useState(()=>{
    try{ const raw = localStorage.getItem(LS_KEY); return raw ? JSON.parse(raw) : SAMPLE; }catch(e){return SAMPLE}
  });
  const [filter, setFilter] = useState('latest'); // latest | lost | found
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [notes, setNotes] = useState(()=>{
    try{ const r = localStorage.getItem(LS_NOTES); return r ? JSON.parse(r) : []; }catch(e){return []}
  });
  const unread = notes.filter(n=>!n.read).length;

  useEffect(()=>{ localStorage.setItem(LS_KEY, JSON.stringify(items)); },[items]);
  useEffect(()=>{ localStorage.setItem(LS_NOTES, JSON.stringify(notes)); },[notes]);

  const filtered = useMemo(()=>{
    let list = [...items];
    if(filter === 'lost') list = list.filter(i=>i.type==='lost');
    if(filter === 'found') list = list.filter(i=>i.type==='found');
    if(query.trim()){
      const q = query.toLowerCase(); list = list.filter(i=> i.title.toLowerCase().includes(q) || i.description.toLowerCase().includes(q) || i.location.toLowerCase().includes(q));
    }
    if(filter==='latest') list.sort((a,b)=>b.timestamp - a.timestamp);
    return list;
  },[items,filter,query]);

  const addItem = (payload) =>{
    const newItem = { id: Math.random().toString(36).slice(2,9), ...payload, timestamp: Date.now(), likes: 0, comments: 0 };
    setItems(s=>[newItem, ...s]);
    setNotes(n=>[{id:Math.random().toString(36).slice(2,9), text:`New ${payload.type} post: ${payload.title}`, ts: Date.now(), read:false}, ...n]);
  }

  const like = (id)=> setItems(s=>s.map(it=> it.id===id? {...it, likes: it.likes+1}: it));

  const markAllRead = ()=> setNotes(n=> n.map(x=>({...x, read:true})));

  return (
    <div className="app-root">
      <header className="topbar">
        <div className="left">
          <div className="brand">Lost<span className="accent">&</span>Found</div>
          <div className="search">
            <IconSearch className="icon" />
            <input placeholder="Search items, locations or descriptions" value={query} onChange={e=>setQuery(e.target.value)} />
            {query && <button className="clear" onClick={()=>setQuery('')}>×</button>}
          </div>
        </div>

        <div className="right">
          <button className="nav-btn" title="Home"><IconHome className="icon"/></button>
          <button className="nav-btn" title="Notifications" onClick={()=>{markAllRead(); alert('Notifications (demo)')}}>
            <div style={{position:'relative'}}>
              <IconBell className="icon"/>
              {unread>0 && <span className="dot">{unread}</span>}
            </div>
          </button>
          <button className="nav-btn profile" title="Profile"><IconUser className="icon"/></button>
          <button className="add-main" onClick={()=>setModalOpen(true)} title="Add new item"><IconPlus className="ic-wide"/></button>
        </div>
      </header>

      <main className="container">
        <aside className="sidebar">
          <nav className="side-nav">
            <button className={`side-item ${filter==='latest'?'active':''}`} onClick={()=>setFilter('latest')}>Latest</button>
            <button className={`side-item ${filter==='lost'?'active':''}`} onClick={()=>setFilter('lost')}>Lost</button>
            <button className={`side-item ${filter==='found'?'active':''}`} onClick={()=>setFilter('found')}>Found</button>
            <div className="divider"/>
            <button className="side-item">My Reports</button>
            <button className="side-item">Saved</button>
          </nav>
        </aside>

        <section className="feed">
          <div className="feed-head">
            <h2>Community Feed</h2>
            <p className="muted">Recent reports from your campus — respond quickly to help others.</p>
          </div>

          <div className="feed-grid">
            {filtered.map(item => (
              <article className="card" key={item.id}>
                <div className="card-left">
                  <div className={`tag ${item.type==='lost'?'lost':'found'}`}>{item.type.toUpperCase()}</div>
                  <h3>{item.title}</h3>
                  <p className="desc">{item.description}</p>
                  <div className="meta">{item.location} • {timeAgo(item.timestamp)}</div>
                  <div className="card-actions">
                    <button className="btn-outline" onClick={()=>{like(item.id)}}>Like • {item.likes}</button>
                    <button className="btn-outline">Comment • {item.comments}</button>
                    <button className="btn">Contact</button>
                  </div>
                </div>
                <div className="card-right">
                  <div className="thumb" aria-hidden></div>
                </div>
              </article>
            ))}
          </div>

        </section>

        <aside className="rightbar">
          <div className="card-small">
            <h3>Notifications</h3>
            <div className="note-list">
              {notes.length===0 && <div className="muted">No notifications yet</div>}
              {notes.map(n=> (
                <div key={n.id} className={`note ${n.read? 'read':''}`}><div className="note-text">{n.text}</div><div className="note-time">{timeAgo(n.ts)}</div></div>
              ))}
            </div>
            <button className="link-btn" onClick={()=>{setNotes([])}}>Clear</button>
          </div>

          <div className="card-small mt">
            <h3>Tips</h3>
            <ul className="tips">
              <li>Describe unique marks (engraving, sticker).</li>
              <li>Attach a photo when possible.</li>
              <li>Do not share sensitive info publicly.</li>
            </ul>
          </div>
        </aside>
      </main>

      {modalOpen && <AddModal onClose={()=>setModalOpen(false)} onAdd={(p)=>{addItem(p); setModalOpen(false)}} />}

      <footer className="footer">Made for class • Lost & Found • Prototype</footer>
    </div>
  );
}

function AddModal({onClose, onAdd}){
  const [type, setType] = useState('lost');
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');

  const submit = ()=>{
    if(!title.trim()||!desc.trim()) return alert('Please add title and description');
    onAdd({type, title, description:desc, location, contact});
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e=>e.stopPropagation()}>
        <div className="modal-head"><h3>Add new item</h3><button className="close" onClick={onClose}>✕</button></div>
        <div className="form">
          <div className="row">
            <label>Type</label>
            <select value={type} onChange={e=>setType(e.target.value)}>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          <div className="row">
            <label>Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="e.g. Black Wallet" />
          </div>
          <div className="row">
            <label>Description</label>
            <textarea value={desc} onChange={e=>setDesc(e.target.value)} placeholder="Where it was lost/found, unique marks" />
          </div>
          <div className="row two">
            <div>
              <label>Location</label>
              <input value={location} onChange={e=>setLocation(e.target.value)} placeholder="e.g. Library" />
            </div>
            <div>
              <label>Contact</label>
              <input value={contact} onChange={e=>setContact(e.target.value)} placeholder="Email or phone (optional)" />
            </div>
          </div>

          <div className="modal-actions">
            <button className="btn muted" onClick={onClose}>Cancel</button>
            <button className="btn" onClick={submit}>Publish</button>
          </div>
        </div>
      </div>
    </div>
  );
}

