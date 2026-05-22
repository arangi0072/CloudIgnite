const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Replace all TOC main links
content = content.replace(/<li className="pt-2"><a href="#(.*?)" className="hover:text-primary transition-colors flex items-center gap-2"><ChevronRight size={14} className="text-primary\/50" \/> (.*?)<\/a><\/li>/g, 
  '<li className="pt-3"><a href="#$1" className="hover:text-white transition-colors flex items-center gap-2 group"><ChevronRight size={14} className="text-primary/50 group-hover:text-primary transition-colors" /> $2</a></li>');

// Replace all TOC sub-links
content = content.replace(/<ul className="pl-6 space-y-2 mt-2 border-l border-white\/10 ml-2">/g, 
  '<ul className="pl-6 space-y-2.5 mt-2 border-l border-white/10 ml-2">');

content = content.replace(/<li><a href="#(.*?)" className="hover:text-primary transition-colors">(.*?)<\/a><\/li>/g, 
  '<li><a href="#$1" className="hover:text-white transition-colors block">$2</a></li>');

fs.writeFileSync(filePath, content, 'utf8');
console.log('TOC updated successfully');
