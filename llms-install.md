# Installing The Brains MCP server

The Brains is a hosted, remote MCP server. There is nothing to clone, build or configure, and no API key.

## Add it

Add this server to the MCP settings file (for Cline: `cline_mcp_settings.json`):

```json
{
  "mcpServers": {
    "the-brains": {
      "type": "streamableHttp",
      "url": "https://mcp.brains.ceo/mcp"
    }
  }
}
```

On first use the client opens a browser sign-in page (OAuth 2.1). The user enters their email and the 6-digit code they receive. No other setup is needed.

## Tools

All tools are read-only.

- `list_brains`: every person in The Brains, with the slug to pass as `brain`.
- `search_brains`: search founders' and investors' playbooks on growth, distribution, marketing, pricing and building a business. Leave `brain` empty to search everyone, or pass one person's slug or name.
- `list_sources`: every talk, interview, essay and post collection in one person's brain.

## One person only

Each person also has their own endpoint, `https://mcp.brains.ceo/<slug>/mcp` (for example `https://mcp.brains.ceo/pieter-levels/mcp`), with `search_brain` and `list_sources`. See https://brains.ceo for the list.

## A few people on one topic

Roundtables put several people behind one endpoint, `https://mcp.brains.ceo/<topic>-brains/mcp` (for example `https://mcp.brains.ceo/pricing-brains/mcp`), with `ask_all`, `search_brains` and `list_sources`. See https://brains.ceo/roundtables for the list.

## Check it works

Ask: "Use The Brains to find what Pieter Levels says about validating a product idea." The answer should cite passages with source links.
