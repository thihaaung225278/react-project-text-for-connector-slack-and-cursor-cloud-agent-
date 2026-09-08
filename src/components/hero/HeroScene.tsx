import { Canvas, useFrame } from '@react-three/fiber'
import { Float, MeshDistortMaterial } from '@react-three/drei'
import {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import type { Group } from 'three'

const SLIDE_COUNT = 4
const AUTOPLAY_MS = 2000

type HeroSceneProps = {
  reducedMotion: boolean
}

type ShapeProps = {
  reducedMotion: boolean
}

function Rotator({
  reducedMotion,
  children,
}: {
  reducedMotion: boolean
  children: ReactNode
}) {
  const ref = useRef<Group>(null)
  useFrame((_, delta) => {
    if (reducedMotion || !ref.current) return
    ref.current.rotation.y += delta * 0.35
    ref.current.rotation.x += delta * 0.08
  })
  return <group ref={ref}>{children}</group>
}

function ShapeIcosahedron({ reducedMotion }: ShapeProps) {
  return (
    <Float
      speed={reducedMotion ? 0 : 1.4}
      rotationIntensity={reducedMotion ? 0 : 0.45}
      floatIntensity={reducedMotion ? 0 : 0.85}
    >
      <Rotator reducedMotion={reducedMotion}>
        <mesh scale={1.45} position={[0.2, 0.05, 0]}>
          <icosahedronGeometry args={[1, 1]} />
          <MeshDistortMaterial
            color="#9fd356"
            emissive="#1f3d12"
            emissiveIntensity={0.45}
            roughness={0.22}
            metalness={0.35}
            distort={reducedMotion ? 0 : 0.28}
            speed={reducedMotion ? 0 : 1.6}
          />
        </mesh>
        <mesh scale={2.2} rotation={[0.4, 0.2, 0.1]}>
          <torusGeometry args={[1, 0.035, 16, 100]} />
          <meshStandardMaterial
            color="#e7f0d8"
            emissive="#4a6b2a"
            emissiveIntensity={0.2}
            metalness={0.85}
            roughness={0.22}
            wireframe
          />
        </mesh>
      </Rotator>
    </Float>
  )
}

function ShapeTorusKnot({ reducedMotion }: ShapeProps) {
  return (
    <Float
      speed={reducedMotion ? 0 : 1.1}
      rotationIntensity={reducedMotion ? 0 : 0.35}
      floatIntensity={reducedMotion ? 0 : 0.7}
    >
      <Rotator reducedMotion={reducedMotion}>
        <mesh scale={0.95} position={[0.15, 0, 0]}>
          <torusKnotGeometry args={[1, 0.28, 180, 24]} />
          <meshStandardMaterial
            color="#c8f542"
            emissive="#3d5c14"
            emissiveIntensity={0.35}
            metalness={0.9}
            roughness={0.18}
          />
        </mesh>
      </Rotator>
    </Float>
  )
}

function ShapeOctahedron({ reducedMotion }: ShapeProps) {
  return (
    <Float
      speed={reducedMotion ? 0 : 1.25}
      rotationIntensity={reducedMotion ? 0 : 0.5}
      floatIntensity={reducedMotion ? 0 : 0.75}
    >
      <Rotator reducedMotion={reducedMotion}>
        <mesh scale={1.35} position={[0.25, 0.05, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial
            color="#d4a574"
            emissive="#5c3a1e"
            emissiveIntensity={0.3}
            metalness={0.55}
            roughness={0.28}
          />
        </mesh>
        <mesh scale={1.85} position={[0.25, 0.05, 0]}>
          <octahedronGeometry args={[1, 0]} />
          <meshBasicMaterial color="#e8f0dc" wireframe transparent opacity={0.45} />
        </mesh>
      </Rotator>
    </Float>
  )
}

function ShapeDodecahedron({ reducedMotion }: ShapeProps) {
  return (
    <Float
      speed={reducedMotion ? 0 : 1.15}
      rotationIntensity={reducedMotion ? 0 : 0.4}
      floatIntensity={reducedMotion ? 0 : 0.8}
    >
      <Rotator reducedMotion={reducedMotion}>
        <mesh scale={1.25} position={[0.2, 0, 0]}>
          <dodecahedronGeometry args={[1, 0]} />
          <MeshDistortMaterial
            color="#7ec8ff"
            emissive="#14324a"
            emissiveIntensity={0.4}
            roughness={0.2}
            metalness={0.5}
            distort={reducedMotion ? 0 : 0.18}
            speed={reducedMotion ? 0 : 1.2}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.9}>
          <torusGeometry args={[1, 0.03, 12, 80]} />
          <meshStandardMaterial
            color="#c8f542"
            emissive="#4a6b2a"
            emissiveIntensity={0.25}
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </Rotator>
    </Float>
  )
}

const SHAPES = [
  ShapeIcosahedron,
  ShapeTorusKnot,
  ShapeOctahedron,
  ShapeDodecahedron,
] as const

const SLIDE_LABELS = [
  'Icosahedron field',
  'Torus knot',
  'Octahedron dual',
  'Dodecahedron orbit',
] as const

function SceneFallback() {
  return (
    <mesh>
      <sphereGeometry args={[0.4, 16, 16]} />
      <meshBasicMaterial color="#9fd356" wireframe />
    </mesh>
  )
}

function WebGLCanvas({ children }: { children: ReactNode }) {
  return (
    <Canvas
      className="hero-canvas"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <color attach="background" args={['#071510']} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[4, 6, 2]} intensity={1.2} color="#f3f7e8" />
      <pointLight position={[-4, -2, -2]} intensity={0.65} color="#c8f542" />
      <Suspense fallback={<SceneFallback />}>{children}</Suspense>
    </Canvas>
  )
}

export function HeroScene({ reducedMotion }: HeroSceneProps) {
  const [webglOk, setWebglOk] = useState(true)
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const ok = !!(
        canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      )
      setWebglOk(ok)
    } catch {
      setWebglOk(false)
    }
  }, [])

  useEffect(() => {
    if (reducedMotion || paused || !webglOk) return
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % SLIDE_COUNT)
    }, AUTOPLAY_MS)
    return () => window.clearInterval(id)
  }, [reducedMotion, paused, webglOk])

  const ActiveShape = useMemo(() => SHAPES[index], [index])

  const go = (next: number) => {
    setIndex((next + SLIDE_COUNT) % SLIDE_COUNT)
  }

  if (!webglOk) {
    return <div className="hero-canvas hero-canvas--fallback" aria-hidden="true" />
  }

  return (
    <div
      className="hero-webgl"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <WebGLCanvas>
        <ActiveShape key={index} reducedMotion={reducedMotion} />
      </WebGLCanvas>

      <div
        className="hero-shape-nav"
        role="group"
        aria-label="Three.js shape slides"
        onFocusCapture={() => setPaused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
            setPaused(false)
          }
        }}
      >
        <button
          type="button"
          className="hero-shape-btn"
          aria-label="Previous shape"
          onClick={() => go(index - 1)}
        >
          Prev
        </button>
        <div className="hero-shape-dots">
          {SLIDE_LABELS.map((label, i) => (
            <button
              key={label}
              type="button"
              className={
                i === index ? 'hero-shape-dot is-active' : 'hero-shape-dot'
              }
              aria-label={label}
              aria-current={i === index ? 'true' : undefined}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          type="button"
          className="hero-shape-btn"
          aria-label="Next shape"
          onClick={() => go(index + 1)}
        >
          Next
        </button>
        <p className="hero-shape-caption" aria-live="polite">
          {SLIDE_LABELS[index]}
        </p>
      </div>
    </div>
  )
}
