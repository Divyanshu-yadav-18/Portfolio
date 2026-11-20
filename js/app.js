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
  initVimSearch();
  initNvimFloatingWindow();
  initMatrixEffect();
  initStatuslineModeToggle();
  initHarpoon();
  initAvatarEasterEgg();
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
      else if (current === "neovim-dark") next = "bankai";
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
    else if (themeName === "bankai") label.textContent = "Crimson";
    else label.textContent = "Gruvbox Dark";
  }

  // Update statusline mode badge for crimson theme
  const modeEl = document.getElementById("status-mode-val");
  if (modeEl) {
    if (themeName === "bankai") {
      modeEl.textContent = "CRIMSON";
      modeEl.classList.add("mode-bankai");
    } else {
      if (modeEl.textContent === "CRIMSON") modeEl.textContent = "NORMAL";
      modeEl.classList.remove("mode-bankai");
    }
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

      <!-- Interactive Live Widget -->
      <div class="project-widget" id="widget-${proj.id}">
        <div class="widget-header">
          <span class="widget-header-title">⚡ Live Simulation</span>
          <button class="widget-btn widget-run-btn" data-widget-id="${proj.id}" data-running="false">
            ▶ Run
          </button>
        </div>
        <div class="widget-body" id="widget-body-${proj.id}">
          <div style="color: var(--fg-dim); text-align: center; padding: 1.5rem 0;">Press ▶ Run to start the simulation</div>
        </div>
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

  // Attach interactive widget handlers
  container.querySelectorAll(".widget-run-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const wid = btn.dataset.widgetId;
      const isRunning = btn.dataset.running === "true";
      if (isRunning) {
        stopWidget(wid, btn);
      } else {
        startWidget(wid, btn);
      }
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
const BUFFER_TABS = ["overview", "projects", "blogs", "skills", "competitive", "resume"];
let globalActivateBuffer = null;

function activateBuffer(targetId) {
  if (globalActivateBuffer) {
    globalActivateBuffer(targetId);
  }
}

function switchBufferNext() {
  const activeTab = document.querySelector(".buffer-tab.active");
  const current = activeTab ? activeTab.dataset.target : "overview";
  const idx = BUFFER_TABS.indexOf(current);
  const nextIdx = (idx + 1) % BUFFER_TABS.length;
  activateBuffer(BUFFER_TABS[nextIdx]);
  showToastNotification(`[gt] Switched buffer: ${BUFFER_TABS[nextIdx]}`);
}

function switchBufferPrev() {
  const activeTab = document.querySelector(".buffer-tab.active");
  const current = activeTab ? activeTab.dataset.target : "overview";
  const idx = BUFFER_TABS.indexOf(current);
  const prevIdx = (idx - 1 + BUFFER_TABS.length) % BUFFER_TABS.length;
  activateBuffer(BUFFER_TABS[prevIdx]);
  showToastNotification(`[gT] Switched buffer: ${BUFFER_TABS[prevIdx]}`);
}

function activateBufferByIndex(index1Based) {
  const idx = index1Based - 1;
  if (idx >= 0 && idx < BUFFER_TABS.length) {
    activateBuffer(BUFFER_TABS[idx]);
    showToastNotification(`[${index1Based}gt] Switched to buffer: ${BUFFER_TABS[idx]}`);
  }
}

function closeCurrentBuffer() {
  const windowFrame = document.querySelector(".window-frame");
  if (windowFrame && windowFrame.classList.contains("blog-view-active")) {
    activateBuffer("overview");
    showToastNotification(":bd — Unloaded architecture_blogs.md buffer");
  } else {
    showToastNotification(":bd — Already in main buffer (divyanshu.go)");
  }
}

function initBufferTabs() {
  const tabs = document.querySelectorAll(".buffer-tab");
  const dockItems = document.querySelectorAll(".dock-item");
  const windowFrame = document.querySelector(".window-frame");
  const blogBackBtn = document.getElementById("blog-back-btn");
  const openBlogTeaserBtn = document.getElementById("open-blog-buffer-btn");
  const statusFilename = document.getElementById("status-filename-val");
  const statusFiletype = document.getElementById("status-filetype-val");

  function activate(targetId) {
    tabs.forEach(t => t.classList.toggle("active", t.dataset.target === targetId));
    dockItems.forEach(d => d.classList.toggle("active", d.dataset.target === targetId));

    if (targetId === "resume") {
      openResumeModal();
      if (statusFilename) statusFilename.textContent = "resume.pdf";
      if (statusFiletype) statusFiletype.textContent = "PDF";
      return;
    }

    // Toggle dedicated blog view mode
    if (targetId === "blogs") {
      windowFrame.classList.add("blog-view-active");
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (statusFilename) statusFilename.textContent = "architecture_blogs.md";
      if (statusFiletype) statusFiletype.textContent = "Markdown";
      if (window.location.hash !== "#blogs") {
        history.replaceState(null, "", "#blogs");
      }
    } else {
      windowFrame.classList.remove("blog-view-active");
      if (statusFiletype) statusFiletype.textContent = "Go 1.24";
      if (window.location.hash === "#blogs") {
        history.replaceState(null, "", window.location.pathname);
      }
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }

  globalActivateBuffer = activate;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.target));
  });

  dockItems.forEach(item => {
    item.addEventListener("click", (e) => {
      e.preventDefault();
      activate(item.dataset.target);
    });
  });

  if (openBlogTeaserBtn) {
    openBlogTeaserBtn.addEventListener("click", () => activate("blogs"));
  }

  // Blog back button returns to overview
  if (blogBackBtn) {
    blogBackBtn.addEventListener("click", () => {
      activate("overview");
    });
  }

  // Handle direct hash navigation (#blogs)
  function checkHash() {
    const hash = window.location.hash.replace("#", "");
    if (hash === "blogs" || hash === "blog") {
      activate("blogs");
    }
  }
  window.addEventListener("hashchange", checkHash);
  if (window.location.hash) {
    checkHash();
  }
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

    const windowFrame = document.querySelector(".window-frame");
    if (windowFrame && windowFrame.classList.contains("blog-view-active")) {
      if (statusFilename) statusFilename.textContent = "architecture_blogs.md";
      return;
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
  { cmd: ":projects", desc: "Jump to production projects (projects.rs)", action: () => scrollToId("projects") },
  { cmd: ":blogs", desc: "Open dedicated architecture blogs buffer (architecture_blogs.md)", action: () => activateBuffer("blogs") },
  { cmd: ":skills", desc: "View categorized tech stack matrix (skills.json)", action: () => scrollToId("skills") },
  { cmd: ":cp", desc: "View Codeforces rating & algorithms info (competitive_programming.cpp)", action: () => scrollToId("competitive") },
  { cmd: ":resume", desc: "Open interactive printable resume viewer (resume.pdf)", action: () => openResumeModal() },
  { cmd: ":checkhealth", desc: "Run comprehensive diagnostic health check on tech stack", action: () => showCheckhealthModal() },
  { cmd: ":lazy", desc: "Inspect loaded Neovim plugins and startup profile", action: () => showLazyModal() },
  { cmd: ":smile", desc: "Random engineering fortune & ASCII art", action: () => showSmileModal() },
  { cmd: ":matrix", desc: "Trigger fullscreen digital rain terminal breach", action: () => startMatrixRain() },
  { cmd: ":zen", desc: "Toggle distraction-free Zen mode reading view", action: () => toggleZenMode() },
  { cmd: ":bd", desc: "Unload current buffer and return to main overview", action: () => closeCurrentBuffer() },
  { cmd: ":bn", desc: "Switch to next buffer tab [gt]", action: () => switchBufferNext() },
  { cmd: ":bp", desc: "Switch to previous buffer tab [gT]", action: () => switchBufferPrev() },
  { cmd: ":email", desc: "Copy Divyanshu's contact email to clipboard", action: () => copyEmailToClipboard() },
  { cmd: ":harpoon", desc: "📌 Harpoon buffer quick-jump (<leader>h)", action: () => openHarpoon() },
  { cmd: ":blame", desc: "⌥ Toggle Git blame virtual text annotations", action: () => toggleGitBlame() },
  { cmd: ":gitsigns", desc: "⌥ Toggle Git blame virtual text and diff signs", action: () => toggleGitBlame() },
  { cmd: ":shop", desc: "🏪 Portfolio extras & tools", action: () => showShopModal() },
  { cmd: ":theme gruvbox-dark", desc: "Switch to Gruvbox Dark Hard palette", action: () => setTheme("gruvbox-dark") },
  { cmd: ":theme gruvbox-light", desc: "Switch to Gruvbox Light palette", action: () => setTheme("gruvbox-light") },
  { cmd: ":theme neovim", desc: "Switch to Neovim TokyoNight Dark palette", action: () => setTheme("neovim-dark") },
  { cmd: ":theme crimson", desc: "🔴 Switch to Crimson Dark palette", action: () => activateBankai() },
  { cmd: ":crimson", desc: "🔴 Activate Crimson Dark theme", action: () => activateBankai() },
  { cmd: ":curl", desc: "Copy terminal curl command for resume.txt", action: () => copyCurlCommand() },
  { cmd: ":noh", desc: "Clear Vim search match highlights", action: () => clearVimSearch() },
  { cmd: ":so", desc: "Source init.lua runtime configuration", action: () => showToastNotification("[Neovim] Sourced init.lua successfully (0.42ms)") },
  { cmd: ":w", desc: "Save buffer state to local disk", action: () => showToastNotification("Portfolio state saved to localStorage [ok]") },
  { cmd: ":q", desc: "Quit editor", action: () => showToastNotification("E37: No write since last change! (Press Esc to close)") },
  { cmd: ":q!", desc: "Force quit buffer and dismiss all modals", action: () => { closeAllModals(); closeCommandPalette(); } },
  { cmd: ":wq", desc: "Write buffer and quit", action: () => { showToastNotification("Buffer written and synced. Have a great day! [ok]"); closeAllModals(); closeCommandPalette(); } },
  { cmd: ":github", desc: "Open GitHub profile (@Divyanshu-yadav-18)", action: () => window.open(PORTFOLIO_DATA.profile.github, "_blank") },
  { cmd: ":linkedin", desc: "Open LinkedIn profile (divyanshu-yadav)", action: () => window.open(PORTFOLIO_DATA.profile.linkedin, "_blank") },
  { cmd: ":help", desc: "Show complete Neovim portfolio user manual (:h)", action: () => showHelpModal() }
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
    if (!cmdStr) return;
    closePalette();

    const normalized = cmdStr.startsWith(":") ? cmdStr : ":" + cmdStr;
    const lower = normalized.toLowerCase();

    // Handle parameterized commands
    if (lower === ":b" || lower === ":buffers") {
      showToastNotification(`Active buffers: ${BUFFER_TABS.join(", ")}`);
      return;
    }

    if (lower.startsWith(":b ") || lower.startsWith(":buffer ")) {
      const arg = lower.replace(/^:(b|buffer)\s+/, "").trim();
      const num = parseInt(arg, 10);
      if (!isNaN(num)) {
        activateBufferByIndex(num);
        return;
      }
      const match = BUFFER_TABS.find(b => b.startsWith(arg));
      if (match) {
        activateBuffer(match);
        showToastNotification(`Switched to buffer: ${match}`);
        return;
      }
    }

    if (lower.startsWith(":theme ")) {
      const themeArg = lower.replace(/^:theme\s+/, "").trim();
      if (themeArg === "bankai" || themeArg === "crimson") {
        activateBankai();
        return;
      }
      if (["gruvbox-dark", "gruvbox-light", "neovim-dark", "neovim"].includes(themeArg)) {
        setTheme(themeArg === "neovim" ? "neovim-dark" : themeArg);
        return;
      }
    }

    if (lower === ":h" || lower === ":help") {
      showHelpModal();
      return;
    }

    if (lower === ":harpoon") {
      openHarpoon();
      return;
    }

    if (lower === ":blame" || lower === ":gitsigns" || lower === ":git") {
      toggleGitBlame();
      return;
    }

    if (lower === ":shop" || lower === ":toolbox") {
      showShopModal();
      return;
    }

    const exactMatch = VIM_COMMANDS.find(c => c.cmd.toLowerCase() === lower);
    if (exactMatch) {
      exactMatch.action();
    } else {
      showToastNotification(`Not an editor command: ${cmdStr}. Try :help`);
    }
  }
}

function updateNvimMode(mode) {
  const modeEl = document.getElementById("status-mode-val");
  if (modeEl) {
    modeEl.textContent = mode;
    modeEl.classList.remove("mode-insert", "mode-visual", "mode-command");
    if (mode === "INSERT") modeEl.classList.add("mode-insert");
    else if (mode === "VISUAL") modeEl.classList.add("mode-visual");
    else if (mode === "COMMAND") modeEl.classList.add("mode-command");
  }
}

function initStatuslineModeToggle() {
  const modeEl = document.getElementById("status-mode-val");
  if (!modeEl) return;

  const modes = ["NORMAL", "INSERT", "VISUAL", "COMMAND"];
  modeEl.addEventListener("click", () => {
    const current = modeEl.textContent.trim();
    const nextIdx = (modes.indexOf(current) + 1) % modes.length;
    const nextMode = modes[nextIdx];
    if (nextMode === "COMMAND") {
      const trigger = document.getElementById("open-cmd-btn");
      if (trigger) trigger.click();
    } else {
      updateNvimMode(nextMode);
      if (nextMode === "INSERT") {
        showToastNotification("-- INSERT -- (Press <Esc> to return to NORMAL mode)");
      } else if (nextMode === "VISUAL") {
        showToastNotification("-- VISUAL LINE -- (Press <Esc> to return to NORMAL mode)");
      } else {
        showToastNotification("-- NORMAL --");
      }
    }
  });
}

function closeCommandPalette() {
  const overlay = document.getElementById("cmd-palette-overlay");
  if (overlay) overlay.classList.remove("open");
  updateNvimMode("NORMAL");
}

function scrollToId(id) {
  const windowFrame = document.querySelector(".window-frame");
  if (windowFrame && windowFrame.classList.contains("blog-view-active")) {
    activateBuffer("overview");
  }
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

function activateBlogView() {
  activateBuffer("blogs");
}

function toggleZenMode() {
  document.body.classList.toggle("zen-mode");
  const isZen = document.body.classList.contains("zen-mode");
  showToastNotification(isZen ? "[Zen] Distraction-free mode enabled (:zen to exit)" : "[Zen] Standard mode restored");
}

/* --- Keyboard Shortcuts (Vim Style) --- */
function initKeyboardNav() {
  let lastKey = "";
  let lastKeyTime = 0;

  window.addEventListener("keydown", (e) => {
    // If typing in an input or textarea, only handle Escape
    if (["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
      if (e.key === "Escape") {
        document.activeElement.blur();
        closeAllModals();
        closeCommandPalette();
        closeVimSearch();
      }
      return;
    }

    const now = Date.now();
    const isRapid = (now - lastKeyTime) < 500;

    // Harpoon numeric jump when Harpoon modal is open
    const harpoonModal = document.getElementById("harpoon-modal");
    if (harpoonModal && harpoonModal.classList.contains("open")) {
      if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        e.preventDefault();
        jumpHarpoon(parseInt(e.key, 10));
        return;
      }
    }

    // Leader key: Space
    if (e.key === " ") {
      e.preventDefault();
      lastKey = "leader";
      lastKeyTime = now;
      showToastNotification("[<leader>] (h: Harpoon · b: Blame)");
      return;
    }

    if (lastKey === "leader" && isRapid) {
      if (e.key === "h" || e.key === "a") {
        e.preventDefault();
        openHarpoon();
        lastKey = "";
        return;
      }
      if (e.key === "b") {
        e.preventDefault();
        toggleGitBlame();
        lastKey = "";
        return;
      }
    }

    if (e.key === ":") {
      e.preventDefault();
      const trigger = document.getElementById("open-cmd-btn");
      if (trigger) trigger.click();
      return;
    }

    if (e.key === "/") {
      e.preventDefault();
      openVimSearch();
      return;
    }

    if (e.key === "Escape") {
      closeAllModals();
      closeCommandPalette();
      closeVimSearch();
      stopMatrixRain();
      updateNvimMode("NORMAL");
      return;
    }

    // Two-key motions: gg, zz, yy, gt, gT
    if (e.key === "g") {
      if (lastKey === "g" && isRapid) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        showToastNotification("[gg] Jumped to buffer top");
        lastKey = "";
        return;
      }
      lastKey = "g";
      lastKeyTime = now;
      return;
    }

    if (e.key === "t" && lastKey === "g" && isRapid) {
      e.preventDefault();
      switchBufferNext();
      lastKey = "";
      return;
    }

    if (e.key === "T" && lastKey === "g" && isRapid) {
      e.preventDefault();
      switchBufferPrev();
      lastKey = "";
      return;
    }

    if (e.key === "z") {
      if (lastKey === "z" && isRapid) {
        showToastNotification("[zz] Screen centered");
        lastKey = "";
        return;
      }
      lastKey = "z";
      lastKeyTime = now;
      return;
    }

    if (e.key === "y") {
      if (lastKey === "y" && isRapid) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showToastNotification("[yy] Yanked 1 line (URL) into * register");
        });
        lastKey = "";
        return;
      }
      lastKey = "y";
      lastKeyTime = now;
      return;
    }

    // Direct buffer numbers 1gt to 6gt
    if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
      lastKey = e.key;
      lastKeyTime = now;
      return;
    }
    if (e.key === "g" && ["1", "2", "3", "4", "5", "6"].includes(lastKey) && isRapid) {
      // User pressed 1g, wait for t
      lastKey = lastKey + "g";
      lastKeyTime = now;
      return;
    }
    if (e.key === "t" && lastKey.length === 2 && lastKey.endsWith("g") && isRapid) {
      const num = parseInt(lastKey[0], 10);
      activateBufferByIndex(num);
      lastKey = "";
      return;
    }

    // Single key Vim motions
    if (e.key === "j") {
      window.scrollBy({ top: 120, behavior: "smooth" });
    } else if (e.key === "k") {
      window.scrollBy({ top: -120, behavior: "smooth" });
    } else if (e.key === "G" && e.shiftKey) {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      showToastNotification("[G] Jumped to buffer bottom");
    } else if (e.ctrlKey && e.key === "d") {
      e.preventDefault();
      window.scrollBy({ top: window.innerHeight * 0.5, behavior: "smooth" });
    } else if (e.ctrlKey && e.key === "u") {
      e.preventDefault();
      window.scrollBy({ top: -window.innerHeight * 0.5, behavior: "smooth" });
    } else if (e.key === "u" && !e.ctrlKey) {
      showToastNotification("[u] Already at oldest change");
    } else if (e.ctrlKey && e.key === "r") {
      e.preventDefault();
      showToastNotification("[<C-r>] Already at newest change");
    } else if (e.key === "i" && !e.ctrlKey) {
      updateNvimMode("INSERT");
      showToastNotification("-- INSERT -- (Press <Esc> to return to NORMAL mode)");
    } else if ((e.key === "v" || e.key === "V") && !e.ctrlKey) {
      updateNvimMode("VISUAL");
      showToastNotification("-- VISUAL LINE -- (Press <Esc> to return to NORMAL mode)");
    } else if (e.key === "n" && !e.ctrlKey) {
      navigateVimSearch(1);
    } else if (e.key === "N") {
      navigateVimSearch(-1);
    } else {
      lastKey = "";
    }
  });
}

/* --- Vim In-Page Search Feature (/) --- */
let searchMatches = [];
let searchCurrentIndex = -1;

function initVimSearch() {
  const bar = document.getElementById("vim-search-bar");
  const input = document.getElementById("vim-search-input");
  const prevBtn = document.getElementById("vim-search-prev-btn");
  const nextBtn = document.getElementById("vim-search-next-btn");
  const closeBtn = document.getElementById("vim-search-close-btn");

  if (!bar || !input) return;

  input.addEventListener("input", () => {
    executeVimSearch(input.value.trim());
  });

  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        navigateVimSearch(-1);
      } else {
        navigateVimSearch(1);
      }
    } else if (e.key === "Escape") {
      closeVimSearch();
    }
  });

  if (prevBtn) prevBtn.addEventListener("click", () => navigateVimSearch(-1));
  if (nextBtn) nextBtn.addEventListener("click", () => navigateVimSearch(1));
  if (closeBtn) closeBtn.addEventListener("click", closeVimSearch);
}

function openVimSearch() {
  const bar = document.getElementById("vim-search-bar");
  const input = document.getElementById("vim-search-input");
  if (bar && input) {
    bar.style.display = "flex";
    input.value = "";
    input.focus();
    updateNvimMode("COMMAND");
  }
}

function closeVimSearch() {
  const bar = document.getElementById("vim-search-bar");
  if (bar) bar.style.display = "none";
  clearVimSearch();
  updateNvimMode("NORMAL");
}

function clearVimSearch() {
  document.querySelectorAll("mark.vim-search-hl").forEach(mark => {
    const parent = mark.parentNode;
    if (parent) {
      parent.replaceChild(document.createTextNode(mark.textContent), mark);
      parent.normalize();
    }
  });
  searchMatches = [];
  searchCurrentIndex = -1;
  const countEl = document.getElementById("vim-search-count");
  if (countEl) countEl.textContent = "0/0";
}

function executeVimSearch(query) {
  clearVimSearch();
  if (!query || query.length < 2) return;

  const root = document.querySelector(".window-frame");
  if (!root) return;

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (node) => {
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      const tag = parent.tagName.toUpperCase();
      if (["SCRIPT", "STYLE", "MARK", "BUTTON", "INPUT"].includes(tag)) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  const textNodes = [];
  let currentNode;
  while ((currentNode = walker.nextNode())) {
    textNodes.push(currentNode);
  }

  const cleanQuery = query.toLowerCase();
  textNodes.forEach(node => {
    const text = node.textContent;
    const lower = text.toLowerCase();
    const idx = lower.indexOf(cleanQuery);
    if (idx !== -1) {
      const before = text.substring(0, idx);
      const match = text.substring(idx, idx + query.length);
      const after = text.substring(idx + query.length);

      const mark = document.createElement("mark");
      mark.className = "vim-search-hl";
      mark.textContent = match;

      const frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));
      frag.appendChild(mark);
      if (after) frag.appendChild(document.createTextNode(after));

      if (node.parentNode) {
        node.parentNode.replaceChild(frag, node);
        searchMatches.push(mark);
      }
    }
  });

  const countEl = document.getElementById("vim-search-count");
  if (countEl) {
    countEl.textContent = searchMatches.length > 0 ? `1/${searchMatches.length}` : "0/0";
  }

  if (searchMatches.length > 0) {
    searchCurrentIndex = 0;
    highlightActiveMatch();
  }
}

function navigateVimSearch(direction) {
  if (searchMatches.length === 0) return;
  searchCurrentIndex = (searchCurrentIndex + direction + searchMatches.length) % searchMatches.length;
  highlightActiveMatch();
}

function highlightActiveMatch() {
  searchMatches.forEach((m, i) => {
    m.classList.toggle("vim-search-hl-active", i === searchCurrentIndex);
  });

  const active = searchMatches[searchCurrentIndex];
  if (active) {
    active.scrollIntoView({ behavior: "smooth", block: "center" });
    const countEl = document.getElementById("vim-search-count");
    if (countEl) {
      countEl.textContent = `${searchCurrentIndex + 1}/${searchMatches.length}`;
    }
  }
}

/* --- Neovim Floating Window Modal System --- */
function initNvimFloatingWindow() {
  const closeBtn = document.getElementById("nvim-float-close-btn");
  const modal = document.getElementById("nvim-float-modal");

  if (closeBtn) closeBtn.addEventListener("click", closeAllModals);
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeAllModals();
    });
  }
}

function openNvimFloat(title, filename, contentHtml) {
  const modal = document.getElementById("nvim-float-modal");
  const titleEl = document.getElementById("nvim-float-title");
  const fileEl = document.getElementById("nvim-float-file");
  const bodyEl = document.getElementById("nvim-float-body");

  if (!modal) return;

  if (titleEl) titleEl.textContent = title;
  if (fileEl) fileEl.textContent = filename;
  if (bodyEl) bodyEl.innerHTML = contentHtml;

  modal.classList.add("open");
  document.body.style.overflow = "hidden";
}

function showCheckhealthModal() {
  const html = `
<div style="font-family: var(--font-mono); line-height: 1.6;">
  <div style="color: var(--yellow); font-weight: 700; margin-bottom: 0.5rem; border-bottom: 1px dashed var(--border); padding-bottom: 0.35rem;">
    ==============================================================================
    <span style="color: var(--fg-bright);">health#divyanshu#systems</span>
  </div>
  <div style="margin-left: 0.5rem; margin-bottom: 1.25rem;">
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Go Runtime</strong>: go1.24.0 linux/amd64 (Goroutines, atomic CAS, race-detector clean)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Databases</strong>: PostgreSQL 16 (pgvector, ACID transactions, connection pool)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>In-Memory Cache</strong>: Redis 7.2 (Lua script token-bucket rate limiters &amp; cluster pub/sub)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Vector Index</strong>: Custom Go HNSW (sub-millisecond cosine similarity semantic search)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Job Scheduling</strong>: DAG dependency graph engine with worker heartbeat failover</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Video Transcode</strong>: FFmpeg multi-bitrate HLS adaptive live stream pipelines</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Competitive Programming</strong>: Codeforces Specialist (Rating 1584 · Handle: Sh0ckwave · 500+ solved)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Education</strong>: IIIT Bhubaneswar (B.Tech CSE '27 · CGPA 7.9/10)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Profile</strong>: Divyanshu Yadav (Backend & Systems Engineer)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Status</strong>: Available for backend & systems engineering roles</div>
  </div>

  <div style="color: var(--yellow); font-weight: 700; margin-bottom: 0.5rem; border-bottom: 1px dashed var(--border); padding-bottom: 0.35rem;">
    ==============================================================================
    <span style="color: var(--fg-bright);">health#neovim#editor</span>
  </div>
  <div style="margin-left: 0.5rem; margin-bottom: 1rem;">
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Editor</strong>: Neovim v0.10.4 (LuaJIT 2.1)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Color Scheme</strong>: Gruvbox Dark Hard / TokyoNight Dark</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Buffers</strong>: 6 loaded (divyanshu.go, projects.rs, architecture_blogs.md, skills.json, competitive_programming.cpp, resume.pdf)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Search Engine</strong>: Substring &amp; pattern search active (/)</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Vim Keymaps</strong>: j/k nav, gg/G top-bottom, zz center, yy yank, gt/gT tabs, u undo</div>
    <div><span style="color: var(--green); font-weight: 700;">● OK</span> <strong>Statusline</strong>: Mode, Git branch, UTF-8, line:col live tracking active</div>
  </div>
  <div style="color: var(--fg-dim); font-size: 0.75rem; margin-top: 1rem;">
    Press &lt;Esc&gt; or type :q to close this buffer.
  </div>
</div>`;
  openNvimFloat("nvim://checkhealth", "checkhealth.txt", html);
}

function showLazyModal() {
  const html = `
<div style="font-family: var(--font-mono); line-height: 1.6;">
  <div style="background: var(--bg-surface); border: 1px solid var(--border); padding: 0.75rem 1rem; border-radius: 4px; margin-bottom: 1rem; display: flex; justify-content: space-between; align-items: center;">
    <span style="font-weight: 700; color: var(--yellow);">💤 lazy.nvim</span>
    <span style="color: var(--green); font-size: 0.78rem;">● 6 loaded / 0 failed [8.4ms startup]</span>
  </div>
  <div style="display: flex; flex-direction: column; gap: 0.6rem;">
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem;">
      <span style="color: var(--orange); font-weight: 600;">● harpoon</span>
      <span style="color: var(--fg-muted); font-size: 0.78rem;">Lightning buffer navigation &amp; quick marks</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem;">
      <span style="color: var(--aqua); font-weight: 600;">● lualine.nvim</span>
      <span style="color: var(--fg-muted); font-size: 0.78rem;">Clean Neovim bottom statusline with git integration</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem;">
      <span style="color: var(--yellow); font-weight: 600;">● gruvbox.nvim</span>
      <span style="color: var(--fg-muted); font-size: 0.78rem;">Warm retro terminal colors for maximum focus</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem;">
      <span style="color: var(--purple); font-weight: 600;">● gitsigns.nvim</span>
      <span style="color: var(--fg-muted); font-size: 0.78rem;">Git branch status &amp; atomic commit tracking</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem;">
      <span style="color: var(--red); font-weight: 600;">● crimson-dark.nvim</span>
      <span style="color: var(--fg-muted); font-size: 0.78rem;">Crimson dark warm terminal color scheme</span>
    </div>
    <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border); padding-bottom: 0.4rem;">
      <span style="color: var(--blue); font-weight: 600;">● zen-mode.nvim</span>
      <span style="color: var(--fg-muted); font-size: 0.78rem;">Distraction-free reading environment</span>
    </div>
  </div>
  <div style="color: var(--fg-dim); font-size: 0.75rem; margin-top: 1rem;">
    Press &lt;Esc&gt; or type :q to close.
  </div>
</div>`;
  openNvimFloat("nvim://lazy", "lazy.lua", html);
}

function showHelpModal() {
  const html = `
<div style="font-family: var(--font-mono); line-height: 1.6;">
  <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--yellow); padding-bottom: 0.4rem; margin-bottom: 1rem;">
    <span style="color: var(--yellow); font-weight: 700;">*help.txt*   NEOVIM PORTFOLIO USER MANUAL</span>
    <span style="color: var(--fg-muted);">Divyanshu Yadav v2.4</span>
  </div>

  <h3 style="color: var(--orange); margin-top: 1rem; margin-bottom: 0.4rem;">1. BUFFER MANAGEMENT &amp; NAVIGATION</h3>
  <pre style="background: var(--bg-surface); padding: 0.75rem; border-radius: 4px; border: 1px solid var(--border); font-size: 0.78rem; overflow-x: auto;">
:projects         Jump to production engineering projects (projects.rs)
:blogs            Open dedicated architecture blogs reader (architecture_blogs.md)
:skills           Inspect categorized tech stack (skills.json)
:cp               View competitive programming rating &amp; CS fundamentals
:resume           Open interactive printable resume viewer (resume.pdf)
:harpoon          ThePrimeagen Harpoon buffer quick-jump (&lt;leader&gt;h)
:bd, :bdelete     Unload blog buffer and return to main overview
:bn, :bnext       Switch to next buffer tab [gt]
:bp, :bprev       Switch to previous buffer tab [gT]
:b &lt;target&gt;       Directly jump to buffer by name (e.g. :b projects, :b blogs, :b 1..6)
  </pre>

  <h3 style="color: var(--orange); margin-top: 1rem; margin-bottom: 0.4rem;">2. VIM MOTIONS &amp; KEYMAPS</h3>
  <pre style="background: var(--bg-surface); padding: 0.75rem; border-radius: 4px; border: 1px solid var(--border); font-size: 0.78rem; overflow-x: auto;">
:                 Open command palette
/                 Open Neovim search bar (highlight matches, n/N to navigate)
j / k             Scroll buffer down / up by 120px
Ctrl-d / Ctrl-u   Half-page scroll down / up
gg / G            Jump to top of buffer / bottom of buffer
zz                Center view on current position
yy                Yank portfolio URL into clipboard register
gt / gT           Cycle to next / previous buffer tab
1gt ... 6gt       Jump directly to buffer tab 1 - 6
u / Ctrl-r        Undo / Redo easter eggs
i / v / Esc       Switch into INSERT / VISUAL / NORMAL mode
  </pre>

  <h3 style="color: var(--orange); margin-top: 1rem; margin-bottom: 0.4rem;">3. PLAYFUL EASTER EGGS</h3>
  <pre style="background: var(--bg-surface); padding: 0.75rem; border-radius: 4px; border: 1px solid var(--border); font-size: 0.78rem; overflow-x: auto;">
:checkhealth      Run complete diagnostic health check on engineering stack
:lazy             Inspect installed Neovim plugins and startup times
:smile            Random engineering fortune &amp; ASCII art
:matrix, :hack    Activate full-screen falling digital terminal matrix
:zen              Toggle distraction-free Zen mode
:theme &lt;name&gt;     Switch themes (gruvbox-dark, gruvbox-light, neovim)
:email            Copy contact email (divyanshu13521984@gmail.com)
:w, :q, :q!       Vim buffer management simulation
  </pre>
  <div style="color: var(--fg-dim); font-size: 0.75rem; margin-top: 1rem;">
    Press &lt;Esc&gt; or type :q to close.
  </div>
</div>`;
  openNvimFloat("nvim://help", "help.txt", html);
}

function showSmileModal() {
  const html = `
<div style="font-family: var(--font-mono); text-align: center; padding: 1.5rem 1rem;">
  <pre style="color: var(--green); font-size: 0.95rem; line-height: 1.3; display: inline-block; text-align: left;">
       .---.
      /_____\\       🖥️  DIVYANSHU YADAV
     ( ^ _ ^ )      "Backend & Systems Engineer"
     /|  ☕  |\\
    / |_____| \\
      |     |
  </pre>
  <blockquote style="margin-top: 1.5rem; font-style: italic; color: var(--yellow); font-size: 1.05rem; border: none; padding: 0; line-height: 1.6;">
    "Build systems that don't fail under pressure.<br>
    Test what you ship. Ship what you test. And always have coffee ready."
  </blockquote>
  <div style="margin-top: 1rem; color: var(--fg-muted); font-size: 0.8rem;">
    — Dedicated to high-throughput concurrency & reliable backends
  </div>
  <div style="color: var(--fg-dim); font-size: 0.75rem; margin-top: 1.5rem;">
    Press &lt;Esc&gt; or type :q to dismiss.
  </div>
</div>`;
  openNvimFloat("nvim://smile", "smile.txt", html);
}

/* --- Digital Matrix Terminal Rain (:hack / :matrix) --- */
let matrixAnimationId = null;
let matrixTimeoutId = null;

function initMatrixEffect() {
  const overlay = document.getElementById("matrix-overlay");
  if (overlay) {
    overlay.addEventListener("click", stopMatrixRain);
  }
}

function startMatrixRain() {
  const overlay = document.getElementById("matrix-overlay");
  const canvas = document.getElementById("matrix-canvas");
  if (!overlay || !canvas) return;

  overlay.style.display = "flex";
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const characters = "0123456789ABCDEFｦｱｳｴｵｶｷｹｺｻｼｽｾｿﾀﾂﾃﾅﾆﾇﾈﾊﾋﾎﾏﾐﾑﾒﾓﾔﾕﾗﾘﾜGOPOSTGRESQLREDISDOCKER";
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);

  showToastNotification("[matrix] System breach active! Press <Esc> to exit");

  function draw() {
    ctx.fillStyle = "rgba(10, 15, 10, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#b8bb26"; // Gruvbox green
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = characters.charAt(Math.floor(Math.random() * characters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
    matrixAnimationId = requestAnimationFrame(draw);
  }

  cancelAnimationFrame(matrixAnimationId);
  draw();

  clearTimeout(matrixTimeoutId);
  matrixTimeoutId = setTimeout(() => {
    stopMatrixRain();
  }, 7000);
}

function stopMatrixRain() {
  const overlay = document.getElementById("matrix-overlay");
  if (overlay) overlay.style.display = "none";
  cancelAnimationFrame(matrixAnimationId);
  clearTimeout(matrixTimeoutId);
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
  stopMatrixRain();
  closeVimSearch();
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

  // Curl resume snippet copy
  const curlCopyBtn = document.getElementById("curl-copy-btn");
  if (curlCopyBtn) {
    curlCopyBtn.addEventListener("click", () => {
      copyCurlCommand();
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

/* ==========================================================================
   CRIMSON THEME ACTIVATION
   ========================================================================== */
function activateBankai() {
  // Flash animation
  const flash = document.createElement("div");
  flash.className = "bankai-flash";
  document.body.appendChild(flash);
  setTimeout(() => flash.remove(), 1300);

  // Set theme with delay for dramatic effect
  setTimeout(() => {
    setTheme("bankai", false);
    showToastNotification("🔴 Crimson Dark theme activated.");
  }, 400);
}

/* ==========================================================================
   CURL COMMAND COPY
   ========================================================================== */
function copyCurlCommand() {
  const cmd = "curl -sL https://divyanshu-yadav.dev/resume.txt | less";
  navigator.clipboard.writeText(cmd).then(() => {
    showToastNotification("$ Copied curl command to clipboard!");
  }).catch(() => {
    showToastNotification(`$ ${cmd}`);
  });
}

/* ==========================================================================
   INTERACTIVE PROJECT WIDGET SIMULATIONS
   ========================================================================== */
const widgetIntervals = {};

function startWidget(widgetId, btn) {
  btn.dataset.running = "true";
  btn.textContent = "■ Stop";
  btn.classList.add("active");

  if (widgetId === "llm-relay") {
    startLLMRelayWidget();
  } else if (widgetId === "distributed-job-queue") {
    startJobQueueWidget();
  } else if (widgetId === "stream-sync") {
    startStreamSyncWidget();
  }
}

function stopWidget(widgetId, btn) {
  btn.dataset.running = "false";
  btn.textContent = "▶ Run";
  btn.classList.remove("active");

  if (widgetIntervals[widgetId]) {
    clearInterval(widgetIntervals[widgetId]);
    delete widgetIntervals[widgetId];
  }
}

/* --- LLM Relay: Live Request Log Simulator --- */
function startLLMRelayWidget() {
  const body = document.getElementById("widget-body-llm-relay");
  if (!body) return;

  let reqCount = 0;
  let cacheHits = 0;
  let totalLatency = 0;

  const prompts = [
    "What is the capital of France?",
    "Explain quantum computing",
    "Tell me the capital of France",
    "How does photosynthesis work?",
    "Summarize the French Revolution",
    "What is machine learning?",
    "Define quantum computing briefly",
    "How do neural networks learn?",
    "Explain photosynthesis process",
    "What is Go programming language?",
  ];

  const providers = ["OpenAI", "Anthropic", "Gemini"];

  body.innerHTML = `
    <div class="widget-log" id="relay-log"></div>
    <div class="widget-stats-bar">
      <div class="widget-stat">Requests: <span class="widget-stat-val" id="relay-req-count">0</span></div>
      <div class="widget-stat">Cache Hit: <span class="widget-stat-val" id="relay-hit-rate">0%</span></div>
      <div class="widget-stat">Avg Latency: <span class="widget-stat-val" id="relay-avg-latency">0ms</span></div>
    </div>
  `;

  const log = document.getElementById("relay-log");

  function addLogEntry() {
    reqCount++;
    const prompt = prompts[Math.floor(Math.random() * prompts.length)];
    const isCacheHit = Math.random() < 0.35;
    const isRateLimit = !isCacheHit && Math.random() < 0.08;
    const isFallback = !isCacheHit && !isRateLimit && Math.random() < 0.1;
    const provider = providers[Math.floor(Math.random() * providers.length)];

    let badge, badgeClass, latency, detail;

    if (isCacheHit) {
      cacheHits++;
      latency = (Math.random() * 0.8 + 0.1).toFixed(1);
      badge = "CACHE HIT";
      badgeClass = "hit";
      detail = `HNSW cos=0.${Math.floor(Math.random() * 8 + 92)} → "${prompt.substring(0, 30)}..."`;
    } else if (isRateLimit) {
      latency = 0;
      badge = "RATE LIMIT";
      badgeClass = "rate-limit";
      detail = `tenant-${Math.floor(Math.random() * 5 + 1)} exceeded 120 req/min bucket`;
    } else if (isFallback) {
      latency = Math.floor(Math.random() * 400 + 600);
      badge = "FALLBACK";
      badgeClass = "fallback";
      detail = `${providers[0]} timeout → routed to ${providers[1]}`;
    } else {
      latency = Math.floor(Math.random() * 800 + 200);
      badge = `SSE ${provider}`;
      badgeClass = "stream";
      detail = `"${prompt.substring(0, 35)}..." → ${Math.floor(Math.random() * 300 + 100)} tokens`;
    }

    totalLatency += parseFloat(latency);
    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour12: false });

    const line = document.createElement("div");
    line.className = "widget-log-line";
    line.innerHTML = `
      <span class="log-time">${timeStr}</span>
      <span class="log-badge ${badgeClass}">${badge}</span>
      <span class="log-text">${detail}</span>
      <span class="log-time">${latency}ms</span>
    `;

    log.insertBefore(line, log.firstChild);
    if (log.children.length > 12) log.removeChild(log.lastChild);

    // Update stats
    document.getElementById("relay-req-count").textContent = reqCount;
    const hitRate = Math.round((cacheHits / reqCount) * 100);
    const hitEl = document.getElementById("relay-hit-rate");
    hitEl.textContent = hitRate + "%";
    hitEl.className = `widget-stat-val ${hitRate > 25 ? "" : "warn"}`;

    const avgLatency = Math.round(totalLatency / reqCount);
    const latEl = document.getElementById("relay-avg-latency");
    latEl.textContent = avgLatency + "ms";
    latEl.className = `widget-stat-val ${avgLatency < 300 ? "" : avgLatency < 600 ? "warn" : "danger"}`;
  }

  addLogEntry();
  widgetIntervals["llm-relay"] = setInterval(addLogEntry, 1800);
}

/* --- Job Queue: DAG State Machine Simulator --- */
function startJobQueueWidget() {
  const body = document.getElementById("widget-body-distributed-job-queue");
  if (!body) return;

  const jobs = [
    { id: "A", name: "Video Ingest", deps: [], status: "queued" },
    { id: "B", name: "Audio Normalize", deps: [], status: "queued" },
    { id: "C", name: "Transcode 1080p", deps: ["A"], status: "pending" },
    { id: "D", name: "Transcode 720p", deps: ["A"], status: "pending" },
    { id: "E", name: "Merge & Package", deps: ["C", "D", "B"], status: "pending" },
  ];

  function renderJobs() {
    body.innerHTML = `
      <div class="job-pipeline">
        ${jobs.map(job => `
          <div class="job-node">
            <div class="job-icon ${job.status}"></div>
            <span class="job-name">${job.name}</span>
            <span class="job-status ${job.status}">${job.status}</span>
            ${job.deps.length ? `<span style="color:var(--fg-dim);font-size:0.65rem;">← ${job.deps.join(", ")}</span>` : ""}
          </div>
        `).join("")}
      </div>
      <div class="widget-stats-bar">
        <div class="widget-stat">Workers: <span class="widget-stat-val">3 active</span></div>
        <div class="widget-stat">Heartbeat: <span class="widget-stat-val">5s TTL</span></div>
      </div>
    `;
  }

  renderJobs();

  let step = 0;
  const transitions = [
    () => { jobs[0].status = "running"; jobs[1].status = "running"; },
    () => { jobs[1].status = "done"; },
    () => { jobs[0].status = "done"; jobs[2].status = "queued"; jobs[3].status = "queued"; },
    () => { jobs[2].status = "running"; jobs[3].status = "running"; },
    () => { jobs[3].status = "done"; },
    () => { jobs[2].status = "done"; jobs[4].status = "queued"; },
    () => { jobs[4].status = "running"; },
    () => { jobs[4].status = "done"; showToastNotification("[DAG] Pipeline complete — all 5 tasks succeeded"); },
    () => {
      // Reset cycle
      jobs.forEach(j => { j.status = j.deps.length ? "pending" : "queued"; });
      step = -1;
    },
  ];

  widgetIntervals["distributed-job-queue"] = setInterval(() => {
    if (step < transitions.length) {
      transitions[step]();
      step++;
      renderJobs();
    }
  }, 1500);
}

/* --- StreamSync: Playback Sync Visualizer --- */
function startStreamSyncWidget() {
  const body = document.getElementById("widget-body-stream-sync");
  if (!body) return;

  const clients = [
    { label: "Host", cls: "host", progress: 0, drift: 0 },
    { label: "Client 1", cls: "client-1", progress: 0, drift: 0 },
    { label: "Client 2", cls: "client-2", progress: 0, drift: 0 },
    { label: "Client 3", cls: "client-3", progress: 0, drift: 0 },
  ];

  const totalDuration = 180; // 3 minutes simulated
  let elapsed = 0;

  function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  }

  function renderSync() {
    const maxDrift = Math.max(...clients.slice(1).map(c => Math.abs(c.drift)));

    body.innerHTML = `
      <div class="sync-display">
        ${clients.map(c => `
          <div class="sync-client-row">
            <span class="sync-client-label">${c.label}</span>
            <div class="sync-progress-track">
              <div class="sync-progress-fill ${c.cls}" style="width: ${c.progress}%"></div>
            </div>
            <span class="sync-time-label">${formatTime((c.progress / 100) * totalDuration)}</span>
          </div>
        `).join("")}
      </div>
      <div class="sync-drift-bar">
        <div class="widget-stat">Max Drift: <span class="drift-val ${maxDrift < 30 ? 'good' : 'warn'}">${maxDrift}ms</span></div>
        <div class="widget-stat">Bitrate: <span class="widget-stat-val">1080p adaptive</span></div>
        <div class="widget-stat">Clients: <span class="widget-stat-val">4 synced</span></div>
      </div>
    `;
  }

  renderSync();

  widgetIntervals["stream-sync"] = setInterval(() => {
    elapsed += 1;
    const hostProgress = Math.min(100, (elapsed / totalDuration) * 100);
    clients[0].progress = hostProgress;
    clients[0].drift = 0;

    // Other clients track host with slight jitter drift
    for (let i = 1; i < clients.length; i++) {
      const jitter = (Math.random() - 0.5) * 0.8;
      clients[i].progress = Math.max(0, Math.min(100, hostProgress + jitter));
      clients[i].drift = Math.abs(Math.round(jitter * 40));

      // Simulate occasional late-joiner catch-up burst
      if (elapsed === 5 && i === 2) {
        clients[i].progress = hostProgress - 3;
        clients[i].drift = 120;
      }
      if (elapsed === 6 && i === 2) {
        clients[i].drift = 45;
      }
      if (elapsed === 7 && i === 2) {
        clients[i].drift = 12;
      }
    }

    if (elapsed >= totalDuration) {
      elapsed = 0;
      clients.forEach(c => { c.progress = 0; c.drift = 0; });
    }

    renderSync();
  }, 500);
}

/* ==========================================================================
   AVATAR EASTER EGG (Click avatar -> Crimson theme)
   ========================================================================== */
function initAvatarEasterEgg() {
  const avatarWrapper = document.getElementById("profile-avatar-wrapper");
  if (avatarWrapper) {
    avatarWrapper.addEventListener("click", () => {
      activateBankai();
    });
  }
}


/* ==========================================================================
   HARPOON QUICK-MENU (<leader>h / :harpoon)
   ========================================================================== */
const HARPOON_MARKS = [
  { num: 1, name: "divyanshu.go", desc: "Overview & Systems Engineering Hero", buffer: "overview" },
  { num: 2, name: "projects.rs", desc: "LLM Relay, Job Queue, StreamSync", buffer: "projects" },
  { num: 3, name: "architecture_blogs.md", desc: "Technical Articles & Deep-Dives", buffer: "blogs" },
  { num: 4, name: "skills.json", desc: "Go, Concurrency, Linux & Datastores", buffer: "skills" },
  { num: 5, name: "competitive_programming.cpp", desc: "Codeforces Specialist 1584", buffer: "competitive_programming.cpp" },
  { num: 6, name: "resume.txt", desc: "ASCII Plain-Text Terminal Resume", isResume: true },
];

function initHarpoon() {
  const closeBtn = document.getElementById("harpoon-close-btn");
  const modal = document.getElementById("harpoon-modal");

  if (closeBtn) closeBtn.addEventListener("click", () => modal.classList.remove("open"));

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) modal.classList.remove("open");
    });
  }

  const listEl = document.getElementById("harpoon-list");
  if (listEl) {
    listEl.innerHTML = HARPOON_MARKS.map(m => `
      <div class="harpoon-item" data-num="${m.num}">
        <span class="harpoon-key">[${m.num}]</span>
        <span style="font-weight: 600; color: var(--fg-bright);">${m.name}</span>
        <span style="color: var(--fg-dim); font-size: 0.72rem; margin-left: auto;">${m.desc}</span>
      </div>
    `).join("");

    listEl.querySelectorAll(".harpoon-item").forEach(item => {
      item.addEventListener("click", () => {
        jumpHarpoon(parseInt(item.dataset.num, 10));
      });
    });
  }
}

function openHarpoon() {
  const modal = document.getElementById("harpoon-modal");
  if (modal) {
    modal.classList.add("open");
    updateNvimMode("COMMAND");
  }
}

function jumpHarpoon(num) {
  const modal = document.getElementById("harpoon-modal");
  if (modal) modal.classList.remove("open");
  updateNvimMode("NORMAL");

  const mark = HARPOON_MARKS.find(m => m.num === num);
  if (!mark) return;

  if (mark.isResume) {
    openResumeModal();
  } else {
    activateBuffer(mark.buffer);
    if (mark.buffer === "skills") scrollToId("skills");
    else if (mark.buffer === "projects") scrollToId("projects");
    else if (mark.buffer === "competitive_programming.cpp") scrollToId("competitive");
  }
  showToastNotification(`[Harpoon] Jumped to mark [${num}] ${mark.name}`);
}


/* ==========================================================================
   GIT BLAME & GITSIGNS (:blame / :gitsigns)
   ========================================================================== */
let gitBlameActive = false;

function toggleGitBlame() {
  gitBlameActive = !gitBlameActive;

  const existingBlames = document.querySelectorAll(".git-blame-virtual");
  existingBlames.forEach(el => el.remove());

  if (gitBlameActive) {
    // Add virtual blame text to section headings
    const headings = [
      { id: "projects", text: "Divyanshu Yadav · 3 days ago · feat: HNSW vector semantic cache" },
      { id: "blogs", text: "Divyanshu Yadav · 5 days ago · feat: PostgreSQL CDC WAL streaming notes" },
      { id: "skills", text: "Divyanshu Yadav · 1 week ago · feat: systems concurrency stack" },
    ];

    headings.forEach(h => {
      const section = document.getElementById(h.id);
      if (section) {
        const titleEl = section.querySelector(".section-heading");
        if (titleEl) {
          const blameSpan = document.createElement("span");
          blameSpan.className = "git-blame-virtual";
          blameSpan.textContent = h.text;
          titleEl.appendChild(blameSpan);
        }
      }
    });

    showToastNotification("[gitsigns] Blame virtual text ON (commit 87ff4d1)");
  } else {
    showToastNotification("[gitsigns] Blame virtual text OFF");
  }
}

/* ==========================================================================
   PORTFOLIO TOOLBOX MODAL (:shop)
   ========================================================================== */
function showShopModal() {
  const html = `
<div style="font-family: var(--font-mono); line-height: 1.6;">
  <div style="color: var(--green); font-weight: 700; margin-bottom: 0.5rem; border-bottom: 1px dashed var(--border); padding-bottom: 0.35rem;">
    ==============================================================================
    <span style="color: var(--fg-bright);">toolbox // SYSTEMS & INFRASTRUCTURE</span>
  </div>
  <p style="color: var(--fg-muted); font-size: 0.8rem; margin-bottom: 1rem;">
    Core systems and tools I work with daily:
  </p>
  <div style="display: flex; flex-direction: column; gap: 0.85rem;">
    <div style="background: var(--bg-surface); border: 1px solid var(--border); padding: 0.6rem 0.85rem; border-radius: 4px;">
      <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--yellow);">
        <span>1. HNSW Vector Index</span>
        <span style="color: var(--aqua); font-size: 0.72rem;">Semantic Cache Engine</span>
      </div>
      <p style="color: var(--fg); font-size: 0.78rem; margin-top: 0.25rem;">
        Custom in-memory approximate nearest neighbor index in pure Go. Sub-millisecond cosine similarity lookups for semantic prompt deduplication.
      </p>
    </div>

    <div style="background: var(--bg-surface); border: 1px solid var(--border); padding: 0.6rem 0.85rem; border-radius: 4px;">
      <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--yellow);">
        <span>2. DAG Task Engine</span>
        <span style="color: var(--purple); font-size: 0.72rem;">Distributed Job Queue</span>
      </div>
      <p style="color: var(--fg); font-size: 0.78rem; margin-top: 0.25rem;">
        Fault-tolerant directed acyclic graph scheduler with heartbeat-based worker recovery, atomic Lua state machines, and dead-letter queues.
      </p>
    </div>

    <div style="background: var(--bg-surface); border: 1px solid var(--border); padding: 0.6rem 0.85rem; border-radius: 4px;">
      <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--yellow);">
        <span>3. Token-Bucket Rate Limiter</span>
        <span style="color: var(--green); font-size: 0.72rem;">Redis Lua Scripts</span>
      </div>
      <p style="color: var(--fg); font-size: 0.78rem; margin-top: 0.25rem;">
        Distributed per-tenant rate limiting via atomic Lua scripts in Redis, with PostgreSQL-backed transactional accounting.
      </p>
    </div>

    <div style="background: var(--bg-surface); border: 1px solid var(--border); padding: 0.6rem 0.85rem; border-radius: 4px;">
      <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--yellow);">
        <span>4. Circuit Breaker</span>
        <span style="color: var(--orange); font-size: 0.72rem;">Resilience Pattern</span>
      </div>
      <p style="color: var(--fg); font-size: 0.78rem; margin-top: 0.25rem;">
        Three-state circuit breaker (Closed/Open/Half-Open) with automated provider fallback chains and exponential backoff retries.
      </p>
    </div>

    <div style="background: var(--bg-surface); border: 1px solid var(--border); padding: 0.6rem 0.85rem; border-radius: 4px;">
      <div style="display: flex; justify-content: space-between; font-weight: 700; color: var(--yellow);">
        <span>5. HLS Transcode Pipeline</span>
        <span style="color: var(--blue); font-size: 0.72rem;">FFmpeg + Nginx</span>
      </div>
      <p style="color: var(--fg); font-size: 0.78rem; margin-top: 0.25rem;">
        Multi-bitrate adaptive streaming pipeline with FFmpeg transcoding, Nginx segment caching, and WebSocket clock synchronization.
      </p>
    </div>
  </div>

  <div style="margin-top: 1.25rem; text-align: center; display: flex; gap: 0.75rem; justify-content: center;">
    <button class="btn-primary" onclick="closeAllModals(); activateBankai();" style="background: #dc143c; border-color: #dc143c; color: #fff;">
      🔴 Activate Crimson Theme
    </button>
  </div>
</div>
  `;

  openNvimFloat("nvim://shop/extras", "portfolio_extras.nfo", html);
}
