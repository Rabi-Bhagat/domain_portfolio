import { useEffect, useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ANSWERS = [
  {
    keys: ["hi", "hello", "hey", "who", "about", "intro"],
    text: "Rabi Prasad Bhagat is a full-stack developer and B.Tech CSE student at MM(DU), based in Rajbiraj, Saptari, Nepal. He builds MERN applications, REST APIs, and polished interfaces.",
    target: "about",
  },
  {
    keys: ["skill", "stack", "tech", "react", "node", "mongo"],
    text: "Core stack: React, Node.js, Express, MongoDB, Tailwind CSS, JavaScript, C++, and Python.",
    target: "skills",
  },
  {
    keys: ["project", "work", "portfolio", "demo"],
    text: "Nine live projects including Mohanpur Village, HotelBazaar, SecureDocs, Signify Pro, and Todo List Pro. Each card has a live link, frame preview, and 3D view.",
    target: "projects",
  },
  {
    keys: ["cert", "hackathon", "award", "intern"],
    text: "Credentials include the BuildWithIndia national finale, a WEB HACK award, GDG hackathons, CodeAlpha and Bluestock internships, plus Cisco and Coursera certifications.",
    target: "certifications",
  },
  {
    keys: ["contact", "email", "hire", "phone", "reach"],
    text: "Email rabibhagat789@gmail.com or use the contact form. Rabi is open to SDE internships and freelance full-stack work.",
    target: "contact",
  },
];

function answerFor(input) {
  const query = input.toLowerCase();
  const match = ANSWERS.find((entry) => entry.keys.some((key) => query.includes(key)));
  return (
    match || {
      text: "Ask me about Rabi's background, skills, projects, credentials, or contact details.",
      target: "about",
    }
  );
}

export default function PortfolioBot() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi, I can answer questions about Rabi's portfolio." },
  ]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const ask = (text) => {
    const value = (text || input).trim();
    if (!value) return;

    const reply = answerFor(value);
    setMessages((previous) => [
      ...previous,
      { from: "user", text: value },
      { from: "bot", text: reply.text, target: reply.target },
    ]);
    setInput("");
  };

  const jump = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label="Portfolio assistant"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="fixed bottom-20 left-6 z-50 flex h-[26rem] w-[20rem] flex-col overflow-hidden rounded-2xl border border-line bg-canvas shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <div className="flex items-center gap-2 text-xs font-medium text-ink">
                <MessageCircle size={14} className="text-primary" /> Portfolio assistant
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close assistant"
                className="text-faint transition-colors hover:text-ink"
              >
                <X size={15} />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                    message.from === "user"
                      ? "ml-auto bg-primary text-white"
                      : "border border-line text-muted"
                  }`}
                >
                  {message.text}
                  {message.target && (
                    <button
                      type="button"
                      onClick={() => jump(message.target)}
                      className="mt-2 block text-[11px] font-medium text-primary hover:underline"
                    >
                      Go to section
                    </button>
                  )}
                </div>
              ))}
            </div>

            <form
              onSubmit={(event) => {
                event.preventDefault();
                ask();
              }}
              className="flex items-center gap-2 border-t border-line p-3"
            >
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask a question"
                aria-label="Ask the assistant"
                className="flex-1 bg-transparent text-xs text-ink placeholder:text-faint focus:outline-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-medium text-white disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Open portfolio assistant"
        className="fixed bottom-6 left-6 z-50 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-canvas text-ink shadow-lg transition-colors hover:border-primary hover:text-primary"
      >
        {open ? <X size={17} /> : <MessageCircle size={17} />}
      </button>
    </>
  );
}
