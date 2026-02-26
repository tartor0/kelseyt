'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Background3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0A0A0F);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 25);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false,
      powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0A0A0F);

    // Main group for all objects
    const sceneGroup = new THREE.Group();
    scene.add(sceneGroup);

    // === MATERIALS ===
    const createMaterial = (color: number, emissive: number, opacity = 1) => {
      return new THREE.MeshStandardMaterial({
        color: color,
        emissive: emissive,
        roughness: 0.3,
        metalness: 0.2,
        transparent: opacity < 1,
        opacity: opacity,
        emissiveIntensity: 0.8
      });
    };

    // Wireframe material
    const wireframeBlue = new THREE.MeshBasicMaterial({ 
      color: 0x1E6F9F, 
      wireframe: true, 
      transparent: true, 
      opacity: 0.3
    });

    // === CENTRAL GEOMETRY (ONLY THIS - NO RINGS/ORBS) ===
    
    // 1. Large central icosahedron (core structure)
    const coreGeo = new THREE.IcosahedronGeometry(8, 2);
    const core = new THREE.Mesh(coreGeo, wireframeBlue);
    sceneGroup.add(core);

    // 2. Inner sphere with glow
    const innerSphereGeo = new THREE.SphereGeometry(3, 32, 32);
    const innerSphere = new THREE.Mesh(innerSphereGeo, createMaterial(0x1E6F9F, 0x1E6F9F, 0.4));
    sceneGroup.add(innerSphere);

    // 3. Particle system (stars only - NO orbs)
    const particleCount = 3000;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Distribute in a sphere
      const r = 30 + Math.random() * 40;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      particlePositions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      particlePositions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r;
      particlePositions[i * 3 + 2] = Math.cos(phi) * r;
      
      // Colors: mostly white/blue, some purple/teal
      const colorChoice = Math.random();
      if (colorChoice < 0.6) {
        // White/blue
        particleColors[i * 3] = 0.8 + Math.random() * 0.2;
        particleColors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        particleColors[i * 3 + 2] = 1.0;
      } else if (colorChoice < 0.8) {
        // Teal
        particleColors[i * 3] = 0x14 / 255;
        particleColors[i * 3 + 1] = 0xB8 / 255;
        particleColors[i * 3 + 2] = 0xA6 / 255;
      } else {
        // Purple
        particleColors[i * 3] = 0xA8 / 255;
        particleColors[i * 3 + 1] = 0x55 / 255;
        particleColors[i * 3 + 2] = 0xF7 / 255;
      }
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.15,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    sceneGroup.add(particles);

    // 4. Subtle grid floor (far away)
    const gridHelper = new THREE.GridHelper(80, 30, 0x1E6F9F, 0x333333);
    gridHelper.position.y = -10;
    gridHelper.material.opacity = 0.08;
    gridHelper.material.transparent = true;
    sceneGroup.add(gridHelper);

    // === LIGHTING ===
    const ambientLight = new THREE.AmbientLight(0x404060);
    scene.add(ambientLight);

    const light1 = new THREE.PointLight(0x1E6F9F, 1.5, 50);
    light1.position.set(5, 5, 10);
    scene.add(light1);

    const light2 = new THREE.PointLight(0xffffff, 0.8, 50);
    light2.position.set(-5, -3, 10);
    scene.add(light2);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(0, 10, 10);
    scene.add(dirLight);

    // === MOUSE INTERACTION ===
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      
      targetRotation.y = mouse.x * 0.3;
      targetRotation.x = mouse.y * 0.2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // === ANIMATION ===
    function animate() {
      requestAnimationFrame(animate);
      
      const elapsedTime = performance.now() * 0.001;

      // Smooth rotation to target
      sceneGroup.rotation.y += (targetRotation.y - sceneGroup.rotation.y) * 0.05;
      sceneGroup.rotation.x += (targetRotation.x - sceneGroup.rotation.x) * 0.05;

      // Rotate central objects
      core.rotation.y += 0.001;
      core.rotation.x += 0.0005;
      innerSphere.rotation.y -= 0.002;

      // Rotate stars slowly
      particles.rotation.y += 0.0001;

      renderer.render(scene, camera);
    }

    animate();

    // === RESIZE HANDLER ===
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-auto" />;
}