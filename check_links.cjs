const https = require('https');
const http = require('http');

const links = [
  // Projects (live demo + repo)
  "https://mohanpur-village.vercel.app",
  "https://github.com/Rabi-Bhagat/mohanpur_village",
  "https://booking-app-hotelbazaar.pages.dev/",
  "https://github.com/Rabi-Bhagat/Booking-App-hotelBazaar-",
  "https://securedocs-a3x.pages.dev",
  "https://github.com/Rabi-Bhagat/SecureDocs-document-management-system-",
  "https://signify-pro.pages.dev",
  "https://github.com/Rabi-Bhagat/Signify-Pro",
  "https://todo-list-pro.pages.dev/",
  "https://github.com/Rabi-Bhagat/TODO-List-pro",
  "https://ecommerce-seven-amber-35.vercel.app/",
  "https://github.com/Rabi-Bhagat/frontened-project/tree/main/project-4(%20E%20commerece%20app%20using%20HTML%20and%20css)",
  "https://numberguessinggame-nine.vercel.app/",
  "https://github.com/Rabi-Bhagat/frontened-project/tree/main/number%20guessing%20game",
  "https://frontenedoftodolist.vercel.app/",
  "https://github.com/Rabi-Bhagat/frontened-project/tree/main/Agileproject(to-do%20list)",
  "https://code-alpha-task2-sandy.vercel.app/",
  "https://github.com/Rabi-Bhagat/CodeAlpha_web_internship_project/tree/main/task%202",
  // Certifications
  "https://github.com/Rabi-Bhagat/codealpha_tasks",
  "https://github.com/Rabi-Bhagat/CODSOFT",
  // Socials
  "https://github.com/Rabi-Bhagat",
  "https://linkedin.com/in/rabi-bhagat789",
  "https://www.instagram.com/rabi.p.bhagat.18?igsh=eWIydWR3Z24xNDV2",
  "https://www.facebook.com/rabi.p.bhagat.18/"
];

const checkUrl = (url) => {
  return new Promise((resolve) => {
    const reqLib = url.startsWith('https') ? https : http;
    const req = reqLib.get(url, (res) => {
      // Follow a single redirect
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume();
        const redirected = new URL(res.headers.location, url).toString();
        const req2 = reqLib.get(redirected, (res2) => {
          res2.resume();
          resolve({ url, status: res2.statusCode });
        });
        req2.on('error', (err) => resolve({ url, status: 'Error: ' + err.message }));
        req2.setTimeout(5000, () => { req2.destroy(); resolve({ url, status: 'Timeout' }); });
        return;
      }
      res.resume();
      resolve({ url, status: res.statusCode });
    });
    req.on('error', (err) => {
      resolve({ url, status: 'Error: ' + err.message });
    });
    req.setTimeout(5000, () => {
      req.destroy();
      resolve({ url, status: 'Timeout' });
    });
  });
};

(async () => {
  const results = await Promise.all(links.map(checkUrl));
  let ok = 0, bad = 0;
  for (const r of results) {
    const good = typeof r.status === 'number' && r.status < 400;
    if (good) ok++; else bad++;
    console.log(`[${r.status}] ${r.url}`);
  }
  console.log(`\n${ok} OK, ${bad} broken`);
})();
