const fs = require("node:fs");
const path = require("node:path");
const sharp = require("C:/Users/GT-Tech/AppData/Local/OpenAI/Codex/runtimes/cua_node/78fb63cda1a9e2b2/bin/node_modules/sharp");
const root = path.resolve(__dirname, "../khair-portfolio/public");
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><defs><radialGradient id="g"><stop stop-color="#36234f"/><stop offset="1" stop-color="#08090e"/></radialGradient><linearGradient id="v"><stop stop-color="#bda6fa"/><stop offset="1" stop-color="#8ed9e0"/></linearGradient></defs><rect width="1200" height="630" fill="#08090e"/><ellipse cx="980" cy="250" rx="510" ry="460" fill="url(#g)"/><rect x="50" y="50" width="1100" height="530" rx="22" fill="none" stroke="#393345"/><text x="93" y="130" font-family="Arial" font-size="38" font-weight="700" fill="#eeeef4">KB<tspan fill="#b49aff">.</tspan></text><text x="93" y="210" font-family="Arial" font-size="23" fill="#a0a1b3">KHAIR BAKHSH NOOR DAD</text><text x="89" y="320" font-family="Arial" font-weight="700" font-size="72" letter-spacing="-3" fill="#eeeef4">Human ideas.</text><text x="89" y="411" font-family="Arial" font-weight="700" font-size="72" letter-spacing="-3" fill="url(#v)">Intelligent systems.</text><text x="93" y="505" font-family="Arial" font-size="22" fill="#b49aff">AI AUTOMATION ENGINEER · DATA &amp; MACHINE LEARNING</text><circle cx="1060" cy="116" r="6" fill="#89d6b0"/></svg>`;
(async () => {
  await sharp(fs.readFileSync(path.join(root, "icon.svg"))).resize(180,180).png().toFile(path.join(root,"apple-touch-icon.png"));
  await sharp(Buffer.from(og)).png().toFile(path.join(root,"og-image.png"));
  console.log("Sharing image and touch icon created.");
})();
