import React, { useState, useEffect } from 'react';
import { Mail, Phone, ExternalLink, Menu, X, Code, Terminal, Database, Server, PenTool, Layout, ChevronRight, Award, BookOpen, GraduationCap } from 'lucide-react';

const Github = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.3 5.3 0 0 0 19 4.77a5.14 5.14 0 0 0-.5-2.9 5.07 5.07 0 0 0-4.8 3.5 13.9 13.9 0 0 0-3.4 0 5.07 5.07 0 0 0-4.8-3.5 5.14 5.14 0 0 0-.5 2.9A5.3 5.3 0 0 0 1 7.77c0 5.76 3.35 6.78 6.5 7.16A4.8 4.8 0 0 0 5.5 18v4"></path>
    <path d="M9 20a5.1 5.1 0 0 1-5-2.5"></path>
  </svg>
);

const Linkedin = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Typewriter setup
  const titles = ["Building for the Web", "Problem Solver", "Hackathon Finalist"];
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const typeSpeed = isDeleting ? 40 : 100;
    const timer = setTimeout(() => {
      const fullText = titles[titleIndex];
      if (!isDeleting && currentText === fullText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false);
        setTitleIndex((prev) => (prev + 1) % titles.length);
      } else {
        setCurrentText(fullText.substring(0, currentText.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex, titles]);

  // Scroll reveal setup
  useEffect(() => {
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };
    const observer = new IntersectionObserver(observerCallback, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Update active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'achievements', 'certifications', 'education', 'contact'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && window.scrollY >= el.offsetTop - 150) {
          current = section;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Certifications', href: '#certifications' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <div className="bg-dot-pattern min-h-screen text-gray-300 font-sans selection:bg-lime-500/30 selection:text-lime-200">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="#home" className="text-xl font-display font-bold text-white tracking-wider group">
                <span className="text-lime-400 group-hover:text-cyan-400 transition-colors">&lt;</span>
                Hiten<span className="text-lime-400 group-hover:text-cyan-400 transition-colors">/&gt;</span>
              </a>
            </div>
            
            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-wide transition-colors duration-300 hover:text-lime-400 ${
                    activeSection === link.href.substring(1) ? 'text-lime-400 font-medium' : 'text-gray-400'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900 border-b border-white/5">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-lime-400 hover:bg-white/5 rounded-md transition-all"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 md:pt-48 md:pb-32 px-4 max-w-7xl mx-auto flex flex-col justify-center min-h-screen">
        <div className="reveal space-y-6">
          <p className="font-mono text-lime-400 tracking-wide text-sm md:text-base">Hello world, I am</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display text-white tracking-tight">
            Hiten Garg.
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-display text-gray-500">
            I write code that works.
          </h2>
          
          <div className="h-8 md:h-10">
            <p className="font-mono text-xl md:text-2xl text-cyan-400">
              &gt; {currentText}<span className="animate-pulse">_</span>
            </p>
          </div>

          <p className="max-w-2xl text-lg md:text-xl text-gray-400 mt-6 pt-4 leading-relaxed">
            Full-Stack Developer | CSE @ Chitkara University. I specialize in building robust web applications, 
            solving complex problems, and exploring modern technologies.
          </p>

          <div className="flex flex-wrap gap-4 pt-8">
            <a href="#projects" className="px-6 py-3 bg-lime-400 text-gray-950 font-semibold rounded hover:bg-lime-300 transition-all shadow-[0_0_15px_rgba(163,230,53,0.3)] hover:shadow-[0_0_25px_rgba(163,230,53,0.5)]">
              View Projects
            </a>
            <a href="#contact" className="px-6 py-3 border border-gray-600 text-white font-medium rounded hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-2">
              <Mail size={18} /> Contact Me
            </a>
          </div>

          <div className="flex items-center gap-6 pt-12">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors duration-300">
              <Github size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-lime-400 transition-colors duration-300">
              <Linkedin size={24} />
            </a>
            <a href="mailto:hitengarg918@gmail.com" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
              <Mail size={24} />
            </a>
            <a href="tel:+916239526488" className="text-gray-400 hover:text-lime-400 transition-colors duration-300">
              <Phone size={24} />
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-black/40 border-y border-white/5">
        <div className="max-w-4xl mx-auto px-4 reveal">
          <div className="flex items-center gap-4 mb-10">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
              <span className="text-lime-400 font-mono text-2xl mr-2">01.</span>About Me
            </h2>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-6 text-lg text-gray-400 leading-relaxed">
              <p>
                I am a passionate Computer Science Engineering student focused on full-stack development. 
                My journey into tech started with an immense curiosity about how applications function behind the scenes.
              </p>
              <p>
                Fast-forward to today, and I possess a <span className="text-lime-400">CGPA of 9.60</span> at Chitkara University. 
                I thrive in hackathons, love collaborating with like-minded individuals, and am constantly pushing myself to learn the latest frameworks, build real-world applications, and write clean, scalable code.
              </p>
              <p>
                When I'm not studying or building projects, you'll probably find me exploring new databases, 
                testing cloud deployments, or brainstorming the next big software idea.
              </p>
            </div>
            <div className="hidden md:block relative">
              <div className="w-full aspect-square bg-gray-900 border border-lime-500/30 rounded-lg relative z-10 
                              before:absolute before:inset-0 before:bg-lime-400/10 before:z-20
                              after:absolute after:inset-0 after:border-2 after:border-cyan-400/50 after:rounded-lg after:translate-x-4 after:translate-y-4 after:-z-10 transition-all hover:after:translate-x-2 hover:after:translate-y-2">
                {/* Normally an image goes here, we use a tech illustration placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-lime-400/50">
                  <Code size={100} strokeWidth={1} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 max-w-5xl mx-auto px-4">
        <div className="reveal">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
              <span className="text-lime-400 font-mono text-2xl mr-2">02.</span>Skills
            </h2>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="glow-card bg-gray-900/50 p-6 rounded-xl flex flex-col items-start gap-4">
              <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400">
                <Terminal size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Languages</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['C++', 'Java', 'JavaScript'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">{skill}</span>
                ))}
              </div>
            </div>

            <div className="glow-card glow-card-cyan bg-gray-900/50 p-6 rounded-xl flex flex-col items-start gap-4">
              <div className="p-3 bg-cyan-400/10 rounded-lg text-cyan-400">
                <Layout size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Frontend</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['HTML', 'CSS', 'Tailwind', 'React.js'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">{skill}</span>
                ))}
              </div>
            </div>

            <div className="glow-card bg-gray-900/50 p-6 rounded-xl flex flex-col items-start gap-4">
              <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400">
                <Server size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Backend</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['Node.js', 'Express.js'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">{skill}</span>
                ))}
              </div>
            </div>

            <div className="glow-card glow-card-cyan bg-gray-900/50 p-6 rounded-xl flex flex-col items-start gap-4">
              <div className="p-3 bg-cyan-400/10 rounded-lg text-cyan-400">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Databases</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['MongoDB', 'PostgreSQL'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">{skill}</span>
                ))}
              </div>
            </div>

            <div className="glow-card bg-gray-900/50 p-6 rounded-xl flex flex-col items-start gap-4">
              <div className="p-3 bg-lime-400/10 rounded-lg text-lime-400">
                <Server size={24} /> 
              </div>
              <h3 className="text-xl font-bold text-white">Cloud & DevOps</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['Nginx', 'Render', 'Vercel', 'AWS'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">{skill}</span>
                ))}
              </div>
            </div>

            <div className="glow-card glow-card-cyan bg-gray-900/50 p-6 rounded-xl flex flex-col items-start gap-4">
              <div className="p-3 bg-cyan-400/10 rounded-lg text-cyan-400">
                <PenTool size={24} />
              </div>
              <h3 className="text-xl font-bold text-white">Tools & Concepts</h3>
              <div className="flex flex-wrap gap-2 mt-auto">
                {['Git', 'Postman', 'Selenium', 'OS', 'DSA', 'Scrum'].map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm font-mono text-gray-300">{skill}</span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-black/40 border-y border-white/5">
        <div className="max-w-6xl mx-auto px-4 reveal">
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white">
              <span className="text-cyan-400 font-mono text-2xl mr-2">03.</span>Select Works
            </h2>
            <div className="h-px bg-white/10 flex-grow"></div>
          </div>

          <div className="space-y-20">
            {/* Project 1 */}
            <div className="flex flex-col lg:flex-row gap-8 items-center group">
              <div className="w-full lg:w-7/12 relative">
                <div className="absolute inset-0 bg-lime-400/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300 rounded-xl z-10 pointer-events-none"></div>
                <div className="aspect-video bg-gray-900 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center p-8 relative">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 rounded-bl-full blur-2xl"></div>
                   <h3 className="font-display font-bold text-4xl text-gray-700 opacity-50">AGRISPHERE</h3>
                </div>
              </div>
              <div className="w-full lg:w-5/12 flex flex-col lg:items-end text-left lg:text-right">
                <p className="font-mono text-lime-400 text-sm mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold text-white mb-4">AgriSphere</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-white/5 relative z-20 shadow-xl mb-6">
                  <p className="text-gray-300">
                    Smart Crop Farming Platform featuring AI-powered crop recommendations and a virtual marketplace. 
                    Includes Razorpay payment integration and a Gemini API chatbot built specifically for farmers.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-3 font-mono text-sm text-gray-400 mb-6 lg:justify-end">
                  <li>React.js</li>
                  <li>Node.js</li>
                  <li>MongoDB</li>
                  <li>Tailwind</li>
                  <li>Razorpay</li>
                  <li>Gemini API</li>
                </ul>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-300 hover:text-lime-400 transition-colors flex items-center gap-2 text-sm font-medium">
                    <ExternalLink size={20} /> Live Demo
                  </a>
                  <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="flex flex-col lg:flex-row-reverse gap-8 items-center group">
              <div className="w-full lg:w-7/12 relative">
                <div className="absolute inset-0 bg-cyan-400/20 mix-blend-multiply group-hover:bg-transparent transition-all duration-300 rounded-xl z-10 pointer-events-none"></div>
                <div className="aspect-video bg-gray-900 border border-white/10 rounded-xl overflow-hidden flex items-center justify-center p-8 relative">
                   <div className="absolute bottom-0 left-0 w-32 h-32 bg-cyan-400/10 rounded-tr-full blur-2xl"></div>
                   <h3 className="font-display font-bold text-4xl text-gray-700 opacity-50">ASSIGNMENTS</h3>
                </div>
              </div>
              <div className="w-full lg:w-5/12 flex flex-col items-start text-left">
                <p className="font-mono text-cyan-400 text-sm mb-2">Featured Project</p>
                <h3 className="text-2xl font-bold text-white mb-4">Assignment Management System</h3>
                <div className="bg-gray-900 p-6 rounded-xl border border-white/5 relative z-20 shadow-xl mb-6 w-full">
                  <p className="text-gray-300">
                    A comprehensive system supporting role-based access for Admins, Professors, and Students. 
                    Features seamless Cloudinary file uploads and a full assignment tracking workflow.
                  </p>
                </div>
                <ul className="flex flex-wrap gap-3 font-mono text-sm text-gray-400 mb-6">
                  <li>Node.js</li>
                  <li>Express.js</li>
                  <li>MongoDB</li>
                  <li>EJS</li>
                  <li>Cloudinary</li>
                </ul>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-300 hover:text-cyan-400 transition-colors flex items-center gap-2 text-sm font-medium">
                    <ExternalLink size={20} /> Live Demo
                  </a>
                  <a href="#" className="text-gray-300 hover:text-lime-400 transition-colors">
                    <Github size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Achievements & Certifications */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12">
          
          {/* Achievements */}
          <div id="achievements" className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-8 flex items-center gap-3">
              <Award className="text-lime-400" />
              Achievements
            </h2>
            <div className="space-y-6">
              
              <div className="glow-card bg-gray-900/50 p-6 rounded-xl border-l-4 border-l-lime-400">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Winner</h3>
                    <p className="text-gray-400 mt-1">Smart India Hackathon (University Level)</p>
                  </div>
                  <span className="text-3xl">🏆</span>
                </div>
              </div>

              <div className="glow-card bg-gray-900/50 p-6 rounded-xl border-l-4 border-l-gray-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Finalist</h3>
                    <p className="text-gray-400 mt-1">HackIndia Hackathon</p>
                  </div>
                  <span className="text-3xl">🥈</span>
                </div>
              </div>

              <div className="glow-card bg-gray-900/50 p-6 rounded-xl border-l-4 border-l-gray-500">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-white">Finalist</h3>
                    <p className="text-gray-400 mt-1">HackNexus Hackathon, Chitkara University</p>
                  </div>
                  <span className="text-3xl">🥈</span>
                </div>
              </div>

            </div>
          </div>

          {/* Certifications */}
          <div id="certifications" className="reveal">
            <h2 className="text-2xl md:text-3xl font-bold font-display text-white mb-8 flex items-center gap-3">
              <BookOpen className="text-cyan-400" />
              Certifications
            </h2>
            <div className="space-y-6">
              
              <div className="glow-card glow-card-cyan bg-gray-900/50 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BookOpen size={64} />
                </div>
                <div className="relative z-10">
                  <span className="font-mono text-xs text-cyan-400 tracking-wider">OCT 2024</span>
                  <h3 className="text-lg font-bold text-white mt-1">Database Management System</h3>
                  <p className="text-gray-400 mt-2 text-sm">Infosys Springboard</p>
                </div>
              </div>

              <div className="glow-card glow-card-cyan bg-gray-900/50 p-6 rounded-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <BookOpen size={64} />
                </div>
                <div className="relative z-10">
                  <span className="font-mono text-xs text-cyan-400 tracking-wider">NOV 2023</span>
                  <h3 className="text-lg font-bold text-white mt-1">Network Fundamentals</h3>
                  <p className="text-gray-400 mt-2 text-sm">Infosys Springboard</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* Education */}
      <section id="education" className="py-20 bg-black/40 border-y border-white/5">
        <div className="max-w-3xl mx-auto px-4 reveal">
          <div className="flex items-center gap-4 mb-16 justify-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-white flex items-center gap-3">
              <GraduationCap className="text-lime-400" size={36} />
              Education
            </h2>
          </div>

          <div className="relative border-l border-white/10 ml-4 md:ml-0 md:pl-8 space-y-12">
            
            <div className="relative">
              <div className="absolute -left-[45px] bg-gray-900 border-2 border-lime-400 w-6 h-6 rounded-full mt-1.5 hidden md:block"></div>
              <div className="absolute -left-[21px] bg-gray-900 border-2 border-lime-400 w-4 h-4 rounded-full mt-1.5 md:hidden"></div>
              
              <div className="bg-gray-900/80 border border-white/5 p-6 rounded-xl ml-6 md:ml-0 hover:border-lime-500/30 transition-colors">
                <span className="font-mono text-lime-400 text-sm">2023 – Present</span>
                <h3 className="text-xl font-bold text-white mt-2">B.E. Computer Science Engineering</h3>
                <p className="text-gray-300 mt-1 text-lg">Chitkara University</p>
                <div className="mt-4 px-3 py-1 bg-lime-400/10 text-lime-400 inline-block rounded font-mono text-sm">
                  CGPA: 9.60
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[45px] bg-gray-900 border-2 border-cyan-400 w-6 h-6 rounded-full mt-1.5 hidden md:block"></div>
              <div className="absolute -left-[21px] bg-gray-900 border-2 border-cyan-400 w-4 h-4 rounded-full mt-1.5 md:hidden"></div>
              
              <div className="bg-gray-900/80 border border-white/5 p-6 rounded-xl ml-6 md:ml-0 hover:border-cyan-500/30 transition-colors">
                <h3 className="text-xl font-bold text-white">Class 12th</h3>
                <p className="text-gray-300 mt-1">Shaheed Bhagat Singh Public High School, Sangrur</p>
                <div className="mt-4 px-3 py-1 bg-cyan-400/10 text-cyan-400 inline-block rounded font-mono text-sm">
                  Score: 82.8%
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -left-[45px] bg-gray-900 border-2 border-gray-500 w-6 h-6 rounded-full mt-1.5 hidden md:block"></div>
              <div className="absolute -left-[21px] bg-gray-900 border-2 border-gray-500 w-4 h-4 rounded-full mt-1.5 md:hidden"></div>
              
              <div className="bg-gray-900/80 border border-white/5 p-6 rounded-xl ml-6 md:ml-0 hover:border-white/20 transition-colors">
                <h3 className="text-xl font-bold text-white">Class 10th</h3>
                <p className="text-gray-300 mt-1">General Gurnam Singh Public School, Sangrur</p>
                <div className="mt-4 px-3 py-1 bg-white/10 text-gray-300 inline-block rounded font-mono text-sm">
                  Score: 87.6%
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 max-w-4xl mx-auto px-4 text-center">
        <div className="reveal">
          <p className="font-mono text-lime-400 mb-4">04. What's Next?</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display text-white mb-6">Get In Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
            I'm currently looking for new opportunities and collaborations. Whether you have a question, 
            a project proposal, or just want to say hi, my inbox is always open. Let's build something great together.
          </p>
          
          <a href="mailto:hitengarg918@gmail.com" className="inline-block px-8 py-4 bg-transparent border border-lime-400 text-lime-400 font-mono rounded hover:bg-lime-400/10 transition-colors mb-16">
            Say Hello
          </a>

          <div className="flex justify-center items-center gap-8">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-white transition-colors duration-300">
              <Github size={28} />
              <span className="sr-only">GitHub</span>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-gray-500 hover:text-lime-400 transition-colors duration-300">
              <Linkedin size={28} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="mailto:hitengarg918@gmail.com" className="text-gray-500 hover:text-cyan-400 transition-colors duration-300">
              <Mail size={28} />
              <span className="sr-only">Email</span>
            </a>
            <a href="tel:+916239526488" className="text-gray-500 hover:text-lime-400 transition-colors duration-300">
              <Phone size={28} />
              <span className="sr-only">Phone</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-white/5">
        <p className="font-mono text-sm text-gray-500">
          Designed & Built by Hiten Garg <br />
          <span className="text-xs mt-2 inline-block">Made with React & Tailwind CSS</span>
        </p>
      </footer>

    </div>
  );
};

export default App;
