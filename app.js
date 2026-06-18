const data = window.TOPIC_DATA;
const topics = data.topics;
const optionGroups = {
  audience: [{"id": "ai", "label": "AI / 数字工具", "audiences": ["AI/技术工具型"], "skills": ["AI辅助", "绿色分析"]}, {"id": "renewal", "label": "城市更新 / 存量改造", "audiences": ["城市更新型", "历史更新型"], "skills": ["存量更新", "旧厂房改造", "改扩建", "街区调研"]}, {"id": "public", "label": "公共建筑 / 复杂功能", "audiences": ["公共建筑型", "大型公建型", "交通建筑型", "教育建筑型"], "skills": ["复杂流线", "功能分区", "公共建筑", "高大空间"]}, {"id": "rural", "label": "乡村地域 / 文旅", "audiences": ["乡村地域型", "文旅策划型", "地域气候型"], "skills": ["乡村调研", "地域文化", "文旅策划"]}, {"id": "health", "label": "医疗康养 / 适老", "audiences": ["医疗康养型", "适老设计型"], "skills": ["医疗流程", "康养建筑", "适老设计", "无障碍"]}, {"id": "industry", "label": "产业园 / 工业技术", "audiences": ["产业技术型", "办公研发型"], "skills": ["产业园规划", "工业流程", "大跨结构", "研发建筑"]}, {"id": "commerce", "label": "商业策划 / 运营", "audiences": ["商业策划型", "商业场景型", "运营逻辑型"], "skills": ["商业策划", "业态组合", "社区运营"]}, {"id": "tectonic", "label": "建构结构 / 材料", "audiences": ["建构技术型", "结构系统型", "结构空间型"], "skills": ["木构建构", "结构设计", "材料构造", "材料表皮"]}],
  work: [{"id": "research", "label": "我愿意大量调研", "audiences": [], "skills": ["现场调研", "街区调研", "社区调研", "乡村调研", "现状测绘", "行为观察"]}, {"id": "solo", "label": "更想做单体深化", "audiences": [], "skills": ["建筑设计", "空间组织", "结构设计", "细部表达", "界面设计"]}, {"id": "city", "label": "想做城市设计", "audiences": ["城市设计型", "规划建筑贯通型"], "skills": ["城市设计", "总平组织", "街区调研"]}, {"id": "joint", "label": "能接受联合毕设", "audiences": ["联合协作型"], "skills": ["跨专业协作", "跨校协作"]}, {"id": "rules-light", "label": "尽量少碰复杂规范", "audiences": ["小尺度深化型", "场景体验型"], "skills": ["文旅策划", "商业策划", "社区运营"]}, {"id": "rules-heavy", "label": "能接受复杂规范", "audiences": ["规范强化型", "工程实践型"], "skills": ["规范理解", "医疗流程", "机场总图", "工业流程"]}],
  value: [{"id": "visual", "label": "希望成果表达好看", "audiences": ["模型表达型", "空间氛围型"], "skills": ["图文表达", "模型表达", "表达建模"]}, {"id": "green", "label": "关注绿色低碳", "audiences": ["绿色低碳型"], "skills": ["绿色策略", "绿色低碳", "气候适应"]}, {"id": "culture", "label": "喜欢文化叙事", "audiences": ["文化策展型", "地域建筑型", "公共文化型"], "skills": ["策展策划", "地域文化", "公共文化建筑"]}, {"id": "practical", "label": "偏真实项目和就业", "audiences": ["工程实践型", "运营逻辑型"], "skills": ["工程逻辑", "报规表达", "规范理解", "用户需求"]}]
};
const designNotes = {
  "fengxiang-ai-culture": "本题以凤翔生态文化艺术中心为核心，不是单纯完成展馆造型，而是把地域文化展示、生态景观组织、AI 与绿色计算分析结合起来。设计需要从片区策划进入，建立文化叙事、参观流线、公共开放空间和重点建筑之间的关系，最终形成具有方法验证和空间表达双重成果的公共文化建筑方案。",
  "underground-granary": "本题面对 1970 年代地下覆土粮库和库区存量空间，重点在于判断哪些结构、窑洞、仓体和礼堂可以保留、改造或转译。设计需要以踏勘测绘和功能再策划为基础，把粮仓的地下空间特征转化为文教、科研或公共活动场景，同时处理库区整体更新和局部建筑深化。",
  "yulin-party-school": "本题是 13.47 公顷、约 6.5 万平方米的大型党校校园设计，任务不只是排布教学楼，而是组织培训、行政、住宿、体育和室外活动等多个系统。设计说明应围绕山水格局、红色文化、校园轴线和分区秩序展开，最终形成总体规划与核心建筑群并重的公共教育建筑方案。",
  "middle-school-campus": "本题以高考改革、走班教学和跨学科学习为背景，要求从教学行为变化推导校园空间。设计需要先回答普通教室、共享学习、实验活动、社团空间和生活服务如何重新组织，再落实到 141 亩校园总平和教学楼单体，重点考验功能适应性、交通疏散和工程表达。",
  "medical-complex": "本题基于陕西省交通医院真实任务，500 床、约 5.8 万平方米，核心难点在医疗系统组织。设计需要统筹门急诊、医技、住院、科研教学、后勤物流和疗愈环境，重点不是外形创新，而是让洁污、医患、探视、物流等流线清楚可靠，并通过绿色节能和疗愈空间提升医院体验。",
  "child-friendly-community": "本题以西安铁路局社区为对象，从儿童友好和校社共融切入，关注学校边界、通学路径、公共服务补足和一老一小活动需求。设计需要在约 50 公顷社区尺度上完成问题诊断，再选择校前空间、慢行节点、公服建筑或共享设施进行深化，属于调研驱动的社区更新题。",
  "xinjiang-culture-sports": "本题位于新疆图木舒克，要求在强日照、干旱、昼夜温差大的气候条件下完成文体活动中心。设计不能只套用常规公共建筑，而要把遮阳、通风、庭院、厚重界面和地域文化表达结合起来，组织展览、图书、文化活动和体育空间，形成气候适应性明确的公共建筑方案。",
  "marseille-wood-structure": "本题以马赛海边舞场再建为对象，核心不是普通滨海小建筑，而是研究木构体系如何支撑公共活动、海边停留和半露天舞场氛围。设计需要从结构逻辑、节点构造、材料表达和场所体验同步推进，成果会更依赖模型、构造图和空间氛围表达，适合愿意深入建构的同学。",
  "new-energy-industrial-park": "本题基于新能源汽车产业园，规模约 16 公顷、计容 12 万平方米，重点是把工业生产、研发展示、办公配套和生活服务组织成完整园区。设计需要理解生产流程、物流关系、厂房尺度和大跨结构，再通过绿色低碳策略与复合功能提升产业园形象，属于工程逻辑很强的产业建筑题。",
  "hangzhou-bio-rd": "本题聚焦杭州南湖生物科技研发中心，处在工业建筑、办公建筑和展示建筑之间。设计重点是让研发、办公、公共交流、产业展示和园区界面形成集约共生关系，而不是做普通写字楼。方案需要回应真实项目的效率、灵活性和科技形象，适合想做产业研发但不想进入纯厂房逻辑的同学。",
  "huatugou-terminal": "本题是青海花土沟机场约 1 万平方米绿色航站楼设计，重点在交通建筑流线和地域环境回应。设计需要同时处理陆侧到空侧、旅客到达离港、行李、安检、候机和运营服务关系，并结合高原或西北地区气候、绿色策略和结构表达形成清晰的航站楼本体方案。",
  "community-commerce-ai": "本题从社区商业的经营逻辑出发，强调先做策划再做建筑。设计需要研究服务半径、消费人群、业态组合、动线组织、界面门头和场景体验，并把 AI 用于调研分析、方案推演或表达优化。它适合希望补足商业运营思维的同学，不适合只想做空间造型的人。",
  "liyuan-furniture-factory": "本题以长安区立元村老旧家具厂为对象，把村办厂房、乡村公共服务和文旅运营放在一起考虑。设计需要通过村落调研确定更新定位，再把旧厂房改造成公服中心、民宿、展销或活动空间，并处理新建约 1500 平方米与改造约 2000 平方米之间的关系，是小尺度但需要策划深度的题。",
  "xian-stock-commercial": "本题关注西安低效商业空间和历史街巷商业的场景化更新，尺度在 10 到 30 公顷之间。设计重点不是做封闭商业综合体，而是通过业态重组、街道断面、公共节点、界面改造和运营场景，让存量空间恢复开放性、日常性和烟火气，适合愿意反复现场调研的同学。",
  "uc4-mudu-hongkong-street": "本题是 UC4+ 跨校跨专业联合毕设，以苏州木渎镇香港街片区为基地，要求在 1 到 2 平方公里范围内完成整体城市设计，再选择约 5 公顷重点地段和 5000 到 30000 平方米建筑深化。它的价值在于真实协作和城市设计训练，难点在时间节点、团队分工和成果整合。",
  "five-school-rural": "本题依托全国五校乡村联合平台，以山东青岛琅琊镇乡村为对象，要求从整村产业、空间结构、公共节点到个人建筑设计形成连续成果。设计不是只做一个乡村单体，而是要把调研报告、村庄规划、节点更新和 2000 到 5000 平方米建筑深化串联起来，协作和文本工作量较高。",
  "healthy-aging-campus": "本题属于大健康建筑联合毕设，以武汉核心区老校区更新为基础，植入康养、文化、商业、社区配套和适老居住等复合功能。设计需要先完成约 5 公顷城市设计判断，再深化 3000 到 8000 平方米个人建筑，重点是老年人需求、无障碍、适老单元和存量更新的综合处理。",
  "bameng-water-village": "本题以贵州黔东南榕江八蒙水寨为对象，关注水族干栏民居、滨水聚落和非遗资源活化。设计应从村寨肌理、滨水交通、传统材料和民俗活动出发，通过微改造植入非遗工坊、民宿、展示和体验业态，在保护传统空间格局的同时建立可运营的农文旅更新方案。",
  "workers-cultural-palace": "本题位于西安城区尚平路与西七路交汇，面对闲置工人文化宫、既有办公楼和礼堂等存量资源。设计需要把低效文化活动用地转化为社区活力中心，处理改扩建、公共界面、邻里服务、历史周边关系和运营复合性，适合想做中心城区公共文化更新的同学。"
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
function tierFor(index, mode) {
  if (mode === "all") return { label: "浏览", className: "tier-all", percent: 0, edge: "#d6d1c4", rank: "" };
  if (index < 2) return { label: "强推荐", className: "tier-strong", percent: index === 0 ? 96 : 91, edge: "#1f8a5b", rank: `TOP ${index + 1}` };
  if (index < 4) return { label: "可考虑", className: "tier-consider", percent: index === 2 ? 78 : 72, edge: "#d9842f", rank: `TOP ${index + 1}` };
  return { label: "备选", className: "tier-backup", percent: index === 4 ? 55 : 48, edge: "#8a8f86", rank: `TOP ${index + 1}` };
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
function coverSrc(topic) {
  const kind = coverKind(topic);
  const palettes = {
    ai: ["#143e3a", "#95b77a", "#ead9a5"], renewal: ["#253238", "#a8875a", "#d8623f"], public: ["#30445e", "#d08b57", "#efe4c9"], rural: ["#31533c", "#c7a65c", "#8fb49b"],
    health: ["#416a6f", "#b8d4cf", "#8e6d93"], industry: ["#363a42", "#c96542", "#d5d1bd"], commerce: ["#4a3d39", "#c19355", "#f1ddaf"], tectonic: ["#2e4138", "#b69465", "#d7ccb4"], campus: ["#314a64", "#d0a64f", "#b7c7a0"], terminal: ["#2d3d4d", "#c86f48", "#d9d9d2"]
  };
  const [dark, mid, light] = palettes[kind] || palettes.public;
  const building = `<rect x="72" y="118" width="96" height="70" rx="5" fill="${light}" opacity=".92"/><rect x="190" y="88" width="120" height="100" rx="7" fill="${mid}" opacity=".95"/><rect x="332" y="126" width="78" height="62" rx="5" fill="${light}" opacity=".86"/>`;
  const scenes = {
    rural: `<path d="M0 170c70-38 120-38 190 0s120 36 174 0 92-30 136 0v95H0z" fill="${light}" opacity=".36"/><path d="M86 124l54-36 54 36v64H86zM266 132l48-32 48 32v56h-96z" fill="${mid}"/><path d="M86 124h108M266 132h96" stroke="${light}" stroke-width="8"/>`,
    terminal: `<path d="M60 164h380" stroke="${light}" stroke-width="16" opacity=".75"/><path d="M92 110h230c42 0 78 28 88 66H92z" fill="${mid}"/><path d="M235 62l132 40-132 20-90-20z" fill="${light}" opacity=".9"/>`,
    industry: `${building}<path d="M82 142l34-24 34 24 34-24 34 24v46H82z" fill="${light}"/><rect x="338" y="72" width="34" height="116" fill="${mid}"/><path d="M354 66c24-22 52-12 58 12" fill="none" stroke="${light}" stroke-width="7" opacity=".6"/>`,
    health: `${building}<rect x="220" y="72" width="60" height="60" rx="14" fill="${light}"/><path d="M250 88v28M236 102h28" stroke="${dark}" stroke-width="9" stroke-linecap="round"/>`,
    tectonic: `<path d="M76 190L178 64l102 126M184 190L286 64l102 126" fill="none" stroke="${light}" stroke-width="12"/><path d="M112 140h250M142 106h182M92 172h300" stroke="${mid}" stroke-width="10"/>`,
    commerce: `${building}<path d="M70 108h360v46c-30 16-60 16-90 0-30 16-60 16-90 0-30 16-60 16-90 0-34 17-66 15-90 0z" fill="${light}"/>`,
    campus: `${building}<path d="M94 188V102l86-38 86 38v86M266 188V116h124v72" fill="none" stroke="${light}" stroke-width="10"/>`,
    renewal: `${building}<rect x="88" y="72" width="68" height="90" fill="none" stroke="${light}" stroke-width="5"/><path d="M92 95h60M92 118h60M92 141h60" stroke="${light}" stroke-width="3"/>`,
    ai: `${building}<path d="M92 82h80m-40-38v76M328 78h72m-36-34v68" stroke="${light}" stroke-width="5"/><circle cx="132" cy="82" r="22" fill="none" stroke="${light}" stroke-width="5"/>`,
    public: `${building}<path d="M230 58l130 58H100z" fill="${light}"/><path d="M124 122v66M166 122v66M208 122v66M250 122v66M292 122v66M334 122v66" stroke="${dark}" stroke-width="8" opacity=".32"/>`
  };
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 338"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="${dark}"/><stop offset="1" stop-color="${mid}"/></linearGradient><radialGradient id="sun" cx="82%" cy="16%" r="40%"><stop stop-color="${light}" stop-opacity=".72"/><stop offset="1" stop-color="${light}" stop-opacity="0"/></radialGradient></defs><rect width="500" height="338" fill="url(#g)"/><rect width="500" height="338" fill="url(#sun)"/><path d="M0 230c70-34 132-34 188 0s108 34 158 0 96-34 154 0v108H0z" fill="${dark}" opacity=".2"/><g transform="translate(0 42)">${scenes[kind] || scenes.public}</g><path d="M30 42h118M30 66h76" stroke="${light}" stroke-width="8" stroke-linecap="round" opacity=".55"/><circle cx="428" cy="58" r="28" fill="none" stroke="${light}" stroke-width="6" opacity=".45"/></svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
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
  return `来源：${kinds.join(" + ")}（${files.length || 1} 份材料）。${merged}；适合人群与慎选提示为基于材料的二次归纳。`;
}
function designStatement(topic) {
  return designNotes[topic.id] || `${topic.subtitle}。本题规模为${topic.scale}，工作方式是${topic.workMode}。设计需要围绕${topic.keywords.slice(0, 4).join("、")}建立任务判断，并完成${topic.deliverables}`;
}
function materialDigest(topic) {
  const skillText = topic.skills.slice(0, 6).join("、");
  const audienceText = topic.audiences.slice(0, 4).join("、");
  return `<p class="design-statement">${designStatement(topic)}</p><div class="evidence-row"><span>规模：${topic.scale}</span><span>工作：${topic.workMode}</span><span>能力：${skillText}</span><span>人群：${audienceText}</span></div><p class="digest-note">${sourceSummary(topic)}</p>`;
}
function card(item, index, mode) {
  const { topic, score } = item;
  const tier = tierFor(index, mode);
  const node = document.createElement("article");
  node.className = `card ${tier.className}`;
  node.style.borderColor = tier.edge;
  node.tabIndex = 0;
  node.setAttribute("role", "button");
  node.setAttribute("aria-label", `查看 ${topic.title}`);
  const meter = mode === "all" ? "" : `<div class="match-meter"><span style="width:${tier.percent}%"></span></div><div class="match-caption"><strong>${tier.percent}</strong><span>推荐指数</span></div>`;
  node.innerHTML = `<div class="rank-flag">${tier.rank || "浏览"}</div><img src="${coverSrc(topic)}" alt="${escapeAttr(topic.title)} 封面" loading="lazy" style="display:block;width:100%;aspect-ratio:1.48;object-fit:cover;background:#ebe7dc"><div class="card-body"><div class="meta-row"><span>选题 ${topic.no}</span><span class="match-badge ${tier.className}">${tier.label}</span></div>${meter}<h3>${topic.title}</h3><p class="reason">${showAllMode ? topic.bestFor : reasonFor(topic)}</p><div class="tag-row">${topic.audiences.slice(0, 3).map((item) => `<span class="tag">${item}</span>`).join("")}</div></div>`;
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
  $("resultTitle").textContent = mode === "all" ? "全部题目" : `推荐结果：强推荐 ${Math.min(2, items.length)} 个`;
  $("resultText").textContent = mode === "all" ? "下面按原始编号展示全部题目，适合横向浏览。" : `按当前偏好排序后，前两项会被明确标成强推荐，第三四项为可考虑，后面作为备选。颜色和推荐指数用于强化差异，不代表官方排名。`;
  items.forEach((item, index) => cards.appendChild(card(item, index, mode)));
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
  style.textContent = `.card{position:relative}.rank-flag{position:absolute;top:12px;left:12px;z-index:2;padding:7px 10px;border-radius:999px;background:rgba(23,25,22,.76);color:#fff;font-size:12px;font-weight:950;backdrop-filter:blur(8px)}.card.tier-strong{box-shadow:0 24px 58px rgba(31,138,91,.24);background:linear-gradient(180deg,#fffdf9,#f1fbf4)}.card.tier-consider{box-shadow:0 20px 48px rgba(217,132,47,.22);background:linear-gradient(180deg,#fffdf9,#fff4e8)}.card.tier-backup{box-shadow:0 16px 38px rgba(83,88,81,.16);background:linear-gradient(180deg,#fffdf9,#f4f3ee)}.match-badge.tier-strong{background:#1f8a5b;color:#fff}.match-badge.tier-consider{background:#d9842f;color:#fff}.match-badge.tier-backup{background:#7d837a;color:#fff}.match-badge.tier-all{background:#373a33;color:#fff}.match-meter{height:8px;margin:0 0 8px;border-radius:999px;background:#e5e0d5;overflow:hidden}.match-meter span{display:block;height:100%;border-radius:inherit;background:currentColor}.tier-strong .match-meter{color:#1f8a5b}.tier-consider .match-meter{color:#d9842f}.tier-backup .match-meter{color:#7d837a}.match-caption{display:flex;align-items:baseline;gap:6px;margin-bottom:12px;color:var(--muted);font-size:12px}.match-caption strong{font-size:22px;line-height:1;color:var(--ink)}.result-stack .card.tier-strong:first-child{grid-column:span 2}.design-statement{margin:0;color:var(--ink)!important;font-size:16px;line-height:1.95}.evidence-row{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin-top:16px}.evidence-row span{padding:10px 12px;border:1px solid var(--line);border-radius:14px;background:#f6f2e9;color:#565950;font-size:13px;line-height:1.55}.digest-note{margin-top:14px;padding:12px 14px;border-left:4px solid var(--accent);background:#f2f0e8;color:#55584f!important}.drawer-content #sourceList{font-size:13px;color:#73766d}@media(max-width:980px){.result-stack .card.tier-strong:first-child{grid-column:span 1}}@media(max-width:680px){.evidence-row{grid-template-columns:1fr}}`;
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