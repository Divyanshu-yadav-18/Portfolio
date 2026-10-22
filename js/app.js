/* ==========================================================================
   APP LOGIC - RETRO GRUVBOX / NEOVIM PORTFOLIO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTheme();
  initDualClocks();
  renderSkills();
  renderProjects();
  renderBlogs();
  initBufferTabs();
  initCommandPalette();
  initEmailCopy();
  initModals();
  initScrollSpy();
  initKeyboardNav();
});

/* --- Theme Management --- */
function initTheme() {
  const savedTheme = localStorage.getItem("portfolio-theme") || "gruvbox-dark";
  setTheme(savedTheme, false);

  const themeBtn = document.getElementById("theme-toggle-btn");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "gruvbox-dark";
      let next = "gruvbox-dark";
      if (current === "gruvbox-dark") next = "gruvbox-light";
      else if (current === "gruvbox-light") next = "neovim-dark";
      else next = "gruvbox-dark";
      setTheme(next, true);
    });
  }
}

function setTheme(themeName, showToast = true) {
  document.documentElement.setAttribute("data-theme", themeName);
  localStorage.setItem("portfolio-theme", themeName);

  const label = document.getElementById("current-theme-label");
  if (label) {
    if (themeName === "gruvbox-light") label.textContent = "Gruvbox Light";
    else if (themeName === "neovim-dark") label.textContent = "Neovim Dark";
    else label.textContent = "Gruvbox Dark";
  }

  // Update meta color-scheme
  const metaScheme = document.querySelector('meta[name="color-scheme"]');
  if (metaScheme) {
    metaScheme.content = themeName === "gruvbox-light" ? "light" : "dark";
  }

  if (showToast) {
    showToastNotification(`Theme switched to: ${themeName}`);
  }
}

/* --- Dual Timezone Clocks --- */
function initDualClocks() {
  const istEl = document.getElementById("time-ist");
  const utcEl = document.getElementById("time-utc");

  function update() {
    const now = new Date();

    // IST (Asia/Kolkata)
    const istStr = now.toLocaleTimeString("en-US", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    // UTC
    const utcStr = now.toLocaleTimeString("en-US", {
      timeZone: "UTC",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true
    });

    if (istEl) istEl.textContent = istStr;
    if (utcEl) utcEl.textContent = utcStr + " UTC";
  }

  update();
  setInterval(update, 1000);
}

/* --- Render Skills --- */
function renderSkills() {
  const container = document.getElementById("skills-container");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.skills.map(cat => `
    <div class="skill-category-card">
      <div class="skill-card-header">
        <span class="skill-category-title">${cat.category}</span>
        <span class="skill-category-count">${cat.count}</span>
      </div>
      <div class="skill-tags-list">
        ${cat.items.map(item => `
          <button class="skill-badge" data-skill="${item.name.toLowerCase()}" title="${item.note}">
            <span class="badge-icon">${item.icon}</span>
            <span class="badge-name">${item.name}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `).join("");

  // Add click to filter projects / blogs by skill
  container.querySelectorAll(".skill-badge").forEach(badge => {
    badge.addEventListener("click", () => {
      const skillName = badge.dataset.skill;
      filterContentBySkill(skillName);
      badge.classList.toggle("highlighted");
      showToastNotification(`Filtered for: ${badge.querySelector(".badge-name").textContent}`);
    });
  });
}

function filterContentBySkill(skill) {
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach(card => {
    const text = card.textContent.toLowerCase();
    if (text.includes(skill)) {
      card.style.display = "block";
      card.style.borderColor = "var(--yellow)";
    } else {
      card.style.opacity = "0.4";
    }
  });

  setTimeout(() => {
    projectCards.forEach(c => {
      c.style.opacity = "1";
      c.style.borderColor = "";
    });
  }, 3500);
}

/* --- Render Projects --- */
function renderProjects() {
  const container = document.getElementById("projects-list");
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.projects.map((proj, idx) => `
    <article class="project-card" id="project-${proj.id}">
      <div class="project-top-row">
        <div>
          <h3 class="project-name">
            <a href="${proj.github}" target="_blank" rel="noopener noreferrer">${proj.title}</a>
          </h3>
          <p class="project-tagline">${proj.subtitle}</p>
        </div>
        <div class="project-links-row">
          <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="project-link-pill">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12z"/></svg>
            <span>GitHub</span>
          </a>
          <button class="project-link-pill open-deepdive-btn" data-project-id="${proj.id}">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line></svg>
            <span>Architecture Spec</span>
          </button>
        </div>
      </div>

      <!-- Interactive Architecture Flow Diagram -->
      <div class="arch-diagram-box">
        <div class="arch-diagram-title">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          <span>${proj.diagram.title}</span>
        </div>
        <div class="system-flow-row">
          ${proj.diagram.steps.map((st, i) => `
            <div class="flow-node ${st.type}">${st.text}</div>
            ${i < proj.diagram.steps.length - 1 ? `<span class="flow-arrow">──▶</span>` : ""}
          `).join("")}
        </div>
      </div>

      <!-- Real Engineering Achievements -->
      <ul class="project-bullets-list">
        ${proj.bullets.map(b => `<li>${b}</li>`).join("")}
      </ul>

      <!-- Tech Tags -->
      <div class="project-tech-tags">
        ${proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join("")}
      </div>
    </article>
  `).join("");

  // Attach deep-dive modal handlers
  container.querySelectorAll(".open-deepdive-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const pid = btn.dataset.projectId;
      openProjectModal(pid);
    });
  });
}

/* --- Render Blogs --- */
let activeBlogCategory = "All";

function renderBlogs() {
  const container = document.getElementById("blogs-grid");
  const filterContainer = document.getElementById("blog-filters");
  if (!container) return;

  // Filter Buttons
  const categories = ["All", "Databases & Caching", "AI Infrastructure", "Distributed Systems", "Concurrency & Systems"];
  if (filterContainer) {
    filterContainer.innerHTML = categories.map(cat => `
      <button class="blog-filter-btn ${cat === activeBlogCategory ? "active" : ""}" data-category="${cat}">
        ${cat}
      </button>
    `).join("");

    filterContainer.querySelectorAll(".blog-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        activeBlogCategory = btn.dataset.category;
        renderBlogs();
      });
    });
  }

  const filtered = activeBlogCategory === "All"
    ? PORTFOLIO_DATA.blogs
    : PORTFOLIO_DATA.blogs.filter(b => b.category === activeBlogCategory);

  container.innerHTML = filtered.map(blog => `
    <article class="blog-card" data-blog-id="${blog.id}">
      <div>
        <div class="blog-meta-top">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
          <span>${blog.category}</span>
        </div>

        <!-- Architecture Flow Preview -->
        <div class="blog-preview-diagram">
          <div class="blog-preview-title">SYSTEM TOPOLOGY PREVIEW</div>
          <div class="diagram-mini-flow">
            ${blog.diagram.nodes.map((node, i) => `
              <span class="mini-box ${i === 1 ? 'accent-box' : ''} ${i === 2 ? 'green-box' : ''}">${node}</span>
              ${i < blog.diagram.nodes.length - 1 ? `<span class="flow-arrow">→</span>` : ''}
            `).join("")}
          </div>
        </div>

        <h3 class="blog-card-title">${blog.title}</h3>
        <p class="blog-card-desc">${blog.subtitle}</p>
      </div>

      <div class="blog-card-footer">
        <span>📅 ${blog.date}</span>
        <span class="read-time-pill">⏱ ${blog.readTime}</span>
      </div>
    </article>
  `).join("");

  // Click to open article reader
  container.querySelectorAll(".blog-card").forEach(card => {
    card.addEventListener("click", () => {
      const bid = card.dataset.blogId;
      openArticleModal(bid);
    });
  });
}

/* --- Article Modal / Reader --- */
function openArticleModal(blogId) {
  const blog = PORTFOLIO_DATA.blogs.find(b => b.id === blogId);
  if (!blog) return;

  const modal = document.getElementById("article-reader-modal");
  const titleEl = document.getElementById("modal-article-title");
  const metaEl = document.getElementById("modal-article-meta");
  const bodyEl = document.getElementById("modal-article-content");

  if (titleEl) titleEl.textContent = blog.title;
  if (metaEl) metaEl.innerHTML = `<span>${blog.category}</span> • <span>${blog.date}</span> • <span>${blog.readTime}</span>`;
  
  if (bodyEl) {
    // Basic Markdown conversion for pre/code/headings/paragraphs
    const formatted = formatMarkdownContent(blog.content);
    bodyEl.innerHTML = `
      <div class="honest-bit-box" style="margin-bottom: 1.5rem;">
        <div class="honest-header">ABSTRACT & PROBLEM STATEMENT</div>
        <div class="honest-text">${blog.summary}</div>
      </div>
      ${formatted}
    `;
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

/* --- Project Architecture Deep Dive Modal --- */
function openProjectModal(projectId) {
  const project = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!project) return;

  const modal = document.getElementById("article-reader-modal");
  const titleEl = document.getElementById("modal-article-title");
  const metaEl = document.getElementById("modal-article-meta");
  const bodyEl = document.getElementById("modal-article-content");

  if (titleEl) titleEl.textContent = project.title;
  if (metaEl) metaEl.innerHTML = `<span>Architecture Specification</span> • <span>${project.tags.join(" | ")}</span>`;
  
  if (bodyEl) {
    const formatted = formatMarkdownContent(project.deepDive);
    bodyEl.innerHTML = `
      <div style="margin-bottom: 1.25rem;">
        <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display: inline-flex; align-items: center; gap: 0.4rem;">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12z"/></svg>
          <span>View Source Code on GitHub</span>
        </a>
      </div>
      ${formatted}
    `;
  }

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function formatMarkdownContent(md) {
  if (!md) return "";
  let html = md;

  // Code blocks ```go ... ```
  html = html.replace(/```([a-z]*)\n([\s\S]*?)```/g, (match, lang, code) => {
    return `<pre><code class="language-${lang}">${escapeHtml(code.trim())}</code></pre>`;
  });

  // Inline code `code`
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headings
  html = html.replace(/^#### (.*$)/gim, "<h4>$1</h4>");
  html = html.replace(/^### (.*$)/gim, "<h3>$1</h3>");
  html = html.replace(/^## (.*$)/gim, "<h2>$1</h2>");
  html = html.replace(/^# (.*$)/gim, "<h1>$1</h1>");

  // Bold & Italic
  html = html.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*([^*]+)\*/g, "<em>$1</em>");

  // Lists
  html = html.replace(/^\- (.*$)/gim, "<li>$1</li>");
  html = html.replace(/^\d+\. (.*$)/gim, "<li>$1</li>");

  // Paragraphs
  html = html.split("\n\n").map(block => {
    block = block.trim();
    if (!block) return "";
    if (block.startsWith("<h") || block.startsWith("<pre") || block.startsWith("<li>") || block.startsWith("<div")) {
      return block;
    }
    return `<p>${block}</p>`;
  }).join("\n");

  return html;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/* --- Neovim Buffer Tabs Navigation --- */
function initBufferTabs() {
  const tabs = document.querySelectorAll(".buffer-tab");
  const dockItems = document.querySelectorAll(".dock-item");

  function activate(targetId) {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.target === targetId));
    dockItems.forEach(d => d.classList.toggle("active", d.dataset.target === targetId));

    if (targetId === "resume") {
      openResumeModal();
      return;
    }

    const section = document.getElementById(targetId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.target));
  });

  dockItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      activate(item.dataset.target);
    });
  });
}

/* --- Scroll Spy for Statusline and Active Buffers --- */
function initScrollSpy() {
  const sections = ["overview", "projects", "blogs", "skills", "competitive"];
  const bufferFiles = {
    overview: "divyanshu.go",
    projects: "projects.rs",
    blogs: "architecture_blogs.md",
    skills: "skills.json",
    competitive: "competitive_programming.cpp"
  };

  const statusFilename = document.getElementById("status-filename-val");
  const statusPosition = document.getElementById("status-position-val");

  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = Math.min(100, Math.max(0, Math.round((scrollY / (docHeight || 1)) * 100)));

    if (statusPosition) {
      statusPosition.textContent = `${progress}%  ${Math.round(scrollY / 20) + 1}:1`;
    }

    let currentSection = "overview";
    sections.forEach(secId => {
      const el = document.getElementById(secId);
      if (el) {
        const top = el.offsetTop - 120;
        if (scrollY >= top) {
          currentSection = secId;
        }
      }
    });

    if (statusFilename && bufferFiles[currentSection]) {
      statusFilename.textContent = bufferFiles[currentSection];
    }
  }, { passive: true });
}

/* --- Neovim Command Palette (:) --- */
const VIM_COMMANDS = [
  { cmd: ":projects", desc: "Jump to production projects", action: () => scrollToId("projects") },
  { cmd: ":blogs", desc: "Jump to technical architecture blogs", action: () => scrollToId("blogs") },
  { cmd: ":skills", desc: "View categorized tech stack matrix", action: () => scrollToId("skills") },
  { cmd: ":cp", desc: "View Codeforces rating and algorithms info", action: () => scrollToId("competitive") },
  { cmd: ":resume", desc: "Open interactive resume viewer", action: () => openResumeModal() },
  { cmd: ":email", desc: "Copy Divyanshu's email address", action: () => copyEmailToClipboard() },
  { cmd: ":theme gruvbox-dark", desc: "Switch to Gruvbox Dark Hard", action: () => setTheme("gruvbox-dark") },
  { cmd: ":theme gruvbox-light", desc: "Switch to Gruvbox Light theme", action: () => setTheme("gruvbox-light") },
  { cmd: ":theme neovim", desc: "Switch to Neovim TokyoNight theme", action: () => setTheme("neovim-dark") },
  { cmd: ":w", desc: "Save buffer state to local disk", action: () => showToastNotification("Portfolio state saved to localStorage [ok]") },
  { cmd: ":q", desc: "Quit editor", action: () => showToastNotification("E37: No write since last change! (Press Esc to close)") },
  { cmd: ":q!", desc: "Force quit buffer", action: () => closeCommandPalette() },
  { cmd: ":github", desc: "Open GitHub profile", action: () => window.open(PORTFOLIO_DATA.profile.github, "_blank") },
  { cmd: ":help", desc: "Show all available Vim commands", action: () => showAllCommandsHelp() }
];

function initCommandPalette() {
  const overlay = document.getElementById("cmd-palette-overlay");
  const input = document.getElementById("cmd-input");
  const suggestionsBox = document.getElementById("cmd-suggestions");
  const triggerBtn = document.getElementById("open-cmd-btn");
  const dockCmdBtn = document.getElementById("dock-cmd-btn");

  if (!overlay || !input) return;

  function openPalette() {
    overlay.classList.add("open");
    input.value = "";
    input.focus();
    renderSuggestions("");
    updateNvimMode("COMMAND");
  }

  function closePalette() {
    overlay.classList.remove("open");
    updateNvimMode("NORMAL");
  }

  if (triggerBtn) triggerBtn.addEventListener("click", openPalette);
  if (dockCmdBtn) dockCmdBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openPalette();
  });

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closePalette();
  });

  input.addEventListener("input", (e) => {
    renderSuggestions(e.target.value.trim());
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePalette();
    } else if (e.key === "Enter") {
      executeCommand(input.value.trim());
    }
  });

  function renderSuggestions(query) {
    if (!suggestionsBox) return;
    const cleanQuery = query.toLowerCase();
    const matches = VIM_COMMANDS.filter(c => 
      c.cmd.toLowerCase().includes(cleanQuery) || c.desc.toLowerCase().includes(cleanQuery)
    );

    if (matches.length === 0) {
      suggestionsBox.innerHTML = `<div class="cmd-suggestion-item"><span>No matching commands. Try <strong>:help</strong></span></div>`;
      return;
    }

    suggestionsBox.innerHTML = matches.map(m => `
      <div class="cmd-suggestion-item" data-cmd="${m.cmd}">
        <span class="cmd-name">${m.cmd}</span>
        <span class="cmd-desc">${m.desc}</span>
      </div>
    `).join("");

    suggestionsBox.querySelectorAll(".cmd-suggestion-item").forEach(item => {
      item.addEventListener("click", () => {
        executeCommand(item.dataset.cmd);
      });
    });
  }

  function executeCommand(cmdStr) {
    const found = VIM_COMMANDS.find(c => c.cmd.toLowerCase() === cmdStr.toLowerCase());
    if (found) {
      closePalette();
      found.action();
    } else {
      showToastNotification(`Not an editor command: ${cmdStr}. Try :help`);
    }
  }
}

function updateNvimMode(mode) {
  const modeEl = document.getElementById("status-mode-val");
  if (modeEl) {
    modeEl.textContent = mode;
    modeEl.style.background = mode === "COMMAND" ? "var(--orange)" : "var(--status-mode-bg)";
    modeEl.style.color = "var(--status-mode-fg)";
  }
}

function closeCommandPalette() {
  const overlay = document.getElementById("cmd-palette-overlay");
  if (overlay) overlay.classList.remove("open");
  updateNvimMode("NORMAL");
}

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function showAllCommandsHelp() {
  const list = VIM_COMMANDS.map(c => `${c.cmd} -> ${c.desc}`).join("\n");
  alert(`Neovim Command Help:\n\n${list}\n\nPress Esc to dismiss.`);
}

/* --- Keyboard Shortcuts (Vim Style) --- */
function initKeyboardNav() {
  window.addEventListener("keydown", (e) => {
    // If typing in an input or textarea, skip
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      return;
    }

    if (e.key === ":") {
      e.preventDefault();
      const trigger = document.getElementById("open-cmd-btn");
      if (trigger) trigger.click();
    } else if (e.key === "Escape") {
      closeAllModals();
      closeCommandPalette();
    } else if (e.key === "j") {
      window.scrollBy({ top: 120, behavior: "smooth" });
    } else if (e.key === "k") {
      window.scrollBy({ top: -120, behavior: "smooth" });
    } else if (e.key === "G" && e.shiftKey) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    } else if (e.key === "g" && !e.shiftKey) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  });
}

/* --- Resume Modal --- */
function openResumeModal() {
  const modal = document.getElementById("resume-viewer-modal");
  if (modal) {
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }
}

function closeAllModals() {
  document.querySelectorAll(".article-modal-overlay, .resume-modal-overlay").forEach(m => {
    m.classList.remove("open");
  });
  document.body.style.overflow = "";
}

function initModals() {
  document.querySelectorAll(".modal-close-btn, .close-modal-trigger").forEach(btn => {
    btn.addEventListener("click", () => closeAllModals());
  });

  document.querySelectorAll(".article-modal-overlay, .resume-modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeAllModals();
    });
  });

  const openResumeBtn = document.getElementById("open-resume-btn");
  if (openResumeBtn) {
    openResumeBtn.addEventListener("click", openResumeModal);
  }

  const printResumeBtn = document.getElementById("print-resume-btn");
  if (printResumeBtn) {
    printResumeBtn.addEventListener("click", () => {
      window.print();
    });
  }
}

/* --- Email Copy & Toast --- */
function initEmailCopy() {
  const copyBtns = document.querySelectorAll(".copy-email-btn");
  copyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      copyEmailToClipboard();
    });
  });

  const copyAiBtn = document.getElementById("copy-ai-json-btn");
  if (copyAiBtn) {
    copyAiBtn.addEventListener("click", () => {
      const dataStr = JSON.stringify(PORTFOLIO_DATA, null, 2);
      navigator.clipboard.writeText(dataStr).then(() => {
        showToastNotification("Copied full JSON schema to clipboard!");
      });
    });
  }
}

function copyEmailToClipboard() {
  const email = PORTFOLIO_DATA.profile.email;
  navigator.clipboard.writeText(email).then(() => {
    showToastNotification(`Copied to clipboard: ${email}`);
  }).catch(() => {
    showToastNotification(`Email: ${email}`);
  });
}

function showToastNotification(message) {
  let container = document.getElementById("toast-container");
  if (!container) {
    container = document.createElement("div");
    container.id = "toast-container";
    container.className = "toast-container";
    document.body.appendChild(container);
  }

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<span>✔</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(-10px)";
    toast.style.transition = "all 0.2s ease";
    setTimeout(() => toast.remove(), 250);
  }, 2800);
}
