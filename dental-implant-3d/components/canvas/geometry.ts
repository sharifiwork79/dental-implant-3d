import * as THREE from "three";

/**
 * Builds a stylised, anatomically-inspired tooth silhouette using a lathe.
 * This keeps the experience fully self-contained (no .glb downloads / no
 * external asset pipeline) while still reading clearly as "a tooth" from
 * every camera angle used in the journey. Swap this module out for real
 * DRACO-compressed scans later — every consumer just expects a BufferGeometry.
 */
export function createToothGeometry(radialSegments = 36): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0.02, -1.15), // root tip
    new THREE.Vector2(0.085, -0.92),
    new THREE.Vector2(0.105, -0.55),
    new THREE.Vector2(0.095, -0.18), // neck / gumline
    new THREE.Vector2(0.14, 0.02),
    new THREE.Vector2(0.205, 0.22),
    new THREE.Vector2(0.235, 0.38), // widest point of the crown
    new THREE.Vector2(0.2, 0.5),
    new THREE.Vector2(0.11, 0.58),
    new THREE.Vector2(0.0, 0.615), // occlusal top, on-axis
  ];
  const geo = new THREE.LatheGeometry(points, radialSegments);
  geo.computeVertexNormals();
  return geo;
}

/** A shallow root-only geometry, used for the implant's biologic anchor point */
export function createRootGeometry(radialSegments = 24): THREE.LatheGeometry {
  const points = [
    new THREE.Vector2(0.015, -1.1),
    new THREE.Vector2(0.08, -0.85),
    new THREE.Vector2(0.1, -0.4),
    new THREE.Vector2(0.09, -0.05),
    new THREE.Vector2(0.06, 0.05),
  ];
  const geo = new THREE.LatheGeometry(points, radialSegments);
  geo.computeVertexNormals();
  return geo;
}

/** Threaded titanium implant screw body, built as a helical tube around a cylinder core */
export function createImplantThreadCurve(length = 0.85, turns = 9, radius = 0.11): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  const steps = turns * 10;
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const angle = t * turns * Math.PI * 2;
    const y = -t * length;
    pts.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius));
  }
  return new THREE.CatmullRomCurve3(pts);
}

/** Generates a smooth dental-arch path (U-shape) that jaw + teeth are distributed along */
export function createArchCurve(width = 2.6, depth = 2.1): THREE.CatmullRomCurve3 {
  const pts: THREE.Vector3[] = [];
  const count = 16;
  for (let i = 0; i <= count; i++) {
    const t = (i / count) * Math.PI; // 0 -> PI, half ellipse
    const x = Math.cos(t) * (width / 2);
    const z = Math.sin(t) * depth - depth * 0.15;
    pts.push(new THREE.Vector3(x, 0, z));
  }
  return new THREE.CatmullRomCurve3(pts);
}
