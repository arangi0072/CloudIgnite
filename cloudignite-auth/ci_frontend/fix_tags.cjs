const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Fix 1: Add missing </div> before </motion.div> for Getting Started
content = content.replace(
  /<\/motion\.div>\n\)\}\n\{activeGroup === 'Authentication'/g,
  '</div>\n</motion.div>\n)}\n{activeGroup === \'Authentication\''
);

// Fix 2: Add missing <div className="space-y-12"> after <motion.div> for all other sections
const groups = [
  'Authentication', 'User', 'Session', 'Auth State', 'API', 'Email Features', 'Admin (Premium)', 'Advanced'
];

for (const group of groups) {
  const searchStr = `{activeGroup === '${group}' && (\n<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>\n<div className="p-8 rounded-2xl glass`;
  const replaceStr = `{activeGroup === '${group}' && (\n<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>\n<div className="space-y-12">\n<div className="p-8 rounded-2xl glass`;
  content = content.replace(searchStr, replaceStr);
}

// Fix 3: Add missing </div> before </motion.div> for all other sections EXCEPT Advanced
for (let i = 0; i < groups.length - 1; i++) {
  const group = groups[i];
  const nextGroup = groups[i+1];
  
  const searchStr = `\n</motion.div>\n)}\n{activeGroup === '${nextGroup}'`;
  const replaceStr = `\n</div>\n</motion.div>\n)}\n{activeGroup === '${nextGroup}'`;
  content = content.replace(searchStr, replaceStr);
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Fixed tags');
