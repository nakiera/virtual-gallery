import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import './App.css';

// IAAF 2026 | Stand L28. Source: artist PDFs supplied by the exhibitor.
// Paintings are represented by labelled conservation-safe panels until the
// original artwork scans can be uploaded; never fabricate reproductions.
const inventory = [
 {artist:'Tülin Oktav Doğruer',title:'Untitled I',size:'55 × 80 cm',w:.55,h:.8,wall:'left'},
 {artist:'Tülin Oktav Doğruer',title:'Untitled II',size:'70 × 90 cm',w:.7,h:.9,wall:'left'},
 {artist:'Ayazma',title:'Just Like Water',size:'90 × 90 cm',w:.9,h:.9,wall:'left'},
 {artist:'Birgül Ergün',title:'Öyle Bir Geçer Zaman ki',size:'110 × 110 cm',w:1.1,h:1.1,wall:'back'},
 {artist:'Birgül Ergün',title:'Bir Varmış Bir Yokmuş',size:'20 × 25 cm',w:.2,h:.25,wall:'left'},
 {artist:'Birsen Karaosman',title:'Untitled',size:'15 × 15 cm',w:.15,h:.15,wall:'left'},
 {artist:'Erdinç Sakin',title:'Untitled (round)',size:'80 cm diameter',w:.8,h:.8,wall:'back'},
 {artist:'Erdinç Sakin',title:'Untitled II',size:'60 × 60 cm',w:.6,h:.6,wall:'right'},
 {artist:'Erdinç Sakin',title:'Untitled III',size:'60 × 50 cm',w:.6,h:.5,wall:'right'},
 {artist:'Haldun Yılmaz',title:'Görmek yetmez',size:'75 × 75 cm',w:.75,h:.75,wall:'right'},
 {artist:'Özlen Yücelmiş',title:'Untitled',size:'Dimensions unconfirmed',w:.55,h:.7,wall:'right'},
 {artist:'Çiğdem Kılıç',title:'Untitled I',size:'80 × 60 cm',w:.8,h:.6,wall:'back'},
 {artist:'Çiğdem Kılıç',title:'Untitled II',size:'80 × 60 cm',w:.8,h:.6,wall:'right'},
 {artist:'Ece Kanışkan & Kayhan Öztürk',title:'Neşe Palamutları — large',size:'Ø 30 × 46 cm',sculpt:true,group:0},
 {artist:'Ece Kanışkan & Kayhan Öztürk',title:'Neşe Palamutları — medium',size:'Ø 20 × 32 cm',sculpt:true,group:0},
 {artist:'Ece Kanışkan & Kayhan Öztürk',title:'Neşe Palamutları — small',size:'Ø 12 × 20 cm',sculpt:true,group:0},
 {artist:'Kayhan Öztürk',title:'Sadakat',size:'10 × 30 × 50 cm',sculpt:true,group:1},
 {artist:'Kayhan Öztürk',title:'Araf I',size:'6 × 30 × 40 cm',sculpt:true,group:2},
 {artist:'Kayhan Öztürk',title:'Araf II',size:'6 × 30 × 45 cm',sculpt:true,group:2},
 {artist:'Şebnem Çetiner',title:'Hayal et',size:'Dimensions unconfirmed',sculpt:true,group:3}
];
const walls=inventory.filter(item=>!item.sculpt);
const sculpture=inventory.filter(item=>item.sculpt);
const left=walls.filter(item=>item.wall==='left');
const right=walls.filter(item=>item.wall==='right');
const back=walls.filter(item=>item.wall==='back');
const sculptureStations=[[-1.55,-8.75],[1.55,-8.75],[-1.5,-11.2],[1.5,-11.2]];
const wallStops=[
 ...left.map((a,i)=>({...a,position:[-2.45,1.52,-8.05-i*.96],eye:[-.55,1.58,-8.05-i*.96]})),
 ...back.map((a,i)=>({...a,position:[-1.48+i*1.48,1.55,-12.91],eye:[-1.48+i*1.48,1.6,-11.1]})),
 ...right.map((a,i)=>({...a,position:[2.45,1.52,-12.15+i*.96],eye:[.55,1.58,-12.15+i*.96]}))
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

function CameraDirector({mode,step,onArrive,goTo,refApi}){
 const {camera,gl}=useThree();
 const target=useRef(new THREE.Vector3(...approach[0].eye));
 const focal=useRef(new THREE.Vector3(...approach[0].look));
 const reached=useRef(false);
 const yaw=useRef(0);
 const pitch=useRef(0);
 const drag=useRef(null);
 useFrame((_,delta)=>{
  const d=Math.min(delta,.045);
  const alpha=1-Math.exp(-2.05*d);
  camera.position.lerp(target.current,alpha);
  const desired=new THREE.Quaternion().setFromRotationMatrix(new THREE.Matrix4().lookAt(camera.position,focal.current,new THREE.Vector3(0,1,0)));
  camera.quaternion.slerp(desired,1-Math.exp(-3.5*d));
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
  refApi.current={recenter:()=>{reached.current=false;target.current.set(0,1.6,-8);focal.current.set(0,1.55,-12);}};
 },[refApi]);
 React.useEffect(()=>{
  const el=gl.domElement;
  const down=e=>{if(mode!=='explore')return;drag.current=[e.clientX,e.clientY];yaw.current=Math.atan2(focal.current.x-camera.position.x,-(focal.current.z-camera.position.z));};
  const move=e=>{
   if(!drag.current||mode!=='explore')return;
   yaw.current-=(e.clientX-drag.current[0])*.003;
   pitch.current=THREE.MathUtils.clamp(pitch.current+(e.clientY-drag.current[1])*.002,-.45,.45);
   drag.current=[e.clientX,e.clientY];
   const vec=new THREE.Vector3(Math.sin(yaw.current),Math.sin(pitch.current),-Math.cos(yaw.current));
   focal.current.copy(camera.position).add(vec.multiplyScalar(7));
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
function WallWork({art,index,side,onClick}){
 const isBack=side==='back';
 const x=isBack?-1.48+index*1.48:side==='left'?-2.475:2.475;
 const z=isBack?-12.94:side==='left'?-8.05-index*.96:-12.15+index*.96;
 const rotation=isBack?[0,0,0]:[0,side==='left'?Math.PI/2:-Math.PI/2,0];
 const center=art.h<.35?1.52:1.60;
 const scale=Math.min(1,art.w>.9?1:.92);
 return <group position={[x,center,z]} rotation={rotation} onClick={(e)=>{e.stopPropagation();onClick(art);}}>
  <mesh position={[0,0,-.01]} castShadow><boxGeometry args={[art.w*scale+.065,art.h*scale+.065,.06]}/><meshStandardMaterial color="#c7b99f" metalness={.42} roughness={.42}/></mesh>
  <mesh position={[0,0,.027]}><planeGeometry args={[art.w*scale,art.h*scale]}/><meshStandardMaterial color={index%3===0?'#c6b9a5':index%3===1?'#d3d2c9':'#b4c1bd'} roughness={.9}/></mesh>
  <Label position={[0,.012,.034]} size={Math.max(.045,Math.min(.072,art.w/8))} maxWidth={art.w*.86} color="#3f443f">{art.artist}{'\n'}{art.title}</Label>
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
function FairArchitecture({onSelect}){
 return <group>
  <color attach="background" args={['#e6e1da']}/>
  <fog attach="fog" args={['#e6e1da',29,57]}/>
  <ambientLight intensity={1.45}/>
  <hemisphereLight args={['#fff8eb','#a2a39e',1.3]}/>
  <directionalLight position={[6,11,7]} intensity={2.0} castShadow shadow-mapSize={[1024,1024]} />
  <mesh receiveShadow position={[0,-.07,4]}><boxGeometry args={[29,.12,54]}/><meshStandardMaterial color="#cbc9c2" roughness={.88}/></mesh>
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
  <mesh receiveShadow position={[0,-.012,-10]}><boxGeometry args={[5,.045,6]}/><meshStandardMaterial color="#e8e5de" roughness={.76}/></mesh>
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
function Stage({phase,index,mode,onReached,onSelect,controller}){
 const destination=useMemo(()=>{
  if(phase==='arrival')return approach[Math.min(index,approach.length-1)];
  const a=stops[index]||stops[0];
  return {eye:a.eye,look:a.position};
 },[phase,index]);
 return <>
  <CameraDirector mode={mode} onArrive={onReached} goTo={destination} refApi={controller}/>
  <FairArchitecture onSelect={onSelect}/>
 </>;
}
export default function App(){
 const [phase,setPhase]=useState('welcome');
 const [index,setIndex]=useState(0);
 const [mode,setMode]=useState('guided');
 const [selected,setSelected]=useState(null);
 const [paused,setPaused]=useState(false);
 const [ready,setReady]=useState(false);
 const control=useRef(null);
 const timer=useRef(null);
 const stopTimer=useCallback(()=>{clearTimeout(timer.current);timer.current=null;},[]);
 React.useEffect(()=>()=>stopTimer(),[stopTimer]);
 const begin=()=>{stopTimer();setSelected(null);setPaused(false);setMode('guided');setIndex(0);setPhase('arrival');};
 const enter=()=>{stopTimer();setIndex(0);setPhase('works');setPaused(false);};
 const next=()=>{stopTimer();setSelected(null);setPaused(false);setIndex(i=>i+1>=stops.length?0:i+1);};
 const reached=()=>{
  if(paused||mode==='explore')return;
  stopTimer();
  if(phase==='arrival')timer.current=setTimeout(()=>setIndex(i=>{if(i>=approach.length-1){setPhase('works');return 0;}return i+1;}),index===approach.length-1?2100:850);
  if(phase==='works'){
   const art=stops[index];if(art)setSelected(art);
   timer.current=setTimeout(()=>{setSelected(null);setIndex(i=>(i+1)%stops.length);},11500);
  }
 };
 return <div className="iaaf-page">
  <div className="iaaf-scene"><Canvas shadows dpr={[1,1.5]} camera={{position:approach[0].eye,fov:64,near:.05,far:85}} onCreated={()=>setReady(true)}>
   <Stage phase={phase==='welcome'?'arrival':phase} index={index} mode={mode} onReached={reached} onSelect={(art)=>{stopTimer();setPaused(true);setSelected(art);}} controller={control}/>
  </Canvas></div>
  <header className="iaaf-topbar"><div className="iaaf-mark">GRADPIXEL <span>/</span> PINTURA</div><div className="iaaf-place">ISTANBUL ART FAIR <span>·</span> L28</div></header>
  {phase==='welcome'&&<section className="iaaf-welcome">
   <p className="iaaf-eyebrow">AN IMMERSIVE EXHIBITION</p>
   <h1>Art begins<br/><em>with arrival.</em></h1>
   <p>Step inside the fair, arrive at Pintura's L28 stand and discover twenty works by eleven participating artist catalogues.</p>
   <div className="iaaf-welcome-actions"><button onClick={begin}>Begin the journey <span>→</span></button><button className="iaaf-secondary" onClick={enter}>Go directly to L28</button></div>
   <small>Architectural approach is an interpretation of the fair plan. Artwork images and sculptural scans are being prepared.</small>
  </section>}
  {phase!=='welcome'&&<div className="iaaf-controls">
    <div className="iaaf-stage"><span className="iaaf-dot"/> {phase==='arrival'?'ARRIVING AT THE EXHIBITION':'INSIDE STAND L28'} <span className="iaaf-counter">{phase==='works'?String(index+1).padStart(2,'0')+' / '+stops.length:'FAIR ROUTE'}</span></div>
    <div className="iaaf-buttons">
     <button onClick={begin}>Restart</button>
     {phase==='arrival'?<button className="iaaf-main" onClick={enter}>Skip to stand →</button>:<>
      <button onClick={()=>{stopTimer();setPaused(true);setSelected(null);setMode('explore');control.current?.recenter();}}>Explore</button>
      <button onClick={()=>{stopTimer();setMode('guided');setPaused(false);setSelected(null);setIndex(i=>(i+1)%stops.length);}}>Guided tour</button>
      <button className="iaaf-main" onClick={next}>Next artwork →</button>
     </>}
    </div>
   </div>}
  {selected&&phase==='works'&&<aside className="iaaf-workdetail" aria-live="polite">
    <button aria-label="Close artwork details" onClick={()=>{setSelected(null);setPaused(true);stopTimer();}} className="iaaf-close">×</button>
    <p className="iaaf-eyebrow">{selected.sculpt?'SCULPTURE / CERAMICS':'WORK ON WALL'}</p>
    <h2>{selected.title}</h2><p className="iaaf-artist">{selected.artist}</p><p className="iaaf-size">{selected.size}</p>
    <p className="iaaf-disclaimer">Artwork reproduction pending. The 3D stand uses labelled scale-study panels, not invented images.</p>
   </aside>}
  <footer className="iaaf-footer"><span>2026 · GRADPIXEL VIRTUAL EXHIBITIONS</span><span>5 × 6 M · OPEN FRONT · L28</span></footer>
 </div>;
}
