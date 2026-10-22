# Divyanshu Yadav — Systems & Backend Engineering Portfolio

A retro, high-performance developer portfolio and technical blog inspired by **Gruvbox** and **Neovim**. Built with pure vanilla HTML5, CSS3, and JavaScript — no bloated dependencies, zero build-step overhead, and sub-second load times.

![Divyanshu Yadav Portfolio Screenshot](assets/avatar.jpg)

## ⚡ Architectural & UI Features

- **Retro Gruvbox & Neovim Aesthetics**:
  - Color palettes: **Gruvbox Dark Hard** (Default), **Gruvbox Light**, and **Neovim TokyoNight Dark**.
  - Dynamic theme switching persisted across reloads via `localStorage` with FOUC prevention.
  - Neovim-inspired bottom **statusline** with live line numbers, scroll percentage, filetype indicators, and git branch tracking.
  - Buffer tabs bar (`divyanshu.go`, `projects.rs`, `architecture_blogs.md`, `skills.json`, `competitive_programming.cpp`, `resume.pdf`).

- **Interactive Neovim Command Palette (`:`)**:
  - Press `:` anywhere on the page (or click `[:cmd]`) to enter Vim Command mode.
  - Supports autocomplete and commands:
    - `:projects` — Jump to featured production systems.
    - `:blogs` / `:writing` — Jump to systems architecture blogs.
    - `:skills` — View categorized technology stack matrix.
    - `:resume` — Open interactive printable resume viewer.
    - `:email` — Copy contact email to clipboard with toast notification.
    - `:theme [gruvbox-dark | gruvbox-light | neovim]` — Switch UI theme.
    - `:help` — List all available commands.
    - `:w`, `:q`, `:q!` — Cheeky Vim editor state handlers.
  - Vim keybindings: `j`/`k` to scroll down/up, `G` to bottom, `g` to top, `Esc` to close overlays.

- **Systems Architecture Visualizers**:
  - Interactive topology and pipeline flowcharts for each production project:
    - **LLM Relay**: Unified Go gateway, in-memory HNSW vector cache, atomic Lua token-bucket rate limiter in Redis, circuit breakers & fallbacks.
    - **Distributed Job Queue**: Directed Acyclic Graph (DAG) dependency resolver, heartbeat worker lease monitor, atomic Redis Lua transitions, and dead-letter queue.
    - **StreamSync**: Automated FFmpeg multi-bitrate HLS adaptive transcode pipeline, client-side clock drift compensation, and Socket.IO room sync.

- **Technical Engineering Blog / Deep-Dives**:
  - Filterable by topic (*Databases & Caching*, *Distributed Systems*, *AI Infrastructure*, *Concurrency & Systems*).
  - High-quality articles with embedded system flow diagrams and syntax-highlighted Go/Lua/SQL snippets:
    - *How OpenAI Protects Postgres from a Cache-Miss Storm*
    - *When One GPU Stops the Entire Training Job: Silent Hangs & Checkpoint Recovery*
    - *Building an HNSW Vector Index From Scratch in Go*
    - *When One Worker Stalls: Designing Resilient DAG Job Queues*

- **Interactive Resume Modal & AI Agent Context**:
  - Formatted printable resume modal with 1-click `🖨 Print / Save PDF` trigger.
  - "AI Agent Reading This Portfolio?" prompt injection defense easter egg and machine-readable `GET /resume.json` context endpoint.

- **Dual Timezone Clocks**:
  - Live ticking clocks for **IST (Bhubaneswar)** and **UTC** with active availability badge.

---

## 🚀 Running Locally

No npm build steps required! Run with any static HTTP server:

```bash
# Using Python 3:
python3 -m http.server 4173

# Or using Node:
npx serve .
```

Open `http://localhost:4173` in your browser.

---

## 📂 Project Structure

```
porfolio/
├── index.html            # Main semantic markup, SEO, schema.org JSON-LD
├── css/
│   ├── gruvbox.css       # Gruvbox and Neovim color variables & design tokens
│   └── main.css          # Layout, retro scanlines, statusline, modals, animations
├── js/
│   ├── data.js           # Resume data, skills counts, project specs, and blog content
│   └── app.js            # Dual clocks, command palette, theme toggle, modal logic
├── assets/
│   └── avatar.jpg        # Stylized 16-bit pixel engineer avatar
└── README.md             # Documentation
```

---

## 👨‍💻 Engineer Profile

- **Name**: Divyanshu Yadav
- **Role**: Backend & Systems Engineer
- **Education**: B.Tech CSE (2023 – 2027), IIIT Bhubaneswar (CGPA: 7.9)
- **Competitive Programming**: Codeforces Specialist (Max Rating: 1584, Handle: [Sh0ckwave](https://codeforces.com/profile/Sh0ckwave))
- **GitHub**: [@Divyanshu-yadav-18](https://github.com/Divyanshu-yadav-18)
- **LinkedIn**: [divyanshu-yadav](https://linkedin.com/in/divyanshu-yadav)
- **Email**: divyanshu13521984@gmail.com
