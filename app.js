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
function matchMeta(score, allMode = false) {
  if (allMode) return { label: "全部", className: "match-all", edge: "#d6d1c4", shadow: "0 16px 36px rgba(23,25,22,.08)" };
  if (score >= 16) return { label: "高匹配", className: "match-high", edge: "#2e8b62", shadow: "0 18px 42px rgba(46,139,98,.18)" };
  if (score >= 8) return { label: "可考虑", className: "match-mid", edge: "#d88935", shadow: "0 18px 42px rgba(216,137,53,.18)" };
  return { label: "备选", className: "match-low", edge: "#9a978b", shadow: "0 16px 34px rgba(92,91,84,.12)" };
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
function coverKind(topic) {
  const title = topic.title || "";
  const audiences = topic.audiences || [];
  const skills = topic.skills || [];
  if (skills.includes("医疗流程") || audiences.includes("医疗康养型") || title.includes("医院") || title.includes("康养")) return "health";
  if (skills.includes("机场总图") || title.includes("航站楼") || title.includes("机场")) return "terminal";
  if (skills.includes("产业园规划") || skills.includes("工业流程") || audiences.includes("产业技术型")) return "industry";
  if (audiences.includes("乡村地域型") || title.includes("乡村") || title.includes("水寨") || title.includes("村")) return "rural";
  if (skills.includes("木构建构") || skills.includes("材料构造") || audiences.includes("建构技术型")) return "tectonic";
  if (audiences.includes("教育建筑型") || title.includes("校园") || title.includes("中学") || title.includes("党校")) return "campus";
  if (audiences.includes("商业策划型") || skills.includes("商业策划") || title.includes("商业")) return "commerce";
  if (audiences.includes("城市更新型") || skills.includes("存量更新") || skills.includes("旧厂房改造")) return "renewal";
  if (audiences.includes("AI/技术工具型") || skills.includes("AI辅助")) return "ai";
  return "public";
}
function coverPalette(kind, topic) {
  const palettes = {
    ai: ["#153f3a", "#9bbb7d", "#e5d7a8"], renewal: ["#243238", "#a58b62", "#d55d3d"], public: ["#2f435c", "#d18b57", "#efe4c9"], rural: ["#31513b", "#c9a75d", "#8fb49b"],
    health: ["#416a6f", "#b8d4cf", "#8e6d93"], industry: ["#363a42", "#c96542", "#d5d1bd"], commerce: ["#4a3d39", "#c19355", "#f1ddaf"],
    tectonic: ["#2e4138", "#b69465", "#d7ccb4"], campus: ["#314a64", "#d0a64f", "#b7c7a0"], terminal: ["#2d3d4d", "#c86f48", "#d9d9d2"]
  };
  const base = palettes[kind] || palettes.public;
  const shift = (Number.parseInt(topic.no, 10) || 0) % 3;
  return [base[shift], base[(shift + 1) % 3], base[(shift + 2) % 3]];
}
function coverSvg(topic) {
  const kind = coverKind(topic);
  const [dark, mid, light] = coverPalette(kind, topic);
  const seed = Number.parseInt(topic.no, 10) || 1;
  const building = `<rect x="70" y="104" width="84" height="68" rx="4" fill="${light}" opacity=".95"/><rect x="170" y="82" width="116" height="90" rx="6" fill="${mid}" opacity=".96"/><rect x="306" y="112" width="86" height="60" rx="4" fill="${light}" opacity=".9"/>${Array.from({length: 11}, (_, i) => `<rect x="${188 + (i % 4) * 21}" y="${100 + Math.floor(i / 4) * 19}" width="9" height="8" rx="2" fill="${dark}" opacity=".32"/>`).join("")}`;
  const trees = `<circle cx="58" cy="145" r="19" fill="${mid}"/><rect x="54" y="148" width="8" height="30" fill="${dark}" opacity=".45"/><circle cx="426" cy="142" r="18" fill="${light}"/><rect x="422" y="145" width="8" height="31" fill="${dark}" opacity=".42"/>`;
  const scenes = {
    ai: `${building}<path d="M85 75h85m-43-42v84M324 64h70m-35-34v68" stroke="${light}" stroke-width="5" stroke-linecap="round" opacity=".8"/><circle cx="127" cy="75" r="20" fill="none" stroke="${light}" stroke-width="5" opacity=".72"/><circle cx="359" cy="64" r="18" fill="none" stroke="${light}" stroke-width="5" opacity=".72"/>`,
    renewal: `<path d="M58 158c48-38 96-38 144 0s96 38 144 0 76-36 104-12" fill="none" stroke="${light}" stroke-width="14" opacity=".35"/>${building}<rect x="88" y="62" width="66" height="82" fill="none" stroke="${light}" stroke-width="5" opacity=".75"/><path d="M91 82h60M91 103h60M91 124h60" stroke="${light}" stroke-width="3" opacity=".65"/>`,
    public: `${building}<path d="M52 174h400" stroke="${dark}" stroke-width="10" opacity=".28"/><path d="M230 46l126 55H104z" fill="${light}" opacity=".9"/><path d="M125 105v65M168 105v65M211 105v65M254 105v65M297 105v65M340 105v65" stroke="${dark}" stroke-width="8" opacity=".32"/>`,
    rural: `<path d="M0 146c62-36 128-36 190 0s120 38 170 4 96-32 140 0v78H0z" fill="${light}" opacity=".38"/><path d="M72 112l58-38 58 38v62H72zM246 124l52-34 52 34v50H246z" fill="${mid}"/><path d="M72 112h116M246 124h104" stroke="${light}" stroke-width="8"/><rect x="100" y="137" width="28" height="37" fill="${dark}" opacity=".36"/>${trees}`,
    health: `${building}<rect x="222" y="72" width="56" height="56" rx="12" fill="${light}"/><path d="M250 86v28M236 100h28" stroke="${dark}" stroke-width="9" stroke-linecap="round"/><path d="M62 176c86-56 145-56 231 0 52 34 95 29 145-14" fill="none" stroke="${light}" stroke-width="12" opacity=".38"/>`,
    terminal: `<path d="M58 147h384" stroke="${light}" stroke-width="16" opacity=".7"/><path d="M92 96h228c43 0 78 29 86 67H92z" fill="${mid}"/><path d="M112 116h250" stroke="${light}" stroke-width="9" opacity=".72"/><path d="M244 58l126 36-126 21-90-20z" fill="${light}" opacity=".88"/>`,
    industry: `${building}<path d="M66 176h370" stroke="${dark}" stroke-width="12" opacity=".28"/><path d="M82 124l36-24 36 24 36-24 36 24v48H82z" fill="${light}" opacity=".9"/><rect x="328" y="64" width="32" height="108" fill="${mid}"/><path d="M344 58c24-24 54-12 58 14" fill="none" stroke="${light}" stroke-width="7" opacity=".6"/>`,
    commerce: `${building}<path d="M70 94h360v48c-29 16-57 16-86 0-29 16-57 16-86 0-29 16-57 16-86 0-34 17-66 15-102 0z" fill="${light}"/><path d="M108 142v30M188 142v30M268 142v30M348 142v30" stroke="${dark}" stroke-width="7" opacity=".25"/>`,
    tectonic: `<path d="M74 174L176 54l102 120M180 174L282 54l102 120" fill="none" stroke="${light}" stroke-width="12" stroke-linejoin="round"/><path d="M118 122h224M146 92h164M92 152h280" stroke="${mid}" stroke-width="10" opacity=".95"/>${trees}`,
    campus: `${building}<path d="M96 174V94l84-36 84 36v80M264 174V104h120v70" fill="none" stroke="${light}" stroke-width="10"/><circle cx="180" cy="94" r="18" fill="${mid}"/><path d="M54 176h392" stroke="${dark}" stroke-width="12" opacity=".22"/>`
  };
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 338" role="img" aria-label="${topic.title}封面"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${dark}"/><stop offset="1" stop-color="${mid}"/></linearGradient><radialGradient id="sun" cx="84%" cy="18%" r="38%"><stop stop-color="${light}" stop-opacity=".72"/><stop offset="1" stop-color="${light}" stop-opacity="0"/></radialGradient></defs><rect width="500" height="338" fill="url(#g)"/><rect width="500" height="338" fill="url(#sun)"/><path d="M0 214c68-34 130-34 186 0s108 34 158 0 98-34 156 0v124H0z" fill="${dark}" opacity=".2"/><g transform="translate(${seed % 2 ? 0 : 10} 50)">${scenes[kind] || scenes.public}</g><path d="M30 42h118M30 66h76" stroke="${light}" stroke-width="8" stroke-linecap="round" opacity=".55"/><circle cx="428" cy="58" r="28" fill="none" stroke="${light}" stroke-width="6" opacity=".45"/></svg>`;
}
function coverSrc(topic) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(coverSvg(topic))}`;
}
function escapeAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}
function sourceSummary(topic) {
  const files = topic.sourceFiles || [];
  const hasBrief = files.some((name) => name.includes("简表") || name.includes("推介表") || name.includes("申报表"));
  const hasIntroPdf = files.some((name) => name.toLowerCase().endsWith(".pdf") && !(name.includes("简表") || name.includes("推介表") || name.includes("申报表")));
  const kinds = [];
  if (hasBrief) kinds.push("教师推介简表");
  if (hasIntroPdf) kinds.push("题目介绍 PDF");
  if (!kinds.length && files.length) kinds.push("原始选题材料");
  const merged = files.length > 1 ? "已合并同一选题的重复材料" : "已按单份材料摘要";
  return `来源：${kinds.join(" + ")}（${files.length || 1} 份材料）。${merged}；网页保留题名、教师、规模、工作方式、成果要求和关键词等可核对信息，适合人群与慎选提示为基于材料的二次归纳。`;
}
function materialDigest(topic) {
  const skillText = topic.skills.slice(0, 6).join("、");
  const typeText = [...topic.type, ...topic.nature].join("、");
  const audienceText = topic.audiences.slice(0, 4).join("、");
  return `<div class="digest-grid"><div class="digest-card"><span>材料对象</span><p>${topic.subtitle}。材料给出的规模口径为：${topic.scale}。</p></div><div class="digest-card"><span>任务结构</span><p>${topic.workMode}。题目类型集中在：${typeText}。</p></div><div class="digest-card"><span>产出要求</span><p>${topic.deliverables}</p></div><div class="digest-card"><span>能力依据</span><p>从题目要求归纳出的核心能力是：${skillText}。推荐人群暂归为：${audienceText}。</p></div></div><p class="digest-main">${topic.summary}</p><p class="digest-note">${sourceSummary(topic)}</p>`;
}
function card(item) {
  const { topic, score } = item;
  const node = document.createElement("article");
  const meta = matchMeta(score, showAllMode);
  node.className = `card ${meta.className}`;
  node.style.borderColor = meta.edge;
  node.style.boxShadow = meta.shadow;
  node.tabIndex = 0;
  node.setAttribute("role", "button");
  node.setAttribute("aria-label", `查看 ${topic.title}`);
  node.innerHTML = `<img src="${coverSrc(topic)}" alt="${escapeAttr(topic.title)} 封面" loading="lazy" style="display:block;width:100%;aspect-ratio:1.48;object-fit:cover;background:#ebe7dc"><div class="card-body"><div class="meta-row"><span>选题 ${topic.no}</span><span class="match-badge ${meta.className}">${meta.label}</span></div><h3>${topic.title}</h3><p class="reason">${showAllMode ? topic.bestFor : reasonFor(topic)}</p><div class="tag-row">${topic.audiences.slice(0, 3).map((item) => `<span class="tag">${item}</span>`).join("")}</div></div>`;
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
  $("resultText").textContent = mode === "all" ? "下面按原始编号展示全部题目，适合横向浏览。" : `根据 ${selected.size} 个偏好${$("searchInput").value.trim() ? "和关键词" : ""}排序，绿色为高匹配，橙色为可考虑，灰色为备选。`;
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
  const drawerCover = $("drawerCover");
  drawerCover.src = coverSrc(topic);
  drawerCover.alt = `${topic.title} 封面`;
  drawerCover.style.objectFit = "cover";
  $("drawerNo").textContent = `选题 ${topic.no} / ${topic.team}`;
  $("drawerTitle").textContent = topic.title;
  $("drawerSubtitle").textContent = topic.subtitle;
  $("detailGrid").innerHTML = [
    detail("指导教师", topic.teachers), detail("招生", topic.quota), detail("类型", topic.type.join("、")), detail("性质", topic.nature.join("、")),
    detail("规模", topic.scale), detail("工作形式", topic.workMode), detail("综合难度", `${avgDifficulty(topic)} / 5`), detail("关键词", topic.keywords.join("、"))
  ].join("");
  $("drawerSummary").innerHTML = materialDigest(topic);
  $("drawerBest").textContent = topic.bestFor;
  $("drawerCaution").textContent = topic.caution;
  $("drawerDeliverables").textContent = topic.deliverables;
  $("sourceList").textContent = sourceSummary(topic);
  $("drawer").classList.add("open");
  $("drawer").setAttribute("aria-hidden", "false");
}
function closeDrawer() { $("drawer").classList.remove("open"); $("drawer").setAttribute("aria-hidden", "true"); }
function injectEnhancementStyles() {
  if (document.getElementById("enhancementStyles")) return;
  const style = document.createElement("style");
  style.id = "enhancementStyles";
  style.textContent = `.match-badge.match-high{background:#2e8b62;color:#fff}.match-badge.match-mid{background:#d88935;color:#fff}.match-badge.match-low{background:#7f8279;color:#fff}.match-badge.match-all{background:#373a33;color:#fff}.card.match-high{background:linear-gradient(180deg,#fffdf9,#f6fbf6)}.card.match-mid{background:linear-gradient(180deg,#fffdf9,#fff7ed)}.card.match-low{background:linear-gradient(180deg,#fffdf9,#f5f4ef)}.digest-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;margin-bottom:14px}.digest-card{padding:13px 14px;border:1px solid var(--line);border-radius:16px;background:#f7f4ec}.digest-card span{display:block;margin-bottom:6px;color:var(--ink);font-size:12px;font-weight:900}.digest-card p{margin:0;color:var(--muted);line-height:1.72}.digest-main{margin:14px 0 0;color:var(--ink)!important}.digest-note{margin-top:12px;padding:12px 14px;border-left:4px solid var(--accent);background:#f2f0e8;color:#55584f!important}.drawer-content #sourceList{font-size:13px;color:#73766d}@media(max-width:680px){.digest-grid{grid-template-columns:1fr}}`;
  document.head.appendChild(style);
}
function init() {
  injectEnhancementStyles();
  mountChoices(); updateHint();
  $("generateBtn").addEventListener("click", generate);
  $("showAll").addEventListener("click", showAll);
  $("resetAll").addEventListener("click", resetAll);
  $("searchInput").addEventListener("input", updateHint);
  document.querySelectorAll("[data-close]").forEach((item) => item.addEventListener("click", closeDrawer));
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeDrawer(); });
}
init();