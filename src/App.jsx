import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

// IAAF 2026 | Stand L28. Source: artist PDFs supplied by the exhibitor.
// Paintings are represented by labelled conservation-safe panels until the
// original artwork scans can be uploaded; never fabricate reproductions.
const translations = {
 tr: {exhibition:'İSTANBUL SANAT FUARI',intro:'SANAL SERGİ DENEYİMİ',heading1:'Sanat yolculuğu',heading2:'burada başlıyor.',description:'Fuar girişinden Pintura’nın L28 standına ilerleyin. Eserleri keşfedin, sergiyi kendi ritminizde gezin.',begin:'Sergiye doğru ilerle',direct:'Doğrudan L28 standına git',notice:'Fuar giriş sahnesi, yerleşim planından esinlenen temsili bir tasarımdır. Gerçek eser görselleri ve heykel sunumları hazırlanıyor.',arriving:'SERGİYE YAKLAŞIYORSUNUZ',inside:'L28 STANDINDASINIZ',route:'FUAR ROTASI',restart:'Baştan başla',skip:'Standa geç',explore:'Serbest gez',guided:'Rehberli tur',next:'Sonraki eser',hint:'Zemine tıklayarak ilerleyin · Esere tıklayarak yaklaşın · Sürükleyerek çevreye bakın',three:'HEYKEL / SERAMİK',wall:'DUVAR ESERİ',close:'Eser bilgilerini kapat',pending:'Gerçek eser görselleri hazırlanıyor. Geçici paneller eserlerin asılları değildir.',footer:'2026 · GRADPIXEL SANAL SERGİLERİ',layout:'5 × 6 M · AÇIK ÖN CEPHE · L28'},
 en: {exhibition:'ISTANBUL ART FAIR',intro:'AN IMMERSIVE EXHIBITION',heading1:'Art begins',heading2:'with arrival.',description:'Enter the fair, arrive at Pintura’s L28 stand and discover the artworks at your own pace.',begin:'Begin the journey',direct:'Go directly to L28',notice:'The fair approach is an interpretation of the floor plan. Artwork images and sculptural presentations are being prepared.',arriving:'ARRIVING AT THE EXHIBITION',inside:'INSIDE STAND L28',route:t.route,restart:'Restart',skip:'Skip to stand',explore:'Explore',guided:'Guided tour',next:'Next artwork',hint:'Click the floor to glide there · Click an artwork to approach · Drag to look around',three:'SCULPTURE / CERAMICS',wall:'WORK ON WALL',close:'Close artwork details',pending:'Artwork reproductions are being prepared. Temporary panels are not the original artworks.',footer:'2026 · GRADPIXEL VIRTUAL EXHIBITIONS',layout:'5 × 6 M · OPEN FRONT · L28'}
};
function localizedArtworkTitle(title,language){
 if(language==='en')return title;
 return title.replace(/^Untitled/,'İsimsiz').replace(/ — large$/,' — büyük').replace(/ — medium$/,' — orta').replace(/ — small$/,' — küçük');
}
function localizedArtworkSize(size,language){return language==='tr'?size.replace('Dimensions unconfirmed','Ölçü henüz doğrulanmadı').replace('diameter','çap'):size;}
const inventory = [
 {artist:'Tülin Oktav Doğruer',title:'Untitled I',size:'55 × 80 cm',image:'/iaaf-artworks/01-tulin-1.jpg',w:.55,h:.8,wall:'left'},
 {artist:'Tülin Oktav Doğruer',title:'Untitled II',size:'70 × 90 cm',image:'/iaaf-artworks/02-tulin-2.jpg',w:.7,h:.9,wall:'left'},
 {artist:'Ayazma',title:'Just Like Water',size:'90 × 90 cm',image:'/iaaf-artworks/03-ayazma.jpg',w:.9,h:.9,wall:'left'},
 {artist:'Birgül Ergün',title:'Öyle Bir Geçer Zaman ki',size:'110 × 110 cm',image:'/iaaf-artworks/04-birgul-1.jpg',w:1.1,h:1.1,wall:'back'},
 {artist:'Birgül Ergün',title:'Bir Varmış Bir Yokmuş',size:'20 × 25 cm',image:'/iaaf-artworks/05-birgul-2.jpg',w:.2,h:.25,wall:'left'},
 {artist:'Birsen Karaosman',title:'Untitled',size:'15 × 15 cm',image:'/iaaf-artworks/06-birsen.jpg',w:.15,h:.15,wall:'left'},
 {artist:'Erdinç Sakin',title:'Untitled (round)',size:'80 cm diameter',image:'/iaaf-artworks/07-erdinc-1.jpg',w:.8,h:.8,wall:'back'},
 {artist:'Erdinç Sakin',title:'Untitled II',size:'60 × 60 cm',image:'/iaaf-artworks/08-erdinc-2.jpg',w:.6,h:.6,wall:'right'},
 {artist:'Erdinç Sakin',title:'Untitled III',size:'60 × 50 cm',image:'/iaaf-artworks/09-erdinc-3.jpg',w:.6,h:.5,wall:'right'},
 {artist:'Haldun Yılmaz',title:'Görmek yetmez',size:'75 × 75 cm',image:'/iaaf-artworks/10-haldun.jpg',w:.75,h:.75,wall:'right'},
 {artist:'Özlen Yücelmiş',title:'Untitled',size:'Dimensions unconfirmed',image:'/iaaf-artworks/11-ozlen.jpg',w:.55,h:.7,wall:'right'},
 {artist:'Çiğdem Kılıç',title:'Untitled I',size:'80 × 60 cm',image:'/iaaf-artworks/12-cigdem-1.jpg',w:.8,h:.6,wall:'back'},
 {artist:'Çiğdem Kılıç',title:'Untitled II',size:'80 × 60 cm',image:'/iaaf-artworks/13-cigdem-2.jpg',w:.8,h:.6,wall:'right'},
 {artist:'Ece Kanışkan & Kayhan Öztürk',title:'Neşe Palamutları — large',size:'Ø 30 × 46 cm',image:'/iaaf-artworks/14-nesepalamutlari.jpg',sculpt:true,group:0},
 {artist:'Ece Kanışkan & Kayhan Öztürk',title:'Neşe Palamutları — medium',size:'Ø 20 × 32 cm',image:'/iaaf-artworks/14-nesepalamutlari.jpg',sculpt:true,group:0},
 {artist:'Ece Kanışkan & Kayhan Öztürk',title:'Neşe Palamutları — small',size:'Ø 12 × 20 cm',image:'/iaaf-artworks/14-nesepalamutlari.jpg',sculpt:true,group:0},
 {artist:'Kayhan Öztürk',title:'Sadakat',size:'10 × 30 × 50 cm',image:'/iaaf-artworks/15-sadakat.jpg',sculpt:true,group:1},
 {artist:'Kayhan Öztürk',title:'Araf I',size:'6 × 30 × 40 cm',image:'/iaaf-artworks/16-araf.jpg',sculpt:true,group:2},
 {artist:'Kayhan Öztürk',title:'Araf II',size:'6 × 30 × 45 cm',image:'/iaaf-artworks/16-araf.jpg',sculpt:true,group:2},
 {artist:'Şebnem Çetiner',title:'Hayal et',size:'Dimensions unconfirmed',image:'/iaaf-artworks/17-hayalet.jpg',sculpt:true,group:3}
];
const walls=inventory.filter(item=>!item.sculpt);
const sculpture=inventory.filter(item=>item.sculpt);
const left=walls.filter(item=>item.wall==='left');
const right=walls.filter(item=>item.wall==='right');
const back=walls.filter(item=>item.wall==='back');
const sculptureStations=[[-1.55,-8.75],[1.55,-8.75],[-1.5,-11.2],[1.5,-11.2]];
const wallStops=[
 ...left.map((a,i)=>({...a,position:[-2.45,1.52,-8.05-i*.96],eye:[-.05,1.62,-8.05-i*.96]})),
 ...back.map((a,i)=>({...a,position:[-1.48+i*1.48,1.55,-12.91],eye:[-1.48+i*1.48,1.65,-10.55]})),
 ...right.map((a,i)=>({...a,position:[2.45,1.52,-12.15+i*.96],eye:[.05,1.62,-12.15+i*.96]}))
];
const sculptStops=sculpture.map((a,i)=>({...a,position:[sculptureStations[a.group][0],.9,sculptureStations[a.group][1]],eye:[sculptureStations[a.group][0]*.55,1.6,sculptureStations[a.group][1]+1]}));
const stops=[...wallStops,...sculptStops];
// Arrival route is a cinematic interpretation, not a surveyed Lütfi Kırdar path.
const approach=[
 {eye:[0,1.65,23],look:[0,1.65,15],label:'Fair arrival'},
 {eye:[0,1.65,13.5],look:[0,1.6,0],label:'Exhibition aisle'},
 {eye:[0,1.65,-3.7],look:[0,1.5,-10],label:'Stand L28'},
 {eye:[0,1.65,-8.05],look:[0,1.6,-12.6],label:'Pintura exhibition'}
];

function CameraDirector({mode,onArrive,goTo,refApi}){
 const {camera,gl}=useThree();
 const target=useRef(new THREE.Vector3(...approach[0].eye));
 const focal=useRef(new THREE.Vector3(...approach[0].look));
 const reached=useRef(false);
 const yaw=useRef(0);
 const pitch=useRef(0);
 const drag=useRef(null);
 const lookDistance=useRef(6);
 useFrame((_,delta)=>{
  const d=Math.min(delta,.045);
  const alpha=1-Math.exp(-1.55*d);
  camera.position.lerp(target.current,alpha);
  const desired=new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(camera.position,focal.current,new THREE.Vector3(0,1,0)));
  camera.quaternion.slerp(desired,1-Math.exp(-2.1*d));
  if(camera.position.distanceTo(target.current)<.095&&!reached.current){ reached.current=true; onArrive(); }
 });
 React.useEffect(()=>{
  const stop=goTo;
  if(!stop)return;
  reached.current=false;
  target.current.set(...stop.eye);
  focal.current.set(...stop.look);
 },[goTo]);
 React.useEffect(()=>{
  if(!refApi)return;
  refApi.current={
   recenter:()=>{reached.current=false;target.current.set(0,1.6,-8.15);focal.current.set(0,1.55,-12);},
   walkTo:(x,z,focus)=>{
    // Keep visitors inside the public aisle or inside L28; do not pass through stand walls.
    const inStand=z<=-7.1;
    const safeX=THREE.MathUtils.clamp(x,inStand?-1.94:-4.5,inStand?1.94:4.5);
    const safeZ=THREE.MathUtils.clamp(z,inStand?-12.1:-6.7,23);
    const start=target.current.clone();
    target.current.set(safeX,1.62,safeZ);
    const dir=focus?new THREE.Vector3(focus[0]-safeX,focus[1]-1.62,focus[2]-safeZ):focal.current.clone().sub(start);
    if(dir.length()<.5)dir.set(0,0,-1);
    focal.current.set(safeX+dir.x,1.62+THREE.MathUtils.clamp(dir.y,-.45,.45),safeZ+dir.z);
    reached.current=true; // User navigation never advances a paused guided tour.
   }
  };
 },[refApi]);
 React.useEffect(()=>{
  const el=gl.domElement;
  const down=e=>{if(mode!=='explore')return;drag.current=[e.clientX,e.clientY];yaw.current=Math.atan2(focal.current.x-camera.position.x,-(focal.current.z-camera.position.z));};
  const move=e=>{
   if(!drag.current||mode!=='explore')return;
   yaw.current-=(e.clientX-drag.current[0])*.003;
   pitch.current=THREE.MathUtils.clamp(pitch.current+(e.clientY-drag.current[1])*.002,-.45,.45);
   drag.current=[e.clientX,e.clientY];
   const vec=new THREE.Vector3(Math.sin(yaw.current)*Math.cos(pitch.current),Math.sin(pitch.current),-Math.cos(yaw.current)*Math.cos(pitch.current));
   focal.current.copy(target.current).add(vec.multiplyScalar(lookDistance.current));
  };
  const up=()=>{drag.current=null;};
  el.addEventListener('pointerdown',down);window.addEventListener('pointermove',move);window.addEventListener('pointerup',up);
  return()=>{el.removeEventListener('pointerdown',down);window.removeEventListener('pointermove',move);window.removeEventListener('pointerup',up);};
 },[mode,gl]);
 return null;
}
function Label({children,position,color='#665b50',size=.105,rotation=[0,0,0],maxWidth=1.4}){
 return <Text position={position} rotation={rotation} fontSize={size} color={color} maxWidth={maxWidth} textAlign="center" anchorX="center" anchorY="middle">{children}</Text>;
}
function ArtworkSurface({art,width,height}){
 const [texture,setTexture]=useState(null);
 React.useEffect(()=>{
  let active=true,loaded=null;
  new THREE.TextureLoader().load(art.image,(t)=>{if(!active){t.dispose();return;}t.colorSpace=THREE.SRGBColorSpace;loaded=t;setTexture(t);},undefined,()=>{if(active)setTexture(null);});
  return()=>{active=false;if(loaded)loaded.dispose();};
 },[art.image]);
 if(!texture)return <><mesh position={[0,0,.027]}><planeGeometry args={[width,height]}/><meshStandardMaterial color="#c9c2b7" roughness={.9}/></mesh><Label position={[0,.012,.034]} size={Math.max(.045,Math.min(.072,width/8))} maxWidth={width*.86} color="#3f443f">{art.artist}{' / '}{art.title}</Label></>;
 const ratio=(texture.image?.width||1)/(texture.image?.height||1);
 const w=Math.min(width,height*ratio),h=Math.min(height,width/ratio);
 return <mesh position={[0,0,.031]}><planeGeometry args={[w,h]}/><meshBasicMaterial map={texture} toneMapped={false}/></mesh>;
}
function WallWork({art,index,side,onClick}){
 const isBack=side==='back';
 const x=isBack?-1.48+index*1.48:side==='left'?-2.475:2.475;
 const z=isBack?-12.94:side==='left'?-8.05-index*.96:-12.15+index*.96;
 const rotation=isBack?[0,0,0]:[0,side==='left'?Math.PI/2:-Math.PI/2,0];
 const center=art.h<.35?1.52:1.60;
 const scale=Math.min(1,art.w>.9?1:.92);
 return <group position={[x,center,z]} rotation={rotation} onClick={(e)=>{e.stopPropagation();onClick(art);}}>
  <mesh position={[0,0,-.01]} castShadow><boxGeometry args={[art.w*scale+.065,art.h*scale+.065,.06]}/><meshStandardMaterial color="#c7b99f" metalness={.42} roughness={.42}/></mesh>
  <ArtworkSurface art={art} width={art.w*scale} height={art.h*scale}/>
  <Label position={[0,-art.h*scale/2-.12,.034]} color="#655d53" size={.056} maxWidth={.9}>{art.size}</Label>
 </group>;
}
function Pedestal({group,items,onClick}){
 const [x,z]=sculptureStations[group];
 const height=group===0?.65:.88;
 return <group position={[x,0,z]}>
  <mesh castShadow receiveShadow position={[0,height/2,0]}><boxGeometry args={[group===0?1.05:.65,height,group===0?.62:.65]}/><meshStandardMaterial color="#e6e0d5" roughness={.82}/></mesh>
  <mesh position={[0,height+.025,0]}><boxGeometry args={[group===0?1.07:.67,.05,group===0?.64:.67]}/><meshStandardMaterial color="#c2b9a8" roughness={.55}/></mesh>
  {items.map((a,i)=><group key={a.title} position={[group===0?(i-1)*.28:group===2?(i-.5)*.21:0,height+.1,0]} onClick={e=>{e.stopPropagation();onClick(a);}}>
    <mesh castShadow position={[0,group===0?.17:.2,0]}>
     {group===0?<sphereGeometry args={[i===0?.14:i===1?.105:.075,12,12]}/>:<boxGeometry args={[.12,.35,.15]}/>}
     <meshStandardMaterial color={group===0?'#b39b72':group===3?'#9a7967':'#8f7559'} roughness={.75}/>
    </mesh>
   </group>)}
  <Label position={[0,.16,.35]} size={.065} color="#6f6254" maxWidth={.7}>{['Neşe Palamutları','Sadakat','Araf','Hayal et'][group]}</Label>
 </group>;
}
function FairArchitecture({onSelect,onFloorClick}){
 return <group>
  <color attach="background" args={['#e6e1da']}/>
  <fog attach="fog" args={['#e6e1da',29,57]}/>
  <ambientLight intensity={1.45}/>
  <hemisphereLight args={['#fff8eb','#a2a39e',1.3]}/>
  <directionalLight position={[6,11,7]} intensity={2.0} castShadow shadow-mapSize={[1024,1024]} />
  <mesh receiveShadow position={[0,-.07,4]} onClick={(e)=>{e.stopPropagation();if(e.delta<6)onFloorClick(e.point);}}><boxGeometry args={[29,.12,54]}/><meshStandardMaterial color="#c9c5be" roughness={.88}/></mesh>
  {[-11,11].map(x=><group key={x} position={[x,0,8]}>
    <mesh position={[0,2,0]}><boxGeometry args={[.12,4,32]}/><meshStandardMaterial color="#f1eee8" roughness={.9}/></mesh>
    {[-4,4,12].map(z=><group key={z} position={[0,1.75,z]}>
     <mesh><boxGeometry args={[.19,3.5,.24]}/><meshStandardMaterial color="#bdb5aa"/></mesh>
     <Label position={[x<0?.3:-.3,.25,0]} size={.12} color="#776c5d" rotation={[0,x<0?Math.PI/2:-Math.PI/2,0]}>ART FAIR</Label>
    </group>)}
  </group>)}
  <mesh position={[0,4,20.2]}><boxGeometry args={[10,.6,.5]}/><meshStandardMaterial color="#3d3935"/></mesh>
  <Label position={[0,3.98,20.6]} size={.34} color="#f4eee5" maxWidth={9}>ISTANBUL ART FAIR</Label>
  {[-7,7].map(x=><group key={x} position={[x,1.3,6]}>
   <mesh><boxGeometry args={[4.5,2.6,4]}/><meshStandardMaterial color="#ece8e0" roughness={.8}/></mesh>
   <mesh position={[0,2,0]}><boxGeometry args={[4.55,1,.05]}/><meshStandardMaterial color="#c7bdae"/></mesh>
  </group>)}
  <mesh receiveShadow position={[0,-.012,-10]} onClick={(e)=>{e.stopPropagation();if(e.delta<6)onFloorClick(e.point);}}><boxGeometry args={[5,.045,6]}/><meshStandardMaterial color="#e8e5de" roughness={.76}/></mesh>
  <mesh position={[-2.5,1.65,-10]} receiveShadow><boxGeometry args={[.09,3.3,6]}/><meshStandardMaterial color="#f7f5f0" roughness={.96}/></mesh>
  <mesh position={[2.5,1.65,-10]} receiveShadow><boxGeometry args={[.09,3.3,6]}/><meshStandardMaterial color="#f7f5f0" roughness={.96}/></mesh>
  <mesh position={[0,1.65,-13]} receiveShadow><boxGeometry args={[5.03,3.3,.09]}/><meshStandardMaterial color="#f7f5f0" roughness={.96}/></mesh>
  <mesh position={[0,3.3,-7.02]}><boxGeometry args={[5,.22,.17]}/><meshStandardMaterial color="#343332" metalness={.1}/></mesh>
  <Label position={[0,3.28,-6.89]} size={.17} color="#f1e9da" maxWidth={4.8}>PINTURA   /   L28</Label>
  {[-1.75,1.75].map(x=><group key={x}>
    <mesh position={[x,3.2,-10]}><cylinderGeometry args={[.075,.075,.16,10]}/><meshStandardMaterial color="#282727"/></mesh>
    <spotLight position={[x,3.15,-10]} angle={.68} intensity={16} penumbra={.95} distance={5} target-position={[x,1,-13]}/>
  </group>)}
  {left.map((a,i)=><WallWork key={a.artist+a.title} art={a} index={i} side="left" onClick={onSelect}/>)}
  {back.map((a,i)=><WallWork key={a.artist+a.title} art={a} index={i} side="back" onClick={onSelect}/>)}
  {right.map((a,i)=><WallWork key={a.artist+a.title} art={a} index={i} side="right" onClick={onSelect}/>)}
  {[0,1,2,3].map(g=><Pedestal key={g} group={g} items={sculpture.filter(a=>a.group===g)} onClick={onSelect}/>)}
  <Label position={[0,.04,-4.3]} rotation={[-Math.PI/2,0,0]} size={.32} color="#81766b" maxWidth={4}>L28</Label>
 </group>;
}
function Stage({phase,index,mode,onReached,onSelect,onFloorClick,controller}){
 const destination=useMemo(()=>{
  if(phase==='arrival')return approach[Math.min(index,approach.length-1)];
  const a=stops[index]||stops[0];
  return {eye:a.eye,look:a.position};
 },[phase,index]);
 return <>
  <CameraDirector mode={mode} onArrive={onReached} goTo={destination} refApi={controller}/>
  <FairArchitecture onSelect={onSelect} onFloorClick={onFloorClick}/>
 </>;
}
class GalleryErrorBoundary extends React.Component {
 constructor(props){super(props);this.state={error:null};}
 static getDerivedStateFromError(error){return {error};}
 componentDidCatch(error,info){console.error('Pintura 3D scene:',error,info);}
 render(){
  if(this.state.error)return <div className="iaaf-scene-error" role="alert">
   <strong>3D sergi sahnesi yüklenemedi.</strong>
   <p>Tarayıcınızın WebGL desteğini kontrol edin veya sayfayı yenileyin.</p>
   <button onClick={()=>this.setState({error:null})}>Tekrar dene</button>
  </div>;
  return this.props.children;
 }
}
export default function App(){
 const [language,setLanguage]=useState('tr');
 const t=translations[language];
 const [phase,setPhase]=useState('welcome');
 const [index,setIndex]=useState(0);
 const [mode,setMode]=useState('guided');
 const [selected,setSelected]=useState(null);
 const [paused,setPaused]=useState(false);
 const [ready,setReady]=useState(false);
 const [walkHint,setWalkHint]=useState(false);
 const control=useRef(null);
 const timer=useRef(null);
 const stopTimer=useCallback(()=>{clearTimeout(timer.current);timer.current=null;},[]);
 React.useEffect(()=>()=>stopTimer(),[stopTimer]);
 const begin=()=>{stopTimer();setSelected(null);setPaused(false);setMode('guided');setIndex(0);setPhase('arrival');};
 const enter=()=>{stopTimer();setIndex(0);setPhase('works');setPaused(false);};
 const next=()=>{stopTimer();setSelected(null);setPaused(false);setIndex(i=>i+1>=stops.length?0:i+1);};
 const navigateTo=(point,focus)=>{
  if(phase==='welcome')return;
  stopTimer();setPaused(true);setMode('explore');setSelected(null);setWalkHint(true);
  control.current?.walkTo(point.x,point.z,focus);
 };
 const selectArtwork=(art)=>{
  if(phase==='welcome')return;
  stopTimer();setPaused(true);setMode('explore');setSelected(art);
  const stop=stops.find(s=>s===art || (s.artist===art.artist&&s.title===art.title));
  if(stop)control.current?.walkTo(stop.eye[0],stop.eye[2],stop.position);
 };
 const reached=()=>{
  if(paused||mode==='explore')return;
  stopTimer();
  if(phase==='arrival')timer.current=setTimeout(()=>setIndex(i=>{if(i>=approach.length-1){setPhase('works');return 0;}return i+1;}),index===approach.length-1?2100:850);
  if(phase==='works'){
   const art=stops[index];if(art)setSelected(art);
   timer.current=setTimeout(()=>{setSelected(null);setIndex(i=>(i+1)%stops.length);},11500);
  }
 };
 return <div className="iaaf-page" lang={language}>
  <div className="iaaf-scene">
   {phase==='welcome'
    ? <div className="iaaf-welcome-backdrop" aria-hidden="true"><div className="iaaf-backdrop-sign">PINTURA<span>ISTANBUL · L28</span></div></div>
    : <GalleryErrorBoundary><Canvas shadows dpr={[1,1.25]} camera={{position:approach[0].eye,fov:58,near:.05,far:85}} onCreated={()=>setReady(true)}>
       <Stage phase={phase} index={index} mode={mode} onReached={reached} onSelect={selectArtwork} onFloorClick={(point)=>navigateTo(point)} controller={control}/>
      </Canvas></GalleryErrorBoundary>}
  </div>
  <header className="iaaf-topbar"><div className="iaaf-mark">PINTURA</div><div className="iaaf-place">{t.exhibition} <span>·</span> L28</div></header>
  {phase==='welcome'&&<section className="iaaf-welcome">
   <p className="iaaf-eyebrow">{t.intro}</p>
   <h1>{t.heading1}<br/><em>{t.heading2}</em></h1>
   <p>{t.description}</p>
   <div className="iaaf-welcome-actions"><button onClick={begin}>{t.begin} <span>→</span></button><button className="iaaf-secondary" onClick={enter}>{t.direct}</button></div>
   <small>{t.notice}</small>
  </section>}
  {phase!=='welcome'&&<div className="iaaf-controls">
    <div className="iaaf-stage"><span className="iaaf-dot"/> {phase==='arrival'?t.arriving:t.inside} <span className="iaaf-counter">{phase==='works'?String(index+1).padStart(2,'0')+' / '+stops.length:'FAIR ROUTE'}</span></div>
    <div className="iaaf-buttons">
     <button onClick={begin}>{t.restart}</button>
     {phase==='arrival'?<button className="iaaf-main" onClick={enter}>{t.skip} →</button>:<>
      <button onClick={()=>{stopTimer();setPaused(true);setSelected(null);setMode('explore');control.current?.recenter();}}>{t.explore}</button>
      <button onClick={()=>{stopTimer();setMode('guided');setPaused(false);setSelected(null);setIndex(i=>(i+1)%stops.length);}}>{t.guided}</button>
      <button className="iaaf-main" onClick={next}>{t.next} →</button>
     </>}
    </div>
   </div>}
  {phase!=='welcome'&&<div className="iaaf-navigation-tip">{t.hint}</div>}
  {selected&&phase==='works'&&<aside className="iaaf-workdetail" aria-live="polite">
    <button aria-label={t.close} onClick={()=>{setSelected(null);setPaused(true);stopTimer();}} className="iaaf-close">×</button>
    <p className="iaaf-eyebrow">{selected.sculpt?t.three:t.wall}</p>
    <h2>{localizedArtworkTitle(selected.title,language)}</h2><p className="iaaf-artist">{selected.artist}</p><p className="iaaf-size">{localizedArtworkSize(selected.size,language)}</p><img className="iaaf-catalogue-preview" src={selected.image} alt={selected.title} onError={e=>{e.currentTarget.style.display='none';}}/>
    <p className="iaaf-disclaimer">{t.pending}</p>
   </aside>}
  <footer className="iaaf-footer"><div className="iaaf-language" role="group" aria-label="Language / Dil"><button type="button" lang="tr" aria-pressed={language==="tr"} onClick={()=>setLanguage("tr")}>TR</button><span>/</span><button type="button" lang="en" aria-pressed={language==="en"} onClick={()=>setLanguage("en")}>EN</button></div><span>{t.footer}</span><span>{t.layout}</span></footer>
 </div>;
}
