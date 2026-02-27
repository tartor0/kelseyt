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

    // ── Icosahedron (core structure) ──
    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(8, 2),
      new THREE.MeshBasicMaterial({ color: 0x1E6F9F, wireframe: true, transparent: true, opacity: 0.25 })
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

    // ── Enhanced Grid with longer legs (more visible) ──
    const gridGroup = new THREE.Group();
    
    // Main grid
    const grid = new THREE.GridHelper(90, 40, 0x1E6F9F, 0x334455);
    grid.position.y = -12;
    (grid.material as THREE.Material).opacity = 0.15;
    (grid.material as THREE.Material).transparent = true;
    gridGroup.add(grid);
    
    // Additional long radial lines for more prominent "legs"
    const radialCount = 16;
    const radialLength = 65;
    const radialGeo = new THREE.BufferGeometry();
    const radialPositions = new Float32Array(radialCount * 6); // 2 points per line * 3 coordinates
    
    for (let i = 0; i < radialCount; i++) {
      const angle = (i / radialCount) * Math.PI * 2;
      const x = Math.cos(angle) * radialLength;
      const z = Math.sin(angle) * radialLength;
      
      // Start point (center-ish)
      radialPositions[i*6] = 0;
      radialPositions[i*6+1] = -12;
      radialPositions[i*6+2] = 0;
      
      // End point (outer)
      radialPositions[i*6+3] = x;
      radialPositions[i*6+4] = -12;
      radialPositions[i*6+5] = z;
    }
    
    radialGeo.setAttribute('position', new THREE.BufferAttribute(radialPositions, 3));
    const radialLines = new THREE.LineSegments(
      radialGeo, 
      new THREE.LineBasicMaterial({ color: 0x1E6F9F, transparent: true, opacity: 0.12 })
    );
    gridGroup.add(radialLines);
    
    // Add some vertical elements to the grid for more dimension
    const verticalCount = 8;
    const verticalGeo = new THREE.BufferGeometry();
    const verticalPositions = new Float32Array(verticalCount * 6);
    
    for (let i = 0; i < verticalCount; i++) {
      const angle = (i / verticalCount) * Math.PI * 2;
      const radius = 20;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // Vertical line from grid up
      verticalPositions[i*6] = x;
      verticalPositions[i*6+1] = -12;
      verticalPositions[i*6+2] = z;
      
      verticalPositions[i*6+3] = x;
      verticalPositions[i*6+4] = -5;
      verticalPositions[i*6+5] = z;
    }
    
    verticalGeo.setAttribute('position', new THREE.BufferAttribute(verticalPositions, 3));
    const verticalLines = new THREE.LineSegments(
      verticalGeo,
      new THREE.LineBasicMaterial({ color: 0x1E6F9F, transparent: true, opacity: 0.08 })
    );
    gridGroup.add(verticalLines);
    
    sceneGroup.add(gridGroup);

    // ── Lighting ──
    scene.add(new THREE.AmbientLight(0x404060));
    const l1 = new THREE.PointLight(0x1E6F9F, 1.8, 60); l1.position.set(5, 5, 15); scene.add(l1);
    const l2 = new THREE.PointLight(0xffffff, 1.0, 60); l2.position.set(-5, -3, 15); scene.add(l2);
    const dl = new THREE.DirectionalLight(0xffffff, 0.6); dl.position.set(0, 10, 15); scene.add(dl);

    // ── Services with enhanced popup design ──
    const SERVICES = [
      { name: 'HEALTHTECH',      sub: 'Patient-first technology',  angle: 0,              color: '#00ffcc' },
      { name: 'PAYMENT SYSTEMS', sub: 'Fast. Secure. Global.',      angle: Math.PI / 2,    color: '#ffaa00' },
      { name: 'INTEGRATIONS',    sub: 'Connect everything',         angle: Math.PI,        color: '#ff66cc' },
      { name: 'IT CONSULTING',   sub: 'Transform your operations',  angle: 3*Math.PI/2,    color: '#66ccff' },
    ];

    const GLOBE_R = 8.5;
    const LABEL_R = 15.5; // Increased distance to make size more consistent

    function createEnhancedTexture(service: typeof SERVICES[0]): THREE.CanvasTexture {
      const W = 520, H = 160;
      const cv = document.createElement('canvas');
      cv.width = W; cv.height = H;
      const ctx = cv.getContext('2d')!;

      // Enhanced background with gradient and border
      const bgGradient = ctx.createLinearGradient(0, 0, W, H);
      bgGradient.addColorStop(0, 'rgba(12, 15, 25, 0.98)');
      bgGradient.addColorStop(0.5, 'rgba(20, 25, 40, 0.98)');
      bgGradient.addColorStop(1, 'rgba(12, 15, 25, 0.98)');
      
      ctx.shadowColor = service.color;
      ctx.shadowBlur = 25;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
      
      // Rounded rectangle with glow
      ctx.beginPath();
      ctx.roundRect(5, 5, W-10, H-10, 12);
      ctx.fillStyle = bgGradient;
      ctx.fill();
      
      ctx.shadowBlur = 15;
      ctx.strokeStyle = service.color;
      ctx.lineWidth = 2.5;
      ctx.stroke();
      
      ctx.shadowBlur = 0;
      
      // Left accent bar
      const barGradient = ctx.createLinearGradient(0, 10, 0, H-10);
      barGradient.addColorStop(0, 'rgba(255,255,255,0.1)');
      barGradient.addColorStop(0.5, service.color);
      barGradient.addColorStop(1, 'rgba(255,255,255,0.1)');
      
      ctx.fillStyle = barGradient;
      ctx.fillRect(20, 10, 4, H-20);
      
      // Main title with enhanced style
      ctx.font = 'bold 36px "Inter", "Arial Black", sans-serif';
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = service.color;
      ctx.shadowBlur = 20;
      ctx.fillText(service.name, 40, 75);
      
      // Decorative line
      ctx.shadowBlur = 0;
      ctx.strokeStyle = service.color;
      ctx.globalAlpha = 0.3;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(40, 90);
      ctx.lineTo(W-40, 90);
      ctx.stroke();
      
      // Subtitle
      ctx.globalAlpha = 1;
      ctx.font = '18px "Inter", sans-serif';
      ctx.fillStyle = '#e0e0ff';
      ctx.shadowColor = service.color;
      ctx.shadowBlur = 12;
      ctx.fillText(service.sub, 40, 125);
      
      // Small corner accent
      ctx.shadowBlur = 0;
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.moveTo(W-35, 20);
      ctx.lineTo(W-20, 35);
      ctx.strokeStyle = service.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      
      ctx.beginPath();
      ctx.moveTo(W-20, 20);
      ctx.lineTo(W-35, 35);
      ctx.stroke();
      
      return new THREE.CanvasTexture(cv);
    }

    // ── Create all popups (now showing 2 at a time) ──
    const sprites: THREE.Sprite[] = [];
    const lines: THREE.Line[] = [];
    const dots: THREE.Mesh[] = [];

    // Load font and create popups
    const ff = new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)');
    ff.load().then(f => { 
      document.fonts.add(f); 
      createAllPopups(); 
    }).catch(() => createAllPopups());

    function createAllPopups() {
      SERVICES.forEach((service, idx) => {
        const texture = createEnhancedTexture(service);
        
        // Sprite (popup)
        const mat = new THREE.SpriteMaterial({ 
          map: texture, 
          transparent: true, 
          opacity: 0,
          depthTest: true,
          depthWrite: false,
          blending: THREE.NormalBlending
        });
        const sprite = new THREE.Sprite(mat);
        sprite.scale.set(8.5, 2.6, 1); // Fixed size
        sprite.position.set(
          Math.cos(service.angle) * LABEL_R,
          0,
          Math.sin(service.angle) * LABEL_R
        );
        sceneGroup.add(sprite);
        sprites.push(sprite);

        // Connection line (longer)
        const lineGeo = new THREE.BufferGeometry().setFromPoints([
          new THREE.Vector3(Math.cos(service.angle) * GLOBE_R, 0, Math.sin(service.angle) * GLOBE_R),
          new THREE.Vector3(Math.cos(service.angle) * (LABEL_R - 5.5), 0, Math.sin(service.angle) * (LABEL_R - 5.5)),
        ]);
        const lineMat = new THREE.LineBasicMaterial({ 
          color: service.color, 
          transparent: true, 
          opacity: 0,
          linewidth: 2
        });
        const line = new THREE.Line(lineGeo, lineMat);
        sceneGroup.add(line);
        lines.push(line);

        // Dot on globe
        const dotMat = new THREE.MeshBasicMaterial({ 
          color: service.color, 
          transparent: true, 
          opacity: 0,
          emissive: service.color
        });
        const dot = new THREE.Mesh(new THREE.SphereGeometry(0.2, 12, 12), dotMat);
        dot.position.set(
          Math.cos(service.angle) * GLOBE_R,
          0,
          Math.sin(service.angle) * GLOBE_R
        );
        sceneGroup.add(dot);
        dots.push(dot);
      });
    }

    // ── Mouse ──
    const mouse = { x:0, y:0 };
    const onMM = (e: MouseEvent) => { 
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1; 
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1; 
    };
    window.addEventListener('mousemove', onMM);

    // ── Animation state for showing 2 popups ──
    const SPIN = 0.0015;
    const FADE_SPEED = 0.04;
    
    // Show top 2 scores
    function animate() {
      requestAnimationFrame(animate);

      sceneGroup.rotation.y += SPIN;
      sceneGroup.rotation.x += (mouse.y * 0.1 - sceneGroup.rotation.x) * 0.02;
      core.rotation.y += 0.001; 
      core.rotation.x += 0.0005;
      innerSphere.rotation.y -= 0.002;
      particles.rotation.y += 0.0001;

      if (sprites.length === 4) {
        const rotY = sceneGroup.rotation.y;
        
        // Calculate scores (dot product with camera direction)
        const scores = SERVICES.map(({ angle }) => Math.cos(angle + rotY));
        
        // Get indices of top 2 scores
        const indices = [0, 1, 2, 3];
        indices.sort((a, b) => scores[b] - scores[a]);
        const topTwo = indices.slice(0, 2);
        
        // Update all popups
        sprites.forEach((sprite, i) => {
          const target = topTwo.includes(i) ? 1 : 0;
          const current = sprite.material.opacity;
          const newOpacity = current + (target - current) * FADE_SPEED;
          sprite.material.opacity = Math.max(0, Math.min(1, newOpacity));
        });
        
        lines.forEach((line, i) => {
          const target = topTwo.includes(i) ? 0.6 : 0;
          const current = line.material.opacity;
          const newOpacity = current + (target - current) * FADE_SPEED;
          line.material.opacity = Math.max(0, Math.min(1, newOpacity));
        });
        
        dots.forEach((dot, i) => {
          const target = topTwo.includes(i) ? 1 : 0.3;
          const current = dot.material.opacity;
          const newOpacity = current + (target - current) * FADE_SPEED;
          dot.material.opacity = Math.max(0, Math.min(1, newOpacity));
        });
      }

      renderer.render(scene, camera);
    }

    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
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

// Add roundRect if not available
if (!CanvasRenderingContext2D.prototype.roundRect) {
  CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    return this;
  };
}