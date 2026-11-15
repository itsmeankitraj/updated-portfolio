import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import{Github,Linkedin,Mail,ArrowUpRight,Download,Sun,Moon,Menu,X,Code2,Layers,GraduationCap,Briefcase,ExternalLink,FileText,Plus,LogOut,Save,Trash2,Upload,Eye,EyeOff,Lock,Settings,ChevronRight,MapPin}from'lucide-react';
import{createClient}from'@supabase/supabase-js';
import'./style.css';

const supabaseUrl=import.meta.env.VITE_SUPABASE_URL;
const supabaseKey=import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY || import.meta.env.VITE_SUPABASE_ANON_KEY;
const sb=supabaseUrl&&supabaseKey?createClient(supabaseUrl,supabaseKey,{auth:{autoRefreshToken:true,persistSession:true,detectSessionInUrl:true,flowType:'implicit'}}):null;
const initialAuthFragment = new URLSearchParams(window.location.hash.replace(/^#/, ''));
const isInviteCallback = initialAuthFragment.get('type') === 'invite';
const authCallbackError = initialAuthFragment.get('error_code') || initialAuthFragment.get('error');
const initial={
 name:'Ankit Raj',role:'Software Developer',qualification:'B.Tech CSE (AI)',cgpa:'8.43/10',graduation:'2027',academicFocus:'AI',tagline:'Building ideas into digital experiences.',intro:'I enjoy turning thoughtful ideas into useful, well-crafted software. I work across web development and Python, with a growing interest in AI-powered products.',
 email:'ankitraj10386@gmail.com',phone:'7461801102',github:'https://github.com/itsmeankitraj',linkedin:'https://www.linkedin.com/in/itsmeankitraj/',photo:'/assets/ankit-profile.png',resume:'/assets/Ankit-Raj-Resume.pdf',
 about:'B.Tech Computer Science & Engineering (Artificial Intelligence) student at Government Engineering College, Gopalganj. Interested in building practical software, clean interfaces and intelligent tools.',
 skills:[{group:'Programming',items:'C, C++, Python, JavaScript'},{group:'Web Development',items:'HTML5, CSS3, React, Node.js, Responsive Design'},{group:'Database & Core CS',items:'SQL, DBMS, DSA, OOP, OS, CN, COA'},{group:'Interests',items:'AI/ML, IoT, Cyber Security'}],
 projects:[
 {title:'Lecture AI Summarizer',subtitle:'Browser Extension',description:'A Chrome extension that extracts webpage content and generates AI-powered lecture summaries. Includes a Node.js backend, Gemini API integration, fallback summarization, and copy/download notes.',stack:'JavaScript · Node.js · Gemini API · Chrome Extension APIs',featured:true,github:'',demo:'',image:'',},
 {title:'ShopGrid',subtitle:'E-Commerce Product Explorer & Study Desk',description:'A responsive product explorer with search, filters, sorting, pagination, product details and a persistent cart. Includes an Engineering Study Desk with project planning, calculators, SGPA tool and curated learning resources.',stack:'React · Vite · JavaScript · CSS',featured:true,github:'',demo:'',image:''},
 ],
 experience:[{role:'Web Development Intern',company:'InternCourse',period:'June 2025',description:'Completed a 4-week hands-on internship (01–28 June 2025), covering HTML, CSS, JavaScript, responsive UI/UX, React, Node.js, REST APIs, performance optimization and deployment. Score: 92%.'}],
 education:[{degree:'B.Tech, Computer Science & Engineering (AI)',institution:'Government Engineering College, Gopalganj',period:'2023–2027 (Expected)',detail:'CGPA: 8.43/10'},{degree:'Senior Secondary (12th)',institution:'BSEB, Patna',period:'2023',detail:'76.8%'},{degree:'Secondary (10th)',institution:'CBSE',period:'2021',detail:'81.2%'}],
 certificates:[
 {title:'Human Computer Interaction (In English)',issuer:'NPTEL',period:'Jan–Apr 2026',score:'98% · Elite + Top 5%',file:'/assets/certificates/NPTEL-HCI.pdf'},
 {title:'Data Science for Engineers',issuer:'NPTEL',period:'Jul–Sep 2026',score:'70% · Elite',file:'/assets/certificates/NPTEL-Data-Science.pdf'},
 {title:'Cybersecurity Essentials',issuer:'Cisco Networking Academy',period:'Aug 2024',score:'',file:'/assets/certificates/Cisco-Cybersecurity-Essentials.pdf'},
 {title:'Advanced Programming in C',issuer:'Cisco Networking Academy',period:'Mar 2024',score:'',file:'/assets/certificates/Cisco-Advanced-Programming-C.pdf'},
 {title:'Web Development Internship',issuer:'InternCourse',period:'June 2025',score:'92%',file:'/assets/certificates/InternCourse-Web-Development.pdf'}
 ]
};
function App(){const[content,setContent]=useState(initial);const[theme,setTheme]=useState(localStorage.getItem('ar-theme')||'dark');const[menu,setMenu]=useState(false);const[remote,setRemote]=useState(false);const[contentReady,setContentReady]=useState(false);
useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('ar-theme',theme)},[theme]);
useEffect(()=>{if(!sb){setContentReady(true);return}sb.from('portfolio_content').select('content').eq('id',1).maybeSingle().then(({data})=>{if(data?.content){setContent({...initial,...data.content});setRemote(true)}}).finally(()=>setContentReady(true))},[]);
if(isInviteCallback || authCallbackError)return <InviteSetup expired={!!authCallbackError}/>;
if(location.pathname.startsWith('/admin'))return contentReady?<Admin content={content} setContent={setContent} remote={remote}/>:<div className="login-page"><p className="muted">Loading portfolio content…</p></div>;
const featured=content.projects.filter(p=>p.featured),others=content.projects.filter(p=>!p.featured);
return <><header className="nav"><a className="brand brand-lockup" href="#home"><span className="brand-mark">AR</span><span className="brand-name">Ankit Raj</span></a><nav className={menu?'navlinks open':'navlinks'}>{['About','Skills','Projects','Experience','Certificates','Contact'].map(x=><a key={x} onClick={()=>setMenu(false)} href={'#'+x.toLowerCase()}>{x}</a>)}</nav><div className="navactions"><a className="iconbtn owner-access" href="/admin" aria-label="Owner login" title="Owner login"><Lock size={16}/></a><button className="iconbtn" aria-label="Toggle theme" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button className="iconbtn mobilemenu" onClick={()=>setMenu(!menu)}>{menu?<X/>:<Menu/>}</button></div></header>
<main id="home">
<section className="hero wrap"><div className="hero-copy reveal"><div className="eyebrow"><span className="statusdot"/> SOFTWARE DEVELOPMENT · AI & WEB</div><h1>Hi, I'm <span>{content.name.split(' ')[0]}</span><br/>{content.name.split(' ').slice(1).join(' ')}.</h1><h2>{content.role}<span className="blue"> · {content.qualification}</span></h2><p className="lead">{content.tagline}</p><p className="muted">{content.intro}</p><div className="actions"><a className="btn primary" href="#projects">Explore Projects <ArrowUpRight size={17}/></a><a className="btn secondary" href={content.resume} target="_blank" rel="noreferrer"><Download size={16}/> Resume</a></div><div className="socials"><a href={content.github} target="_blank" rel="noreferrer"><Github/> GitHub</a><a href={content.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a><a href={'mailto:'+content.email}><Mail/> Email</a></div></div><div className="hero-visual reveal"><div className="photo-halo"/><div className="photo-frame"><img src={content.photo} alt="Ankit Raj professional portrait"/></div><div className="float-card code-card"><Code2 size={17}/><span>Software Developer</span><b>↗</b></div><div className="float-card mini-card"><span className="mini-dot"/> Building & learning</div><div className="visual-orbit"/></div></section>
<div className="ticker"><span>SOFTWARE DEVELOPMENT</span><i/> <span>WEB TECHNOLOGIES</span><i/> <span>AI & PYTHON</span><i/> <span>PROBLEM SOLVING</span></div>
<section className="section wrap" id="about"><SectionHead n="01" title="A little about me" sub="Curiosity, code and continuous learning."/><div className="about-grid"><div className="about-text"><p>{content.about}</p><p className="muted">I value readable code, thoughtful user experiences and learning by building. My portfolio highlights the projects and experiences that best represent that journey.</p></div><div className="statbox"><div><strong>{content.cgpa}</strong><span>CGPA</span></div><div><strong>{content.graduation}</strong><span>Expected graduation</span></div><div><strong>{content.academicFocus}</strong><span>Academic focus</span></div></div></div></section>
<section className="section wrap" id="skills"><SectionHead n="02" title="Tools I work with" sub="A practical toolkit across software and web development."/><div className="skill-grid">{content.skills.map((s,i)=><article className="skill-card" key={s.group}><div className="skill-icon">{i===0?<Code2/>:i===1?<Layers/>:<Settings/>}</div><h3>{s.group}</h3><p>{s.items}</p></article>)}</div></section>
<section className="section wrap" id="projects"><SectionHead n="03" title="Selected work" sub="A couple of projects I’m especially proud of."/><div className="project-grid">{featured.map((p,i)=><Project p={p} i={i} key={p.title}/>)}</div>{others.length>0&&<><h3 className="minor-title">More projects</h3><div className="project-grid secondary-projects">{others.map((p,i)=><Project p={p} i={i+2} key={p.title}/>)}</div></>}</section>
<section className="section wrap" id="experience"><SectionHead n="04" title="Experience" sub="Learning through hands-on work."/><div className="timeline">{content.experience.map((e,i)=><article className="timeline-item" key={i}><div className="timeline-mark"><Briefcase size={17}/></div><div className="timeline-content"><div className="meta">{e.period}</div><h3>{e.role}</h3><p className="blue">{e.company}</p><p className="muted">{e.description}</p></div></article>)}</div></section>
<section className="section wrap" id="education"><SectionHead n="05" title="Education" sub="The foundation behind the work."/><div className="education-grid">{content.education.map((e,i)=><article className="edu-card" key={i}><GraduationCap/><div className="meta">{e.period}</div><h3>{e.degree}</h3><p>{e.institution}</p><span>{e.detail}</span></article>)}</div></section>
<section className="section wrap" id="certificates"><SectionHead n="06" title="Certificates & learning" sub="Recognitions and courses that support my learning journey."/><div className="cert-grid">{content.certificates.map((c,i)=><article className="cert-card" key={i}><div className="cert-top"><FileText/><span>{c.issuer}</span></div><h3>{c.title}</h3><p>{[c.period,c.score].filter(Boolean).join(' · ')}</p><a href={c.file} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={15}/></a></article>)}</div></section>
<section className="contact-section" id="contact">
  <div className="wrap contact-inner">
    <div className="contact-copy contact-info-card">
      <div className="eyebrow">CONTACT</div>
      <h2>Let's Build Something<br/><span>Together</span></h2>
      <p className="muted">Have an idea, project or opportunity? Feel free to get in touch.</p>
      <div className="contact-details">
        <a href={'mailto:'+content.email}><Mail size={18}/><span>{content.email}</span></a>
        <a href={content.github} target="_blank" rel="noreferrer"><Github size={18}/><span>GitHub</span></a>
        <a href={content.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18}/><span>LinkedIn</span></a>
        <div><MapPin size={18}/><span>Rohtas, Bihar, India</span></div>
      </div>
      <a className="btn primary contact-email-btn" href={'mailto:'+content.email}>Get in touch <ArrowUpRight/></a>
    </div>
    <ContactForm />
  </div>
</section>
</main><footer className="footer wrap"><a className="brand brand-lockup" href="#home"><span className="brand-mark">AR</span><span className="brand-name">Ankit Raj</span></a><p>Designed & built with care by {content.name}.</p><div><a href={content.github}><Github/></a><a href={content.linkedin}><Linkedin/></a><a href="/admin" title="Owner"><Lock size={15}/></a></div><span className="copyright">© {new Date().getFullYear()} {content.name}</span></footer></>}
function InviteSetup({expired=false}){
 const [session,setSession]=useState(null),[ready,setReady]=useState(false),[password,setPassword]=useState(''),[confirm,setConfirm]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[success,setSuccess]=useState(false);
 useEffect(()=>{
   if(!sb){setError('Supabase is not configured for this website.');setReady(true);return}
   let live=true;
   sb.auth.getSession().then(({data,error})=>{if(!live)return;if(error)setError(error.message);setSession(data?.session||null);setReady(true)});
   const {data:{subscription}}=sb.auth.onAuthStateChange((_event,nextSession)=>{if(live&&nextSession)setSession(nextSession)});
   return()=>{live=false;subscription.unsubscribe()};
 },[]);
 async function setNewPassword(e){
   e.preventDefault();setError('');
   if(password.length<8){setError('Please use at least 8 characters.');return}
   if(password!==confirm){setError('The passwords do not match.');return}
   if(!session){setError('The invitation session is missing or expired. Request a fresh invitation.');return}
   setBusy(true);
   const {error}=await sb.auth.updateUser({password});
   setBusy(false);
   if(error){setError(error.message);return}
   setSuccess(true);
   window.history.replaceState({},document.title,window.location.pathname);
   window.setTimeout(()=>window.location.assign('/admin'),900);
 }
 return <div className="login-page"><a className="brand brand-lockup login-brand" href="/"><span className="brand-mark">AR</span><span className="brand-name">Ankit Raj</span></a><form className="login-card" onSubmit={setNewPassword}>
   <div className="admin-icon"><Lock/></div><div className="eyebrow">OWNER ACCOUNT SETUP</div>
   <h1>{expired?'Invitation link expired.':success?'Password saved.':'Set your admin password.'}</h1>
   {expired?<><p className="muted">This invitation link has expired or has already been used. In Supabase, set the Site URL to this app address, add it to Redirect URLs, then resend the invitation. Open only the newest email link.</p><a className="btn primary full" href="/">Back to portfolio</a></>:
   !ready?<p className="muted">Checking your invitation link…</p>:
   !session?<><p className="muted">We could not find an active invitation session. Check the Supabase Site URL and Redirect URLs, then resend the invitation and open the newest email link.</p>{error&&<div className="notice error">{error}</div>}<a className="btn primary full" href="/">Back to portfolio</a></>:
   success?<p className="muted">Your password has been set. Opening the owner dashboard…</p>:
   <><p className="muted">Create the password you will use to access your private portfolio dashboard.</p>
   <label>New password<input type="password" minLength="8" autoComplete="new-password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="At least 8 characters"/></label>
   <label>Confirm password<input type="password" minLength="8" autoComplete="new-password" value={confirm} onChange={e=>setConfirm(e.target.value)} required placeholder="Enter it again"/></label>
   {error&&<div className="notice error">{error}</div>}
   <button className="btn primary full" disabled={busy}>{busy?'Saving password…':'Set password & continue'} <ChevronRight size={17}/></button></>}
   <a className="back-link" href="/">← Back to portfolio</a><small>Owner setup · Supabase Auth</small>
 </form></div>;
}

function ContactForm(){
 const [name,setName]=useState('');
 const [email,setEmail]=useState('');
 const [message,setMessage]=useState('');
 const [busy,setBusy]=useState(false);
 const [status,setStatus]=useState('');
 const [statusType,setStatusType]=useState('');

 async function submitMessage(e){
  e.preventDefault();
  setStatus('');
  setStatusType('');

  if(!sb){
   setStatus('The message service is temporarily unavailable. Please email me directly.');
   setStatusType('error');
   return;
  }

  setBusy(true);
  const {error}=await sb.from('invitations').insert({
   name:name.trim(),
   email:email.trim(),
   message:message.trim()
  });
  setBusy(false);

  if(error){
   console.error('Contact form submission failed:',error);
   setStatus('Sorry, your message could not be sent. Please try again or email me directly.');
   setStatusType('error');
   return;
  }

  setName('');
  setEmail('');
  setMessage('');
  setStatus('Thank you! Your message has been sent successfully.');
  setStatusType('success');
 }

 return <form className="contact-form" onSubmit={submitMessage}>
  <h3>Send me a message</h3>
  <label htmlFor="contact-name">Your name</label>
  <input
   id="contact-name"
   name="name"
   type="text"
   autoComplete="name"
   value={name}
   onChange={e=>setName(e.target.value)}
   placeholder="Enter your name"
   maxLength={100}
   required
  />
  <label htmlFor="contact-email">Your email</label>
  <input
   id="contact-email"
   name="email"
   type="email"
   autoComplete="email"
   value={email}
   onChange={e=>setEmail(e.target.value)}
   placeholder="you@example.com"
   maxLength={254}
   required
  />
  <label htmlFor="contact-message">Message</label>
  <textarea
   id="contact-message"
   name="message"
   value={message}
   onChange={e=>setMessage(e.target.value)}
   placeholder="Write your message..."
   rows={5}
   maxLength={5000}
   required
  />
  <button className="btn primary" type="submit" disabled={busy}>
   {busy?'Sending...':'Send Message'}
   <ArrowUpRight size={17}/>
  </button>
  {status&&<p className={`contact-status ${statusType}`} role="status" aria-live="polite">{status}</p>}
 </form>;
}

function SectionHead({n,title,sub}){return <div className="section-head"><span className="section-number">{n} /</span><div><h2>{title}</h2><p className="muted">{sub}</p></div></div>}
function Project({p,i}){return <article className={'project-card '+(i===0?'featured-project':'')}><div className="project-visual">{p.image?<img className="project-screenshot" src={p.image} alt={p.title+" screenshot"}/>:<div className="project-art"><span className="art-chip">{i===0?'AI / EXTENSION':'REACT / WEB'}</span><div className="art-window"><div className="windowbar"><i/><i/><i/></div><div className="art-lines"><b/><b/><b/><b/></div><div className="art-glow">{i===0?'AI':'SG'}</div></div></div>}<span className="project-index">0{i+1}</span></div><div className="project-info"><div className="project-kicker">{p.subtitle}</div><h3>{p.title}<ArrowUpRight size={18}/></h3><p>{p.description}</p><div className="stack">{p.stack.split(' · ').map(x=><span key={x}>{x}</span>)}</div><div className="project-links">{p.github&&<a href={p.github} target="_blank" rel="noreferrer"><Github size={16}/> Source</a>}{p.demo&&<a href={p.demo} target="_blank" rel="noreferrer"><ExternalLink size={16}/> Live demo</a>}{!p.github&&!p.demo&&<span className="muted small">Links can be added from Owner Admin</span>}</div></div></article>}
function Admin({content,setContent,remote}){const[session,setSession]=useState(null),[email,setEmail]=useState(''),[password,setPassword]=useState(''),[err,setErr]=useState(''),[busy,setBusy]=useState(false),[tab,setTab]=useState('messages'),[draft,setDraft]=useState(content),[msg,setMsg]=useState(''),[invitations,setInvitations]=useState([]),[messagesLoading,setMessagesLoading]=useState(false),[messagesError,setMessagesError]=useState(''),[messageRefresh,setMessageRefresh]=useState(0);
useEffect(()=>{if(sb)sb.auth.getSession().then(({data})=>setSession(data.session));},[]);
useEffect(()=>setDraft(content),[content]);
useEffect(()=>{
 if(!session||tab!=='messages'||!sb)return;
 let active=true;
 setMessagesLoading(true);
 setMessagesError('');
 sb.from('invitations').select('id,name,email,message,created_at').order('created_at',{ascending:false})
  .then(({data,error})=>{
   if(!active)return;
   if(error){setMessagesError(error.message);setInvitations([]);}
   else{setInvitations(data||[]);}
  })
  .catch(error=>{if(active){setMessagesError(error.message||'Could not load messages.');setInvitations([]);}})
  .finally(()=>{if(active)setMessagesLoading(false)});
 return()=>{active=false};
},[session,tab,messageRefresh]);
async function login(e){e.preventDefault();if(!sb){setErr('Supabase is not configured yet. Follow SETUP.md to connect your owner login.');return}setBusy(true);setErr('');const{data,error}=await sb.auth.signInWithPassword({email,password});setBusy(false);if(error)setErr(error.message);else setSession(data.session)}
async function save(){if(!sb){setMsg('Connect Supabase first (SETUP.md). Local preview cannot publish edits.');return}setBusy(true);const{error}=await sb.from('portfolio_content').upsert({id:1,content:draft,updated_at:new Date().toISOString()});setBusy(false);if(error)setMsg(error.message);else{setContent(draft);setMsg('Saved & published ✓')}}
async function uploadFile(file,path){if(!sb||!file)return;setBusy(true);const name=Date.now()+'-'+file.name.replace(/\s/g,'-');const{error}=await sb.storage.from('portfolio-assets').upload(name,file,{upsert:true});setBusy(false);if(error){setMsg(error.message);return}const{data}=sb.storage.from('portfolio-assets').getPublicUrl(name);setDraft(d=>({...d,[path]:data.publicUrl}));setMsg('Uploaded. Click Save & Publish to apply.')}
async function uploadProjectImage(file,index){if(!sb||!file)return;setBusy(true);const name=Date.now()+'-'+file.name.replace(/\s/g,'-');const{error}=await sb.storage.from('portfolio-assets').upload(name,file,{upsert:true});setBusy(false);if(error){setMsg(error.message);return}const{data}=sb.storage.from('portfolio-assets').getPublicUrl(name);listEdit('projects',index,'image',data.publicUrl);setMsg('Project screenshot uploaded. Click Save & Publish to apply.')}
async function uploadCertificate(file,index){if(!sb||!file)return;setBusy(true);const name=Date.now()+'-'+file.name.replace(/\s/g,'-');const{error}=await sb.storage.from('portfolio-assets').upload(name,file,{upsert:true});setBusy(false);if(error){setMsg(error.message);return}const{data}=sb.storage.from('portfolio-assets').getPublicUrl(name);listEdit('certificates',index,'file',data.publicUrl);setMsg('Certificate uploaded. Click Save & Publish to apply.')}
const update=(key,val)=>setDraft(d=>({...d,[key]:val}));
const listEdit=(key,index,field,value)=>setDraft(d=>({...d,[key]:d[key].map((x,i)=>i===index?{...x,[field]:value}:x)}));
const add=(key,obj)=>setDraft(d=>({...d,[key]:[...(d[key]||[]),obj]}));
const remove=(key,index)=>setDraft(d=>({...d,[key]:d[key].filter((_,i)=>i!==index)}));
if(!session)return <div className="login-page"><a className="brand brand-lockup login-brand" href="/"><span className="brand-mark">AR</span><span className="brand-name">Ankit Raj</span></a><form className="login-card" onSubmit={login}><div className="admin-icon"><Lock/></div><div className="eyebrow">OWNER ACCESS</div><h1>Welcome back.</h1><p className="muted">Sign in to manage your portfolio.</p><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="owner@email.com"/></label><label>Password<input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="Your password"/></label>{err&&<div className="notice error">{err}</div>}<button className="btn primary full" disabled={busy}>{busy?'Signing in…':'Sign in securely'} <ChevronRight size={17}/></button><a className="back-link" href="/">← Back to portfolio</a><small>Owner account only · Supabase Auth</small></form></div>;
return <div className="admin-layout"><aside className="admin-sidebar"><a className="brand brand-lockup" href="/"><span className="brand-mark">AR</span><span className="brand-name">Ankit Raj</span></a><p className="admin-label">OWNER DASHBOARD</p>{['messages','profile','projects','skills','experience','education','certificates'].map(t=><button className={tab===t?'active':''} onClick={()=>setTab(t)} key={t}>{t[0].toUpperCase()+t.slice(1)}</button>)}<a className="admin-side-link" href="/">↗ View website</a><button onClick={()=>sb.auth.signOut().then(()=>setSession(null))}><LogOut size={16}/> Logout</button></aside><main className="admin-main"><div className="admin-top"><div><div className="eyebrow">CONTENT MANAGER</div><h1>{tab[0].toUpperCase()+tab.slice(1)}</h1></div><button className="btn primary" onClick={save} disabled={busy}><Save size={16}/>{busy?'Saving…':'Save & Publish'}</button></div>{msg&&<div className="notice">{msg}</div>}
{tab==='messages'&&<div className="admin-panel">
 <div className="panel-heading"><div><h2>Contact Messages</h2><p className="muted">Messages submitted through your portfolio contact form.</p></div><button className="btn secondary" onClick={()=>setMessageRefresh(v=>v+1)} disabled={messagesLoading}>{messagesLoading?'Refreshing…':'Refresh'}</button></div>
 {messagesLoading&&<p className="muted">Loading messages…</p>}
 {messagesError&&<div className="notice error">Could not load messages: {messagesError}<br/>Check the Supabase read policy for the owner account.</div>}
 {!messagesLoading&&!messagesError&&invitations.length===0&&<p className="muted">No messages yet. New contact form submissions will appear here.</p>}
 {!messagesLoading&&!messagesError&&invitations.map(item=><article className="editor-card" key={item.id}>
  <div className="panel-heading"><b>{item.name||'Visitor'}</b><span className="meta">{item.created_at?new Date(item.created_at).toLocaleString():'Date unavailable'}</span></div>
  <p><a href={'mailto:'+item.email} className="blue">{item.email||'No email provided'}</a></p>
  <p style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',lineHeight:1.7,marginBottom:0}}>{item.message||'No message text'}</p>
 </article>)}
 </div>}
{tab==='profile'&&<div className="admin-panel"><h2>Profile & links</h2><div className="form-grid">{[['name','Name'],['role','Professional title'],['qualification','Qualification'],['cgpa','CGPA'],['graduation','Expected graduation'],['academicFocus','Academic focus'],['tagline','Tagline'],['email','Email'],['phone','Phone'],['github','GitHub URL'],['linkedin','LinkedIn URL'],['photo','Photo URL'],['resume','Resume URL']].map(([k,l])=><label key={k}>{l}<input value={draft[k]||''} onChange={e=>update(k,e.target.value)}/></label>)}</div><label>Introduction<textarea value={draft.intro||''} onChange={e=>update('intro',e.target.value)}/></label><label>About<textarea value={draft.about||''} onChange={e=>update('about',e.target.value)}/></label><div className="upload-row"><label>Upload profile photo<input type="file" accept="image/*" onChange={e=>uploadFile(e.target.files[0],'photo')}/></label><label>Upload resume PDF<input type="file" accept="application/pdf" onChange={e=>uploadFile(e.target.files[0],'resume')}/></label></div></div>}
{tab==='projects'&&<div className="admin-panel"><div className="panel-heading"><h2>Projects</h2><button className="btn secondary" onClick={()=>add('projects',{title:'New project',subtitle:'',description:'',stack:'',featured:false,github:'',demo:'',image:''})}><Plus/> Add project</button></div>{draft.projects.map((p,i)=><div className="editor-card" key={i}><div className="panel-heading"><b>Project {i+1} {p.featured&&'· Featured'}</b><button className="danger iconbtn" onClick={()=>remove('projects',i)}><Trash2/></button></div><div className="form-grid">{['title','subtitle','stack','github','demo','image'].map(k=><label>{k}<input value={p[k]||''} onChange={e=>listEdit('projects',i,k,e.target.value)}/></label>)}</div><label>Description<textarea value={p.description||''} onChange={e=>listEdit('projects',i,'description',e.target.value)}/></label><label>Upload project screenshot<input type="file" accept="image/*" onChange={e=>uploadProjectImage(e.target.files[0],i)}/></label><label className="check"><input type="checkbox" checked={!!p.featured} onChange={e=>listEdit('projects',i,'featured',e.target.checked)}/> Show in featured section</label></div>)}</div>}
{['skills','experience','education','certificates'].includes(tab)&&<div className="admin-panel"><div className="panel-heading"><h2>Manage {tab}</h2><button className="btn secondary" onClick={()=>add(tab,tab==='skills'?{group:'New category',items:''}:tab==='experience'?{role:'',company:'',period:'',description:''}:tab==='education'?{degree:'',institution:'',period:'',detail:''}:{title:'',issuer:'',period:'',score:'',file:''})}><Plus/> Add</button></div>{draft[tab].map((item,i)=><div className="editor-card" key={i}><div className="panel-heading"><b>Entry {i+1}</b><button className="danger iconbtn" onClick={()=>remove(tab,i)}><Trash2/></button></div><div className="form-grid">{Object.keys(item).map(k=><label>{k}<input value={item[k]||''} onChange={e=>listEdit(tab,i,k,e.target.value)}/></label>)}</div>{tab==='certificates'&&<label>Upload certificate PDF/image<input type="file" accept=".pdf,image/*" onChange={e=>uploadCertificate(e.target.files[0],i)}/></label>}</div>)}</div>}
<div className="admin-bottom"><span>Changes are saved to the live portfolio database.</span><button className="btn primary" onClick={save}><Save size={16}/> Save & Publish</button></div></main></div>}
createRoot(document.getElementById('root')).render(<App/>);
