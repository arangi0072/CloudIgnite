const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

content = content.replace(
  /if \(current\) \{\n        setActiveSection\(current\);\n      \}/g,
  `if (current) {
        setActiveSection(current);
      } else if (sections.length > 0) {
        // If we are at the top, highlight the first section
        setActiveSection(sections[0].getAttribute('id') || '');
      }`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated scrollspy logic');
