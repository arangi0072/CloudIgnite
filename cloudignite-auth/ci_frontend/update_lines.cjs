const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /<div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-\[0_0_30px_rgba\(139,92,246,0\.3\)\] hover:border-primary\/50 hover:-translate-y-1 relative group">/g;

content = content.replace(regex, `<div className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>`);

const regexNotes = /<div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-\[0_0_30px_rgba\(234,179,8,0\.3\)\] hover:-translate-y-1 relative group">/g;

content = content.replace(regexNotes, `<div className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group">
                          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>`);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added animated gradient lines');
