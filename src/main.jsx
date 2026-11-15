import React,{useEffect,useState} from 'react';
import{createRoot}from'react-dom/client';
import{Github,Linkedin,Mail,ArrowUpRight,Download,Sun,Moon,Menu,X,Search,Code2,Layers,GraduationCap,Briefcase,ExternalLink,FileText,Plus,LogOut,Save,Trash2,Upload,Eye,EyeOff,Lock,Settings,ChevronRight,MapPin}from'lucide-react';
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
 {title:'Lecture AI Summarizer',category:'AI Tools',subtitle:'Browser Extension',description:'A Chrome extension that extracts webpage content and generates AI-powered lecture summaries. Includes a Node.js backend, Gemini API integration, fallback summarization, and copy/download notes.',stack:'JavaScript · Node.js · Gemini API · Chrome Extension APIs',featured:true,github:'',demo:'',image:'',},
 {title:'ShopGrid',category:'E-Commerce',subtitle:'E-Commerce Product Explorer & Study Desk',description:'A responsive product explorer with search, filters, sorting, pagination, product details and a persistent cart. Includes an Engineering Study Desk with project planning, calculators, SGPA tool and curated learning resources.',stack:'React · Vite · JavaScript · CSS',featured:true,github:'',demo:'',image:''},
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
function App(){const[content,setContent]=useState(initial);const[theme,setTheme]=useState(localStorage.getItem('ar-theme')||'dark');const[menu,setMenu]=useState(false);const[remote,setRemote]=useState(false);const[contentReady,setContentReady]=useState(false);const[activeProject,setActiveProject]=useState(0);const[projectQuery,setProjectQuery]=useState('');const[projectCategory,setProjectCategory]=useState('');
useEffect(()=>{document.documentElement.dataset.theme=theme;localStorage.setItem('ar-theme',theme)},[theme]);
useEffect(()=>{if(!sb){setContentReady(true);return}sb.from('portfolio_content').select('content').eq('id',1).maybeSingle().then(({data})=>{if(data?.content){setContent({...initial,...data.content});setRemote(true)}}).finally(()=>setContentReady(true))},[]);
if(isInviteCallback || authCallbackError)return <InviteSetup expired={!!authCallbackError}/>;
if(location.pathname.startsWith('/admin'))return contentReady?<Admin content={content} setContent={setContent} remote={remote}/>:<div className="login-page"><p className="muted">Loading portfolio content…</p></div>;
const projects=content.projects||[];
const categoryFor=p=>(p.category||p.subtitle||'Other').trim();
const categoryCounts=new Map();
projects.forEach(project=>{const category=categoryFor(project);categoryCounts.set(category,(categoryCounts.get(category)||0)+1)});
const categories=[...categoryCounts.keys()];
const projectEntries=projects.map((project,index)=>({project,index}));
const filteredProjects=projectEntries.filter(({project})=>{
 const matchesCategory=!projectCategory||categoryFor(project)===projectCategory;
 const searchable=[project.title,project.category,project.subtitle,project.description,project.stack].filter(Boolean).join(' ').toLowerCase();
 return matchesCategory&&searchable.includes(projectQuery.trim().toLowerCase());
});
const selectedEntry=filteredProjects.find(({index})=>index===activeProject)||filteredProjects[0];
const selectedProject=selectedEntry?.project;
return <div className="portfolio-shell">
<header className="terminal-nav">
  <a className="terminal-brand" href="#home"><span className="brand-mark">AR</span><span>{content.name}</span></a>
  <nav className={menu?'terminal-navlinks open':'terminal-navlinks'}>{['About','Skills','Projects','Experience','Education','Certificates','Contact'].map(x=><a key={x} onClick={()=>setMenu(false)} href={'#'+x.toLowerCase()}>{x}</a>)}</nav>
  <div className="terminal-actions">
    <span className="availability"><i/> Open to work</span>
    <a className="terminal-icon" href="/admin" aria-label="Owner login" title="Owner login"><Lock size={15}/></a>
    <button className="terminal-icon" aria-label="Toggle theme" onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>}</button>
    <button className="terminal-icon terminal-menu" aria-label="Toggle menu" onClick={()=>setMenu(!menu)}>{menu?<X size={17}/>:<Menu size={17}/>}</button>
  </div>
</header>
<main id="home" className="terminal-main">
  <section className="terminal-hero wrap">
    <div className="terminal-intro">
      <div className="prompt-line"><span>~/portfolio</span><span className="prompt-divider">/</span><span className="prompt-command">whoami</span></div>
      <div className="availability hero-availability"><i/> CURRENTLY OPEN TO WORK</div>
      <h1>Hi, I'm <span>{content.name}</span><br/><em>{content.role}</em></h1>
      <p className="hero-qualification">{content.qualification} <span>·</span> Expected {content.graduation}</p>
      <p className="hero-description">{content.intro}</p>
      <div className="actions terminal-buttons">
        <a className="btn primary" href="#projects">View projects <ArrowUpRight size={16}/></a>
        <a className="btn secondary" href={content.resume} target="_blank" rel="noreferrer"><Download size={15}/> Download résumé</a>
      </div>
      <div className="socials terminal-socials">
        <a href={content.github} target="_blank" rel="noreferrer"><Github size={16}/> GitHub</a>
        <a href={content.linkedin} target="_blank" rel="noreferrer"><Linkedin size={16}/> LinkedIn</a>
        <a href={'mailto:'+content.email}><Mail size={16}/> Email</a>
      </div>
    </div>
    <div className="editor-window" aria-label="Developer profile code preview">
      <div className="editor-titlebar">
        <div className="editor-dots"><i/><i/><i/></div>
        <div className="editor-tab"><Code2 size={13}/> developer.js</div>
        <span className="editor-lang">JS</span>
      </div>
      <div className="editor-body">
        <div className="code-row"><span className="code-number">01</span><code><b>const</b> developer = {'{'}</code></div>
        <div className="code-row"><span className="code-number">02</span><code>  <i>name</i>: <strong>"{content.name}"</strong>,</code></div>
        <div className="code-row"><span className="code-number">03</span><code>  <i>role</i>: <strong>"{content.role}"</strong>,</code></div>
        <div className="code-row"><span className="code-number">04</span><code>  <i>focus</i>: <strong>"{content.academicFocus} &amp; Web"</strong>,</code></div>
        <div className="code-row"><span className="code-number">05</span><code>  <i>cgpa</i>: <strong>"{content.cgpa}"</strong>,</code></div>
        <div className="code-row"><span className="code-number">06</span><code>  <i>currently</i>: <strong>"Open to work"</strong></code></div>
        <div className="code-row"><span className="code-number">07</span><code>{'}'};</code></div>
        <div className="code-cursor"><span>➜</span> npm run build <b>✓ ready</b></div>
      </div>
      <div className="editor-status"><span>main</span><span>UTF-8</span><span>JavaScript</span><span>● Ready</span></div>
    </div>
  </section>
  <div className="terminal-ticker"><span>BUILDING FOR THE WEB</span><i/><span>ARTIFICIAL INTELLIGENCE</span><i/><span>PYTHON &amp; JAVASCRIPT</span><i/><span>ALWAYS LEARNING</span></div>
  <section className="terminal-section wrap" id="about">
    <SectionHead n="01" title="A bit about me" sub="$ cat about.md"/>
    <div className="about-grid terminal-about">
      <div className="about-text"><p>{content.about}</p><p className="muted">{content.intro}</p></div>
      <div className="statbox terminal-stats"><div><strong>{content.cgpa}</strong><span>Current CGPA</span></div><div><strong>{content.graduation}</strong><span>Graduating</span></div><div><strong>{content.academicFocus}</strong><span>Area of focus</span></div></div>
    </div>
  </section>
  <section className="terminal-section wrap" id="skills">
    <SectionHead n="02" title="Skills matrix" sub="$ ls ./toolkit"/>
    <div className="skill-grid terminal-skill-grid">{content.skills.map((s,i)=><article className="skill-card terminal-skill-card" key={s.group}><div className="skill-heading"><div className="skill-icon">{i===0?<Code2 size={17}/>:i===1?<Layers size={17}/>:<Settings size={17}/>}</div><h3>{s.group}</h3></div><div className="skill-tags">{s.items.split(',').map(item=><span className="skill-tag" key={item}>{item.trim()}</span>)}</div></article>)}</div>
  </section>
  <section className="terminal-section wrap" id="projects">
    <SectionHead n="03" title="Selected projects" sub="$ ls ./projects"/>
    {projects.length>0&&<>
      <div className="project-toolbar">
        <label className="project-search"><Search size={16} aria-hidden="true"/><input type="search" aria-label="Search projects" placeholder="Search projects..." value={projectQuery} onChange={e=>setProjectQuery(e.target.value)}/>{projectQuery&&<button type="button" aria-label="Clear project search" onClick={()=>setProjectQuery('')}><X size={15}/></button>}</label>
        <div className="project-filters" role="group" aria-label="Filter projects by category">
          <button type="button" className={`project-filter${projectCategory===''?' active':''}`} aria-pressed={projectCategory===''} onClick={()=>setProjectCategory('')}>All <span>{projects.length}</span></button>
          {categories.map(category=><button type="button" className={`project-filter${projectCategory===category?' active':''}`} aria-pressed={projectCategory===category} key={category} onClick={()=>setProjectCategory(category)}>{category}<span>{categoryCounts.get(category)}</span></button>)}
        </div>
      </div>
      {filteredProjects.length>0?<div className="project-browser">
      <div className="project-selector" role="group" aria-label="Choose a project">
        {filteredProjects.map(({project:p,index:i})=><button type="button" className={`project-selector-item${selectedEntry?.index===i?' active':''}`} aria-pressed={selectedEntry?.index===i} aria-controls="selected-project-preview" key={`${p.title}-${i}`} onClick={()=>setActiveProject(i)}>
          <span className="project-selector-index">{String(i+1).padStart(2,'0')}</span>
          <span className="project-selector-copy"><span className="project-selector-kicker">{categoryFor(p)}</span><strong>{p.title}</strong><span className="project-selector-description">{p.description}</span></span>
          <ArrowUpRight className="project-selector-arrow" size={17}/>
        </button>)}
      </div>
      {selectedProject&&<ProjectPreview p={selectedProject} i={selectedEntry.index} total={projects.length}/>}
    </div>:<div className="project-empty"><p>No projects match your search or category.</p><button type="button" onClick={()=>{setProjectQuery('');setProjectCategory('')}}>Clear filters</button></div>}
    </>}
  </section>
  <section className="terminal-section wrap" id="experience">
    <SectionHead n="04" title="Experience" sub="$ git log --career"/>
    <div className="timeline terminal-timeline">{content.experience.map((e,i)=><article className="timeline-item" key={i}><div className="timeline-mark"><Briefcase size={16}/></div><div className="timeline-content"><div className="meta">{e.period}</div><h3>{e.role}</h3><p className="blue">{e.company}</p><p className="muted">{e.description}</p></div></article>)}</div>
  </section>
  <section className="terminal-section wrap" id="education">
    <SectionHead n="05" title="Education" sub="$ cat education.json"/>
    <div className="education-grid terminal-education-grid">{content.education.map((e,i)=><article className="edu-card" key={i}><GraduationCap size={18}/><div className="meta">{e.period}</div><h3>{e.degree}</h3><p>{e.institution}</p><span>{e.detail}</span></article>)}</div>
  </section>
  <section className="terminal-section wrap" id="certificates">
    <SectionHead n="06" title="Certificates & learning" sub="$ find ./certificates -type f"/>
    <div className="cert-grid terminal-cert-grid">{content.certificates.map((c,i)=><article className="cert-card" key={i}><div className="cert-top"><FileText size={17}/><span>{c.issuer}</span></div><h3>{c.title}</h3><p>{[c.period,c.score].filter(Boolean).join(' · ')}</p><a href={c.file} target="_blank" rel="noreferrer">View certificate <ArrowUpRight size={14}/></a></article>)}</div>
  </section>
  <section className="contact-section terminal-contact-section" id="contact">
    <div className="wrap contact-inner">
      <div className="contact-copy contact-info-card">
        <div className="eyebrow">07 / CONTACT</div>
        <h2>Let's build<br/><span>something useful.</span></h2>
        <p className="muted">Have an idea, project or opportunity? Feel free to get in touch.</p>
        <div className="contact-details">
          <a href={'mailto:'+content.email}><Mail size={17}/><span>{content.email}</span></a>
          <a href={content.github} target="_blank" rel="noreferrer"><Github size={17}/><span>GitHub</span></a>
          <a href={content.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/><span>LinkedIn</span></a>
          <div><MapPin size={17}/><span>Rohtas, Bihar, India</span></div>
        </div>
        <a className="btn primary contact-email-btn" href={'mailto:'+content.email}>Get in touch <ArrowUpRight size={16}/></a>
      </div>
      <ContactForm/>
    </div>
  </section>
</main>
<footer className="footer wrap terminal-footer"><a className="terminal-brand" href="#home"><span className="brand-mark">AR</span><span>{content.name}</span></a><p>Designed &amp; built by {content.name}.</p><div><a href={content.github} aria-label="GitHub"><Github/></a><a href={content.linkedin} aria-label="LinkedIn"><Linkedin/></a><a href="/admin" title="Owner dashboard" aria-label="Owner dashboard"><Lock size={15}/></a></div><span className="copyright">© {new Date().getFullYear()} {content.name}</span></footer>
</div>}
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
function ProjectPreview({p,i,total}){
 const filename=p.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')+'.js';
 const stack=(p.stack||'').split(' · ').filter(Boolean);
 return <article className="project-preview-panel" id="selected-project-preview" aria-live="polite">
  <div className="project-preview-visual">
   <div className="project-editor-bar"><span className="editor-dots"><i/><i/><i/></span><span>{filename}</span><span className="preview-label">LIVE PREVIEW</span></div>
   {p.image?<img className="project-screenshot" src={p.image} alt={p.title+" screenshot"}/>:<div className="project-preview-placeholder">
    <div className="project-preview-glow"/>
    <div className="project-preview-browser">
     <div className="project-preview-browserbar"><span/><span/><span/><i>{p.subtitle||'Project preview'}</i></div>
     <div className="project-preview-content"><span>{p.subtitle||'Selected project'}</span><strong>{p.title}</strong><p>{p.description}</p><div>{stack.slice(0,3).map(x=><i key={x}>{x}</i>)}</div></div>
    </div>
   </div>}
   <span className="project-preview-count">{String(i+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</span>
  </div>
  <div className="project-preview-info">
   <div className="project-kicker">{p.subtitle||'Selected project'}</div><h3>{p.title}</h3>
   <p>{p.description}</p>
   <div className="stack">{stack.map(x=><span key={x}>{x}</span>)}</div>
   <div className="project-links">{p.github&&<a href={p.github} target="_blank" rel="noreferrer"><Github size={15}/> Source</a>}{p.demo&&<a href={p.demo} target="_blank" rel="noreferrer"><ExternalLink size={15}/> Live demo</a>}{!p.github&&!p.demo&&<span className="muted small">Project links coming soon</span>}</div>
  </div>
 </article>;
}
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
{tab==='projects'&&<div className="admin-panel"><div className="panel-heading"><h2>Projects</h2><button className="btn secondary" onClick={()=>add('projects',{title:'New project',category:'',subtitle:'',description:'',stack:'',featured:false,github:'',demo:'',image:''})}><Plus/> Add project</button></div>{draft.projects.map((p,i)=><div className="editor-card" key={i}><div className="panel-heading"><b>Project {i+1} {p.featured&&'· Featured'}</b><button className="danger iconbtn" onClick={()=>remove('projects',i)}><Trash2/></button></div><div className="form-grid">{['title','category','subtitle','stack','github','demo','image'].map(k=><label>{k}<input value={p[k]||''} onChange={e=>listEdit('projects',i,k,e.target.value)}/></label>)}</div><label>Description<textarea value={p.description||''} onChange={e=>listEdit('projects',i,'description',e.target.value)}/></label><label>Upload project screenshot<input type="file" accept="image/*" onChange={e=>uploadProjectImage(e.target.files[0],i)}/></label><label className="check"><input type="checkbox" checked={!!p.featured} onChange={e=>listEdit('projects',i,'featured',e.target.checked)}/> Show in featured section</label></div>)}</div>}
{['skills','experience','education','certificates'].includes(tab)&&<div className="admin-panel"><div className="panel-heading"><h2>Manage {tab}</h2><button className="btn secondary" onClick={()=>add(tab,tab==='skills'?{group:'New category',items:''}:tab==='experience'?{role:'',company:'',period:'',description:''}:tab==='education'?{degree:'',institution:'',period:'',detail:''}:{title:'',issuer:'',period:'',score:'',file:''})}><Plus/> Add</button></div>{draft[tab].map((item,i)=><div className="editor-card" key={i}><div className="panel-heading"><b>Entry {i+1}</b><button className="danger iconbtn" onClick={()=>remove(tab,i)}><Trash2/></button></div><div className="form-grid">{Object.keys(item).map(k=><label>{k}<input value={item[k]||''} onChange={e=>listEdit(tab,i,k,e.target.value)}/></label>)}</div>{tab==='certificates'&&<label>Upload certificate PDF/image<input type="file" accept=".pdf,image/*" onChange={e=>uploadCertificate(e.target.files[0],i)}/></label>}</div>)}</div>}
<div className="admin-bottom"><span>Changes are saved to the live portfolio database.</span><button className="btn primary" onClick={save}><Save size={16}/> Save & Publish</button></div></main></div>}
createRoot(document.getElementById('root')).render(<App/>);
