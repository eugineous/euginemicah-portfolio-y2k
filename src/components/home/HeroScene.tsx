'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stars, Html } from '@react-three/drei'
import * as THREE from 'three'

function GoldParticles({ count = 200 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points | null>(null)
  const velocitiesRef = useRef<Float32Array | null>(null)

  const pointsObj = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
      vel[i * 3 + 1] = 0.002 + Math.random() * 0.003
    }
    velocitiesRef.current = vel
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({ color: '#D4A017', size: 0.05, sizeAttenuation: true, transparent: true, opacity: 0.8 })
    const pts = new THREE.Points(geo, mat)
    pointsRef.current = pts
    return pts
  }, [count])

  useFrame(() => {
    if (!pointsRef.current || !velocitiesRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < count; i++) {
      pos[i * 3 + 1] += velocitiesRef.current[i * 3 + 1]
      if (pos[i * 3 + 1] > 10) pos[i * 3 + 1] = -10
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error — R3F primitive not in JSX namespace with React 19
  return <primitive object={pointsObj} />
}

function MouseParallax() {
  const { camera } = useThree()
  const mouse = useRef({ x: 0, y: 0 })

  if (typeof window !== 'undefined') {
    window.onmousemove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2
    }
  }

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.5 - camera.position.x) * 0.05
    camera.position.y += (mouse.current.y * 0.3 - camera.position.y) * 0.05
  })

  return null
}

function NairobiSkyline() {
  return (
    <Html
      position={[0, -4, 0]}
      center
      style={{ width: '100vw', pointerEvents: 'none' }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '80px', opacity: 0.15 }}
        fill="#D4A017"
      >
        {/* Nairobi skyline silhouette */}
        <path d="M0,120 L0,80 L30,80 L30,60 L50,60 L50,40 L60,40 L60,20 L70,20 L70,40 L80,40 L80,60 L100,60 L100,50 L110,50 L110,30 L120,30 L120,50 L140,50 L140,70 L160,70 L160,50 L170,50 L170,35 L175,35 L175,20 L180,20 L180,35 L185,35 L185,50 L200,50 L200,65 L220,65 L220,45 L230,45 L230,25 L240,25 L240,45 L260,45 L260,60 L280,60 L280,40 L290,40 L290,55 L310,55 L310,70 L330,70 L330,50 L340,50 L340,30 L345,30 L345,15 L350,15 L350,30 L355,30 L355,50 L370,50 L370,65 L390,65 L390,45 L400,45 L400,60 L420,60 L420,75 L440,75 L440,55 L450,55 L450,35 L460,35 L460,55 L480,55 L480,70 L500,70 L500,50 L510,50 L510,30 L520,30 L520,50 L540,50 L540,65 L560,65 L560,45 L570,45 L570,60 L590,60 L590,75 L610,75 L610,55 L620,55 L620,40 L630,40 L630,55 L650,55 L650,70 L670,70 L670,50 L680,50 L680,35 L685,35 L685,20 L690,20 L690,35 L695,35 L695,50 L710,50 L710,65 L730,65 L730,45 L740,45 L740,60 L760,60 L760,75 L780,75 L780,55 L790,55 L790,40 L800,40 L800,55 L820,55 L820,70 L840,70 L840,50 L850,50 L850,30 L860,30 L860,50 L880,50 L880,65 L900,65 L900,45 L910,45 L910,60 L930,60 L930,75 L950,75 L950,55 L960,55 L960,35 L970,35 L970,55 L990,55 L990,70 L1010,70 L1010,50 L1020,50 L1020,65 L1040,65 L1040,80 L1060,80 L1060,60 L1070,60 L1070,45 L1080,45 L1080,60 L1100,60 L1100,75 L1120,75 L1120,55 L1130,55 L1130,70 L1150,70 L1150,80 L1170,80 L1170,65 L1180,65 L1180,80 L1200,80 L1200,120 Z" />
      </svg>
    </Html>
  )
}

export function HeroScene({ particleCount = 200 }: { particleCount?: number }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 60 }}
      style={{ position: 'absolute', inset: 0 }}
      gl={{ antialias: false, alpha: true }}
    >
      <Stars
        radius={80}
        depth={50}
        count={1500}
        factor={3}
        saturation={0}
        fade
        speed={0.5}
      />
      <GoldParticles count={particleCount} />
      <NairobiSkyline />
      <MouseParallax />
    </Canvas>
  )
}
