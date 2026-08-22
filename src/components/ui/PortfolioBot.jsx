import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, X, ChevronRight, User, Code2, Briefcase, 
  Award, Mail, RotateCcw, Send, CheckCircle2 
} from 'lucide-react';

export default function PortfolioBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Welcome to Rabi Bhagat's Portfolio! 👋 I'm your AI guide. How can I assist your exploration today?"
    }
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
    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, type: 'user', text: option.label }]);
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      let botResponse = "";

      switch(option.action) {
        case 'about':
          botResponse = "Rabi Bhagat is a B.Tech Computer Science student (2023–2027) at Maharishi Markandeshwar University specializing in Full-Stack (MERN) and Mobile (Flutter) development. 🚀";
          scrollToSection('about');
          break;
        case 'skills':
          botResponse = "Rabi is skilled in React.js, Tailwind CSS, Node.js, Express, MongoDB, C++, Python, and Flutter! He builds high-performance web and mobile applications. ⚡";
          scrollToSection('skills');
          break;
        case 'projects':
          botResponse = "Rabi has engineered 9+ live projects including MERN stack applications, booking portals, and mobile apps. Click 'Live Preview' on any project card to interact with them! 💻";
          scrollToSection('projects');
          break;
        case 'certs':
          botResponse = "Rabi holds national hackathon recognitions (Top 20% in BuildWithIndia at Google Office, WEB HACK national award) and GDG & TCS certifications! 🏆";
          scrollToSection('certifications');
          break;
        case 'contact':
          botResponse = "You can get in touch directly via email (rabibhagat789@gmail.com) or call (+91 8307855628 / +977 9815787410). Feel free to send a message below! 📬";
          scrollToSection('contact');
          break;
        default:
          botResponse = "Feel free to ask any question or click quick options to navigate!";
      }

      setIsTyping(false);
      setMessages(prev => [...prev, { id: Date.now() + 1, type: 'bot', text: botResponse }]);
    }, 600);
  };

  const options = [
    { label: "👤 Who is Rabi?", action: "about" },
    { label: "⚡ Skills & Tech Stack", action: "skills" },
    { label: "💻 Featured Projects", action: "projects" },
    { label: "🏆 Awards & Certs", action: "certs" },
    { label: "📬 Contact Info", action: "contact" },
  ];

  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        text: "Chat reset! How else can I help you explore Rabi's portfolio?"
      }
    ]);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 2000);
    const hideTimer = setTimeout(() => setShowGreeting(false), 9000);
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-3">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, x: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, x: -10 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.1 }}
            className="w-[320px] sm:w-[370px] h-[480px] max-h-[82vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl"
          >
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-gradient-to-r from-primary/10 via-slate-100 dark:via-slate-800/80 to-secondary/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-primary via-secondary to-accent p-0.5 shadow-md shadow-primary/30 shrink-0">
                  <div className="w-full h-full rounded-[14px] bg-slate-900 flex items-center justify-center text-primary">
                    <Bot size={22} className="text-blue-400" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-900"></span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Rabi's Assistant</h3>
                    <Code2 size={14} className="text-primary" />
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Online & Ready to help
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                <button
                  onClick={handleReset}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw size={16} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
                  aria-label="Close assistant"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 custom-scrollbar bg-slate-50/50 dark:bg-slate-950/40">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.type === 'bot' && (
                    <div className="w-7 h-7 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0 mr-2 mt-1 border border-primary/30">
                      <Bot size={15} />
                    </div>
                  )}
                  <div className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white rounded-tr-none shadow-md shadow-primary/20 font-medium'
                      : 'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700/60 shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-2 text-slate-400 text-xs pl-9">
                  <div className="flex gap-1 items-center bg-slate-200 dark:bg-slate-800 px-3 py-2 rounded-2xl rounded-tl-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-bounce [animation-delay:0.2s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-accent animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions Options */}
            <div className="p-3.5 border-t border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-800/60">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2 ml-1 flex items-center gap-1">
                <Code2 size={12} className="text-primary" /> Quick Options:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(opt)}
                    className="text-xs px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-all duration-200 flex items-center gap-1 shadow-sm active:scale-95"
                  >
                    {opt.label} <ChevronRight size={12} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button & Greeting Bubble */}
      <div className="relative group flex items-center">
        <AnimatePresence>
          {!isOpen && showGreeting && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.8 }}
              className="absolute left-full top-1 ml-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white px-3.5 py-2 rounded-2xl rounded-bl-none shadow-xl whitespace-nowrap font-bold text-xs border border-primary/40 flex items-center gap-2 pointer-events-none"
            >
              <Bot size={16} className="text-primary" />
              <span>Namaste! 👋 Ask me anything about Rabi!</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => setIsOpen(!isOpen)}
          className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-primary via-blue-600 to-accent flex items-center justify-center text-white shadow-xl shadow-primary/30 relative z-50 hover:shadow-primary/50 transition-shadow border border-white/20"
          aria-label="Open portfolio bot assistant"
        >
          {isOpen ? (
            <X size={24} className="text-white" />
          ) : (
            <div className="relative flex items-center justify-center">
              <Bot size={26} className="text-white" />
            </div>
          )}

          {!isOpen && (
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <span className="w-full h-full rounded-full bg-emerald-500 animate-ping opacity-75 absolute"></span>
            </span>
          )}
        </motion.button>
      </div>
    </div>
  );
}
