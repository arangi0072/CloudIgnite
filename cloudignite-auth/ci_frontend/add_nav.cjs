const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// Find the end of the main content
const mainEndStr = '</main>\n\n        {/* Right Sidebar (TOC) */}';

const nextPrevComponent = `
          {/* Next / Previous Navigation */}
          <div className="mt-24 pt-8 border-t border-white/10 flex items-center justify-between">
            {sidebarLinks.findIndex(g => g.title === activeGroup) > 0 ? (
              <button 
                onClick={() => {
                  const idx = sidebarLinks.findIndex(g => g.title === activeGroup);
                  setActiveGroup(sidebarLinks[idx - 1].title);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col items-start gap-2 px-6 py-4 rounded-xl glass hover:border-primary/50 transition-all duration-300"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline group-hover:text-primary transition-colors">Previous</span>
                <span className="text-white font-medium flex items-center gap-2">
                  <ChevronRight size={16} className="rotate-180 text-primary/50 group-hover:text-primary group-hover:-translate-x-1 transition-all" />
                  {sidebarLinks[sidebarLinks.findIndex(g => g.title === activeGroup) - 1]?.title}
                </span>
              </button>
            ) : <div></div>}

            {sidebarLinks.findIndex(g => g.title === activeGroup) < sidebarLinks.length - 1 ? (
              <button 
                onClick={() => {
                  const idx = sidebarLinks.findIndex(g => g.title === activeGroup);
                  setActiveGroup(sidebarLinks[idx + 1].title);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group flex flex-col items-end gap-2 px-6 py-4 rounded-xl glass hover:border-primary/50 transition-all duration-300 text-right"
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-outline group-hover:text-primary transition-colors">Next</span>
                <span className="text-white font-medium flex items-center gap-2">
                  {sidebarLinks[sidebarLinks.findIndex(g => g.title === activeGroup) + 1]?.title}
                  <ChevronRight size={16} className="text-primary/50 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </span>
              </button>
            ) : <div></div>}
          </div>
`;

content = content.replace(mainEndStr, nextPrevComponent + '\n        ' + mainEndStr);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Added Next/Prev navigation');
