import { Reflection } from "./types";


export async function postToDiscord(r: Reflection): Promise<void> {
    const url = process.env.DISCORD_REFLECTION_WEBHOOK_URL;
    if (!url) return;
    const payload = {
        username: "Caelum",
        embeds: [
          {
            title: "Reflection",
            description: r.reflection,
            fields: [
              { name: "Emotion", value: r.emotion, inline: true },
              { name: "Shard Intent", value: `${Math.round(r.shardIntent * 100)}%`, inline: true },
              { name: "User", value: r.meta.user, inline: true },
            ],
            footer: { text: `confidence ${Math.round(r.confidence * 100)}% • ${r.timestamp}` },
          },
        ],
      };
      await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
}