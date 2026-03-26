const https = require('https');
const http = require('http');

const links = [
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
  "https://signaturepage-umber.vercel.app/",
  "https://github.com/Rabi-Bhagat/frontened-project/tree/main/build%20a%20signature%20app%20with%20HTML%20%2C%20CSS%20%20and%20JS%20(PR-2)",
  "https://ecommerce-seven-amber-35.vercel.app/",
  "https://github.com/Rabi-Bhagat/frontened-project/tree/main/project-4(%20E%20commerece%20app%20using%20HTML%20and%20css)",
  "https://numberguessinggame-nine.vercel.app/",
  "https://github.com/Rabi-Bhagat/frontened-project/tree/main/number%20guessing%20game",
  "https://frontenedoftodolist.vercel.app/",
  "https://github.com/Rabi-Bhagat/frontened-project/tree/main/Agileproject(to-do%20list)",
  "https://code-alpha-task2-sandy.vercel.app/",
  "https://github.com/Rabi-Bhagat/CodeAlpha_web_internship_project/tree/main/task%202",
  "https://github.com/Rabi-Bhagat",
  "https://linkedin.com/in/rabi-bhagat789",
  "https://www.instagram.com/rabi.p.bhagat.18?igsh=eWIydWR3Z24xNDV2",
  "https://www.facebook.com/rabi.p.bhagat.18/"
];

const checkUrl = (url) => {
  return new Promise((resolve) => {
    const reqLib = url.startsWith('https') ? https : http;
    const req = reqLib.get(url, (res) => {
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
  for (const url of links) {
    const result = await checkUrl(url);
    console.log(`[${result.status}] ${url}`);
  }
})();
