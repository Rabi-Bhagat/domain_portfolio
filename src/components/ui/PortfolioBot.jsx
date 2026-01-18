import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ChevronRight, Sparkles } from 'lucide-react';

export default function PortfolioBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Namaste! 🙏 I am Rabi\'s AI Assistant. How can I help you today?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOptionClick = (option) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: option.label }]);

    // Simulate bot thinking/typing delay
    setTimeout(() => {
        let botResponse = "";
        
        switch(option.action) {
            case 'about':
                botResponse = "Rabi is a passionate Full Stack Developer specializing in React, Node.js, and Flutter. He loves creating digital experiences! 🚀";
                scrollToSection('about');
                break;
            case 'skills':
                botResponse = "Rabi is proficient in the MERN Stack (MongoDB, Express, React, Node) and Cross-platform Mobile Dev with Flutter. Check out the skills section! ⚡";
                scrollToSection('skills');
                break;
            case 'projects':
                botResponse = "Here are some cool projects! From signature apps to e-commerce platforms. 💻";
                scrollToSection('projects');
                break;
            case 'contact':
                botResponse = "You can reach out directly via the form below or email at rabibhagat789@gmail.com. 📧";
                scrollToSection('contact');
                break;
            default:
                botResponse = "I'm here to help!";
        }
        
        setMessages(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 600);
  };

  const options = [
    { label: "Who is Rabi?", action: "about" },
    { label: "What are his skills?", action: "skills" },
    { label: "Show me projects", action: "projects" },
    { label: "How to contact?", action: "contact" },
  ];

  // Auto-scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Show greeting bubble on load
  useEffect(() => {
    const timer = setTimeout(() => setShowGreeting(true), 1500);
    const hideTimer = setTimeout(() => setShowGreeting(false), 8000); // Hide after 8s
    return () => { clearTimeout(timer); clearTimeout(hideTimer); };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20, x: -20 }}
                className="w-[300px] md:w-[350px] h-[450px] glass-card rounded-2xl flex flex-col overflow-hidden shadow-2xl border border-white/20 bg-slate-900/90"
            >
                {/* Header */}
                <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-lg">
                            🤖
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-sm">Portfolio Assistant</h3>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                <span className="text-xs text-slate-400">Online</span>
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="text-slate-400 hover:text-white transition-colors"
                    >
                        <X size={18} />
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                    {messages.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                msg.type === 'user' 
                                    ? 'bg-primary text-white rounded-tr-none' 
                                    : 'bg-slate-800 text-slate-200 rounded-tl-none border border-slate-700'
                            }`}>
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Options / Input Area */}
                <div className="p-4 border-t border-white/10 bg-white/5">
                    <p className="text-xs text-slate-500 mb-3 ml-1">Suggested actions:</p>
                    <div className="flex flex-wrap gap-2">
                        {options.map((opt, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(opt)}
                                className="text-xs px-3 py-2 rounded-full bg-slate-800 hover:bg-primary hover:text-white border border-slate-700 hover:border-primary transition-all duration-300 flex items-center gap-1 text-slate-300"
                            >
                                {opt.label} <ChevronRight size={10} />
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button & Greeting */}
      <div className="relative group">
        <AnimatePresence>
            {!isOpen && showGreeting && (
                <motion.div
                    initial={{ opacity: 0, x: -10, scale: 0.8 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -10, scale: 0.8 }}
                    className="absolute left-full top-0 ml-4 bg-white text-slate-900 px-4 py-2 rounded-xl rounded-bl-none shadow-lg whitespace-nowrap font-medium text-sm border-2 border-primary"
                >
                    Namaste! 🙏 Need help?
                </motion.div>
            )}
        </AnimatePresence>

        <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center text-3xl shadow-lg shadow-primary/30 relative z-50 hover:shadow-primary/50 transition-shadow"
        >
            {isOpen ? <X size={24} className="text-white" /> : "🤖"}
            
            {!isOpen && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                    <span className="w-full h-full rounded-full bg-red-500 animate-ping opacity-75 absolute"></span>
                </span>
            )}
        </motion.button>
        
        {/* Glow effect behind button */}
        <div className="absolute inset-0 bg-primary/50 blur-xl rounded-full -z-10 group-hover:bg-primary/80 transition-all duration-300"></div>
      </div>
    </div>
  );
}
