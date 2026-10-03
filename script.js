/* ==================== EDIT YOUR CONTENT HERE ==================== */
const CONFIG = {
  title: "A Little Something for You 💜",              // ← landing heading
  subtitle: "I made this just for you. Open it when you're ready.", // ← landing subtitle
  laterReply: "Okay… I'll wait right here 💜",
  songLine: "Press play, and let this one be ours.",
  songFile: "our-song.mp3",               // ← PUT YOUR MUSIC HERE (or use the 'Choose song' button)
  finalMessage: "Thank you for being part of my favorite memories. 💜",
  // ← YOUR LETTER (keep it short and sweet)
  letter: "Dear Arn May Kyle Armero, \n\nThank you sa tanan gud 💜. Thank you for giving me a chance to know you. Thank you for being honest at the first, Thank you for not giving false hope gud. Thank you gud for being open gud sa akoa. I really appreciate everything gud Armie. Thank you pud for being gentle with my feelings gud. I know surprising cya the moment nga ning confess ko ato hehe, but I'm very genuine about what I felt about you, I do really like you not just a friend but more 💜. \n\nI really want to give you the best version of myself. I'm ready to give more effort for us , I'm ready for the man that you want me to be, I'm ready to take care of you, I'm ready to value you, respect you.  I'm ready to give a part of me for you, I'm ready to walk with you, I'm ready for the hurt, the pain, I'm ready to lead us for the path that God has set for us, I'm ready to love you of who you are, love your insecurities, your Flaws, your mistakes, your attitude, your moods, your Family, your life, and love us.\n\nI know this sounds too cliche HAHAAA, pero wala itong halong biro gud Hahahah, We've seen how both of us fall for each other. At first I thought nga wala koy chance sa imoa or kaya e reject ko nimo. But God has other plans gud. I really doubt myself gud. God knows how many times i give up on myself. Where i cried in the middle of night, in a random time at dawn. Asking myself 'Naa pabay koy chance mainlove ug tao, Im weak, bobo sa love, Blind ko if masakitan ko'. I dont know gud tbh. Pero God knows how many tears i shed . And God know how i wanted to have a partner. Not for fun and games, but for a lifetime gud, in good and bad, in sick or in health, in pain or not, in a boring season or exciting season, and where two souls feels safe. Until i met you and know you. Wala ko ga expect nga ikaw. A girl nga na kit an nko sa POV nko sa enrollment sa first year of college then ang ga tabang nko sa Face ratio. Wala ko ga dahom nga ma deeper akong ma feel nimo. And i will cherish that forever.\n\n\n\n\n\n\nSincerely yours,\nJames.",
  // ← YOUR PHOTOS: put files in assets/photos/ and edit the captions/dates here
  photos: [
    {src:"photo-01.jpg", caption:"Your Eyes"},
    {src:"photo-02.jpg", caption:"My First Photo of you"},
    {src:"photo-03.jpg", caption:"My favorite smile"},
    {src:"photo-04.jpg", caption:"Just us"},
    {src:"photo-05.jpg", caption:"Little adventures"},
    {src:"photo-06.jpg", caption:"Still choosing you"},
    {src:"photo-07.jpg", caption:"You 💜"},
    {src:"photo-08.jpg", caption:"It will always be you"},
    {src:"photo-09.jpg", caption:"Still the One"},
    {src:"photo-10.jpg", caption:"Cutiee you"},
    {src:"photo-11.jpg", caption:"This is for you"}
  ]
};
/* ================================================================ */

const $=s=>document.querySelector(s), $$=s=>document.querySelectorAll(s);
$("#t-title").textContent=CONFIG.title; $("#t-sub").textContent=CONFIG.subtitle;
$("#t-song").textContent=CONFIG.songLine; $("#t-final").textContent=CONFIG.finalMessage;

// Floating hearts & stars
const fl=$("#floaters");
for(let i=0;i<16;i++){const s=document.createElement("span");s.textContent=["💜","✨","⭐","💗"][i%4];
  s.style.cssText=`left:${Math.random()*100}%;font-size:${12+Math.random()*18}px;animation-duration:
  ${10+Math.random()*14}s;animation-delay:${-Math.random()*20}s`;fl.appendChild(s);}

// Navigation
let typer;
function go(id){
  $$(".screen").forEach(s=>s.classList.toggle("active",s.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
  if(id==="letter")typeLetter(); if(id==="flowers")bloom(true);
  if(id!=="music"&&false)audio.pause();
}
document.addEventListener("click",e=>{const b=e.target.closest("[data-go]");if(b)go(b.dataset.go)});
$("#later").onclick=()=>$("#laterMsg").textContent=CONFIG.laterReply;
$("#replay").onclick=()=>{$("#laterMsg").textContent="";go("landing")};

// Placeholder photo (used until you add real ones)
const tones=[["#C4B5FD","#7C3AED"],["#DDD6FE","#6D28D9"],["#E9D5FF","#9333EA"],
["#C7D2FE","#6366F1"],["#F5D0FE","#C026D3"],["#DDD6FE","#4C1D95"]];
const ph=i=>"data:image/svg+xml,"+encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' 
  viewBox='0 0 300 300'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='${tones[i%6]
  [0]}'/><stop offset='1' stop-color='${tones[i%6][1]}'/></linearGradient></defs><rect width='300' height='300' fill='url(#g)'/><text x='150' y='175' 
  font-size='90' text-anchor='middle'>💜</text></svg>`);

// Gallery
let photos=CONFIG.photos.map(p=>({...p}));
function renderGallery(){
  const g=$("#gallery"); g.innerHTML="";
  photos.forEach((p,i)=>{
    const b=document.createElement("button"); b.className="polaroid"; b.style.setProperty("--r",((i%2?1:-1)*(1+i%3))+"deg");
    b.setAttribute("aria-label","Open photo: "+p.caption);
    b.innerHTML=`<img alt="${p.caption}"><b></b><small></small>`;
    const im=b.querySelector("img"); im.src=p.src; im.onerror=()=>{im.onerror=null;im.src=ph(i)};
    b.querySelector("b").textContent=p.caption; b.querySelector("small").textContent=p.date;
    b.onclick=()=>{$("#mImg").src=im.src;$("#mImg").alt=p.caption;$("#mCap").textContent=p.caption+" · "+p.date;$("#modal").classList.add("open");$("#mClose").focus()};
    g.appendChild(b);
  });
}
$("#photoInput").onchange=e=>{
  const f=[...e.target.files]; if(!f.length)return;
  photos=f.map((file,i)=>({src:URL.createObjectURL(file),caption:(photos[i]||{}).caption||"Us 💜",date:(photos[i]||{}).date||""}));
  renderGallery();
};
$("#mClose").onclick=()=>$("#modal").classList.remove("open");
$("#modal").onclick=e=>{if(e.target.id==="modal")$("#modal").classList.remove("open")};
document.addEventListener("keydown",e=>{if(e.key==="Escape")$("#modal").classList.remove("open")});
renderGallery();

// Letter typewriter
function typeLetter(){
  clearInterval(typer); const box=$("#letterBox"); box.textContent=""; let i=0;
  if(matchMedia("(prefers-reduced-motion:reduce)").matches){box.textContent=CONFIG.letter;return}
  typer=setInterval(()=>{box.textContent+=CONFIG.letter[i++];if(i>=CONFIG.letter.length)clearInterval(typer)},25 );
}
$("#replayLetter").onclick=typeLetter;

// Flowers
const fls=["🌷","🌸","🌹","🌺","💐","🌻","🪻"];
function bloom(reset){
  const b=$("#bouquet"); if(reset)b.innerHTML="";
  for(let i=0;i<(reset?5:3);i++){const s=document.createElement("span");s.textContent=fls[Math.floor(Math.random()*fls.length)];s.style.animationDelay=i*.15+"s";b.appendChild(s)}
  if(b.children.length>18)b.removeChild(b.firstChild);
}
$("#bloom").onclick=()=>bloom(false);

// Music player (no autoplay)
const audio=$("#audio"), play=$("#play"), seek=$("#seek");
const fmt=t=>isFinite(t)?Math.floor(t/60)+":"+String(Math.floor(t%60)).padStart(2,"0"):"0:00";
audio.src=CONFIG.songFile; audio.volume=.8;
audio.onerror=()=>{ $("#musicNote").textContent="No song found at "+CONFIG.songFile+" — tap “Choose song” to pick one from your device." };
play.onclick=()=>{ audio.paused?audio.play().catch(()=>{}):audio.pause() };
audio.onplay=()=>play.textContent="⏸ Pause"; audio.onpause=()=>play.textContent="▶ Play our song";
audio.onloadedmetadata=()=>$("#dur").textContent=fmt(audio.duration);
audio.ontimeupdate=()=>{$("#cur").textContent=fmt(audio.currentTime);seek.value=audio.duration?audio.currentTime/audio.duration*100:0};
seek.oninput=()=>{if(audio.duration)audio.currentTime=seek.value/100*audio.duration};
$("#vol").oninput=e=>audio.volume=e.target.value;
$("#songInput").onchange=e=>{const f=e.target.files[0];if(!f)return;audio.src=URL.createObjectURL(f);
  $("#songName").textContent=f.name.replace(/\.[^.]+$/,"")+" 🎵";$("#musicNote").textContent="";audio.play().catch(()=>{})};
