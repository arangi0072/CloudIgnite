const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

const target = '<div className="p-8 rounded-2xl border border-white/10 bg-surface-container-low relative overflow-hidden shadow-xl">';
const replacement = '<motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5 }} className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover">';

// Also replace the closing div for these sections. 
// This is tricky because there are many closing divs. 
// Since we changed `<div` to `<motion.div`, we MUST change the corresponding `</div>` to `</motion.div>`.
// Let's just change the opening tag to a standard div with the new classes, and add a motion.div wrapper inside, OR just use the classes on the existing div.
// Actually, it's much safer to just change the classes on the existing `div` so we don't have to match closing tags!

const safeReplacement = '<div className="p-8 rounded-2xl glass relative overflow-hidden shadow-2xl group glow-hover transition-all duration-500">';

content = content.split(target).join(safeReplacement);

// Let's also replace `bg-surface border border-white/5` with `glass` for the inner cards
const innerCardTarget = 'className="bg-surface border border-white/5 rounded-xl overflow-hidden shadow-lg"';
const innerCardReplacement = 'className="glass rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(139,92,246,0.15)] hover:border-primary/30"';
content = content.split(innerCardTarget).join(innerCardReplacement);

// And the warning/notes cards
const noteCardTarget = 'className="bg-surface border border-white/5 rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500"';
const noteCardReplacement = 'className="glass rounded-xl overflow-hidden shadow-lg border-l-4 border-l-yellow-500 transition-all duration-300 hover:shadow-[0_0_20px_rgba(234,179,8,0.15)]"';
content = content.split(noteCardTarget).join(noteCardReplacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Replaced successfully');
