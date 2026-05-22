const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// We want to replace:
// <h3 id="init" className="text-xl font-bold text-white font-mono">init(context, apiKey)</h3>
// With:
// <h3 id="init" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
//   <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
//   init(context, apiKey)
// </h3>

const regex = /<h3 id="([^"]+)" className="text-xl font-bold text-white font-mono">([^<]+)<\/h3>/g;

content = content.replace(regex, (match, id, title) => {
  return `<h3 id="${id}" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          ${title}
                        </h3>`;
});

// Also replace the ones with the "Internal" span
const regexInternal = /<h3 id="([^"]+)" className="text-xl font-bold text-white font-mono">([^<]+)<span className="text-xs bg-white\/10 px-2 py-1 rounded-full ml-2 text-on-surface-variant font-sans">Internal<\/span><\/h3>/g;

content = content.replace(regexInternal, (match, id, title) => {
  return `<h3 id="${id}" className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 font-mono flex items-center gap-3">
                          <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_rgba(139,92,246,0.8)]"></span>
                          ${title}
                          <span className="text-xs bg-white/10 px-2 py-1 rounded-full ml-2 text-on-surface-variant font-sans text-white">Internal</span>
                        </h3>`;
});

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced h3 tags');
