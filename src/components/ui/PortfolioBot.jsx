import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, X, Code2, Briefcase, 
  Award, Mail, RotateCcw, Send, Sparkles, ExternalLink, ArrowRight, Compass
} from 'lucide-react';

export default function PortfolioBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      text: "Namaste! 👋 I'm **Rabi's Portfolio AI Guide**.\n\nAsk me anything in detail about Rabi Bhagat — his **MERN Stack projects**, **SDE Internships**, **National Hackathon Wins**, **Cisco Data Science Certifications**, **LeetCode Problem Solving**, or **Contact Details**!"
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

  // Deep Knowledge Engine for Rabi Bhagat with Navigation Buttons
  const getAIResponse = (userQuery) => {
    const query = userQuery.toLowerCase().trim();

    // 1. GREETINGS & INTRO
    if (query.match(/\b(hi|hello|hey|namaste|greetings|who are you|who is rabi|about|intro|introduction|overview|tell me about)\b/)) {
      return {
        text: "👋 **Namaste! Meet Rabi Bhagat:**\n\n• **Role**: Full-Stack (MERN) Web Developer & B.Tech CSE Student (2023–2027) at **Maharishi Markandeshwar (Deemed to be University) - MM(DU)**, Ambala.\n• **Experience**: SDE Intern at Bluestock Fintech & Frontend Virtual Intern at CodeAlpha (with CEO LOR).\n• **Achievements**: Top 5,000 / 25,000 teams nationwide in Google Office BuildWithIndia Finale & WEB HACK National Winner.\n• **Passions**: Engineering performant web applications, building intuitive UIs with React/Tailwind, and solving algorithmic problems on LeetCode (@Rabibhagat).",
        actionSection: { id: 'about', label: '👤 Take Me to About Section' }
      };
    }

    // 2. INTERNSHIPS & WORK EXPERIENCE / LOR
    if (query.match(/\b(intern|internship|bluestock|codealpha|work|experience|offer|letter|lor|recommendation|job)\b/)) {
      return {
        text: "💼 **Rabi Bhagat's Internship & Work Experience:**\n\n1. **Software Development Engineer (SDE) Intern** @ *Bluestock Fintech* (May 2025 – Jun 2025)\n   - Official appointment letter for SDE Intern position.\n   - Worked on fintech applications, UI component architecture, and dynamic web solutions (#startupindia recognized).\n\n2. **Frontend Development Virtual Intern** @ *CodeAlpha* (May 2025 – Jun 2025)\n   - Built interactive frontend applications, reusable components, and responsive web layouts (MSME Govt. of India recognized).\n   - Received an **Official Executive Letter of Recommendation (LOR)** signed by the Founder & CEO of CodeAlpha highlighting top performance and collaboration.",
        actionSection: { id: 'experience', label: '💼 Take Me to Experience & Internships' }
      };
    }

    // 3. SKILLS & TECH STACK
    if (query.match(/\b(skill|skills|tech|technology|stack|language|framework|tools|react|node|mongodb|express|cpp|c\+\+|python|js|javascript|tailwind|css|three|database|frontend|backend)\b/)) {
      return {
        text: "⚡ **Rabi's Core Technical Skills & Expertise:**\n\n• **Frontend**: React.js (90%), Tailwind CSS (95%), JavaScript ES6+ (90%), HTML5/CSS3 (95%), Three.js, Framer Motion.\n• **Backend & APIs**: Node.js (85%), Express.js (90%), RESTful API Architecture, JSON Services.\n• **Databases**: MongoDB (85%), SQL & Relational Databases (82%).\n• **Programming Languages**: C++ (Advanced/DSA - 88%), Python (85%), JavaScript.\n• **Tools & Deployment**: Git, GitHub, Vite, Vercel, Cloudflare Pages, Postman, Linux basics.",
        actionSection: { id: 'skills', label: '⚡ Take Me to Skills & Tech Stack' }
      };
    }

    // 4. PROJECTS
    if (query.match(/\b(project|projects|mohanpur|hotelbazaar|hotel|securedocs|signify|todo|ecommerce|e-commerce|number|game|built|portfolio|work|demo|live)\b/)) {
      return {
        text: "💻 **Featured Projects Engineered by Rabi (9+ Live Projects):**\n\n1. **Mohanpur Village Web Portal**: Digital community platform for rural announcements, local services, and digital governance. (Built with React & Tailwind)\n2. **HotelBazaar Booking App**: Full-featured hotel discovery and booking portal with real-time filtering and responsive booking flow.\n3. **SecureDocs Management System**: Cloud document management & encrypted file vault with security controls.\n4. **Signify Pro**: Digital signature creator & document workflow application.\n5. **Todo List Pro & E-Commerce Web Apps**: Production-grade web tools with persistent storage, filtering, and modern UI.\n\n*All projects feature Live Demos & GitHub repository links!*",
        actionSection: { id: 'projects', label: '💻 Take Me to Projects Section' }
      };
    }

    // 5. HACKATHONS, AWARDS & COMPETITIONS
    if (query.match(/\b(hackathon|award|awards|competition|winner|buildwithindia|google|web hack|devarc|hackureka|ey|techathon|aarambh|bajaj|rank|prize|first)\b/)) {
      return {
        text: "🏆 **National Hackathons & Awards:**\n\n• **BuildWithIndia Hackathon Finale** (Google Office): Top 5,000 / 25,000 teams nationwide (Top 20% national rank).\n• **WEB HACK National Winner**: 1st Place / Achievement Award in Web Page Competition at National Tech Fest 2025 (AICTE & MSME supported).\n• **Google Developer Groups (GDG) Solution Challenge 2025**: Official participation for building societal impact tech solutions.\n• **DevArc 2026 & GDG Hackureka 2025**: Hackathon awards from GDG on Campus MM(DU).\n• **EY Techathon 6.0**: Certificate of Participation by Ernst & Young (EY) & Unstop.\n• **AARAMBH Technical Challenge**: Appreciation Award by Bajaj Auto Credit Limited.",
        actionSection: { id: 'certifications', label: '🏆 Take Me to Hackathons & Awards' }
      };
    }

    // 6. CERTIFICATIONS & COURSES
    if (query.match(/\b(cert|certs|certificate|certifications|cisco|data science|android|gdsc|tcs|soft skills|credentials)\b/)) {
      return {
        text: "📜 **Verified Certifications & Credentials:**\n\n1. **Cisco Networking Academy**: *Introduction to Data Science* (Aug 16, 2026) – Student-level credential in Data Analytics, AI & Machine Learning roles, and data career paths.\n2. **GDSC Android Bootcamp with Compose**: 2-week intensive Android development mastering Jetpack Compose, Kotlin, and modern Android UI architecture.\n3. **TCS iON Career Edge**: Professional Soft Skills, Corporate Communication, and Business Etiquette Certification.",
        actionSection: { id: 'certifications', label: '📜 Take Me to Certifications' }
      };
    }

    // 7. EDUCATION & COLLEGE
    if (query.match(/\b(education|college|university|degree|btech|b\.tech|mmdu|maharishi|study|student|gpa|branch|cse|school)\b/)) {
      return {
        text: "🎓 **Educational Background:**\n\n• **Degree**: Bachelor of Technology (B.Tech) in **Computer Science & Engineering**\n• **Institution**: Maharishi Markandeshwar (Deemed to be University) - MM(DU), Mullana, Ambala\n• **Duration**: 2023 – 2027\n• **Key Coursework**: Data Structures & Algorithms, Object-Oriented Programming (C++), Operating Systems, Database Management Systems (DBMS), Web Development, Software Engineering.",
        actionSection: { id: 'experience', label: '🎓 Take Me to Education & Degree' }
      };
    }

    // 8. CONTACT, EMAIL, PHONE, SOCIALS, HIRE
    if (query.match(/\b(contact|email|mail|phone|mobile|call|number|reach|hire|github|linkedin|leetcode|connect|social)\b/)) {
      return {
        text: "📬 **Get in Touch with Rabi Bhagat:**\n\n• **Email**: `rabibhagat789@gmail.com`\n• **Phone (India)**: `+91 8307855628`\n• **Phone (Nepal)**: `+977 9815787410`\n• **LinkedIn**: [linkedin.com/in/rabi-bhagat789](https://linkedin.com/in/rabi-bhagat789)\n• **GitHub**: [github.com/Rabi-Bhagat](https://github.com/Rabi-Bhagat)\n• **LeetCode**: [leetcode.com/u/Rabibhagat/](https://leetcode.com/u/Rabibhagat/)\n\n*Rabi is open to SDE Internships, Full-Stack Developer Roles, and Freelance Projects!*",
        actionSection: { id: 'contact', label: '📬 Take Me to Contact Section' }
      };
    }

    // 9. LEETCODE / PROBLEM SOLVING / ALGORITHMS
    if (query.match(/\b(leetcode|dsa|algo|algorithm|problem|cpp|c\+\+|coding|competitive)\b/)) {
      return {
        text: "🧩 **Problem Solving & Competitive Coding:**\n\n• Rabi actively solves algorithmic challenges on **LeetCode** under the profile `@Rabibhagat`.\n• Proficient in **Data Structures & Algorithms (DSA)** using **C++** (Arrays, Linked Lists, Trees, Graphs, Dynamic Programming, Sorting/Searching).\n• Check out his LeetCode stats and GitHub repositories!",
        actionSection: { id: 'skills', label: '⚡ View Algorithms & Programming Skills' }
      };
    }

    // 10. DEFAULT / FALLBACK RESPONSE
    return {
      text: "🤖 **Here is a summary of Rabi Bhagat's Portfolio:**\n\n• 🎓 **B.Tech CSE Student** @ MM(DU) (2023–2027)\n• 💼 **SDE Intern** @ Bluestock Fintech & Virtual Intern @ CodeAlpha\n• 🏆 **Top 5,000 National Rank** in Google Office BuildWithIndia Finale & **WEB HACK Winner**\n• 📜 **Certified** by Cisco (Data Science), GDSC (Android), & TCS iON\n• ⚡ **Tech Stack**: React.js, Tailwind CSS, Node.js, Express, MongoDB, C++, Python\n\n*Feel free to ask specific questions about his projects, internships, certificates, or contact details!*",
      actionSection: { id: 'about', label: '🌐 Explore Portfolio Overview' }
    };
  };

  const handleSendMessage = (textToSend) => {
    const message = textToSend || inputText;
    if (!message.trim()) return;

    const userMsgId = Date.now();
    setMessages(prev => [...prev, { id: userMsgId, type: 'user', text: message }]);
    setInputText("");
    setIsTyping(true);

    setTimeout(() => {
      const responseObj = getAIResponse(message);
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          type: 'bot', 
          text: responseObj.text,
          actionSection: responseObj.actionSection
        }
      ]);
    }, 500);
  };

  const handleOptionClick = (option) => {
    handleSendMessage(option.query);
  };

  const options = [
    { label: "👤 Who is Rabi?", query: "Who is Rabi Bhagat?" },
    { label: "💼 Internships & LORs", query: "Tell me about Rabi's internship experience and LOR" },
    { label: "⚡ Skills & Tech Stack", query: "What are Rabi's technical skills and tech stack?" },
    { label: "💻 Featured Projects", query: "What projects has Rabi built?" },
    { label: "🏆 Hackathons & Awards", query: "What hackathons and national awards has Rabi won?" },
    { label: "📜 Certifications", query: "What certifications does Rabi hold?" },
    { label: "📬 Contact Details", query: "How can I contact Rabi Bhagat?" },
  ];

  const handleReset = () => {
    setMessages([
      {
        id: Date.now(),
        type: 'bot',
        text: "Chat reset! How else can I assist your exploration of Rabi's portfolio?"
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

  // Simple Markdown & Bullet Parser
  const renderFormattedText = (text) => {
    if (!text) return null;
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const isBullet = line.trim().startsWith('• ') || line.trim().startsWith('- ');
      const cleanLine = line.replace(/^\s*[•\-]\s*/, '');
      const parts = cleanLine.split(/(\*\*.*?\*\*|\`.*?\`|\[.*?\]\(.*?\))/g);

      return (
        <div key={idx} className={`${isBullet ? 'pl-2 flex items-start gap-1.5 my-0.5' : 'my-0.5'}`}>
          {isBullet && <span className="text-primary font-bold shrink-0">•</span>}
          <span className="leading-relaxed">
            {parts.map((part, pIdx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                return <strong key={pIdx} className="font-extrabold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('`') && part.endsWith('`')) {
                return <code key={pIdx} className="bg-primary/10 text-primary px-1.5 py-0.5 rounded text-[11px] font-mono">{part.slice(1, -1)}</code>;
              }
              if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
                const label = part.slice(1, part.indexOf(']('));
                const url = part.slice(part.indexOf('](') + 2, -1);
                return (
                  <a key={pIdx} href={url} target="_blank" rel="noopener noreferrer" className="text-primary underline font-semibold hover:text-blue-400 inline-flex items-center gap-0.5">
                    {label} <ExternalLink size={10} />
                  </a>
                );
              }
              return part;
            })}
          </span>
        </div>
      );
    });
  };

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
            className="w-[340px] sm:w-[400px] h-[520px] max-h-[85vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border border-slate-200 dark:border-white/15 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl"
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
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">Rabi's AI Portfolio Assistant</h3>
                    <Sparkles size={14} className="text-primary" />
                  </div>
                  <p className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Ask anything in detail
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
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm ${
                    msg.type === 'user'
                      ? 'bg-gradient-to-r from-primary to-blue-600 text-white rounded-tr-none shadow-md shadow-primary/20 font-medium'
                      : 'bg-white dark:bg-slate-800/90 text-slate-800 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700/60 shadow-sm'
                  }`}>
                    {renderFormattedText(msg.text)}

                    {/* Interactive Navigation Action Button inside Bot Response */}
                    {msg.type === 'bot' && msg.actionSection && (
                      <button
                        onClick={() => scrollToSection(msg.actionSection.id)}
                        className="mt-3 w-full py-2 px-3 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-accent text-white font-bold text-xs shadow-md shadow-primary/20 flex items-center justify-center gap-1.5 hover:opacity-95 active:scale-95 transition-all cursor-pointer border border-white/20"
                      >
                        <Compass size={14} />
                        <span>{msg.actionSection.label}</span>
                        <ArrowRight size={14} />
                      </button>
                    )}
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

            {/* Quick Suggestions Chips */}
            <div className="px-3 py-2 border-t border-slate-200 dark:border-white/10 bg-slate-100/70 dark:bg-slate-800/40 overflow-x-auto custom-scrollbar shrink-0">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                {options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionClick(opt)}
                    className="text-[11px] px-2.5 py-1 rounded-xl bg-white dark:bg-slate-800 hover:bg-primary hover:text-white dark:hover:bg-primary border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold transition-all duration-200 flex items-center gap-1 shadow-sm active:scale-95 shrink-0"
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Free-Form Text Input Bar */}
            <form
              onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}
              className="p-3 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900 flex items-center gap-2"
            >
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Ask about projects, Bluestock intern, skills..."
                className="flex-1 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-primary transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className="p-2 rounded-xl bg-primary hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-primary text-white transition-all shadow-md shadow-primary/20 shrink-0"
                aria-label="Send message"
              >
                <Send size={16} />
              </button>
            </form>
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
