'use client'

import { useEffect, useRef } from 'react'

export function GlobeScene() {
  const mountRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    let animId: number
    let renderer: import('three').WebGLRenderer | null = null

    async function init() {
      const THREE = await import('three')
      const scene = new THREE.Scene()
      const w = mount!.clientWidth || 400
      const camera = new THREE.PerspectiveCamera(45, w / 400, 0.1, 100)
      camera.position.set(0, 0, 3)
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
      renderer.setSize(w, 400)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      mount!.appendChild(renderer.domElement)
      scene.add(new THREE.AmbientLight(0xffffff, 0.3))
      const pt = new THREE.PointLight(0x00d4ff, 0.8)
      pt.position.set(5, 5, 5)
      scene.add(pt)
      const starGeo = new THREE.BufferGeometry()
      const sp = new Float32Array(1500 * 3)
      for (let i = 0; i < sp.length; i++) sp[i] = (Math.random() - 0.5) * 200
      starGeo.setAttribute('position', new THREE.BufferAttribute(sp, 3))
      scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.1, transparent: true, opacity: 0.6 })))
      const group = new THREE.Group()
      scene.add(group)
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1, 64, 64), new THREE.MeshStandardMaterial({ color: '#001A2E', transparent: true, opacity: 0.9 })))
      group.add(new THREE.Mesh(new THREE.SphereGeometry(1.01, 24, 24), new THREE.MeshBasicMaterial({ color: '#00D4FF', wireframe: true, transparent: true, opacity: 0.08 })))
      const cities = [
        { lat: -1.29, lng: 36.82, isHome: true },
        { lat: 6.52, lng: 3.38 },
        { lat: 30.04, lng: 31.24 },
        { lat: -26.2, lng: 28.04 },
        { lat: 5.56, lng: -0.2 },
        { lat: 9.03, lng: 38.74 },
      ]
      const toV = (lat: number, lng: number, r: number) => {
        const phi = (90 - lat) * (Math.PI / 180)
        const theta = (lng + 180) * (Math.PI / 180)
        return new THREE.Vector3(-(r * Math.sin(phi) * Math.cos(theta)), r * Math.cos(phi), r * Math.sin(phi) * Math.sin(theta))
      }
      cities.forEach(c => {
        const pin = new THREE.Mesh(new THREE.SphereGeometry(c.isHome ? 0.025 : 0.015, 8, 8), new THREE.MeshBasicMaterial({ color: c.isHome ? '#D4A017' : '#00D4FF' }))
        pin.position.copy(toV(c.lat, c.lng, 1.05))
        group.add(pin)
      })
      const nairobi = toV(-1.29, 36.82, 1.05)
      cities.filter(c => !c.isHome).forEach(c => {
        const lg = new THREE.BufferGeometry().setFromPoints([nairobi, toV(c.lat, c.lng, 1.05)])
        group.add(new THREE.Line(lg, new THREE.LineBasicMaterial({ color: '#00D4FF', transparent: true, opacity: 0.3 })))
      })
      const animate = () => { animId = requestAnimationFrame(animate); group.rotation.y += 0.003; renderer!.render(scene, camera) }
      animate()
    }
    init()
    return () => {
      cancelAnimationFrame(animId)
      renderer?.dispose()
      if (mount && renderer?.domElement && mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: 400 }} aria-label="Globe showing Nairobi connected to African cities" />
}

export default GlobeScene
