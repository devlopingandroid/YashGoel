"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";

interface CodeSnippetViewerProps {
  title: string;
  filename: string;
  language: string;
  code: string;
}

export const CodeSnippetViewer: React.FC<CodeSnippetViewerProps> = ({
  title,
  filename,
  language,
  code,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  const lines = code.trim().split("\n");

  return (
    <div className="my-6 rounded-2xl overflow-hidden border border-dark-border bg-dark-surface/95 shadow-card-subtle backdrop-blur-md">
      {/* Code Header Bar */}
      <div className="bg-dark-bg/90 px-4 py-3 border-b border-dark-border flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-muted pl-2 border-l border-dark-border">
            <Terminal className="w-3.5 h-3.5 text-accent-teal" />
            <span className="text-primary font-medium">{filename}</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-dark-surface border border-dark-border text-accent-teal">
              {language}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs text-muted font-sans hidden sm:inline">{title}</span>
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-dark-surface hover:bg-accent-teal/10 hover:text-accent-teal text-muted border border-dark-border hover:border-accent-teal/40 transition-all duration-200"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-accent-teal" />
                <span className="text-accent-teal font-medium">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body with Line Numbers */}
      <div className="p-4 overflow-x-auto text-xs sm:text-sm font-mono leading-relaxed bg-[#0b0f17]">
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="pr-4 py-0.5 text-right select-none text-muted/40 font-mono text-xs w-8">
                  {idx + 1}
                </td>
                <td className="py-0.5 text-primary/90 whitespace-pre">
                  {line}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CodeSnippetViewer;
