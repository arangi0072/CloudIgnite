const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Add activeSection state
if (!content.includes('const [activeSection, setActiveSection] = useState')) {
  content = content.replace(
    "const [searchQuery, setSearchQuery] = useState('');",
    "const [searchQuery, setSearchQuery] = useState('');\n  const [activeSection, setActiveSection] = useState('');"
  );
}

// 2. Add useEffect for scrollspy
if (!content.includes('useEffect(() => {\\n    const handleScroll = () => {')) {
  const useEffectCode = `
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('h2[id], h3[id]');
      let current = '';
      
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop <= 150) {
          current = section.getAttribute('id') || '';
        }
      });

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeGroup]);
`;
  content = content.replace(
    "const [activeSection, setActiveSection] = useState('');",
    "const [activeSection, setActiveSection] = useState('');\n" + useEffectCode
  );
}

// 3. Update Left Sidebar links to use activeSection
// Find:
// className={\`group w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 \${isActiveGroup ? 'text-white hover:bg-white/10' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}\`}
// Replace with:
// className={\`group w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 \${activeSection === item.id ? 'text-primary bg-primary/10' : isActiveGroup ? 'text-white hover:bg-white/10' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}\`}

content = content.replace(
  /className=\{`group w-full flex items-center gap-3 px-3 py-2 rounded-lg text-\[13px\] font-medium transition-all duration-300 \$\{isActiveGroup \? 'text-white hover:bg-white\/10' : 'text-on-surface-variant hover:text-white hover:bg-white\/5'\}`\}/g,
  "className={`group w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-all duration-300 ${activeSection === item.id ? 'text-primary bg-primary/10 shadow-[0_0_15px_rgba(139,92,246,0.15)]' : isActiveGroup ? 'text-white hover:bg-white/10' : 'text-on-surface-variant hover:text-white hover:bg-white/5'}`}"
);

// 4. Update Right Sidebar (TOC) links to use activeSection
// Find:
// className="hover:text-white transition-colors flex items-center gap-2 group"
// Replace with:
// className={`transition-colors flex items-center gap-2 group ${activeSection === item.id ? 'text-primary font-bold' : 'hover:text-white'}`}

content = content.replace(
  /className="hover:text-white transition-colors flex items-center gap-2 group"/g,
  "className={`transition-colors flex items-center gap-2 group ${activeSection === item.id ? 'text-primary font-bold' : 'hover:text-white'}`}"
);

// Also update the chevron in Right Sidebar
// Find:
// <ChevronRight size={14} className="text-primary/50 group-hover:text-primary transition-colors" />
// Replace with:
// <ChevronRight size={14} className={`transition-colors ${activeSection === item.id ? 'text-primary' : 'text-primary/50 group-hover:text-primary'}`} />

content = content.replace(
  /<ChevronRight size=\{14\} className="text-primary\/50 group-hover:text-primary transition-colors" \/>/g,
  "<ChevronRight size={14} className={`transition-colors ${activeSection === item.id ? 'text-primary' : 'text-primary/50 group-hover:text-primary'}`} />"
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added scrollspy to sidebars');
