"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NODE_COUNT = 110;
const LINE_THRESHOLD = 5.5;

export default function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ── Renderer ────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ── Scene / Camera ─────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 18);

    /* ── Colors palette ─────────────────────────── */
    const palette = [
      new THREE.Color("#22d3ee"),
      new THREE.Color("#6366f1"),
      new THREE.Color("#8b5cf6"),
      new THREE.Color("#22c55e"),
      new THREE.Color("#f59e0b"),
    ];

    /* ── Nodes (Points) ─────────────────────────── */
    const nodePosArr = new Float32Array(NODE_COUNT * 3);
    const nodeColArr = new Float32Array(NODE_COUNT * 3);
    const nodeMeta: { speed: number; phase: number; size: number; base: THREE.Vector3 }[] = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const base = new THREE.Vector3(
        (Math.random() - 0.5) * 28,
        (Math.random() - 0.5) * 18,
        (Math.random() - 0.5) * 10
      );
      nodeMeta.push({ speed: 0.15 + Math.random() * 0.25, phase: Math.random() * Math.PI * 2, size: 1, base });
      nodePosArr[i * 3] = base.x;
      nodePosArr[i * 3 + 1] = base.y;
      nodePosArr[i * 3 + 2] = base.z;
      const c = palette[Math.floor(Math.random() * palette.length)];
      nodeColArr[i * 3] = c.r;
      nodeColArr[i * 3 + 1] = c.g;
      nodeColArr[i * 3 + 2] = c.b;
    }

    const nodeGeo = new THREE.BufferGeometry();
    const nodePosAttr = new THREE.BufferAttribute(nodePosArr, 3);
    nodePosAttr.setUsage(THREE.DynamicDrawUsage);
    nodeGeo.setAttribute("position", nodePosAttr);
    nodeGeo.setAttribute("color", new THREE.BufferAttribute(nodeColArr, 3));

    const nodeMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      sizeAttenuation: true,
    });
    const nodePoints = new THREE.Points(nodeGeo, nodeMat);
    scene.add(nodePoints);

    /* ── Connections (LineSegments) ─────────────── */
    // Pre-compute which pairs are close enough
    const pairs: [number, number][] = [];
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        const dx = nodeMeta[i].base.x - nodeMeta[j].base.x;
        const dy = nodeMeta[i].base.y - nodeMeta[j].base.y;
        const dz = nodeMeta[i].base.z - nodeMeta[j].base.z;
        if (Math.sqrt(dx * dx + dy * dy + dz * dz) < LINE_THRESHOLD && pairs.length < 200) {
          pairs.push([i, j]);
        }
      }
    }

    const linePosArr = new Float32Array(pairs.length * 6);
    const lineGeo = new THREE.BufferGeometry();
    const linePosAttr = new THREE.BufferAttribute(linePosArr, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeo.setAttribute("position", linePosAttr);

    const lineMat = new THREE.LineBasicMaterial({
      color: "#1e293b",
      transparent: true,
      opacity: 0.5,
    });
    const lines = new THREE.LineSegments(lineGeo, lineMat);
    scene.add(lines);

    /* ── Floating wireframe shapes ───────────────── */
    const floaters: { mesh: THREE.Mesh; rotSpeed: [number, number, number] }[] = [
      { pos: [-10, 4, -3] as [number,number,number], geo: new THREE.OctahedronGeometry(0.6, 0), color: "#22d3ee", opacity: 0.12 },
      { pos: [9, -3, -2] as [number,number,number], geo: new THREE.IcosahedronGeometry(0.5, 0), color: "#6366f1", opacity: 0.1 },
      { pos: [-7, -5, -4] as [number,number,number], geo: new THREE.TorusGeometry(0.5, 0.15, 6, 12), color: "#8b5cf6", opacity: 0.1 },
      { pos: [11, 5, -5] as [number,number,number], geo: new THREE.OctahedronGeometry(0.4, 0), color: "#22d3ee", opacity: 0.09 },
      { pos: [0, -7, -6] as [number,number,number], geo: new THREE.IcosahedronGeometry(0.45, 0), color: "#f59e0b", opacity: 0.09 },
    ].map((s) => {
      const mat = new THREE.MeshBasicMaterial({ color: s.color, wireframe: true, transparent: true, opacity: s.opacity });
      const mesh = new THREE.Mesh(s.geo, mat);
      mesh.position.set(...s.pos as [number,number,number]);
      scene.add(mesh);
      return { mesh, rotSpeed: [Math.random() * 0.008 + 0.003, Math.random() * 0.008 + 0.003, Math.random() * 0.004] };
    });

    /* ── Mouse parallax ─────────────────────────── */
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    /* ── Resize ─────────────────────────────────── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ─────────────────────────── */
    let frameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Smooth mouse follow
      mouse.x += (mouse.targetX - mouse.x) * 0.03;
      mouse.y += (mouse.targetY - mouse.y) * 0.03;

      // Camera parallax
      camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.02;
      camera.position.y += (mouse.y * 0.4 - camera.position.y) * 0.02;
      camera.lookAt(0, 0, 0);

      // Animate nodes
      for (let i = 0; i < NODE_COUNT; i++) {
        const m = nodeMeta[i];
        nodePosArr[i * 3] = m.base.x + Math.cos(t * m.speed * 0.7 + m.phase) * 0.22;
        nodePosArr[i * 3 + 1] = m.base.y + Math.sin(t * m.speed + m.phase) * 0.38;
        nodePosArr[i * 3 + 2] = m.base.z;
      }
      nodePosAttr.needsUpdate = true;

      // Update connections
      for (let k = 0; k < pairs.length; k++) {
        const [i, j] = pairs[k];
        linePosArr[k * 6] = nodePosArr[i * 3];
        linePosArr[k * 6 + 1] = nodePosArr[i * 3 + 1];
        linePosArr[k * 6 + 2] = nodePosArr[i * 3 + 2];
        linePosArr[k * 6 + 3] = nodePosArr[j * 3];
        linePosArr[k * 6 + 4] = nodePosArr[j * 3 + 1];
        linePosArr[k * 6 + 5] = nodePosArr[j * 3 + 2];
      }
      linePosAttr.needsUpdate = true;

      // Rotate floaters
      floaters.forEach(({ mesh, rotSpeed }) => {
        mesh.rotation.x += rotSpeed[0];
        mesh.rotation.y += rotSpeed[1];
        mesh.rotation.z += rotSpeed[2];
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ─────────────────────────────────── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      nodeGeo.dispose();
      lineGeo.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
