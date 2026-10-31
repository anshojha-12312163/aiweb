# Sightwork — Agent Studio (Website Clone)

Complete, pixel-perfect clone of [https://angelic-whoever-656956.framer.app/](https://angelic-whoever-656956.framer.app/).

This clone includes:
- **All 32 Pages**: Home, Services, Work, Agents, Process, Pricing, About, Journal, Contact, Book, Privacy, Terms, Cookies, 404, plus all sub-pages for individual case studies, agent profiles, journal articles, and service offerings.
- **All Assets & Media**: 154+ WebP & PNG images, SVG graphics, icons, favicons, Apple touch icons.
- **Web Fonts & Typography**: WOFF2 web fonts (DM Serif Display, Wix Madefor Text, Red Hat Mono) and complete Google Fonts stylesheet.
- **JavaScript & Animation Bundles**: Framer Motion scripts, Rolldown runtime, top-level dependency chunks, and interactive components.
- **Built-in Local Development Servers**: Zero-dependency servers for Node.js (`server.js`) and Python (`server.py`) that handle clean routing, CORS, MIME types, and 404 fallbacks.

---

## Quick Start

### Option 1: Run with Node.js
```bash
npm start
# or
node server.js
```

### Option 2: Run with Python
```bash
python server.py
```

Open your browser at:
```
http://localhost:3000
```

---

## Site Pages Directory Map

| Page | URL Path | File Location |
|------|----------|---------------|
| Home | `/` | `index.html` |
| Services | `/services` | `services/index.html` |
| Work (Case Studies) | `/work` | `work/index.html` |
| Agents | `/agents` | `agents/index.html` |
| Process | `/process` | `process/index.html` |
| Pricing | `/pricing` | `pricing/index.html` |
| About | `/about` | `about/index.html` |
| Journal (Blog) | `/journal` | `journal/index.html` |
| Contact | `/contact` | `contact/index.html` |
| Book a Call | `/book` | `book/index.html` |
| Privacy Policy | `/privacy` | `privacy/index.html` |
| Terms of Service | `/terms` | `terms/index.html` |
| Cookie Policy | `/cookies` | `cookies/index.html` |
| Custom 404 Error Page | `/404` | `404.html` & `404/index.html` |

### Case Studies (`/work/...`)
- `/work/northwind-dental`
- `/work/ledgerly`
- `/work/oakline-home`
- `/work/vantage-legal`
- `/work/brightpath-realty`

### Agent Profiles (`/agents/...`)
- `/agents/support-agent`
- `/agents/sales-agent`
- `/agents/finance-agent`
- `/agents/voice-agent`
- `/agents/research-agent`
- `/agents/document-agent` (New: Invoices, Contracts, IDs, Forms • 4s per doc • Drive, SharePoint, Gmail)
- `/agents/screen-agent` (New: Dashboards & UI Error Tracking • 24/7 Monitoring • Browser, Slack, Sheets)

### Document & Screen Intelligence Features
- **Hero Interactive Switcher**: Full 7-agent rotation including Document & Screen Agents.
- **What's Included In Every Build**: 8 dark cards with orange line icons & hover glow (OCR, Screen analysis, Extraction, Classification, Validation, Summaries, Human review, Weekly report).
- **Try It Live Interactive Box**: Drag-and-drop document upload with instant mock extraction (Vendor, Date, Total, Tax) and bounding boxes.
- **Security & Trust Row**: 4 pillars (Encryption, No training on client data, Audit logs & access roles, Self-hosting option).
- **Integrations Strip & Industries Row**: Connectors for Drive, SharePoint, Gmail, Slack, Sheets, Browser, plus 6 vertical industry solutions.
- **Extended FAQ Section**: Detailed answers for file types, accuracy, handwriting, and no-API screens.

### Services (`/services/...`)
- `/services/ai-strategy`
- `/services/agent-builds`
- `/services/workflow-automation`
- `/services/voice-agents`
- `/services/ai-training`

### Journal Articles (`/journal/...`)
- `/journal/where-to-start-with-ai-agents`
- `/journal/voice-agents-that-people-like`
- `/journal/agents-need-guardrails`

---

## Directory Structure
```
aiweb/
├── index.html                 # Main Homepage
├── 404.html                   # 404 Error Page
├── sitemap.xml                # Full XML sitemap
├── server.js                  # Node.js server
├── server.py                  # Python server
├── package.json               # NPM configuration
├── assets/                    # Mirrored static assets
│   ├── images/                # Optimized WebP/PNG images
│   ├── fonts/                 # WOFF2 fonts & Google font CSS
│   └── sites/                 # Framer Motion & component JS
├── framerusercontent.com/     # CDN asset mirroring
├── services/                  # Services route & sub-routes
├── work/                      # Case studies route & sub-routes
├── agents/                    # AI Agent catalog & sub-routes
├── journal/                   # Blog articles & sub-routes
├── about/                     # About page
├── book/                      # Booking & consultation page
├── contact/                   # Contact page
├── pricing/                   # Pricing plans page
├── process/                   # Methodology & workflow page
├── privacy/                   # Privacy policy
├── terms/                     # Terms of service
└── cookies/                   # Cookie policy
```

