/ What it does:
// Triggers a browser download. Creates a Blob from your data, creates a temporary object URL for it, 
// creates an invisible <a> link with download attribute, 
// clicks it programmatically, then revokes the URL after 1s to free memory.

export function save(name: string, data: BlobPart, type: string) {
    const blob = new Blob([data], {type});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

// i will delete this

import { TAGS } from '../tags';
import type { TagKey } from '../tags';

type Props = {
  counts: Record<string, number>;
  focus: TagKey | null;
  onFocus: (k: TagKey | null) => void;
  labels: boolean;
  onLabels: (v: boolean) => void;
  view: 'write' | 'preview';
  onView: (v: 'write' | 'preview') => void;
};

export function TagFilterBar({ counts, focus, onFocus, labels, onLabels, view, onView }: Props) {
  return (
    <div className="no-print flex items-center gap-3 border-b border-ink-700 px-4 py-2.5">
      <div className="flex min-w-0 flex-1 gap-1.5 overflow-x-auto pb-0.5" role="group" aria-label="Isolate a tag">
        {TAGS.map((t) => {
          const n = counts[t.key]?? 0;
          const on = focus === t.key;
          const isDark = ['55, 65, 81', '100, 116, 139', '120, 113, 108', '156, 163, 175'].includes(t.rgb);
          return (
            <button
              key={t.key}
              onClick={() => onFocus(on? null : t.key)}
              aria-pressed={on}
              className="flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              style={{
                borderColor: `rgba(${t.rgb}, ${on? 1 : 0.45})`,
                background: on? `rgb(${t.rgb})` : 'transparent',
                color: on? '#fff' : isDark? 'rgb(186, 192, 210)' : `rgb(${t.rgb})`,
                opacity: n === 0 &&!on? 0.4 : 1,
              }}
            >
                {t.key} <span className="opacity-70">{n}</span>
            </button>
          );
        })}
      </div>

      <label className="flex shrink-0 cursor-pointer items-center gap-2 text-xs font-semibold text-ink-400">
        <input type="checkbox" checked={labels} onChange={(e) => onLabels(e.target.checked)} className="accent-[#e11d48]" />
        Margin tags
      </label>

      <div className="flex shrink-0 rounded-lg border border-ink-700 p-0.5 lg:hidden" role="tablist">
        {(['write', 'preview'] as const).map((v) => (
          <button
            key={v}
            role="tab"
            aria-selected={view === v}
            onClick={() => onView(v)}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold capitalize ${view === v? 'bg-ink-700 text-white' : 'text-ink-400'}`}
          >
            {v}
          </button>
        ))}
      </div>
    </div>
  );
};
