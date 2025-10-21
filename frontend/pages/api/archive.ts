import type { NextApiRequest, NextApiResponse } from "next";
import type { MemoryEntry } from "@/types/memory";

export default function handler(_: NextApiRequest, res: NextApiResponse) {
  const data: MemoryEntry[] = [
    {
      id: "demo-1",
      fileName: "First shard",
      title: "First shard",
      txId: "tx-demo-1",
      type: "text/plain",
      mime: "text/plain",
      size: 1234,
      url: "https://example.com/demo-1",
      uploadedAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
      createdAt:  new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "demo-2",
      fileName: "Second shard",
      title: "Second shard",
      txId: "tx-demo-2",
      type: "image/png",
      mime: "image/png",
      size: 4567,
      url: "https://example.com/demo-2",
      uploadedAt: new Date().toISOString(),
      createdAt:  new Date().toISOString(),
    }
  ];

  res.status(200).json(data);
}
