const data = window.TOPIC_DATA;
const topics = data.topics;
const optionGroups = {
  audience: [{"id": "ai", "label": "AI / 数字工具", "audiences": ["AI/技术工具型"], "skills": ["AI辅助", "绿色分析"]}, {"id": "renewal", "label": "城市更新 / 存量改造", "audiences": ["城市更新型", "历史更新型"], "skills": ["存量更新", "旧厂房改造", "改扩建", "街区调研"]}, {"id": "public", "label": "公共建筑 / 复杂功能", "audiences": ["公共建筑型", "大型公建型", "交通建筑型", "教育建筑型"], "skills": ["复杂流线", "功能分区", "公共建筑", "高大空间"]}, {"id": "rural", "label": "乡村地域 / 文旅", "audiences": ["乡村地域型", "文旅策划型", "地域气候型"], "skills": ["乡村调研", "地域文化", "文旅策划"]}, {"id": "health", "label": "医疗康养 / 适老", "audiences": ["医疗康养型", "适老设计型"], "skills": ["医疗流程", "康养建筑", "适老设计", "无障碍"]}, {"id": "industry", "label": "产业园 / 工业技术", "audiences": ["产业技术型", "办公研发型"], "skills": ["产业园规划", "工业流程", "大跨结构", "研发建筑"]}, {"id": "commerce", "label": "商业策划 / 运营", "audiences": ["商业策划型", "商业场景型", "运营逻辑型"], "skills": ["商业策划", "业态组合", "社区运营"]}, {"id": "tectonic", "label": "建构结构 / 材料", "audiences": ["建构技术型", "结构系统型", "结构空间型"], "skills": ["木构建构", "结构设计", "材料构造", "材料表皮"]}],
  work: [{"id": "research", "label": "我愿意大量调研", "audiences": [], "skills": ["现场调研", "街区调研", "社区调研", "乡村调研", "现状测绘", "行为观察"]}, {"id": "solo", "label": "更想做单体深化", "audiences": [], "skills": ["建筑设计", "空间组织", "结构设计", "细部表达", "界面设计"]}, {"id": "city", "label": "想做城市设计", "audiences": ["城市设计型", "规划建筑贯通型"], "skills": ["城市设计", "总平组织", "街区调研"]}, {"id": "joint", "label": "能接受联合毕设", "audiences": ["联合协作型"], "skills": ["跨专业协作", "跨校协作"]}, {"id": "rules-light", "label": "尽量少碰复杂规范", "audiences": ["小尺度深化型", "场景体验型"], "skills": ["文旅策划", "商业策划", "社区运营"]}, {"id": "rules-heavy", "label": "能接受复杂规范", "audiences": ["规范强化型", "工程实践型"], "skills": ["规范理解", "医疗流程", "机场总图", "工业流程"]}],
  value: [{"id": "visual", "label": "希望成果表达好看", "audiences": ["模型表达型", "空间氛围型"], "skills": ["图文表达", "模型表达", "表达建模"]}, {"id": "green", "label": "关注绿色低碳", "audiences": ["绿色低碳型"], "skills": ["绿色策略", "绿色低碳", "气候适应"]}, {"id": "culture", "label": "喜欢文化叙事", "audiences": ["文化策展型", "地域建筑型", "公共文化型"], "skills": ["策展策划", "地域文化", "公共文化建筑"]}, {"id": "practical", "label": "偏真实项目和就业", "audiences": ["工程实践型", "运营逻辑型"], "skills": ["工程逻辑", "报规表达", "规范理解", "用户需求"]}]
};
const selected = new Set();
let showAllMode = false;
const $ = (id) => document.getElementById(id);
const avgDifficulty = (topic) => {
  const values = Object.values(topic.difficulty);
  return Math.round((values.reduce((sum, item) => sum + item, 0) / values.length) * 10) / 10;
};
function optionScore(topic, option) {
  let score = 0;
  option.audiences.forEach((item) => { if (topic.audiences.includes(item)) score += 4; });
  option.skills.forEach((item) => { if (topic.skills.includes(item)) score += 3; });
  if (option.id === "rules-light" && avgDifficulty(topic) <= 3.8) score += 3;
  if (option.id === "rules-heavy" && avgDifficulty(topic) >= 4) score += 2;
  if (option.id === "solo" && topic.nature.includes("建筑设计")) score += 2;
  if (option.id === "city" && topic.nature.includes("城市设计")) score += 3;
  return score;
}
function scoreTopic(topic) {
  const chosen = [...selected].map((id) => Object.values(optionGroups).flat().find((option) => option.id === id)).filter(Boolean);
  let score = chosen.reduce((sum, option) => sum + optionScore(topic, option), 0);
  const query = $("searchInput").value.trim().toLowerCase();
  if (query) {
    const haystack = [topic.title, topic.subtitle, topic.summary, topic.teachers, topic.team, ...topic.audiences, ...topic.skills, ...topic.keywords].join(" ").toLowerCase();
    if (haystack.includes(query)) score += 8;
    else score -= 6;
  }
  return score;
}
function reasonFor(topic) {
  const chosen = [...selected].map((id) => Object.values(optionGroups).flat().find((option) => option.id === id)).filter(Boolean);
  const hits = [];
  chosen.forEach((option) => { if (optionScore(topic, option) > 0) hits.push(option.label); });
  if (!hits.length) return topic.bestFor;
  return `匹配 ${hits.slice(0, 3).join("、")}。${topic.bestFor}`;
}
function matchLevel(score) {
  if (score >= 16) return "高匹配";
  if (score >= 8) return "可考虑";
  return "备选";
}
function createChoice(option) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "choice";
  const note = [...option.audiences, ...option.skills].slice(0, 2).join(" / ");
  button.innerHTML = `<span class="choice-title">${option.label}</span><span class="choice-note">${note}</span>`;
  button.addEventListener("click", () => {
    if (selected.has(option.id)) {
      selected.delete(option.id);
      button.classList.remove("active");
    } else {
      selected.add(option.id);
      button.classList.add("active");
    }
    updateHint();
  });
  return button;
}
function mountChoices() {
  optionGroups.audience.forEach((option) => $("audienceChoices").appendChild(createChoice(option)));
  optionGroups.work.forEach((option) => $("workChoices").appendChild(createChoice(option)));
  optionGroups.value.forEach((option) => $("valueChoices").appendChild(createChoice(option)));
}
function updateHint() {
  const query = $("searchInput").value.trim();
  $("selectionHint").textContent = `已选择 ${selected.size} 个偏好${query ? "，并添加关键词" : ""}`;
}
function rankedTopics(limit = 6) {
  const query = $("searchInput").value.trim();
  const ranked = topics.map((topic) => ({ topic, score: scoreTopic(topic) }));
  const filtered = (selected.size || query) ? ranked.filter((item) => item.score > 0) : ranked;
  return filtered.sort((a, b) => b.score - a.score || a.topic.no.localeCompare(b.topic.no, "zh-CN")).slice(0, limit);
}
function coverTone(topic) {
  const tones = ["tone-ai", "tone-city", "tone-public", "tone-rural", "tone-health", "tone-industry", "tone-commerce", "tone-tectonic"];
  const index = Number.parseInt(topic.no, 10) || 0;
  return tones[index % tones.length];
}
function coverMarkup(topic) {
  const tags = (topic.keywords || []).slice(0, 2).map((item) => `<span>${item}</span>`).join("");
  return `<div class="topic-cover ${coverTone(topic)}"><div class="cover-no">${topic.no}</div><div class="cover-title">${topic.title}</div><div class="cover-tags">${tags}</div></div>`;
}
function card(item) {
  const { topic, score } = item;
  const node = document.createElement("article");
  node.className = "card";
  node.tabIndex = 0;
  node.setAttribute("role", "button");
  node.setAttribute("aria-label", `查看 ${topic.title}`);
  node.innerHTML = `${coverMarkup(topic)}<div class="card-body"><div class="meta-row"><span>选题 ${topic.no}</span><span class="match-badge">${showAllMode ? "全部" : matchLevel(score)}</span></div><h3>${topic.title}</h3><p class="reason">${showAllMode ? topic.bestFor : reasonFor(topic)}</p><div class="tag-row">${topic.audiences.slice(0, 3).map((item) => `<span class="tag">${item}</span>`).join("")}</div></div>`;
  node.addEventListener("click", () => openDrawer(topic));
  node.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); openDrawer(topic); } });
  return node;
}
function renderResults(items, mode) {
  const cards = $("cards");
  cards.innerHTML = "";
  $("results").classList.remove("waiting");
  if (!items.length) {
    $("resultTitle").textContent = "没有找到合适结果";
    $("resultText").textContent = "减少一个偏好，或换一个关键词再试。";
    cards.innerHTML = `<div class="empty-state">当前组合过窄，没有题目同时满足。建议保留 2 到 4 个关键偏好。</div>`;
    return;
  }
  $("resultTitle").textContent = mode === "all" ? "全部题目" : `为你推荐 ${items.length} 个题目`;
  $("resultText").textContent = mode === "all" ? "下面按原始编号展示全部题目，适合横向浏览。" : `根据 ${selected.size} 个偏好${$("searchInput").value.trim() ? "和关键词" : ""}排序，优先展示匹配度更高的选项。`;
  items.forEach((item) => cards.appendChild(card(item)));
  $("results").scrollIntoView({ behavior: "smooth", block: "start" });
}
function generate() { showAllMode = false; renderResults(rankedTopics(6), "recommend"); }
function showAll() {
  showAllMode = true;
  const all = topics.map((topic) => ({ topic, score: 0 })).sort((a, b) => a.topic.no.localeCompare(b.topic.no, "zh-CN"));
  renderResults(all, "all");
}
function resetAll() {
  selected.clear();
  document.querySelectorAll(".choice.active").forEach((item) => item.classList.remove("active"));
  $("searchInput").value = "";
  updateHint();
  $("results").classList.add("waiting");
  $("resultTitle").textContent = "等待生成推荐";
  $("resultText").textContent = "选几个方向后点击按钮，这里会弹出最适合你的题目。";
  $("cards").innerHTML = "";
}
function detail(label, value) { return `<div class="detail-item"><span>${label}</span>${value}</div>`; }
function openDrawer(topic) {
  $("drawerCover").className = `drawer-cover topic-cover ${coverTone(topic)}`;
  $("drawerCover").innerHTML = coverMarkup(topic).replace(/^<div class="topic-cover [^"]+">|<\/div>$/g, "");
  $("drawerNo").textContent = `选题 ${topic.no} / ${topic.team}`;
  $("drawerTitle").textContent = topic.title;
  $("drawerSubtitle").textContent = topic.subtitle;
  $("detailGrid").innerHTML = [
    detail("指导教师", topic.teachers), detail("招生", topic.quota), detail("类型", topic.type.join("、")), detail("性质", topic.nature.join("、")),
    detail("规模", topic.scale), detail("工作形式", topic.workMode), detail("综合难度", `${avgDifficulty(topic)} / 5`), detail("关键词", topic.keywords.join("、"))
  ].join("");
  $("drawerSummary").textContent = topic.summary;
  $("drawerBest").textContent = topic.bestFor;
  $("drawerCaution").textContent = topic.caution;
  $("drawerDeliverables").textContent = topic.deliverables;
  $("sourceList").innerHTML = topic.sourceFiles.map((item) => `<li>${item}</li>`).join("");
  $("drawer").classList.add("open");
  $("drawer").setAttribute("aria-hidden", "false");
}
function closeDrawer() { $("drawer").classList.remove("open"); $("drawer").setAttribute("aria-hidden", "true"); }
function init() {
  mountChoices(); updateHint();
  $("generateBtn").addEventListener("click", generate);
  $("showAll").addEventListener("click", showAll);
  $("resetAll").addEventListener("click", resetAll);
  $("searchInput").addEventListener("input", updateHint);
  document.querySelectorAll("[data-close]").forEach((item) => item.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawer(); });
}
init();
