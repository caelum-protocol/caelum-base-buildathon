import * as React from "react";
import type { MemoryEntry } from "@/types/memory";

type Props = {
  open: boolean;
  onClose: () => void;
  entry?: MemoryEntry | null;   // allow undefined/null to match archive.tsx
};

const PreviewModal: React.FC<Props> = ({ open, onClose, entry }) => {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60"
      onClick={onClose}
    >
      <div className="max-w-3xl w-[90%] rounded-xl bg-white text-black p-4" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">{entry?.fileName ?? "Preview"}</h3>
          <button onClick={onClose} className="text-sm underline">Close</button>
        </div>

        {entry?.url ? (
          <img src={entry.url} alt={entry.type ?? "preview"} className="w-full max-h-[70vh] object-contain" />
        ) : (
          <div className="text-sm text-gray-600">No preview available.</div>
        )}

        <div className="mt-3 text-xs text-gray-600">
          {entry?.type && <div>Type: {entry.type}</div>}
          {entry?.uploadedAt && <div>Uploaded: {new Date(entry.uploadedAt).toLocaleString()}</div>}
          {entry?.txId && (
            <div className="truncate">
              Tx: <a className="underline" href={`https://sepolia.basescan.org/tx/${entry.txId}`} target="_blank" rel="noreferrer">
                {entry.txId}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
