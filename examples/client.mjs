// Minimal client for the entityindex.ai MCP server (MIT). Requires: npm install @modelcontextprotocol/sdk
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

const client = new Client({ name: "entityindex-example", version: "1.0.0" });
await client.connect(new StreamableHTTPClientTransport(new URL("https://entityindex.ai/mcp")));

const { tools } = await client.listTools();
console.log("Tools:", tools.map((t) => t.name).join(", "));

const res = await client.callTool({ name: "search_hotels", arguments: { pets: true, limit: 5 } });
for (const h of res.structuredContent.results) console.log(`- ${h.name} (${h.locality}) -> ${h.booking_link}`);

await client.close();
