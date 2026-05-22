const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add activeGroup state
content = content.replace(
  "const [searchQuery, setSearchQuery] = useState('');",
  "const [searchQuery, setSearchQuery] = useState('');\n  const [activeGroup, setActiveGroup] = useState('Getting Started');"
);

// 2. Update sidebarLinks to include Advanced
const advancedLink = `    {
      title: 'Advanced',
      items: [
        { id: 'advanced', label: 'Token Lifecycle', icon: <Settings size={16} /> },
      ]
    }
  ];`;
content = content.replace("  ];\n\n  // Flatten links for search", advancedLink + "\n\n  // Flatten links for search");

// 3. Update Left Sidebar onClick
content = content.replace(
  /onClick=\{\(\) => setIsMobileMenuOpen\(false\)\}/g,
  "onClick={() => { setIsMobileMenuOpen(false); setActiveGroup(group.title); setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 100); }}"
);

// 4. Wrap sections
// We need to find the start and end of each section.
// This is tricky with regex. Let's do it by splitting the content.

// The main content starts at: {/* Hero Section */}
// Let's find the indices of each section header.

const sections = [
  { group: 'Getting Started', startId: 'id="introduction"', endId: 'id="authentication"' },
  { group: 'Authentication', startId: 'id="authentication"', endId: 'id="user-apis"' },
  { group: 'User', startId: 'id="user-apis"', endId: 'id="session-management"' },
  { group: 'Session', startId: 'id="session-management"', endId: 'id="auth-state"' },
  { group: 'Auth State', startId: 'id="auth-state"', endId: 'id="api"' },
  { group: 'API', startId: 'id="api"', endId: 'id="email-features"' },
  { group: 'Email Features', startId: 'id="email-features"', endId: 'id="admin"' },
  { group: 'Admin (Premium)', startId: 'id="admin"', endId: 'id="advanced"' },
  { group: 'Advanced', startId: 'id="advanced"', endId: '{/* Right Sidebar (TOC) */}' }
];

let newContent = content;

// Wait, wrapping them might be easier if we just replace the headers.
// Actually, it's safer to just write a script that splits the string.

fs.writeFileSync('refactor.js', `
const fs = require('fs');
let content = fs.readFileSync('${filePath}', 'utf8');

// Add state
content = content.replace(
  "const [searchQuery, setSearchQuery] = useState('');",
  "const [searchQuery, setSearchQuery] = useState('');\\n  const [activeGroup, setActiveGroup] = useState('Getting Started');"
);

// Add Advanced to sidebarLinks
content = content.replace(
  "    }\\n  ];\\n\\n  // Flatten links for search",
  "    },\\n    {\\n      title: 'Advanced',\\n      items: [\\n        { id: 'advanced', label: 'Token Lifecycle', icon: <Settings size={16} /> },\\n      ]\\n    }\\n  ];\\n\\n  // Flatten links for search"
);

// Update Left Sidebar onClick
content = content.replace(
  /onClick=\\{\\(\\) => setIsMobileMenuOpen\\(false\\)\\}/g,
  "onClick={(e) => { e.preventDefault(); setIsMobileMenuOpen(false); setActiveGroup(group.title); setTimeout(() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }), 100); }}"
);

// Now wrap sections.
// Let's find the exact strings to split by.

const parts = [];
let remaining = content;

const splitPoints = [
  { group: 'Getting Started', marker: '<div id="introduction" className="pt-12 pb-8">' },
  { group: 'Authentication', marker: '<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">\\n                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>\\n                  <h2 id="authentication"' },
  { group: 'User', marker: '<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">\\n                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>\\n                  <h2 id="user-apis"' },
  { group: 'Session', marker: '<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">\\n                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>\\n                  <h2 id="session-management"' },
  { group: 'Auth State', marker: '<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">\\n                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>\\n                  <h2 id="auth-state"' },
  { group: 'API', marker: '<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">\\n                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>\\n                  <h2 id="api"' },
  { group: 'Email Features', marker: '<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">\\n                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>\\n                  <h2 id="email-features"' },
  { group: 'Admin (Premium)', marker: '<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">\\n                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>\\n                  <h2 id="admin"' },
  { group: 'Advanced', marker: '<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">\\n                  <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>\\n                  <h2 id="advanced"' },
  { group: 'END', marker: '</motion.div>\\n        </main>\\n\\n        {/* Right Sidebar (TOC) */}' }
];

let currentContent = remaining;
let newMainContent = "";

const beforeMain = currentContent.substring(0, currentContent.indexOf(splitPoints[0].marker));
newMainContent += beforeMain;

for (let i = 0; i < splitPoints.length - 1; i++) {
  const startMarker = splitPoints[i].marker;
  const endMarker = splitPoints[i+1].marker;
  
  const startIndex = currentContent.indexOf(startMarker);
  const endIndex = currentContent.indexOf(endMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    console.error("Could not find markers for", splitPoints[i].group);
    process.exit(1);
  }
  
  const sectionContent = currentContent.substring(startIndex, endIndex);
  newMainContent += \`{activeGroup === '\${splitPoints[i].group}' && (\\n<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>\\n\` + sectionContent + \`\\n</motion.div>\\n)}\\n\`;
}

newMainContent += currentContent.substring(currentContent.indexOf(splitPoints[splitPoints.length - 1].marker));

content = newMainContent;

// Replace Right Sidebar
const rightSidebarStart = '{/* Right Sidebar (TOC) */}';
const rightSidebarEnd = '</aside>';
const rsStartIndex = content.indexOf(rightSidebarStart);
const rsEndIndex = content.indexOf(rightSidebarEnd, rsStartIndex) + rightSidebarEnd.length;

const dynamicRightSidebar = \`{/* Right Sidebar (TOC) */}
        <aside className="hidden xl:block w-64 shrink-0 py-12 px-6 sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto scrollbar-hide border-l border-white/5">
          <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/80 mb-6">On this page</h4>
          <ul className="space-y-3 text-[13px] text-on-surface-variant font-medium">
            {sidebarLinks.find(g => g.title === activeGroup)?.items.map(item => (
              <li key={item.id}>
                <a 
                  href={\`#\${item.id}\`} 
                  onClick={(e) => { e.preventDefault(); document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <ChevronRight size={14} className="text-primary/50 group-hover:text-primary transition-colors" /> 
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </aside>\`;

content = content.substring(0, rsStartIndex) + dynamicRightSidebar + content.substring(rsEndIndex);

fs.writeFileSync('${filePath}', content, 'utf8');
console.log('Refactored successfully');
`);
