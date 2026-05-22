const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-300 hover:shadow-\[0_0_20px_rgba\(234,179,8,0\.15\)\]"/g;

content = content.replace(regex, 'className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] hover:-translate-y-1 relative group"');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated notes containers');
