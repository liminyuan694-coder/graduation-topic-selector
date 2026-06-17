const state = {
  query: "",
  audiences: new Set(),
  skills: new Set(),
  matches: new Set(),
  type: "",
  nature: "",
  maxDifficulty: "",
};

const data = window.TOPIC_DATA;
const topics = data.topics;

const $ = (id) => document.getElementById(id);
const unique = (items) => [...new Set(items)].sort((a, b) => a.localeCompare(b, "zh-CN"));
const avgDifficulty = (topic) => {
  const values = Object.values(topic.difficulty);
  return Math.round((values.reduce((sum, item) => sum + item, 0) / values.length) * 10) / 10;
};
const stars = (score) => "★".repeat(Math.round(score)) + "☆".repeat(5 - Math.round(score));

function makeChip(label, set, onChange) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.textContent = label;
  button.addEventListener("click", () => {
    if (set.has(label)) {
      set.delete(label);
      button.classList.remove("active");
    } else {
      set.add(label);
      button.classList.add("active");
    }
    onChange();
  });
  return button;
}

function makeMatchChip(option) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "chip";
  button.textContent = option.label;
  button.addEventListener("click", () => {
    if (state.matches.has(option.match)) {
      state.matches.delete(option.match);
      button.classList.remove("active");
    } else {
      state.matches.add(option.match);
      button.classList.add("active");
    }
    render();
  });
  return button;
}

function mountChips() {
  unique(topics.flatMap((topic) => topic.audiences)).forEach((label) => {
    $("audienceChips").appendChild(makeChip(label, state.audiences, render));
  });
  unique(topics.flatMap((topic) => topic.skills)).forEach((label) => {
    $("skillChips").appendChild(makeChip(label, state.skills, render));
  });
  data.matchOptions.forEach((option) => {
    $("matchChips").appendChild(makeMatchChip(option));
  });
}

function mountSelects() {
  unique(topics.flatMap((topic) => topic.type)).forEach((value) => {
    $("typeSelect").appendChild(new Option(value, value));
  });
  unique(topics.flatMap((topic) => topic.nature)).forEach((value) => {
    $("natureSelect").appendChild(new Option(value, value));
  });
}

function includesAll(source, selected) {
  return [...selected].every((item) => source.includes(item));
}

function queryHit(topic) {
  if (!state.query) return true;
  const haystack = [
    topic.title,
    topic.subtitle,
    topic.teachers,
    topic.team,
    topic.scale,
    topic.summary,
    topic.bestFor,
    topic.caution,
    ...topic.audiences,
    ...topic.skills,
    ...topic.keywords,
  ].join(" ").toLowerCase();
  return haystack.includes(state.query.toLowerCase());
}

function scoreTopic(topic) {
  const selected = [...state.matches];
  let score = 0;
  selected.forEach((pref) => {
    if (topic.match.includes(pref)) score += 3;
    if (pref === "怕复杂规范" && avgDifficulty(topic) <= 3.8) score += 2;
  });
  if (state.query && queryHit(topic)) score += 1;
  return score;
}

function filteredTopics() {
  return topics
    .filter((topic) => queryHit(topic))
    .filter((topic) => includesAll(topic.audiences, state.audiences))
    .filter((topic) => includesAll(topic.skills, state.skills))
    .filter((topic) => !state.type || topic.type.includes(state.type))
    .filter((topic) => !state.nature || topic.nature.includes(state.nature))
    .filter((topic) => !state.maxDifficulty || avgDifficulty(topic) <= Number(state.maxDifficulty))
    .sort((a, b) => scoreTopic(b) - scoreTopic(a) || a.no.localeCompare(b.no, "zh-CN"));
}

function topicCard(topic) {
  const card = document.createElement("article");
  card.className = "card";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `查看 ${topic.title}`);
  const score = avgDifficulty(topic);
  card.innerHTML = `
    <img src="${topic.cover}" alt="${topic.title} 封面">
    <div class="card-body">
      <div class="meta-row">
        <span class="no">选题 ${topic.no}</span>
        <span class="score" title="综合难度">${stars(score)} ${score}</span>
      </div>
      <h3>${topic.title}</h3>
      <p>${topic.bestFor}</p>
      <div class="tag-row">
        ${topic.audiences.slice(0, 3).map((item) => `<span class="tag">${item}</span>`).join("")}
      </div>
      <div class="tag-row">
        ${topic.skills.slice(0, 5).map((item) => `<span class="tag warn">${item}</span>`).join("")}
      </div>
    </div>
  `;
  card.addEventListener("click", () => openDrawer(topic));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openDrawer(topic);
    }
  });
  return card;
}

function render() {
  const list = filteredTopics();
  const cards = $("cards");
  cards.innerHTML = "";
  $("resultSummary").textContent = `显示 ${list.length} / ${topics.length} 个题目。${data.notice}`;
  if (!list.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "没有匹配题目。可以减少标签，或点击右上角清空筛选。";
    cards.appendChild(empty);
    return;
  }
  list.forEach((topic) => cards.appendChild(topicCard(topic)));
}

function detail(label, value) {
  return `<div class="detail-item"><span>${label}</span>${value}</div>`;
}

function openDrawer(topic) {
  $("drawerCover").src = topic.cover;
  $("drawerCover").alt = `${topic.title} 封面`;
  $("drawerNo").textContent = `选题 ${topic.no} / ${topic.team}`;
  $("drawerTitle").textContent = topic.title;
  $("drawerSubtitle").textContent = topic.subtitle;
  $("detailGrid").innerHTML = [
    detail("指导教师", topic.teachers),
    detail("招生", topic.quota),
    detail("类型", topic.type.join("、")),
    detail("性质", topic.nature.join("、")),
    detail("规模", topic.scale),
    detail("工作形式", topic.workMode),
    detail("综合难度", `${stars(avgDifficulty(topic))} ${avgDifficulty(topic)} / 5`),
    detail("关键词", topic.keywords.join("、")),
  ].join("");
  $("drawerSummary").textContent = topic.summary;
  $("drawerBest").textContent = topic.bestFor;
  $("drawerCaution").textContent = topic.caution;
  $("drawerDeliverables").textContent = topic.deliverables;
  $("sourceList").innerHTML = topic.sourceFiles.map((item) => `<li>${item}</li>`).join("");
  $("drawer").classList.add("open");
  $("drawer").setAttribute("aria-hidden", "false");
}

function closeDrawer() {
  $("drawer").classList.remove("open");
  $("drawer").setAttribute("aria-hidden", "true");
}

function resetAll() {
  state.query = "";
  state.audiences.clear();
  state.skills.clear();
  state.matches.clear();
  state.type = "";
  state.nature = "";
  state.maxDifficulty = "";
  $("searchInput").value = "";
  $("typeSelect").value = "";
  $("natureSelect").value = "";
  $("maxDifficulty").value = "";
  document.querySelectorAll(".chip.active").forEach((chip) => chip.classList.remove("active"));
  render();
}

function init() {
  mountChips();
  mountSelects();
  $("searchInput").addEventListener("input", (event) => {
    state.query = event.target.value.trim();
    render();
  });
  $("typeSelect").addEventListener("change", (event) => {
    state.type = event.target.value;
    render();
  });
  $("natureSelect").addEventListener("change", (event) => {
    state.nature = event.target.value;
    render();
  });
  $("maxDifficulty").addEventListener("change", (event) => {
    state.maxDifficulty = event.target.value;
    render();
  });
  $("resetAll").addEventListener("click", resetAll);
  document.querySelectorAll("[data-close]").forEach((item) => item.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeDrawer();
  });
  render();
}

init();
