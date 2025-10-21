export interface MemoryEntry {
  id: string; 
  fileName: string;
  mime: string;
  size: number;
  title: string;
  type: string;
  createdAt: string;
  uploadedAt: string;
  txId: string;
  url: string;
  note?: string;
  isNew?: boolean;
}
