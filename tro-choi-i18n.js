"use strict";

const copy = {
  vi: {
    pageTitle: "Phiên huyền học · Xếp lại kỷ vật",
    altar: "Bàn thờ gia tiên",
    series: "Phiên huyền học",
    title: "Xếp lại kỷ vật",
    intro: "Đọc câu chuyện của mỗi gian nhà và tìm vị trí cho từng món trên kệ.",
    chapters: "Các màn chơi",
    language: "Ngôn ngữ",
    shelf: "Kệ kỷ vật",
    instructions: "Chọn một kỷ vật rồi chọn ô. Chọn hai ô có đồ để đổi chỗ.",
    arranged: "Kỷ vật đã về đúng chỗ.",
    tray: "Những món còn lại",
    check: "Kiểm tra",
    hint: "Gợi ý",
    undo: "Hoàn tác",
    reset: "Xếp lại",
    showClues: "Xem manh mối",
    next: "Màn tiếp theo",
    clues: "Manh mối",
    closeClues: "Về kệ kỷ vật",
    saved: "Tiến độ lưu trên trình duyệt này.",
    saveError: "Trình duyệt không lưu được tiến độ. Bạn vẫn có thể chơi trong phiên này.",
    readError: "Trình duyệt không đọc được tiến độ cũ. Bạn có thể bắt đầu từ màn đầu.",
    selected: name => `Đã chọn ${name}.`,
    deselected: "Đã bỏ chọn.",
    selectFirst: "Chọn một kỷ vật trước khi đặt vào ô.",
    placed: (name, number) => `${name} đã vào ô ${number}.`,
    empty: "Trống",
    complete: "đã hoàn thành",
    locked: "chưa mở",
    chapterLabel: (number, name) => `Màn ${number}, ${name}`,
    chapterCount: (number, total) => `Màn ${number}/${total}`,
    filled: (number, total) => `${number}/${total} ô đã xếp`,
    matched: (number, total) => `(${number}/${total} đúng)`,
    slotLabel: (number, name) => `Ô ${number}, ${name}`,
    right: "Đúng",
    wrong: "Chưa đúng",
    finished: "Bạn đã hoàn thành cả sáu màn",
    won: "Đã xếp đúng",
    incorrect: number => `Còn ${number} manh mối chưa đúng. Xem dấu bên cạnh từng manh mối.`,
    ready: "Các món đã đúng chỗ. Bấm Kiểm tra để hoàn thành màn.",
    hintSlot: (number, name) => `Gợi ý: Ô ${number} là ${name}.`,
    undone: "Đã hoàn tác một lượt xếp.",
    resetDone: "Đã đưa các kỷ vật về khay."
  },
  en: {
    pageTitle: "Keepsake House · Arrange the Keepsakes",
    altar: "Family altar",
    series: "Keepsake House",
    title: "Arrange the Keepsakes",
    intro: "Read each story and use its clues to find a place on the shelf for every keepsake.",
    chapters: "Chapters",
    language: "Language",
    shelf: "Keepsake shelf",
    instructions: "Pick a keepsake, then pick a slot. Select two occupied slots to swap them.",
    arranged: "Every keepsake is back in its place.",
    tray: "Remaining keepsakes",
    check: "Check",
    hint: "Hint",
    undo: "Undo",
    reset: "Clear shelf",
    showClues: "View clues",
    next: "Next chapter",
    clues: "Clues",
    closeClues: "Back to shelf",
    saved: "Progress is saved in this browser.",
    saveError: "This browser couldn't save your progress. You can still play for this session.",
    readError: "The saved progress couldn't be read. You can start at the first chapter.",
    selected: name => `Selected ${name}.`,
    deselected: "Selection cleared.",
    selectFirst: "Pick a keepsake to place in this slot.",
    placed: (name, number) => `${name} is in slot ${number}.`,
    empty: "Empty",
    complete: "completed",
    locked: "locked",
    chapterLabel: (number, name) => `Chapter ${number}, ${name}`,
    chapterCount: (number, total) => `Chapter ${number} of ${total}`,
    filled: (number, total) => `${number}/${total} placed`,
    matched: (number, total) => `(${number}/${total} satisfied)`,
    slotLabel: (number, name) => `Slot ${number}, ${name}`,
    right: "Satisfied",
    wrong: "Not yet",
    finished: "You finished all six chapters",
    won: "Everything in its place",
    incorrect: number => number === 1
      ? "One clue still needs to be satisfied. It is marked in the clue list."
      : `${number} clues still need to be satisfied. They are marked in the clue list.`,
    ready: "Everything is in place. Select Check to finish the chapter.",
    hintSlot: (number, name) => `Hint: Put the ${name} in slot ${number}.`,
    undone: "Your last move was undone.",
    resetDone: "All keepsakes are back in the tray."
  }
};

const englishObjects = {
  letter: "Letter", lotus: "Lotus", tea: "Tea cup", bell: "Bell", frame: "Photo frame",
  key: "Key", lamp: "Lamp", book: "Notebook", comb: "Comb", scarf: "Scarf"
};

const englishChapters = [
  {
    name: "A Letter from Far Away",
    story: "A letter sent from far away is tucked in a drawer. On the back of the envelope are a few notes about three things Grandmother used to keep by the window.",
    ending: "You fold up the letter and recognize the handwriting on the envelope.",
    clues: [
      "The lotus goes in the middle slot.",
      "The letter is somewhere to the left of the tea cup."
    ]
  },
  {
    name: "The Old Key",
    story: "A small key rests in the doorframe. Grandfather left a note about where he put the things he brought with him whenever he came home.",
    ending: "The key opens the cupboard beneath the table. There is a notebook inside.",
    clues: [
      "The lamp is at the far right.",
      "The photo frame is immediately to the left of the key.",
      "The bell is at one end of the shelf."
    ]
  },
  {
    name: "Grandmother’s Notebook",
    story: "Grandmother’s tea recipe is on the first page. At the back is a sketch that shows where everything belongs.",
    ending: "On the edge of the page, beside an old tea stain, you find a line about a comb.",
    clues: [
      "The lotus goes in the middle slot.",
      "The tea cup is immediately to the left of the photo frame.",
      "The photo frame is somewhere to the left of the lotus.",
      "The notebook is somewhere to the right of the lamp."
    ]
  },
  {
    name: "The Wide-Toothed Comb",
    story: "Your sister remembers Grandmother combing her hair on the porch. The scarf wrapped around the comb holds a scrap of paper about the shelf.",
    ending: "As you unfold the scarf, you see Grandmother’s name stitched in one corner.",
    clues: [
      "The letter is immediately to the left of the tea cup.",
      "Exactly one keepsake sits between the comb and the tea cup.",
      "The comb is somewhere to the left of the letter.",
      "The scarf is immediately to the left of the key.",
      "The tea cup is somewhere to the left of the scarf."
    ]
  },
  {
    name: "The Bell on the Porch",
    story: "The bell used to call everyone in for dinner. The sketch has smudged. All you can make out are Grandmother’s notes about the spaces between things.",
    ending: "A small bell rings on the porch. The family is at the gate.",
    clues: [
      "Exactly two keepsakes sit between the letter and the bell.",
      "The key is immediately to the right of the letter.",
      "The tea cup is to the left of the bell and to the right of the key.",
      "The lotus is immediately to the left of the notebook.",
      "The notebook is at one end of the shelf."
    ]
  },
  {
    name: "A Light in the House",
    story: "It is dark outside, and the family has gathered. Each person remembers something about the old shelf.",
    ending: "The house is lit up. Everyone pulls their chairs closer and keeps telling the stories they remember.",
    clues: [
      "Exactly two keepsakes sit between the lamp and the key.",
      "The photo frame is immediately to the left of the key.",
      "The scarf is somewhere between the lamp and the photo frame.",
      "The notebook is immediately to the left of the lotus.",
      "The notebook is somewhere to the right of the scarf."
    ]
  }
];
