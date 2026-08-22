# 🛠️ How to Add, Edit, or Delete Projects & Certificates

All data for projects, skills, certificates, and experiences are centralized inside:
👉 **`src/data/constants.js`** ([file:///c:/Users/Rabi%20Bhagat/Desktop/portfolio/domain_portfolio/src/data/constants.js](file:///c:/Users/Rabi%20Bhagat/Desktop/portfolio/domain_portfolio/src/data/constants.js))

---

## 💻 1. How to Add a New Project

Open `src/data/constants.js` and scroll to `export const projects = [`. 
Copy the template below, paste it inside the array, and fill in your details:

```javascript
{
  id: "my-new-project-id", // Unique identifier
  name: "My Awesome Project",
  desc: "A short 1-2 sentence description of what the application does.",
  tech: "React, Tailwind CSS, Node.js, MongoDB",
  category: "Full Stack", // Options: "Full Stack" | "Web App" | "Mobile App" | "Tool" | "Game"
  link: "https://my-live-project.vercel.app", // Live URL
  repo: "https://github.com/Rabi-Bhagat/my-repo-name", // GitHub repository
  color: "#3b82f6", // Accent color: #3b82f6 (blue), #a855f7 (purple), #10b981 (emerald), #ec4899 (pink), #f59e0b (amber)
  features: [
    "Feature Highlight 1",
    "Feature Highlight 2",
    "Feature Highlight 3",
    "Feature Highlight 4"
  ],
  status: "Live Production"
},
```

### 🗑️ How to Delete a Project
Simply select the `{ ... }` block of the project you want to remove in `src/data/constants.js` and delete it!

---

## 🏆 2. How to Add a New Certificate or Achievement

### Step 1: Save your Certificate File
Put your certificate image (`.png`, `.jpg`) or `.pdf` file inside the public directory:
📂 `public/internship and skill certificate and hackathon/`

### Step 2: Add Entry in `src/data/constants.js`
Scroll to `export const achievements = [` and paste this template:

```javascript
{
  id: "my-certificate-id", // Unique identifier
  title: "Full Stack Web Development Certificate",
  org: "FreeCodeCamp / Google / TCS",
  category: "Certification", // Options: "Certification" | "Hackathon Award" | "Internship Offer" | "Skill Badge"
  type: "certificate", // Options: "certificate" | "hackathon" | "internship"
  date: "2025",
  issueDate: "June 2025",
  desc: "Mastered frontend and backend web development standards.",
  previewImage: "/internship and skill certificate and hackathon/your_image.png",
  fileUrl: "/internship and skill certificate and hackathon/your_document.pdf",
  color: "#10b981",
  badge: "Verified Certificate",
  certId: "CERT-998877"
},
```

### 🗑️ How to Delete a Certificate
Simply delete or comment out the `{ ... }` object inside `achievements` array in `src/data/constants.js`.

---

## ⚙️ 3. How to Update Skills or Experience

- **Skills**: Edit the `export const skills` array in `src/data/constants.js`.
- **Experience**: Edit the `export const experiences` array in `src/data/constants.js`.

---

## 🚀 4. How to Preview Changes Locally

Run this in your terminal:
```bash
npm run dev
```
Open `http://localhost:5173` (or the local port shown) to see your updates live!
