(function () {
  const data = window.profileData;
  if (!data) return;

  const el = (id) => document.getElementById(id);

  const makeSep = () => {
    const span = document.createElement("span");
    span.className = "separator";
    span.textContent = "/";
    return span;
  };

  const makeLink = (label, href) => {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    if (/^https?:/.test(href)) {
      a.target = "_blank";
      a.rel = "noopener";
    }
    return a;
  };

  /* ── Header ─────────────────────────────────── */
  const renderHeader = () => {
    const { basics } = data;

    el("full-name").textContent = basics.name;
    el("affiliation").innerHTML = `${basics.degrees}<br>${basics.affiliation}`;

    const emailLine = el("email-line");
    emailLine.textContent = "Email: ";
    if (basics.emailHref) {
      emailLine.appendChild(makeLink(basics.email, basics.emailHref));
    } else {
      emailLine.appendChild(document.createTextNode(basics.email));
    }

    const links = [
      { label: "Scholar", href: basics.scholar },
      { label: "LinkedIn", href: basics.linkedin },
      { label: "GitHub", href: basics.github },
      { label: "CV", href: basics.cv },
    ].filter((l) => l.href);

    const nav = el("header-links");
    links.forEach((link, i) => {
      if (i > 0) nav.appendChild(makeSep());
      nav.appendChild(makeLink(link.label, link.href));
    });

    const scholarPub = el("scholar-link-pub");
    if (scholarPub) {
      if (basics.scholar) {
        scholarPub.href = basics.scholar;
      } else {
        // No Scholar profile yet: drop the "You may also refer to..." clause.
        const note = scholarPub.closest(".section-note");
        if (note) note.textContent = "* indicates equal contribution.";
      }
    }

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
    data.bio.forEach((paragraph) => {
      const p = document.createElement("p");
      p.innerHTML = paragraph;
      bio.appendChild(p);
    });
  };

  /* ── News ───────────────────────────────────── */
  const renderNews = () => {
    const list = el("news-list");
    data.news.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `<span class="news-date">${item.date}:</span> ${item.text}`;
      list.appendChild(li);
    });
  };

  /* ── Publications ───────────────────────────── */
  const renderPublications = () => {
    const wrap = el("publications-list");
    let counter = 0;

    data.publications.forEach((pub) => {
      counter += 1;
      const entry = document.createElement("div");
      entry.className = "pub-entry";

      const title = document.createElement("div");
      title.className = "pub-title";
      title.textContent = pub.title;
      entry.appendChild(title);

      if (pub.authors) {
        const authors = document.createElement("div");
        authors.className = "pub-authors";
        authors.innerHTML = pub.authors;
        entry.appendChild(authors);
      }

      const venue = document.createElement("div");
      venue.className = "pub-venue";
      let venueHTML = `<strong>${pub.venue}</strong>`;
      if (pub.status) venueHTML += ` <span class="pub-status">(${pub.status.toLowerCase()})</span>`;
      venueHTML += ".";
      if (pub.venueNote) venueHTML += ` <span class="venue-note">${pub.venueNote}</span>`;
      venue.innerHTML = venueHTML;
      entry.appendChild(venue);

      const links = document.createElement("div");
      links.className = "pub-links";
      const items = [];

      const panels = [];
      const makeToggle = (label, panel) => {
        const btn = document.createElement("button");
        btn.type = "button";
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

      let tldrDiv = null;
      if (pub.tldr) {
        tldrDiv = document.createElement("div");
        tldrDiv.className = "pub-collapsible";
        tldrDiv.id = `tldr-${counter}`;
        tldrDiv.innerHTML = `<strong>TL;DR:</strong> ${pub.tldr}`;
        items.push(makeToggle("TL;DR", tldrDiv));
      }

      if (pub.paper) items.push(makeLink("Paper", pub.paper));
      if (pub.website) items.push(makeLink("Website", pub.website));
      if (pub.code) items.push(makeLink("Code", pub.code));
      if (pub.talk) items.push(makeLink("Talk", pub.talk));

      let citDiv = null;
      if (pub.citation) {
        citDiv = document.createElement("div");
        citDiv.className = "pub-collapsible pub-citation";
        citDiv.id = `cit-${counter}`;
        const pre = document.createElement("pre");
        pre.textContent = pub.citation;
        citDiv.appendChild(pre);
        items.push(makeToggle("Citation", citDiv));
      }

      items.forEach((item, i) => {
        if (i > 0) links.appendChild(makeSep());
        links.appendChild(item);
      });
      if (items.length) entry.appendChild(links);
      if (tldrDiv) entry.appendChild(tldrDiv);
      if (citDiv) entry.appendChild(citDiv);

      wrap.appendChild(entry);
    });
  };

  /* ── Service ────────────────────────────────── */
  const renderService = () => {
    const section = el("service-section");
    const list = el("service-list");
    const items = data.service || [];
    if (!list || !section) return;
    if (!items.length) {
      section.remove();
      return;
    }
    items.forEach((item) => {
      const li = document.createElement("li");
      li.className = "service-item";
      const meta = item.meta ? `<span class="service-meta"> — ${item.meta}</span>` : "";
      li.innerHTML = `<span class="service-role">${item.role}</span>, ${item.venue}${meta}`;
      list.appendChild(li);
    });
  };

  /* ── Footer ─────────────────────────────────── */
  const renderFooter = () => {
    const f = el("footer-updated");
    if (f && data.footer && data.footer.updated) {
      f.textContent = `Last updated ${data.footer.updated}.`;
    }
  };

  renderHeader();
  renderBio();
  renderNews();
  renderPublications();
  renderService();
  renderFooter();
})();
