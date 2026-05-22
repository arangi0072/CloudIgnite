const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// We want to replace:
// <h2 id="initialization" className="text-2xl font-bold text-white mb-3 flex items-center gap-3">
//   <span className="text-2xl">🧩</span> Initialization
// </h2>
// 
// With:
// <h2 id="initialization" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
//   <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
//     <span className="text-2xl">🧩</span>
//   </div>
//   <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">Initialization</span>
// </h2>

const regex = /<h2 id="([^"]+)" className="text-2xl font-bold text-white mb-3 flex items-center gap-3">\s*<span className="text-2xl">([^<]+)<\/span>\s*([^<]+)\s*<\/h2>/g;

content = content.replace(regex, (match, id, emoji, title) => {
  return `<h2 id="${id}" className="text-3xl font-black mb-6 flex items-center gap-4 tracking-tight">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                      <span className="text-2xl">${emoji}</span>
                    </div>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">${title.trim()}</span>
                  </h2>`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced h2 tags');
