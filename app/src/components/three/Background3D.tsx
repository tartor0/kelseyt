'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0A0F);
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 25);

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // ── Icosahedron ──
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(8, 2),
      new THREE.MeshBasicMaterial({ color: 0x1E6F9F, wireframe: true, transparent: true, opacity: 0.3 })
    );
    sceneGroup.add(core);

    // ── Inner glow sphere ──
    const innerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(3, 32, 32),
      new THREE.MeshStandardMaterial({ color: 0x1E6F9F, emissive: 0x1E6F9F, roughness: 0.3, metalness: 0.2, transparent: true, opacity: 0.4, emissiveIntensity: 0.8 })
    );
    sceneGroup.add(innerSphere);

    // ── Particles ──
    const pCount = 3000;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    const pCol = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 30 + Math.random() * 40;
      const th = Math.random() * Math.PI * 2;
      const ph = Math.acos(2 * Math.random() - 1);
      pPos[i*3]=Math.sin(ph)*Math.cos(th)*r; pPos[i*3+1]=Math.sin(ph)*Math.sin(th)*r; pPos[i*3+2]=Math.cos(ph)*r;
      const c = Math.random();
      if (c<0.6){pCol[i*3]=0.8+Math.random()*0.2;pCol[i*3+1]=0.8+Math.random()*0.2;pCol[i*3+2]=1;}
      else if(c<0.8){pCol[i*3]=0x14/255;pCol[i*3+1]=0xb8/255;pCol[i*3+2]=0xa6/255;}
      else{pCol[i*3]=0xa8/255;pCol[i*3+1]=0x55/255;pCol[i*3+2]=0xf7/255;}
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos,3));
    pGeo.setAttribute('color', new THREE.BufferAttribute(pCol,3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      size:0.15, vertexColors:true, transparent:true, opacity:0.9, blending:THREE.AdditiveBlending, sizeAttenuation:true
    }));
    sceneGroup.add(particles);

    // ── Grid ──
    const grid = new THREE.GridHelper(80,30,0x1E6F9F,0x333333);
    grid.position.y=-10;
    (grid.material as THREE.Material).opacity=0.08;
    (grid.material as THREE.Material).transparent=true;
    sceneGroup.add(grid);

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x404060));
    const l1 = new THREE.PointLight(0x1E6F9F,1.5,50); l1.position.set(5,5,10); scene.add(l1);
    const l2 = new THREE.PointLight(0xffffff,0.8,50); l2.position.set(-5,-3,10); scene.add(l2);
    const dl = new THREE.DirectionalLight(0xffffff,0.5); dl.position.set(0,10,10); scene.add(dl);

    // ── Services ──
    const SERVICES = [
      { name: 'HEALTHTECH',      sub: 'Patient-first technology',  angle: 0              },
      { name: 'PAYMENT SYSTEMS', sub: 'Fast. Secure. Global.',      angle: Math.PI / 2    },
      { name: 'INTEGRATIONS',    sub: 'Connect everything',         angle: Math.PI        },
      { name: 'IT CONSULTING',   sub: 'Transform your operations',  angle: 3*Math.PI/2    },
    ];

    const COLOR   = '#00ffcc';
    const HEX     = 0x00ffcc;
    const GLOBE_R = 8.5;
    const LABEL_R = 13.5;

    function makeTexture(name: string, sub: string): THREE.CanvasTexture {
      const W = 580, H = 148;
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      const ctx = cv.getContext('2d')!;

      const bg = ctx.createLinearGradient(0,0,W,0);
      bg.addColorStop(0,'rgba(7,7,18,0.98)');
      bg.addColorStop(1,'rgba(10,10,26,0.95)');
      ctx.save();
      ctx.beginPath();
      (ctx as any).roundRect?.(3,3,W-6,H-6,4) ?? ctx.rect(3,3,W-6,H-6);
      ctx.fillStyle = bg as any; ctx.fill();
      ctx.strokeStyle = COLOR; ctx.lineWidth=2; ctx.globalAlpha=0.7; ctx.stroke();
      ctx.globalAlpha=1; ctx.restore();

      const bar = ctx.createLinearGradient(0,16,0,H-16);
      bar.addColorStop(0,'transparent'); bar.addColorStop(0.5,COLOR); bar.addColorStop(1,'transparent');
      ctx.fillStyle=bar; ctx.fillRect(14,16,2.5,H-32);

      ctx.font='900 32px "Livvic","Arial Black",Arial,sans-serif';
      ctx.fillStyle='#ffffff'; ctx.shadowColor=COLOR; ctx.shadowBlur=18;
      ctx.fillText(name,30,H/2+4); ctx.shadowBlur=0;

      ctx.strokeStyle=COLOR; ctx.globalAlpha=0.2; ctx.lineWidth=1;
      ctx.beginPath(); ctx.moveTo(30,H/2+18); ctx.lineTo(W-30,H/2+18); ctx.stroke();
      ctx.globalAlpha=1;

      ctx.font='400 19px "Livvic",Arial,sans-serif';
      ctx.fillStyle=COLOR; ctx.globalAlpha=0.85;
      ctx.fillText(sub,30,H/2+40); ctx.globalAlpha=1;

      return new THREE.CanvasTexture(cv);
    }

    // ── SINGLE sprite + line + dot ──
    // One object. Repositions and retextures while faded out. Zero overlap.
    let spriteMat: THREE.SpriteMaterial | null = null;
    let sprite: THREE.Sprite | null = null;
    let lineMat: THREE.LineBasicMaterial | null = null;
    let lineGeo: THREE.BufferGeometry | null = null;
    let dotMat: THREE.MeshBasicMaterial | null = null;
    let dot: THREE.Mesh | null = null;

    const textures: THREE.CanvasTexture[] = [];

    function buildAll() {
      SERVICES.forEach(s => textures.push(makeTexture(s.name, s.sub)));

      spriteMat = new THREE.SpriteMaterial({ map: textures[0], transparent: true, opacity: 0, depthWrite: false, depthTest: false });
      sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(9.5, 2.4, 1);
      sprite.position.set(LABEL_R, 0, 0);
      sceneGroup.add(sprite);

      lineGeo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(GLOBE_R, 0, 0),
        new THREE.Vector3(LABEL_R - 4.8, 0, 0),
      ]);
      lineMat = new THREE.LineBasicMaterial({ color: HEX, transparent: true, opacity: 0 });
      sceneGroup.add(new THREE.Line(lineGeo, lineMat));

      dotMat = new THREE.MeshBasicMaterial({ color: HEX, transparent: true, opacity: 0 });
      dot = new THREE.Mesh(new THREE.SphereGeometry(0.14,8,8), dotMat);
      dot.position.set(GLOBE_R, 0, 0);
      sceneGroup.add(dot);
    }

    const ff = new FontFace('Livvic','url(https://fonts.gstatic.com/s/livvic/v14/rnCr-x1S2hzjrlffC-M.woff2)');
    ff.load().then(f=>{ document.fonts.add(f); buildAll(); }).catch(()=>buildAll());

    // ── Mouse ──
    const mouse = { x:0, y:0 };
    const onMM = (e: MouseEvent) => { mouse.x=(e.clientX/window.innerWidth)*2-1; mouse.y=-(e.clientY/window.innerHeight)*2+1; };
    window.addEventListener('mousemove', onMM);

    // ── State ──
    // Slower spin: ~56 seconds per full rotation
    const SPIN       = 0.0018;
    const FADE_IN    = 0.055;
    const FADE_OUT   = 0.08;
    // Only show a label when it's clearly front-facing (score > 0.65)
    // Hide it well before the next one could appear (< 0.4)
    // This guarantees a clean gap between labels
    const SHOW_THR   = 0.65;
    const HIDE_THR   = 0.40;

    let activeIdx    = -1;
    let currentOpacity = 0;

    function placeAt(idx: number) {
      if (!sprite || !spriteMat || !lineMat || !lineGeo || !dot || !dotMat) return;
      const a = SERVICES[idx].angle;
      spriteMat.map = textures[idx];
      spriteMat.map.needsUpdate = true;
      sprite.position.set(Math.cos(a)*LABEL_R, 0, Math.sin(a)*LABEL_R);
      dot.position.set(Math.cos(a)*GLOBE_R, 0, Math.sin(a)*GLOBE_R);
      lineGeo.setFromPoints([
        new THREE.Vector3(Math.cos(a)*GLOBE_R, 0, Math.sin(a)*GLOBE_R),
        new THREE.Vector3(Math.cos(a)*(LABEL_R-4.8), 0, Math.sin(a)*(LABEL_R-4.8)),
      ]);
    }

    function animate() {
      requestAnimationFrame(animate);

      sceneGroup.rotation.y += SPIN;
      sceneGroup.rotation.x += (mouse.y * 0.15 - sceneGroup.rotation.x) * 0.02;
      core.rotation.y += 0.001; core.rotation.x += 0.0005;
      innerSphere.rotation.y -= 0.002;
      particles.rotation.y += 0.0001;

      if (spriteMat && lineMat && dotMat) {
        const rotY = sceneGroup.rotation.y;
        const scores = SERVICES.map(({ angle }) => Math.cos(angle + rotY));
        const bestIdx = scores.indexOf(Math.max(...scores));

        // Hysteresis: activate only when clearly front-facing, deactivate early
        if (activeIdx === -1) {
          // Only activate when opacity is low (fully faded) to avoid mid-fade swap
          if (scores[bestIdx] > SHOW_THR && currentOpacity < 0.05) {
            activeIdx = bestIdx;
            placeAt(activeIdx);
          }
        } else {
          if (scores[activeIdx] < HIDE_THR) {
            activeIdx = -1;
          }
        }

        const target = activeIdx !== -1 ? 1 : 0;
        const speed  = target > currentOpacity ? FADE_IN : FADE_OUT;
        currentOpacity += (target - currentOpacity) * speed;
        const o = Math.max(0, Math.min(1, currentOpacity));

        spriteMat.opacity = o;
        lineMat.opacity   = o * 0.7;
        dotMat.opacity    = o;
      }

      renderer.render(scene, camera);
    }

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth/window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth,window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMM);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-auto" />;
}