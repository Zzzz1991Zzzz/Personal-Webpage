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

  /* ── Header ─────────────────────────────────── */
  const renderHeader = () => {
    const { basics } = data;
    el("full-name").textContent = basics.name;

    const nav = el("nav");
    if (basics.email) {
      nav.appendChild(makeLink("Email", `mailto:${basics.email}`, { title: basics.emailDisplay || basics.email }));
    }
    [
      ["Scholar", basics.scholar],
      ["LinkedIn", basics.linkedin],
      ["GitHub", basics.github],
      ["CV", basics.cv],
    ]
      .filter(([, href]) => href)
      .forEach(([label, href]) => {
        const a = makeLink(label, href);
        if (label === "CV") {
          a.target = "_blank";
          a.rel = "noopener";
        }
        nav.appendChild(a);
      });

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

  /* ── Service ────────────────────────────────── */
  const renderService = () => {
    const list = el("service-list");
    const items = data.service || [];
    if (!items.length) {
      el("service").remove();
      list.remove();
      return;
    }
    items.forEach((item) => {
      const li = document.createElement("li");
      const k = document.createElement("span");
      k.className = "k";
      k.textContent = item.role;
      const c = document.createElement("span");
      c.className = "c";
      c.textContent = item.venue;
      const t = document.createElement("span");
      t.className = "t";
      t.textContent = item.when || "";
      li.append(k, c, t);
      list.appendChild(li);
    });
  };

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

  renderHeader();
  renderBio();
  renderInterests();
  renderPublications();
  renderService();
  renderFooter();
})();
