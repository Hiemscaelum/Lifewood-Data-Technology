import { useState, useEffect, useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import LiquidEther from './LiquidEther'
import './App.css'

// Logo component
const Logo = () => (
  <motion.img 
    src="https://framerusercontent.com/images/BZSiFYgRc4wDUAuEybhJbZsIBQY.png" 
    alt="Lifewood"
    className="logo-img"
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
  />
)

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { title: 'Home', hasDropdown: false },
    { title: 'AI Initiatives', hasDropdown: true },
    { title: 'Our Company', hasDropdown: true },
    { title: 'What We Offer', hasDropdown: true },
    { title: 'Philanthropy & Impact', hasDropdown: false },
    { title: 'Careers', hasDropdown: false },
    { title: 'Contact Us', hasDropdown: false },
  ]

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-container">
        <Logo />
        
        <div className="nav-links">
          {menuItems.map((item, index) => (
            <a key={index} href="#" className="nav-link">
              <span>{item.title}</span>
              {item.hasDropdown && (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              )}
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  )
}

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = '', duration = 2 }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (isInView) {
      let start = 0
      const increment = end / (duration * 60)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 1000 / 60)
      return () => clearInterval(timer)
    }
  }, [isInView, end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// Hero Section
const Hero = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -100])

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-liquid-wrap">
          <LiquidEther
            colors={['#29ff69', '#9effb6', '#d19f66']}
            mouseForce={20}
            cursorSize={140}
            isViscous
            viscous={30}
            iterationsViscous={32}
            iterationsPoisson={32}
            resolution={0.5}
            isBounce={false}
            autoDemo
            autoSpeed={0.5}
            autoIntensity={2.2}
            takeoverDuration={0.25}
            autoResumeDelay={3000}
            autoRampDuration={0.6}
          />
        </div>
        <div className="hero-gradient"></div>
        <motion.div style={{ y: y1 }} className="hero-shape shape-1"></motion.div>
        <motion.div style={{ y: y2 }} className="hero-shape shape-2"></motion.div>
      </div>

      <div className="hero-content">
        <motion.h1 
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Bridging East & West<br />
          <span className="highlight">Through Innovation</span>
        </motion.h1>

        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Empowering enterprises with cutting-edge AI solutions while driving sustainable, 
          purpose-led transformation across the globe.
        </motion.p>

        <motion.div 
          className="hero-cta"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <button className="btn btn-primary">
            Explore Solutions
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="btn btn-secondary">Contact Us</button>
        </motion.div>
      </div>

      <motion.div 
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </motion.div>
    </section>
  )
}

// About Section
const About = () => {
  return (
    <section className="section about-section">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-label">About Lifewood</span>
            <h2>About <span className="text-gradient">Us</span></h2>
            <p className="about-text">
              At Lifewood we empower our company and our clients to realize the transformative power of AI:
              bringing big data to life and launching new ways of thinking, learning and doing for the
              good of humankind.
            </p>
            <p className="about-text">
              By connecting local expertise with our global AI data infrastructure, we create opportunities,
              empower communities, and drive inclusive growth worldwide.
            </p>
          </motion.div>

          <motion.div 
            className="about-visual"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="about-card about-image-card">
              <img
                className="about-image"
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
                alt="Lifewood team collaborating"
              />
            </div>
            <div className="about-shapes">
              <div className="shape-circle"></div>
              <div className="shape-ring"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// Global Impact Stats Section
const ImpactStats = () => {
  const stats = [
    {
      title: '40+ Global Delivery Centers',
      description:
        'Lifewood operates 40+ secure delivery centers worldwide, providing the backbone for AI data operations. These hubs ensure sensitive data is processed in controlled environments, with industrialized workflows and strict compliance standards across all regions.',
      tone: 'ivory',
    },
    {
      title: '30+ Countries Across All Continents',
      description:
        'Lifewood’s global footprint spans over 30 countries across all continents, enabling diverse data sourcing, regional expertise, and scalable AI data solutions worldwide.',
      tone: 'gold',
    },
    {
      title: '50+ Language Capabilities and Dialects',
      description:
        'Lifewood supports over 50 languages and dialects, enabling accurate linguistic data collection, annotation, transcription, and AI training across diverse global markets.',
      tone: 'forest',
    },
    {
      title: '56,000+ Global Online Resources',
      description:
        'Lifewood leverages a global network of over 56,000 online resources, including trained data specialists, linguists, and remote contributors supporting AI data production and processing.',
      tone: 'black',
    },
  ]
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section className="section impact-section">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Global Impact</span>
          <h2>Global <span className="text-gradient">Scale</span></h2>
        </motion.div>

        <div className="impact-accordion">
          {stats.map((stat, index) => {
            const isOpen = openIndex === index
            return (
            <motion.div 
              key={index}
              className={`impact-item impact-${stat.tone} ${isOpen ? 'open' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button
                className="impact-header"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
                aria-expanded={isOpen}
              >
                <span>{stat.title}</span>
                <span className="impact-toggle">{isOpen ? '−' : '+'}</span>
              </button>

              {isOpen && (
                <motion.div
                  className="impact-body"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <p>{stat.description}</p>
                  <span className="impact-arrow">↗</span>
                </motion.div>
              )}
            </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// Capabilities Grid Section
const Capabilities = () => {
  const capabilities = [
    { icon: '🎙️', title: 'Audio', description: 'Collection, labelling, voice categorization, music categorization, and intelligent conversational support.' },
    { icon: '🖼️', title: 'Image', description: 'Collection, labelling, classification, audit, object detection, and precision tagging workflows.' },
    { icon: '🎬', title: 'Video', description: 'Collection, labelling, audit, live broadcast support, and subtitle generation for AI pipelines.' },
    { icon: '📝', title: 'Text', description: 'Text collection, labelling, transcription, utterance collection, and sentiment analysis services.' },
  ]

  return (
    <section className="section capabilities-section">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-label">AI DATA SERVICES</span>
          <h2>Built for Every <span className="text-gradient">Data Type</span></h2>
          <p>Lifewood offers AI and IT services that enhance decision-making, reduce costs, and improve productivity.</p>
        </motion.div>

        <div className="capabilities-grid">
          {capabilities.map((cap, index) => (
            <motion.div 
              key={index}
              className="capability-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <div className="capability-icon">{cap.icon}</div>
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
              <motion.div 
                className="capability-link"
                whileHover={{ x: 5 }}
              >
                Explore service →
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ESG Section
const ESG = () => {
  return (
    <section className="section esg-section">
      <div className="esg-bg">
        <div className="esg-gradient"></div>
      </div>
      <div className="container">
        <div className="esg-grid">
          <motion.div 
            className="esg-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="section-label">Constant Innovation</span>
            <h2>Unlimited <span className="text-gradient">Possibilities</span></h2>
            <p>
              No matter the industry, size, or type of data involved, our solutions are designed
              to satisfy complex AI data-processing requirements at scale.
            </p>
          </motion.div>

          <div className="esg-cards">
            <motion.div 
              className="esg-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="esg-icon">🌍</div>
              <h3>Global</h3>
              <p>Worldwide operations designed to localize datasets, optimize compliance, and speed deployment.</p>
              <div className="esg-stat">
                <span className="esg-stat-number">30+</span>
                <span className="esg-stat-label">Countries</span>
              </div>
            </motion.div>

            <motion.div 
              className="esg-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="esg-icon">📦</div>
              <h3>AI Data Projects at Scale</h3>
              <p>High-volume annotation and curation programs supported by robust delivery operations.</p>
              <div className="esg-stat">
                <span className="esg-stat-number">40+</span>
                <span className="esg-stat-label">Delivery Centers</span>
              </div>
            </motion.div>

            <motion.div 
              className="esg-card glass-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
            >
              <div className="esg-icon">🧠</div>
              <h3>Language & Domain Depth</h3>
              <p>Diverse linguistic and domain expertise to support multilingual and specialized AI use cases.</p>
              <div className="esg-stat">
                <span className="esg-stat-number">50+</span>
                <span className="esg-stat-label">Languages & Dialects</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Global Presence Section
const GlobalPresence = () => {
  const locations = [
    { region: 'ASEAN', countries: ['Singapore', 'Thailand', 'Vietnam', 'Indonesia', 'Malaysia'], highlight: true },
    { region: 'China', countries: ['Shanghai', 'Beijing', 'Shenzhen', 'Hong Kong'], highlight: true },
    { region: 'Europe', countries: ['UK', 'Germany', 'France', 'Netherlands'] },
    { region: 'Americas', countries: ['USA', 'Canada', 'Mexico', 'Brazil'] },
  ]

  return (
    <section className="section global-section">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Global Presence</span>
          <h2>A <span className="text-gradient">World of Opportunity</span></h2>
          <p>Strategic presence across key markets, bridging East and West.</p>
        </motion.div>

        <div className="global-map">
          <div className="map-visual">
            <div className="world-map">
              <div className="map-region asean" style={{ top: '45%', left: '75%' }}>
                <div className="map-point highlight"></div>
                <div className="map-tooltip">ASEAN Hub</div>
              </div>
              <div className="map-region china" style={{ top: '35%', left: '82%' }}>
                <div className="map-point highlight"></div>
                <div className="map-tooltip">China Operations</div>
              </div>
              <div className="map-region europe" style={{ top: '25%', left: '48%' }}>
                <div className="map-point"></div>
                <div className="map-tooltip">Europe</div>
              </div>
              <div className="map-region americas" style={{ top: '35%', left: '15%' }}>
                <div className="map-point"></div>
                <div className="map-tooltip">Americas</div>
              </div>
            </div>
          </div>

          <div className="locations-list">
            {locations.map((loc, index) => (
              <motion.div 
                key={index}
                className={`location-card glass-card ${loc.highlight ? 'highlight' : ''}`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h3>{loc.region}</h3>
                <p>{loc.countries.join(' • ')}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// Clients & Partners Section
const Clients = () => {
  const clients = [
    { name: 'Enterprise Corp', logo: '🏢' },
    { name: 'Tech Giant', logo: '💻' },
    { name: 'Global Bank', logo: '🏦' },
    { name: 'Healthcare Plus', logo: '🏥' },
    { name: 'Retail King', logo: '🛒' },
    { name: 'Finance Hub', logo: '📊' },
  ]

  return (
    <section className="section clients-section">
      <div className="container">
        <motion.div 
          className="section-header text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Clients & Partners</span>
          <h2>Our Clients <span className="text-gradient">And Partners</span></h2>
          <p>
            We are proud to partner with leading organizations worldwide in transforming data
            into meaningful AI-ready solutions.
          </p>
        </motion.div>

        <div className="clients-track">
          <div className="clients-slide">
            {[...clients, ...clients].map((client, index) => (
              <motion.div 
                key={index}
                className="client-logo glass-card"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.2)' }}
              >
                <span className="client-icon">{client.logo}</span>
                <span className="client-name">{client.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

// CTA Section
const CTA = () => {
  return (
    <section className="section cta-section">
      <div className="cta-bg">
        <div className="cta-gradient"></div>
      </div>
      <div className="container">
        <motion.div 
          className="cta-content text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>We provide global Data Engineering Services to enable AI Solutions.</h2>
          <p>Connect with Lifewood to build scalable, production-ready data foundations for AI.</p>
          <div className="cta-buttons">
            <button className="btn btn-primary">
              Get Started
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M4 10H16M16 10L11 5M16 10L11 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn btn-secondary">Contact Us</button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Footer
const Footer = () => {
  const footerLinks = {
    Company: ['Home', 'AI Initiatives', 'Our Company', 'What We Offer'],
    Impact: ['Philanthropy & Impact', 'Careers', 'Contact Us'],
    Legal: ['Privacy Policy', 'Cookie Policy', 'Terms and Conditions'],
    Connect: ['LinkedIn', 'Facebook', 'Instagram', 'YouTube'],
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p>The world’s leading provider of AI-powered data solutions.</p>
            <div className="social-links">
              <a href="#" className="social-icon">in</a>
              <a href="#" className="social-icon">tw</a>
              <a href="#" className="social-icon">fb</a>
              <a href="#" className="social-icon">yt</a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="footer-column">
              <h4>{category}</h4>
              <ul>
                {links.map((link, index) => (
                  <li key={index}><a href="#">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <p>© 2026 Lifewood - All Rights Reserved</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Main App
function App() {
  return (
    <div className="app">
      <Navigation />
      <Hero />
      <About />
      <ImpactStats />
      <Clients />
      <ESG />
      <Capabilities />
      <CTA />
      <Footer />
    </div>
  )
}

export default App
