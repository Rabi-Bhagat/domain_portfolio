import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ChevronRight, Sparkles, ExternalLink } from 'lucide-react';

export default function PortfolioBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Namaste! 🙏 I am Rabi\'s AI Assistant. How can I assist you today?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const handleOptionClick = (option) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);

    // Simulate bot response
    setTimeout(() => {
      let botResponse = "";

      switch(option.action) {
        case 'about':
          botResponse = "Rabi Bhagat is a passionate B.Tech CSE student (2023-2027) & Full Stack Developer specializing in React, Node.js, Express, MongoDB, and Flutter! 🚀";
          scrollToSection('about');
          break;
        case 'skills':
          botResponse = "Rabi is highly proficient in Frontend (React, Tailwind CSS), Backend (Node.js, Express), Databases (MongoDB), and Mobile Dev (Flutter). Check out the skills section! ⚡";
          scrollToSection('skills');
          break;
        case 'projects':
          botResponse = "Rabi has built 9+ projects including MERN stack portals, hotel booking platforms, signature apps, and tools! Click any project for interactive Live Demos! 💻";
          scrollToSection('projects');
          break;
        case 'contact':
          botResponse = "You can reach Rabi via the contact form below, email at rabibhagat789@gmail.com, or directly on WhatsApp! 📧";
          scrollToSection('contact');
          break;
        default:
          botResponse = "I'm here to help you explore Rabi's portfolio!";
      }

      setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);
  };

  const options = [
    { label: "Who is Rabi?", action: "about" },
    { label: "What are his skills?", action: "skills" },
    { label: "Show Live Demos", action: "projects" },
    { label: "How to contact?", action: "contact" },
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show greeting bubble on load
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 1500);
    const hideTimer = setTimeout(() => setShowGreeting(false), 7000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20, x: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20, x: -20 }}
            className="w-[310px] md:w-[360px] h-[460px] glass-card rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-white/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-800/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-lg shadow-md shadow-primary/30">
                  🤖
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">Portfolio Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">Online & Ready</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white p-1 rounded-lg transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.type === 'user'
                      ? 'bg-primary text-white rounded-tr-none shadow-md shadow-primary/20 font-medium'
                      : 'bg-slate-100 dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700/60 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Options / Input Area */}
            <div className="p-3.5 border-t border-slate-200 dark:border-white/10 bg-slate-100/60 dark:bg-slate-800/40">
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2 ml-1">Quick Suggestions:</p>
              <div className="flex flex-wrap gap-1.5">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(opt)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-all duration-200 flex items-center gap-1 shadow-sm"
                  >
                    {opt.label} <ChevronRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button & Greeting Bubble */}
      <div className="relative group">
        <AnimatePresence>
          {!isOpen && showGreeting && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.8 }}
              className="absolute left-full top-0 ml-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-4 py-2 rounded-2xl rounded-bl-none shadow-xl whitespace-nowrap font-bold text-xs border border-primary/40 flex items-center gap-1.5"
            >
              <span>Namaste! 🙏 How can I help?</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 rounded-2xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-3xl shadow-xl shadow-primary/30 relative z-50 hover:shadow-primary/50 transition-shadow border border-white/20"
          aria-label="Open portfolio bot assistant"
        >
          {isOpen ? <X size={24} className="text-white" /> : "🤖"}

          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <span className="w-full h-full rounded-full bg-red-500 animate-ping opacity-75 absolute"></span>
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
