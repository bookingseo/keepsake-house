"use strict";

const objects = {
  letter: { name: "Lá thư", icon: "✉️" },
  lotus: { name: "Bông sen", icon: "🪷" },
  tea: { name: "Chén trà", icon: "🍵" },
  bell: { name: "Chiếc chuông", icon: "🔔" },
  frame: { name: "Khung ảnh", icon: "🖼️" },
  key: { name: "Chìa khóa", icon: "🗝️" },
  lamp: { name: "Chiếc đèn", icon: "🪔" },
  book: { name: "Cuốn sổ", icon: "📓" },
  comb: { name: "Chiếc lược", icon: "🪮" },
  scarf: { name: "Chiếc khăn", icon: "🧣" }
};

const chapters = [
  {
    name: "Lá thư về nhà",
    story: "Trong ngăn kéo có một lá thư gửi từ xa. Mặt sau phong bì còn lời dặn về ba món bà hay đặt cạnh cửa sổ.",
    ending: "Gấp lá thư lại, bạn nhận ra nét chữ quen trên phong bì.",
    items: ["tea", "lotus", "letter"],
    clues: [
      ["Bông sen nằm ở ô giữa.", p => p.lotus === 1],
      ["Lá thư nằm bên trái chén trà.", p => p.letter < p.tea]
    ]
  },
  {
    name: "Chiếc chìa khóa cũ",
    story: "Một chiếc chìa khóa nhỏ nằm trong khung cửa. Ông từng để lại mấy dòng chỉ cách xếp các món ông đem theo mỗi lần trở về.",
    ending: "Chiếc chìa mở được ngăn tủ dưới bàn. Bên trong là một cuốn sổ tay.",
    items: ["key", "lamp", "bell", "frame"],
    clues: [
      ["Chiếc đèn nằm ở ngoài cùng bên phải.", p => p.lamp === 3],
      ["Khung ảnh nằm ngay bên trái chìa khóa.", p => p.frame + 1 === p.key],
      ["Chiếc chuông nằm ở một đầu kệ.", p => p.bell === 0 || p.bell === 3]
    ]
  },
  {
    name: "Sổ tay của bà",
    story: "Bà ghi cách pha trà ở trang đầu. Cuối sổ là một sơ đồ để con cháu tìm đúng chỗ cho từng món trong gian nhà.",
    ending: "Ở mép giấy có vết chén trà cũ và dòng chữ nhỏ về chiếc lược.",
    items: ["lotus", "book", "tea", "lamp", "frame"],
    clues: [
      ["Bông sen nằm ở chính giữa kệ.", p => p.lotus === 2],
      ["Chén trà nằm ngay bên trái khung ảnh.", p => p.tea + 1 === p.frame],
      ["Khung ảnh nằm bên trái bông sen.", p => p.frame < p.lotus],
      ["Cuốn sổ nằm bên phải chiếc đèn.", p => p.lamp < p.book]
    ]
  },
  {
    name: "Chiếc lược răng thưa",
    story: "Chị nhớ bà thường chải tóc bên hiên. Trong chiếc khăn quấn quanh lược có một mẩu giấy ghi vị trí các món trên kệ.",
    ending: "Khi trải chiếc khăn ra, bạn thấy tên bà được thêu ở một góc.",
    items: ["scarf", "key", "tea", "comb", "letter"],
    clues: [
      ["Lá thư nằm ngay bên trái chén trà.", p => p.letter + 1 === p.tea],
      ["Có đúng một món ở giữa chiếc lược và chén trà.", p => Math.abs(p.comb - p.tea) === 2],
      ["Chiếc lược nằm bên trái lá thư.", p => p.comb < p.letter],
      ["Chiếc khăn nằm ngay bên trái chìa khóa.", p => p.scarf + 1 === p.key],
      ["Chén trà nằm bên trái chiếc khăn.", p => p.tea < p.scarf]
    ]
  },
  {
    name: "Tiếng chuông ngoài hiên",
    story: "Chiếc chuông từng báo giờ cơm. Lần này sơ đồ bị nhòe, chỉ còn những dòng bà viết về khoảng cách giữa các món.",
    ending: "Một tiếng chuông nhỏ vọng từ hiên. Người nhà đã về tới cổng.",
    items: ["book", "bell", "key", "lotus", "letter", "tea"],
    clues: [
      ["Có đúng hai món ở giữa lá thư và chiếc chuông.", p => Math.abs(p.letter - p.bell) === 3],
      ["Chìa khóa nằm ngay bên phải lá thư.", p => p.letter + 1 === p.key],
      ["Chén trà nằm bên trái chiếc chuông và bên phải chìa khóa.", p => p.key < p.tea && p.tea < p.bell],
      ["Bông sen nằm ngay bên trái cuốn sổ.", p => p.lotus + 1 === p.book],
      ["Cuốn sổ nằm ở một đầu kệ.", p => p.book === 0 || p.book === 5]
    ]
  },
  {
    name: "Gian nhà lên đèn",
    story: "Cả nhà ngồi lại khi trời tối. Mỗi người nhớ một chi tiết về chiếc kệ cũ, và đó là tất cả manh mối bạn có.",
    ending: "Gian nhà đã lên đèn. Mọi người kéo ghế ngồi gần nhau và kể tiếp những chuyện còn nhớ.",
    items: ["book", "scarf", "lamp", "lotus", "frame", "key"],
    clues: [
      ["Có đúng hai món ở giữa chiếc đèn và chìa khóa.", p => Math.abs(p.lamp - p.key) === 3],
      ["Khung ảnh nằm ngay bên trái chìa khóa.", p => p.frame + 1 === p.key],
      ["Chiếc khăn nằm ở giữa chiếc đèn và khung ảnh.", p =>
        Math.min(p.lamp, p.frame) < p.scarf && p.scarf < Math.max(p.lamp, p.frame)],
      ["Cuốn sổ nằm ngay bên trái bông sen.", p => p.book + 1 === p.lotus],
      ["Cuốn sổ nằm bên phải chiếc khăn.", p => p.scarf < p.book]
    ]
  }
];

function evaluateClues(chapter, slots) {
  const positions = Object.fromEntries(slots.map((item, index) => [item, index]));
  return chapter.clues.map(([, test]) => test(positions));
}

function solve(chapter, prefix = [], remaining = chapter.items) {
  if (!remaining.length) return evaluateClues(chapter, prefix).every(Boolean) ? [prefix] : [];
  return remaining.flatMap(item => solve(chapter, [...prefix, item], remaining.filter(other => other !== item)));
}

function placeItem(slots, item, index) {
  const next = slots.slice();
  const previous = next.indexOf(item);
  if (previous !== -1) next[previous] = next[index];
  next[index] = item;
  return next;
}

const get = id => document.getElementById(id);
const key = "phien-huyen-hoc.xep-ky-vat.v1";
const solutions = chapters.map(chapter => solve(chapter)[0]);
const emptySlots = chapter => Array(chapter.items.length).fill(null);
const canPlay = index => index === 0 || records.slice(0, index).every(record => record.completed);
let records = chapters.map(chapter => ({ slots: emptySlots(chapter), completed: false, won: false }));
let current = 0;
let history = [];
let selected = null;
let hinted = null;
let verdict = null;
let language = /^vi(?:-|$)/i.test(navigator.language) ? "vi" : "en";
let storageStatus = "saved";
const ui = () => copy[language];
const itemName = item => language === "en" ? englishObjects[item] : objects[item].name;
const chapterText = index => language === "en" ? englishChapters[index] : chapters[index];

function readProgress() {
  const raw = localStorage.getItem(key);
  if (!raw) return;
  const saved = JSON.parse(raw);
  if (Object.hasOwn(copy, saved.language)) language = saved.language;
  for (const [index, chapter] of chapters.entries()) {
    const record = saved.records?.[index];
    if (!record) break;
    const slots = record.slots;
    if (!Array.isArray(slots) || slots.length !== chapter.items.length) break;
    const items = slots.filter(item => item !== null);
    if (items.some(item => !chapter.items.includes(item)) || new Set(items).size !== items.length) break;
    const won = record.won === true && items.length === slots.length && evaluateClues(chapter, slots).every(Boolean);
    records[index] = { slots, won, completed: won || record.completed === true };
    if (!records[index].completed) break;
  }
  if (Number.isInteger(saved.current) && saved.current >= 0 && saved.current < chapters.length && canPlay(saved.current)) {
    current = saved.current;
  }
}

function persist() {
  try {
    localStorage.setItem(key, JSON.stringify({ current, records, language }));
    storageStatus = "saved";
  } catch {
    storageStatus = "saveError";
  }
  get("save-status").textContent = ui()[storageStatus];
}

function renderCopy() {
  document.documentElement.lang = language;
  document.title = ui().pageTitle;
  get("language").value = language;
  get("chapters").setAttribute("aria-label", ui().chapters);
  get("save-status").textContent = ui()[storageStatus];
  for (const element of document.querySelectorAll("[data-copy]")) {
    element.textContent = ui()[element.dataset.copy];
  }
}

function announce(message = "") {
  get("feedback").textContent = message;
}

function openChapter(index) {
  if (!canPlay(index)) return;
  current = index;
  history = [];
  selected = null;
  hinted = null;
  verdict = null;
  announce();
  persist();
  render();
  get("chapter-title").focus();
}

function selectItem(item) {
  selected = selected === item ? null : item;
  hinted = null;
  announce(selected ? ui().selected(itemName(selected).toLocaleLowerCase(language)) : ui().deselected);
  render();
}

function makeMove(slots) {
  const record = records[current];
  history.push(record.slots);
  record.slots = slots;
  record.won = false;
  selected = null;
  hinted = null;
  verdict = null;
  persist();
  render();
}

function useSlot(index) {
  const slots = records[current].slots;
  const target = slots[index];
  if (!selected) {
    if (target) selectItem(target);
    else announce(ui().selectFirst);
    return;
  }
  if (selected === target) {
    selectItem(target);
    return;
  }
  const item = selected;
  makeMove(placeItem(slots, item, index));
  announce(ui().placed(itemName(item), index + 1));
  get(`slot-${index + 1}`).focus({ preventScroll: true });
}

function makeTile(id, item, label, slotIndex = null) {
  const tile = document.createElement("button");
  tile.type = "button";
  tile.id = id;
  tile.className = "tile";
  tile.setAttribute("aria-label", label);
  tile.setAttribute("aria-pressed", String(Boolean(item && item === selected)));
  if (slotIndex !== null) {
    const number = document.createElement("span");
    number.className = "slot-number";
    number.textContent = slotIndex + 1;
    number.setAttribute("aria-hidden", "true");
    tile.append(number);
  }
  if (item) {
    const icon = document.createElement("span");
    icon.className = "symbol";
    icon.textContent = objects[item].icon;
    icon.setAttribute("aria-hidden", "true");
    tile.append(icon);
  }
  const name = document.createElement("span");
  name.textContent = item ? itemName(item) : ui().empty;
  tile.append(name);
  return tile;
}

function render() {
  const chapter = chapters[current];
  const story = chapterText(current);
  const text = ui();
  const { slots, won } = records[current];
  const focused = document.activeElement?.id;
  const filled = slots.filter(Boolean).length;
  const matches = won ? chapter.clues.map(() => true) : verdict;

  get("chapters").replaceChildren(...chapters.map((_, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.id = `chapter-${index + 1}`;
    button.textContent = index + 1;
    const status = records[index].completed ? text.complete : text.locked;
    const suffix = records[index].completed || !canPlay(index) ? `, ${status}` : "";
    button.setAttribute("aria-label", text.chapterLabel(index + 1, chapterText(index).name) + suffix);
    if (index === current) button.setAttribute("aria-current", "step");
    button.classList.toggle("done", records[index].completed);
    button.disabled = !canPlay(index);
    button.addEventListener("click", () => openChapter(index));
    return button;
  }));

  get("chapter-count").textContent = text.chapterCount(current + 1, chapters.length);
  get("chapter-title").textContent = story.name;
  get("story-text").textContent = story.story;
  get("fill-count").textContent = text.filled(filled, slots.length);
  get("clue-count").textContent = matches ? text.matched(matches.filter(Boolean).length, matches.length) : "";
  get("clues").replaceChildren(...chapter.clues.map(([vi], index) => {
    const clue = document.createElement("li");
    clue.textContent = language === "en" ? story.clues[index] : vi;
    if (matches) {
      const status = document.createElement("span");
      status.className = matches[index] ? "clue-status yes" : "clue-status no";
      status.textContent = matches[index] ? text.right : text.wrong;
      clue.append(status);
    }
    return clue;
  }));

  get("shelf").style.setProperty("--slots", slots.length);
  get("shelf").replaceChildren(...slots.map((item, index) => {
    const name = item ? itemName(item) : text.empty.toLocaleLowerCase(language);
    const tile = makeTile(`slot-${index + 1}`, item, text.slotLabel(index + 1, name), index);
    tile.classList.add("slot", item ? "filled" : "empty");
    tile.classList.toggle("hinted", hinted === index);
    tile.disabled = won;
    tile.addEventListener("click", () => useSlot(index));
    return tile;
  }));
  get("tray").style.setProperty("--slots", slots.length);
  get("tray").replaceChildren(...chapter.items.map(item => {
    const tile = makeTile(`item-${item}`, item, itemName(item));
    tile.disabled = slots.includes(item);
    tile.addEventListener("click", () => selectItem(item));
    return tile;
  }));
  get("instruction").textContent = won ? text.arranged : text.instructions;
  get("check").disabled = won || filled < slots.length;
  get("hint").disabled = won;
  get("undo").disabled = won || !history.length;
  get("reset").disabled = filled === 0;
  get("victory").hidden = !won;
  if (won) {
    const finalChapter = current === chapters.length - 1;
    get("victory-title").textContent = finalChapter ? text.finished : text.won;
    get("victory-text").textContent = story.ending;
    get("next").hidden = finalChapter;
  }

  const restoredFocus = focused && get(focused);
  if (restoredFocus && !restoredFocus.disabled && restoredFocus !== document.activeElement) {
    restoredFocus.focus({ preventScroll: true });
  }
}

get("check").addEventListener("click", () => {
  const record = records[current];
  verdict = evaluateClues(chapters[current], record.slots);
  hinted = null;
  if (!verdict.every(Boolean)) {
    const incorrect = verdict.filter(result => !result).length;
    announce(ui().incorrect(incorrect));
    render();
    return;
  }
  record.won = true;
  record.completed = true;
  history = [];
  selected = null;
  announce();
  persist();
  render();
  get("victory-title").focus();
});

get("hint").addEventListener("click", () => {
  const correct = solutions[current];
  const slots = records[current].slots;
  const index = correct.findIndex((item, position) => item !== slots[position]);
  if (index === -1) {
    announce(ui().ready);
    return;
  }
  hinted = index;
  announce(ui().hintSlot(index + 1, itemName(correct[index]).toLocaleLowerCase(language)));
  render();
});

get("undo").addEventListener("click", () => {
  records[current].slots = history.pop();
  selected = null;
  hinted = null;
  verdict = null;
  persist();
  render();
  announce(ui().undone);
});

get("reset").addEventListener("click", () => {
  makeMove(emptySlots(chapters[current]));
  announce(ui().resetDone);
});

get("language").addEventListener("change", event => {
  language = event.target.value;
  hinted = null;
  announce();
  persist();
  renderCopy();
  render();
});
get("next").addEventListener("click", () => openChapter(current + 1));
get("show-clues").addEventListener("click", () => {
  const copy = get("clues").cloneNode(true);
  get("quick-clues-list").replaceChildren(...copy.children);
  get("quick-clues").showModal();
});
document.addEventListener("keydown", event => {
  if (get("quick-clues").open || event.altKey || event.metaKey || event.ctrlKey || event.shiftKey) return;
  if (event.key === "Escape" && selected) selectItem(selected);
  if (/^[1-6]$/.test(event.key) && selected) get(`slot-${event.key}`)?.click();
});

try {
  readProgress();
} catch {
  storageStatus = "readError";
}
renderCopy();
render();
