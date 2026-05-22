const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'pages', 'Docs.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// The issue is that we have:
// </motion.div>
// )}
// {activeGroup === 'Authentication' && (
// <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>

// But the first section started before `<div className="space-y-12">`.
// So the first section has an unclosed `<div className="space-y-12">`.
// And the last section has an extra `</div>` that closes `<div className="space-y-12">`.

// Let's fix this by adding `</div>` before `</motion.div>` for the first section.
content = content.replace(
  /\n<\/motion\.div>\n\)\}\n\{activeGroup === 'Authentication'/g,
  '\n</div>\n</motion.div>\n)}\n{activeGroup === \'Authentication\''
);

// And for all other sections (Authentication to Advanced), they need to be wrapped in `<div className="space-y-12">`
// because they are now outside the main `space-y-12` div.
const groups = [
  'Authentication', 'User', 'Session', 'Auth State', 'API', 'Email Features', 'Admin (Premium)', 'Advanced'
];

for (const group of groups) {
  const searchStr = `{activeGroup === '${group}' && (\n<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>\n<div className="p-8 rounded-2xl glass`;
  const replaceStr = `{activeGroup === '${group}' && (\n<motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>\n<div className="space-y-12">\n<div className="p-8 rounded-2xl glass`;
  content = content.replace(searchStr, replaceStr);
}

// Now we need to add `</div>` before `</motion.div>` for all these sections.
for (let i = 0; i < groups.length - 1; i++) {
  const group = groups[i];
  const nextGroup = groups[i+1];
  
  const searchStr = `\n</motion.div>\n)}\n{activeGroup === '${nextGroup}'`;
  const replaceStr = `\n</div>\n</motion.div>\n)}\n{activeGroup === '${nextGroup}'`;
  content = content.replace(searchStr, replaceStr);
}

// And for the last group (Advanced), we need to add `</div>` before `</motion.div>` but wait, the last group already has the `</div>` from the original file!
// Let's check line 2672. It has `</div>` which closes `space-y-12`.
// So the last group doesn't need an extra `</div>` at the end, but it DOES need the `<div className="space-y-12">` at the beginning, which we added above.
// Wait, if we added `<div className="space-y-12">` at the beginning of 'Advanced', and it already has `</div>` at the end, then it's balanced.

// Let's also fix the Unterminated regular expression error on line 2674.
// Wait, why was there an unterminated regular expression?
// Ah, the error was:
// 2672|                </div>
// 2673|              
// 2674|  </motion.div>
//    |               ^
// 2675|  )}
// 2676|  </motion.div>

// Wait, `</motion.div>` is not a regular expression. The error is probably because of a missing closing brace or something.
// Let's look at the original file around line 2670.
// 2670:                   </div>
// 2671:                 </div>
// 2672:               </div>
// 2673:             
// 2674: </motion.div>
// 2675: )}
// 2676: </motion.div>

// Wait, the error says "Unexpected closing "div" tag does not match opening "motion.div" tag".
// This means there is an extra `</div>` before `</motion.div>`.
// Ah! The `</div>` on line 2672 was closing `space-y-12`.
// But we added `<div className="space-y-12">` at the beginning of 'Advanced'. So it should match.
// Let's just remove all the `activeGroup` stuff and do it properly.

fs.writeFileSync('fix.js', `
const fs = require('fs');
let content = fs.readFileSync('${filePath}', 'utf8');

// It's too messy to fix the broken file. Let's just restore from git if possible, or manually fix the tags.
`);
