(function () {
  const data = window.profileData;
  if (!data) return;

  const el = (id) => document.getElementById(id);

  const makeLink = (label, href, attrs) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    if (/^https?:/.test(href)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    if (attrs) Object.entries(attrs).forEach(([k, v]) => a.setAttribute(k, v));
    return a;
  };

  const announce = (msg) => {
    const live = el("announce");
    if (live) live.textContent = msg;
  };

  /* ── Sidebar: photo, name, contact links ────── */
  const ICONS = {
    location:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.6A2.6 2.6 0 1 1 12 6.4a2.6 2.6 0 0 1 0 5.2z"/></svg>',
    email:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm1 2.4V17h16V7.4l-8 5.6-8-5.6zM5.3 7l6.7 4.7L18.7 7H5.3z"/></svg>',
    github:
      '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"/></svg>',
    scholar:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 1 9l11 6 9-4.9V17h2V9L12 3zm-7 10.2V17c0 1.7 3.1 3 7 3s7-1.3 7-3v-3.8l-7 3.8-7-3.8z"/></svg>',
    linkedin:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0zM8 8h4.8v2.2h.1c.7-1.3 2.3-2.6 4.8-2.6 5.1 0 6.1 3.4 6.1 7.8V24h-5v-7.6c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V24H8z"/></svg>',
    cv:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l5 5v15H6V2zm7 1.5V8h4.5L13 3.5zM8 12h8v1.6H8V12zm0 3.6h8v1.6H8v-1.6zM8 8.4h3V10H8V8.4z"/></svg>',
  };

  const renderSidebar = () => {
    const { basics } = data;
    el("full-name").textContent = basics.name;

    const tagline = el("tagline");
    if (basics.tagline) tagline.textContent = basics.tagline;
    else tagline.remove();

    const list = el("profile-links");
    const addItem = (icon, label, href) => {
      const li = document.createElement("li");
      if (href) {
        const a = makeLink(label, href);
        a.insertAdjacentHTML("afterbegin", ICONS[icon]);
        if (icon === "cv") {
          a.target = "_blank";
          a.rel = "noopener";
        }
        li.appendChild(a);
      } else {
        li.insertAdjacentHTML("afterbegin", ICONS[icon]);
        li.appendChild(document.createTextNode(label));
      }
      list.appendChild(li);
    };
    if (basics.location) addItem("location", basics.location, null);
    if (basics.email) addItem("email", "Email", `mailto:${basics.email}`);
    if (basics.github) addItem("github", "GitHub", basics.github);
    if (basics.scholar) addItem("scholar", "Google Scholar", basics.scholar);
    if (basics.linkedin) addItem("linkedin", "LinkedIn", basics.linkedin);
    if (basics.cv) addItem("cv", "CV", basics.cv);

    const portrait = el("portrait");
    if (portrait) {
      const img = portrait.querySelector("img");
      if (basics.portrait && img) {
        img.addEventListener("error", () => portrait.remove());
        img.src = basics.portrait;
      } else {
        portrait.remove();
      }
    }
  };

  /* ── Bio ────────────────────────────────────── */
  const renderBio = () => {
    const bio = el("bio");
    (data.bio || []).forEach((paragraph) => {
      const p = document.createElement("p");
      p.innerHTML = paragraph;
      bio.appendChild(p);
    });
  };

  /* ── Interests (with [[id]] citations) ──────── */
  const renderInterests = () => {
    const list = el("interests-list");
    const items = data.interests || [];
    if (!items.length) {
      el("research").remove();
      list.closest(".interests").remove();
      return;
    }
    const index = new Map((data.publications || []).map((p, i) => [p.id, { n: i + 1, title: p.title }]));
    const cite = (_, ids) => {
      const links = ids
        .split(",")
        .map((s) => s.trim())
        .filter((id) => index.has(id))
        .map((id) => {
          const { n, title } = index.get(id);
          return `<a href="#${id}" title="${title.replace(/"/g, "&quot;")}">${n}</a>`;
        });
      return links.length ? `<span class="ref">[${links.join(",&nbsp;")}]</span>` : "";
    };
    items.forEach((html) => {
      const li = document.createElement("li");
      li.innerHTML = html.replace(/\s*\[\[([^\]]+)\]\]/g, (m, ids) => {
        const out = cite(m, ids);
        return out ? `&nbsp;${out}` : "";
      });
      list.appendChild(li);
    });
  };

  /* ── Publications ───────────────────────────── */
  const renderPublications = () => {
    const wrap = el("publications-list");
    const pubs = data.publications || [];
    const hasStar = pubs.some((p) => p.authors && p.authors.includes("*"));
    if (!hasStar) el("pub-note").remove();

    pubs.forEach((pub, i) => {
      const id = pub.id || `pub-${i + 1}`;
      const art = document.createElement("article");
      art.className = "pub" + (pub.thumb ? "" : " no-thumb");
      art.id = id;
      art.setAttribute("aria-labelledby", `${id}-title`);

      const title = document.createElement("h3");
      title.className = "title";
      title.id = `${id}-title`;
      title.textContent = pub.title;
      art.appendChild(title);

      if (pub.thumb) {
        const a = document.createElement("a");
        a.className = "thumb";
        a.href = pub.thumb.full || pub.thumb.src;
        a.setAttribute("aria-label", `Enlarge figure for ${pub.title}`);
        const img = document.createElement("img");
        img.src = pub.thumb.src;
        img.alt = pub.thumb.alt || "";
        if (pub.thumb.width) img.width = pub.thumb.width;
        if (pub.thumb.height) img.height = pub.thumb.height;
        img.loading = "lazy";
        img.decoding = "async";
        a.appendChild(img);
        a.addEventListener("click", (e) => {
          e.preventDefault();
          openViewer(a.href, img.alt);
        });
        art.appendChild(a);
      }

      const info = document.createElement("div");
      info.className = "info";

      if (pub.authors) {
        const authors = document.createElement("div");
        authors.className = "authors";
        authors.innerHTML = pub.authors;
        info.appendChild(authors);
      }

      const venue = document.createElement("div");
      venue.className = "venue";
      venue.textContent = pub.venue || "";
      if (pub.award) {
        venue.appendChild(document.createTextNode(" · "));
        const award = document.createElement("span");
        award.className = "award";
        award.textContent = pub.award;
        venue.appendChild(award);
      }
      info.appendChild(venue);

      const links = document.createElement("div");
      links.className = "links";
      const panels = [];

      const makePanel = (label, className, build) => {
        const panel = document.createElement("div");
        panel.className = `panel ${className}`.trim();
        panel.id = `${id}-${className || label.toLowerCase()}`;
        build(panel);

        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "panel-toggle";
        btn.textContent = label;
        btn.setAttribute("aria-expanded", "false");
        btn.setAttribute("aria-controls", panel.id);
        btn.addEventListener("click", () => {
          const willOpen = !panel.classList.contains("open");
          panels.forEach(({ p, b }) => {
            p.classList.remove("open");
            b.setAttribute("aria-expanded", "false");
          });
          if (willOpen) {
            panel.classList.add("open");
            btn.setAttribute("aria-expanded", "true");
          }
        });
        panels.push({ p: panel, b: btn });
        return btn;
      };

      if (pub.tldr) {
        links.appendChild(
          makePanel("TL;DR", "tldr", (panel) => {
            panel.textContent = pub.tldr;
          })
        );
      }
      if (pub.paper) links.appendChild(makeLink("Paper", pub.paper));
      if (pub.website) links.appendChild(makeLink("Website", pub.website));
      if (pub.code) links.appendChild(makeLink("Code", pub.code));
      if (pub.talk) links.appendChild(makeLink("Talk", pub.talk));
      if (pub.citation) {
        links.appendChild(
          makePanel("Citation", "cite", (panel) => {
            const copy = document.createElement("button");
            copy.type = "button";
            copy.className = "copy";
            copy.textContent = "Copy";
            copy.setAttribute("aria-label", `Copy citation for ${pub.title}`);
            copy.addEventListener("click", async () => {
              try {
                await navigator.clipboard.writeText(pub.citation);
                copy.textContent = "Copied";
                announce("Citation copied to clipboard.");
              } catch (err) {
                copy.textContent = "Select and copy";
              }
              setTimeout(() => (copy.textContent = "Copy"), 1600);
            });
            const pre = document.createElement("pre");
            pre.textContent = pub.citation;
            panel.appendChild(copy);
            panel.appendChild(pre);
          })
        );
      }

      if (links.childNodes.length) info.appendChild(links);
      art.appendChild(info);
      panels.forEach(({ p }) => art.appendChild(p));
      wrap.appendChild(art);
    });
  };

  /* ── Row lists: education, honors, service ──── */
  const renderRows = (listId, headingId, items, toRow) => {
    const list = el(listId);
    if (!list) return;
    if (!items || !items.length) {
      const h = el(headingId);
      if (h) h.remove();
      list.remove();
      return;
    }
    items.forEach((item) => {
      const { main, sub, when } = toRow(item);
      const li = document.createElement("li");
      const m = document.createElement("span");
      m.className = "main";
      m.innerHTML = main;
      if (sub) {
        const s = document.createElement("span");
        s.className = "sub";
        s.innerHTML = sub;
        m.appendChild(s);
      }
      const t = document.createElement("span");
      t.className = "t";
      t.textContent = when || "";
      li.append(m, t);
      list.appendChild(li);
    });
  };

  const renderEducation = () =>
    renderRows("education-list", "education", data.education, (e) => ({
      main: `<strong>${e.degree}</strong>`,
      sub: [e.school, e.note].filter(Boolean).join(" · "),
      when: e.when,
    }));

  const renderHonors = () =>
    renderRows("honors-list", "honors", data.honors, (h) => ({
      main: h.text,
      sub: h.note || "",
      when: h.when,
    }));

  const renderService = () =>
    renderRows("service-list", "service", data.service, (s) => ({
      main: `<strong>${s.role}</strong>, ${s.venue}`,
      sub: "",
      when: s.when,
    }));

  /* ── Footer ─────────────────────────────────── */
  const renderFooter = () => {
    const f = el("footer-updated");
    if (f && data.footer && data.footer.updated) {
      f.textContent = `Last updated ${data.footer.updated}.`;
    } else if (f) {
      f.closest(".foot").remove();
    }
  };

  /* ── Figure viewer ──────────────────────────── */
  const viewer = el("viewer");
  const viewerImg = viewer ? viewer.querySelector("img") : null;
  let lastFocus = null;

  const openViewer = (src, alt) => {
    if (!viewer || !viewerImg) {
      window.open(src, "_blank", "noopener");
      return;
    }
    lastFocus = document.activeElement;
    viewerImg.src = src;
    viewerImg.alt = alt || "";
    viewer.hidden = false;
    viewer.classList.add("open");
    document.body.style.overflow = "hidden";
    viewer.querySelector(".viewer-close").focus();
  };

  const closeViewer = () => {
    if (!viewer || viewer.hidden) return;
    viewer.classList.remove("open");
    viewer.hidden = true;
    viewerImg.src = "";
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  };

  if (viewer) {
    viewer.addEventListener("click", (e) => {
      if (e.target === viewer || e.target.closest(".viewer-close")) closeViewer();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeViewer();
    });
  }

  renderSidebar();
  renderBio();
  renderEducation();
  renderInterests();
  renderPublications();
  renderHonors();
  renderService();
  renderFooter();
})();
