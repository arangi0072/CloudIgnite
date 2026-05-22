'use client';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark as style } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CopyButton from './copy-button';

// Fix for style object not being correctly typed by the library
const customStyle = style as any;

export default function CodeBlock({
  code,
  language = 'bash',
}: {
  code: string;
  language?: string;
}) {
  return (
    <div className="relative group prose-pre:!bg-[#282c34] prose-pre:!border-border">
      <SyntaxHighlighter 
        language={language} 
        style={customStyle} 
        customStyle={{ margin: 0, padding: '1rem' }}
        codeTagProps={{
            className: 'text-sm'
        }}
        >
        {code.trim()}
      </SyntaxHighlighter>
      <CopyButton textToCopy={code.trim()} />
    </div>
  );
}
