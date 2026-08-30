import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";
import { DIALOGUE } from "@/lib/vpn/defaults";
import { playSound } from "@/lib/vpn/audio";

export function DialogueBox() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const line = DIALOGUE[index];

  useEffect(() => {
    setText("");
    let i = 0;
    const full = line.quote;
    const id = setInterval(() => {
      i += 1;
      setText(full.slice(0, i));
      if (i >= full.length) clearInterval(id);
    }, 18);
    return () => clearInterval(id);
  }, [index, line.quote]);

  return (
    <button
      type="button"
      id="deltarune-dialogue-box"
      onClick={() => {
        setIndex((p) => (p + 1) % DIALOGUE.length);
        playSound.select();
      }}
      className="w-full deltarune-box rounded-md p-3.5 text-left select-none"
    >
      <div className="flex items-start gap-3">
        <div
          className="size-12 rounded-sm border-2 bg-ink flex items-center justify-center shrink-0"
          style={{ borderColor: line.colorVar }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={line.colorVar}>
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span
              className="font-pixel text-[10px] uppercase tracking-wider"
              style={{ color: line.colorVar }}
            >
              * {line.speaker}
            </span>
            <span className="text-[9px] font-mono text-dim flex items-center gap-1 shrink-0">
              <MessageCircle className="size-3" />
              Next
            </span>
          </div>
          <p className="font-mono text-xs text-fg mt-1.5 leading-relaxed min-h-10">{text}</p>
        </div>
      </div>
    </button>
  );
}
