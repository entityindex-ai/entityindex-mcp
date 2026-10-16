# entityindex.ai MCP server

Public, read-only [Model Context Protocol](https://modelcontextprotocol.io) server for **[entityindex.ai](https://entityindex.ai)**, an index of businesses verified for AI agents. It currently covers 72 hotels, apartments and hostels in Andorra.

Every record comes from the business's own official website, with the source URL and verification date for each field. We do **not** take bookings or payments. Links send users to the official website or booking engine.

- **Endpoint:** `https://entityindex.ai/mcp`
- **Transport:** Streamable HTTP (stateless JSON-RPC 2.0)
- **Auth:** none
- **Registry:** `ai.entityindex/entityindex` in the [official MCP Registry](https://registry.modelcontextprotocol.io)
- **Docs:** https://entityindex.ai/mcp-info/ · [llms.txt](https://entityindex.ai/llms.txt) · [OpenAPI](https://entityindex.ai/openapi.yaml)

This repository contains documentation, the registry `server.json` and a small client example. The server itself runs on entityindex.ai.

## Tools

| Tool | Description |
|---|---|
| `search_hotels` | Filter by `area` (parish or locality), `type` (hotel, apartamentos, hostel), `min_stars`, `query` (free text) and these verified amenities: `spa`, `pool`, `parking`, `pets`, `ski_in_out`, `family`. `true` means the official website explicitly says so; unknown values are left out. |
| `get_hotel` | Full record by `slug`: location, contact details, verified amenities with their source URLs, and the official booking link. |
| `list_areas` | Parishes and localities covered, with the number of places in each. |

## Configuration

**Claude** (Settings → Connectors → Add custom connector) — URL: `https://entityindex.ai/mcp`

**Claude Desktop / Claude Code / generic `mcpServers` JSON:**
```json
{ "mcpServers": { "entityindex": { "type": "http", "url": "https://entityindex.ai/mcp" } } }
```

**Cursor** (`~/.cursor/mcp.json`):
```json
{ "mcpServers": { "entityindex": { "url": "https://entityindex.ai/mcp" } } }
```

**ChatGPT** (developer mode → Connectors → Create) — MCP server URL: `https://entityindex.ai/mcp`, authentication: none.

## Example call

```bash
curl -s https://entityindex.ai/mcp \
  -H 'Content-Type: application/json' -H 'Accept: application/json, text/event-stream' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"search_hotels","arguments":{"area":"Soldeu","ski_in_out":true,"spa":true}}}'
```

A Node.js client using the official SDK is in [`examples/client.mjs`](examples/client.mjs):
```bash
cd examples && npm install @modelcontextprotocol/sdk && node client.mjs
```

## License

- **Data:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/). Attribution: **entityindex.ai — MERX TECHNOLOGIES, SLU**, with a link to https://entityindex.ai where possible.
- **Example code in this repository:** MIT.

See [LICENSE](LICENSE).

## Contact

Operated by MERX TECHNOLOGIES, SLU (Andorra). Corrections, removal requests and questions: contact@entityindex.ai
