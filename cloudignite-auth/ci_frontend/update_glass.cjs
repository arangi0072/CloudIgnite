const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const regex = /className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-\[0_0_20px_rgba\(139,92,246,0\.15\)\] hover:border-primary\/30"/g;

content = content.replace(regex, 'className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] hover:border-primary/50 hover:-translate-y-1 relative group"');

// Add the animated gradient line to the top of these containers.
// Wait, doing this with regex might be tricky if I don't know what's inside.
// Let's just replace the class name for now.

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated glass containers');
