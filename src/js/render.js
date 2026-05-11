// Convert trailing * on author names to superscript
function formatAuthors(str) {
  return str.replace(/(\w)\*/g, '$1<sup>*</sup>');
}

function escapeHtml(str) {
  return (str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttribute(str) {
  return escapeHtml(str)
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/\n/g, "&#10;");
}

function stripHtml(str) {
  return (str || "").replace(/<[^>]*>/g, "").replace(/\*/g, "").trim();
}

function bibtexEntryType(venue) {
  const text = (venue || "").toLowerCase();
  if (text.includes("arxiv")) return "misc";
  if (text.includes("information fusion") || text.includes("journal")) return "article";
  return "inproceedings";
}

function bibtexKey(pub) {
  const firstAuthor = stripHtml(pub.authors).split(",")[0]?.trim().split(/\s+/).pop()?.toLowerCase() || "paper";
  const firstWord = (pub.title || "")
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .trim()
    .split(/\s+/)[0] || "work";
  return `${firstAuthor}${pub.year}${firstWord}`;
}

function generateBibtex(pub) {
  const entryType = bibtexEntryType(pub.venue);
  const authors = stripHtml(pub.authors)
    .split(",")
    .map(name => name.trim())
    .filter(Boolean)
    .join(" and ");
  const paperUrl = pub.links.find(link => link.name === "paper" && link.url)?.url;
  const lines = [
    `@${entryType}{${bibtexKey(pub)},`,
    `  title = {${stripHtml(pub.title)}},`,
    `  author = {${authors}},`,
  ];

  if (entryType === "article") {
    lines.push(`  journal = {${pub.venue}},`);
  } else if (entryType === "inproceedings") {
    lines.push(`  booktitle = {${pub.venue}},`);
  } else if (pub.venue) {
    lines.push(`  note = {${pub.venue}},`);
  }

  lines.push(`  year = {${pub.year}},`);

  if (paperUrl) {
    lines.push(`  url = {${paperUrl}},`);
  }

  lines.push("}");
  return lines.join("\n");
}

function renderBibtexField(field, value) {
  return `<span class="bibtex-field">${escapeHtml(field)}</span> <span class="bibtex-operator">=</span> <span class="bibtex-brace">{</span><span class="bibtex-string">${escapeHtml(value)}</span><span class="bibtex-brace">}</span><span class="bibtex-punct">,</span>`;
}

function generateBibtexHtml(pub) {
  const entryType = bibtexEntryType(pub.venue);
  const authors = stripHtml(pub.authors)
    .split(",")
    .map(name => name.trim())
    .filter(Boolean)
    .join(" and ");
  const paperUrl = pub.links.find(link => link.name === "paper" && link.url)?.url;
  const lines = [
    `<span class="bibtex-punct">@</span><span class="bibtex-type">${entryType}</span><span class="bibtex-punct">{</span><span class="bibtex-key">${escapeHtml(bibtexKey(pub))}</span><span class="bibtex-punct">,</span>`,
    renderBibtexField("title", stripHtml(pub.title)),
    renderBibtexField("author", authors),
  ];

  if (entryType === "article") {
    lines.push(renderBibtexField("journal", pub.venue));
  } else if (entryType === "inproceedings") {
    lines.push(renderBibtexField("booktitle", pub.venue));
  } else if (pub.venue) {
    lines.push(renderBibtexField("note", pub.venue));
  }

  lines.push(renderBibtexField("year", String(pub.year)));

  if (paperUrl) {
    lines.push(renderBibtexField("url", paperUrl));
  }

  lines.push(`<span class="bibtex-punct">}</span>`);
  return lines.map(line => `<div class="bibtex-line">${line}</div>`).join("");
}

function renderBibtexPanel(pub, bibtexId) {
  const copyButtonId = `${bibtexId}-copy-btn`;
  return `<div class="abstract-content bibtex-content" id="${bibtexId}" style="display: none;"><div class="bibtex-toolbar"><button type="button" class="badge bibtex-copy-btn" id="${copyButtonId}" data-copy-text="${escapeAttribute(generateBibtex(pub))}" data-default-label="copy" onclick="copyBibtex('${copyButtonId}'); return false;">Copy</button></div><div class="bibtex-code">${generateBibtexHtml(pub)}</div></div>`;
}

function renderPublications(containerId, filterFn = () => true, isCompact = false) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let html = isCompact ? '<div class="selected-pub-list">' : '';
  let currentYear = null;

  // Sort by year descending, then by original order (implicitly preserved if stable sort or pre-sorted)
  // Assuming publications array is already sorted by year/importance
  const filteredPubs = publications.filter(filterFn);

  if (filteredPubs.length === 0) {
    container.innerHTML = '<p>No publications found.</p>';
    return;
  }
  

  filteredPubs.forEach((pub, index) => {
    // Year divider for full list
    if (!isCompact && pub.year !== currentYear) {
        currentYear = pub.year;
        html += `
        <tr>
            <td colspan="2" class="year-divider">
                <span class="year-label">/* ==================== ${currentYear} ==================== */</span>
            </td>
        </tr>
        `;
    }

    if (isCompact) {
        const abstractId = `abstract-${index}-index`;
        const bibtexId = `bibtex-${index}-index`;
        html += `
        <article class="selected-pub-entry">
          <div class="selected-pub-body">
            <div class="selected-pub-meta">
              <span class="selected-pub-venue-pill">${pub.venue}</span>
              <span>${pub.year}${pub.month ? ` · ${pub.month}` : ''}</span>
              ${pub.note ? `<span>${pub.note}</span>` : ''}
            </div>
            <a class="selected-pub-title" href="${pub.links.find(link => link.name === "paper")?.url || '#'}">${pub.title}</a>
            <p class="selected-pub-authors">${formatAuthors(pub.authors)}</p>
            <p class="selected-pub-description">${pub.description}</p>
            <div class="selected-pub-links">
              ${pub.links.map(link => {
                let idAttr = link.id ? `id="${link.id}-index"` : '';
                let badgeHtml = `<a href="${link.url}" class="badge" ${idAttr}>${link.name}</a>`;
                if (link.name === "paper" && pub.abstract && pub.abstract.trim() !== "") {
                  badgeHtml += `<a href="#" class="badge abstract-badge" onclick="toggleAbstract('${abstractId}'); return false;" id="${abstractId}-btn">abstract</a>`;
                }
                return badgeHtml;
              }).join('')}<a href="#" class="badge bibtex-badge" onclick="toggleBibtex('${bibtexId}'); return false;" id="${bibtexId}-btn">bibtex</a>
            </div>
            ${pub.abstract && pub.abstract.trim() !== "" ? `<div class="abstract-content" id="abstract-${index}-index" style="display: none;">${pub.abstract}</div>` : ''}
            ${renderBibtexPanel(pub, bibtexId)}
          </div>
        </article>
        `;
    } else {
        // Full view (publications.html)
        html += `
        <tr class="publication-row">
          <td colspan="2">
            <div class="publication-flex">
              <div class="pub-line-number">${String(index + 1).padStart(2, '0')}</div>
              <div class="publication-image">
                <div class="publication-image-wrapper">
                  <div class="venue-badge">${pub.venue}</div>
                  <img src="${pub.image}" width="100%" />
                </div>
              </div>
              <div class="publication-text">
                <papertitle>${pub.title}</papertitle>
                <br />
                ${formatAuthors(pub.authors)}
                <br />
                ${pub.note ? `${pub.note}<br />` : ''}
                <span class="pub-description">// ${pub.description}</span>
                <br />
                ${pub.links.map(link => {
                    let idAttr = link.id ? `id="${link.id}"` : '';
                    let badgeHtml = `<a href="${link.url}" class="badge" ${idAttr}>${link.name}</a>`;
                    if (link.name === "paper" && pub.abstract && pub.abstract.trim() !== "") {
                      const abstractId = `abstract-${index}`;
                      badgeHtml += `<a href="#" class="badge abstract-badge" onclick="toggleAbstract('${abstractId}'); return false;" id="${abstractId}-btn">abstract</a>`;
                    }
                    return badgeHtml;
                }).join('')}<a href="#" class="badge bibtex-badge" onclick="toggleBibtex('bibtex-${index}'); return false;" id="bibtex-${index}-btn">bibtex</a>
                ${pub.abstract ? `<div class="abstract-content" id="abstract-${index}" style="display: none;">${pub.abstract}</div>` : ''}
                ${renderBibtexPanel(pub, `bibtex-${index}`)}
              </div>
            </div>
          </td>
        </tr>
        `;
    }
  });
  if (isCompact) {
    html += '</div>';
  }

  container.innerHTML = html;

  // Fetch stars
  filteredPubs.forEach(pub => {
    pub.links.forEach(link => {
        if (link.repo && link.id) {
            // Determine ID suffix based on compact mode
            const targetId = isCompact ? `${link.id}-index` : link.id;
            fetchGitHubStars(link.repo, targetId);
        }
    });
  });
}

function renderProjects(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  let html = '<tbody><tr><td class="section-padding"><heading>Projects</heading><p>';

  if (!projects || projects.length === 0) {
    container.innerHTML = html + 'No projects found.</p></td></tr></tbody>';
    return;
  }

  projects.forEach(proj => {
    html += `
      <b>${proj.title}</b>
      <br>
      ${proj.description}
      <br>
      <a href="${proj.url}" class="badge" id="${proj.id}">code</a>
      <br><br>
    `;
  });

  html += '</p></td></tr></tbody>';
  container.innerHTML = html;

  // Fetch stars for projects
  projects.forEach(proj => {
    if (proj.repo && proj.id) {
       fetchGitHubStars(proj.repo, proj.id);
    }
  });
}

const starCache = {};

function fetchGitHubStars(repo, badgeId) {
  const badge = document.getElementById(badgeId);
  if (!badge) return;

  const applyStars = stars => {
    starCache[repo] = stars;
    badge.innerText = `Code * ${stars}`;
  };

  if (starCache[repo]) {
    applyStars(starCache[repo]);
    return;
  }

  fetch("https://api.github.com/repos/" + repo)
    .then(response => {
      if (!response.ok) {
        throw new Error("GitHub API status " + response.status);
      }
      return response.json();
    })
    .then(data => {
      if (typeof data.stargazers_count === "number") {
        applyStars(data.stargazers_count);
        return;
      }
      throw new Error("stargazers_count missing");
    })
    .catch(() => {
      // Fallback to shields.io which is cached and avoids GitHub rate limits
      fetch("https://img.shields.io/github/stars/" + repo + ".json")
        .then(res => {
          if (!res.ok) {
            throw new Error("Shields status " + res.status);
          }
          return res.json();
        })
        .then(data => {
          if (data && data.message) {
            applyStars(data.message);
          }
        })
        .catch(error =>
          console.error("Error fetching GitHub stars for " + repo + ":", error)
        );
    });
}

function toggleAbstract(abstractId) {
  const abstractDiv = document.getElementById(abstractId);
  const abstractBtn = document.getElementById(abstractId + '-btn');
  
  if (abstractDiv && abstractBtn) {
    if (abstractDiv.style.display === 'none' || abstractDiv.style.display === '') {
      abstractDiv.style.display = 'block';
      abstractBtn.classList.add('active');
    } else {
      abstractDiv.style.display = 'none';
      abstractBtn.classList.remove('active');
    }
  }
}

function toggleBibtex(bibtexId) {
  const bibtexDiv = document.getElementById(bibtexId);
  const bibtexBtn = document.getElementById(bibtexId + '-btn');

  if (bibtexDiv && bibtexBtn) {
    if (bibtexDiv.style.display === 'none' || bibtexDiv.style.display === '') {
      bibtexDiv.style.display = 'block';
      bibtexBtn.classList.add('active');
    } else {
      bibtexDiv.style.display = 'none';
      bibtexBtn.classList.remove('active');
    }
  }
}

async function copyBibtex(copyButtonId) {
  const copyBtn = document.getElementById(copyButtonId);
  const text = copyBtn?.dataset?.copyText;

  if (!copyBtn || !text || !navigator?.clipboard?.writeText) return;

  await navigator.clipboard.writeText(text);

  if (copyBtn._restoreLabelTimer) {
    clearTimeout(copyBtn._restoreLabelTimer);
  }

  copyBtn.textContent = "Copied";
  copyBtn.classList.add("copied");
  copyBtn._restoreLabelTimer = setTimeout(() => {
    copyBtn.textContent = copyBtn.dataset.defaultLabel || "Copy";
    copyBtn.classList.remove("copied");
    copyBtn._restoreLabelTimer = null;
  }, 1600);
}

function renderNews(containerId, limit = 5) {
  const container = document.getElementById(containerId);
  if (!container) return;

  if (!news || news.length === 0) {
    container.innerHTML = '<p>No news found.</p>';
    return;
  }

  // Get the most recent news items (first 'limit' items)
  const visibleNews = news.slice(0, limit);
  const hiddenNews = news.slice(limit);

  const renderLogEntry = (item) => {
    return `<div class="log-entry"><span class="log-date">[${item.date}]</span><span class="log-content">${item.content}</span></div>`;
  };

  let html = '<div class="news-container">';
  html += '<div class="news-visible">';

  visibleNews.forEach(item => {
    html += renderLogEntry(item);
  });

  html += '</div>';

  if (hiddenNews.length > 0) {
    html += `<div class="news-hidden" id="moreNews" style="display: none;">`;
    hiddenNews.forEach(item => {
      html += renderLogEntry(item);
    });
    html += '</div>';
    html += '<div class="news-toggle-arrow" onclick="toggleNews()" id="newsToggleBtn">$ ls -a</div>';
  }

  html += '</div>';

  container.innerHTML = html;
}
