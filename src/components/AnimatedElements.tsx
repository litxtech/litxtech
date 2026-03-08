import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from '../contexts/LanguageContext'

// Floating Code Elements Component
export function FloatingCodeElements() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const codeElements = [
      '<div>', '</div>', 'function()', 'const', 'let', 'if', 'else', 'return',
      'React', 'Vue', 'Angular', 'Node.js', 'Python', 'JavaScript', 'TypeScript',
      'API', 'Database', 'Server', 'Client', 'Component', 'Hook', 'State',
      'async', 'await', 'Promise', 'fetch', 'JSON', 'CSS', 'HTML'
    ]

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      text: string
      opacity: number
      size: number
    }> = []

    // Create particles
    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        text: codeElements[Math.floor(Math.random() * codeElements.length)],
        opacity: Math.random() * 0.3 + 0.1,
        size: Math.random() * 12 + 8
      })
    }

    function animate() {
      if (!ctx || !canvas) return // Null check added
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw particle
        ctx.save()
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = '#60a5fa'
        ctx.font = `${particle.size}px 'Fira Code', monospace`
        ctx.fillText(particle.text, particle.x, particle.y)
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return // Null check added
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

// Animated Code Block Component
export function AnimatedCodeBlock() {
  return (
    <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 font-mono text-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 ml-4">LitxTech.js</span>
      </div>
      
      <pre className="text-blue-300 whitespace-pre-wrap">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
{`// Build Amazing Software Solutions
const litxTech = {
  frameworks: ['React', 'Next.js', 'Vue'],
  backend: ['Node.js', 'Python', 'Supabase'],
  ai: ['DeepSeek', 'OpenAI', 'LangChain'],
  payments: 'Stripe',
  delivery: 'Lightning Fast'
}

// Ready to scale your business?
litxTech.build('your-idea')`}
        </motion.span>
      </pre>
    </div>
  )
}

// Tech Stack Showcase Component
export function TechStackShowcase() {
  const techStack = [
    { name: 'React', icon: '⚛️', color: 'text-blue-400' },
    { name: 'Node.js', icon: '🟢', color: 'text-green-400' },
    { name: 'TypeScript', icon: '🔷', color: 'text-blue-500' },
    { name: 'Python', icon: '🐍', color: 'text-yellow-400' },
    { name: 'AI/ML', icon: '🧠', color: 'text-purple-400' },
    { name: 'Cloud', icon: '☁️', color: 'text-cyan-400' },
    { name: 'Database', icon: '🗄️', color: 'text-orange-400' },
    { name: 'Mobile', icon: '📱', color: 'text-pink-400' }
  ]

  return (
    <div className="grid grid-cols-4 gap-4">
      {techStack.map((tech, index) => (
        <motion.div
          key={tech.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center hover:bg-white/20 transition-all duration-300"
        >
          <div className="text-2xl mb-2">{tech.icon}</div>
          <div className={`text-sm font-medium ${tech.color}`}>{tech.name}</div>
        </motion.div>
      ))}
    </div>
  )
}

// Animated Stats Component
export function AnimatedStats() {
  const t = useTranslation() // Use translation hook
  
  const stats = [
    { number: '500+', label: t.stats.projectsDelivered, icon: '🚀' },
    { number: '50+', label: t.stats.happyClients, icon: '😊' },
    { number: '24/7', label: t.stats.support, icon: '🛠️' },
    { number: '99%', label: t.stats.successRate, icon: '✅' }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2, duration: 0.6 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 text-center"
        >
          <div className="text-4xl font-bold text-white mb-2">{stat.icon} {stat.number}</div>
          <div className="text-gray-300 font-medium">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  )
}

// Hero Code Flow Effect - Typing Animation
export function HeroCodeFlow() {
  const [currentCode, setCurrentCode] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isTyping, setIsTyping] = useState(true)

  const codeSnippets = [
    `// LitxTech Starter Website
const website = {
  pages: ['home', 'about', 'contact'],
  features: ['responsive', 'seo', 'fast'],
  delivery: '7 days'
}`,
    `// AI Integration Example
const aiAssistant = {
  model: 'DeepSeek',
  features: ['chat', 'automation'],
  integration: 'Stripe + Supabase'
}`,
    `// Professional Suite
const suite = {
  dashboard: true,
  api: 'REST + GraphQL',
  auth: 'Supabase Auth',
  payments: 'Stripe'
}`,
    `// Enterprise Platform
const platform = {
  users: 'unlimited',
  features: ['AI', 'analytics', 'automation'],
  scale: 'enterprise'
}`
  ]

  useEffect(() => {
    const typeText = () => {
      const fullText = codeSnippets[currentCode]
      let index = 0
      
      setIsTyping(true)
      setDisplayText('')
      
      const typeInterval = setInterval(() => {
        if (index < fullText.length) {
          setDisplayText(fullText.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(typeInterval)
          
          // Wait 3 seconds then switch to next code
          setTimeout(() => {
            setCurrentCode((prev) => (prev + 1) % codeSnippets.length)
          }, 3000)
        }
      }, 50)
    }

    typeText()
  }, [currentCode])

  return (
    <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 font-mono text-sm">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="text-gray-400 ml-4">LitxTech.js</span>
      </div>
      
      <pre className="text-blue-300 whitespace-pre-wrap">
        {displayText}
        {isTyping && <span className="animate-pulse">|</span>}
      </pre>
    </div>
  )
}

// Background Code Particles with Glow Effect
export function BackgroundCodeParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const codeWords = [
      'const', 'let', 'function', 'return', 'if', 'else', 'async', 'await',
      'React', 'Vue', 'Node', 'Python', 'API', 'Database', 'Server',
      'Component', 'Hook', 'State', 'Props', 'TypeScript', 'JavaScript'
    ]

    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      text: string
      opacity: number
      size: number
      glow: number
    }> = []

    // Create particles
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        text: codeWords[Math.floor(Math.random() * codeWords.length)],
        opacity: Math.random() * 0.2 + 0.05,
        size: Math.random() * 10 + 8,
        glow: Math.random() * 0.5 + 0.2
      })
    }

    function animate() {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      particles.forEach(particle => {
        particle.x += particle.vx
        particle.y += particle.vy

        // Wrap around screen
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0

        // Draw glow effect
        ctx.save()
        ctx.shadowColor = '#60a5fa'
        ctx.shadowBlur = particle.glow * 20
        ctx.globalAlpha = particle.opacity
        ctx.fillStyle = '#60a5fa'
        ctx.font = `${particle.size}px 'Fira Code', monospace`
        ctx.fillText(particle.text, particle.x, particle.y)
        ctx.restore()
      })

      requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}

// Matrix-style Code Rain for Footer
export function MatrixCodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = 200

    const chars = '01ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
    const fontSize = 14
    const columns = canvas.width / fontSize

    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = 1
    }

    function draw() {
      if (!ctx || !canvas) return
      
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
    }

    const interval = setInterval(draw, 50)

    const handleResize = () => {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = 200
    }

    window.addEventListener('resize', handleResize)
    return () => {
      clearInterval(interval)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none opacity-20"
      style={{ zIndex: 0 }}
    />
  )
}

// Breathing Title Animation
export function BreathingTitle({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.02, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  )
}

// Glow Button Effect
export function GlowButton({ children, className = "", ...props }: any) {
  return (
    <motion.button
      className={`relative overflow-hidden px-6 py-3 font-bold text-white group ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <span className="absolute inset-0 w-full h-full transition-all duration-500 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100"></span>
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

// AI Interaction Component
export function AIInteraction() {
  const [isOpen, setIsOpen] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [response, setResponse] = useState('')

  const handleAskAI = () => {
    if (!prompt.trim()) return
    
    setResponse('Thinking...')
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "I'll create a modern React website with Tailwind CSS and Stripe integration for you!",
        "Perfect! I'll build a responsive landing page with contact forms and SEO optimization.",
        "Great idea! I'll develop a full-stack application with authentication and payment processing.",
        "Excellent! I'll create a custom dashboard with real-time analytics and user management."
      ]
      setResponse(responses[Math.floor(Math.random() * responses.length)])
    }, 2000)
  }

  return (
    <div className="relative">
      <motion.div
        className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 rounded-xl cursor-pointer"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">🧠</span>
          </div>
          <div>
            <h3 className="text-white font-semibold">AI Powered</h3>
            <p className="text-white/80 text-sm">Ask Litx AI →</p>
          </div>
        </div>
      </motion.div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl p-4 z-50"
        >
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Create my website structure"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAskAI}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ask AI
            </button>
            {response && (
              <div className="p-3 bg-gray-100 rounded-lg text-sm">
                {response}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  )
}