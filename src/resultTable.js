import { updatePlaydataRouting } from "./controller";
import { insertAfter, insertBefore } from "./lib";
import './style/resultTable.scss';

// generate diffs
const guitarDiffTitles = document
  .getElementsByClassName('board_inner')[0]
  .getElementsByClassName('diff_title');
const drumDiffTitles = document
  .getElementsByClassName('board_inner')[1]
  .getElementsByClassName('diff_title');

const guitarDiffs = generateDiffs(guitarDiffTitles);
const drumDiffs = generateDiffs(drumDiffTitles);

function generateDiffs(diffTitles) {
  const subPercent = (a, b) => {
    const [aNum, bNum] = [a.split('%'), b.split('%')];
    return `${parseInt(aNum) - parseInt(bNum)}%`;
  }

  return Array.from(diffTitles).map((c) => {
    const bar = c.nextElementSibling.nextElementSibling.children;
    return {
      d: subPercent('100%', bar[0].style.width),
      c: subPercent(bar[0].style.width, bar[1].style.width),
      b: subPercent(bar[1].style.width, bar[2].style.width),
      a: subPercent(bar[2].style.width, bar[3].style.width),
      s: subPercent(bar[3].style.width, bar[4].style.width),
      ss: bar[4].style.width,
    };
  });
}

// create elements with diffs
const guitarBoard = document.getElementsByClassName('folder_board_tb')[0];
const drumBoard = document.getElementsByClassName('folder_board_tb')[1];
const guitarImage = guitarBoard.firstChild.firstChild;
const drumImage = drumBoard.firstChild.firstChild;

const guitarTable = generateTable(guitarDiffs);
const drumTable = generateTable(drumDiffs);

function generateTable(diffs) {
  const div = document.createElement('div');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  div.className = 'resultTable';
  table.className = 'common_tb';

  // head
  const headTr = document.createElement('tr');
  ['', 'SS', 'S', 'A', 'B', 'C', '-'].forEach((r) => {
    const headTh = document.createElement('th');
    headTh.innerText = r;
    headTr.appendChild(headTh);
  });
  thead.appendChild(headTr);

  // body
  diffs.forEach((d, i) => {
    const bodyTr = document.createElement('tr');
    const diffTd = document.createElement('td');
    diffTd.innerText = ((i + 2) * 0.5).toFixed(2);
    if (i % 2 == 1) {
      diffTd.className = 'zebra_black';
    }
    bodyTr.appendChild(diffTd);

    ['ss', 's', 'a', 'b', 'c', 'd'].forEach((r) => {
      const bodyTd = document.createElement('td');
      bodyTd.innerText = d[r];
      if (i % 2 == 1) {
        bodyTd.className = 'zebra_black';
      }
      bodyTr.appendChild(bodyTd);
    });
    tbody.appendChild(bodyTr);
  });

  table.appendChild(thead);
  table.appendChild(tbody);

  div.appendChild(table);

  return div;
}

// swtich player board
const playerBoard = document
  .getElementsByClassName('play_all')[0]
  .getElementsByTagName('img')[0];
const anotherBoard = playerBoard.cloneNode();

if (playerBoard.src.match(/gtype=gf/)) {
  anotherBoard.src = playerBoard.src.replace(/gtype=gf/, 'gtype=dm');
  insertAfter(anotherBoard, playerBoard);
} else if(playerBoard.src.match(/gtype=dm/)) {
  anotherBoard.src = playerBoard.src.replace(/gtype=dm/, 'gtype=gf');
  insertBefore(anotherBoard, playerBoard);
} else {
  anotherBoard.src = playerBoard.src.replace(/gtype=/, 'gtype=dm');
  insertAfter(anotherBoard, playerBoard);
}

let gtype = localStorage.getItem('lastGameType');
switchPlayerBoard(gtype);

function switchPlayerBoard(_gtype) {
  // head
  const boardUl = document.getElementById('board_change');
  const [gfBoardHead, dmBoardHead] = boardUl.getElementsByTagName('div');

  gfBoardHead.className = `change_gf_${_gtype === 'gf'}`;
  dmBoardHead.className = `change_dm_${_gtype === 'dm'}`;

  // board
  const [gfBoard, dmBoard] = document
    .getElementsByClassName('play_all')[0]
    .getElementsByTagName('img');
  gfBoard.style.display = _gtype === 'gf' ? '' : 'none';
  dmBoard.style.display = _gtype === 'dm' ? '' : 'none';
  gtype = _gtype;
}

// insert another gyype image
const insertedDrumImage = guitarImage.cloneNode();
const insertedGuitarImage = drumImage.cloneNode();
insertedDrumImage.src = insertedDrumImage.src.replace(/title_gf/, 'title_dm');
insertedGuitarImage.src = insertedGuitarImage.src.replace(/title_dm/, 'title_gf');
insertAfter(insertedDrumImage, guitarImage);
insertBefore(insertedGuitarImage, drumImage);

// event handle
const stype = localStorage.getItem('lastSkillType');
const page = localStorage.getItem('lastPage');

const switchToDrum = () => {
  const url = new URL(location);
  url.searchParams.set('gtype', 'dm');
  localStorage.setItem('guitarTableScroll', guitarTable.scrollTop);

  guitarBoard.style.display = 'none';
  guitarTable.style.display = 'none';
  drumBoard.style.display = 'block';
  drumTable.style.display = 'block';
  updatePlaydataRouting('dm', stype, page);
  switchPlayerBoard('dm');
  history.replaceState({}, '', url);
  localStorage.setItem('lastGameType', 'dm');
};

const switchToGuitar = () => {
  const url = new URL(location);
  url.searchParams.set('gtype', 'gf');
  localStorage.setItem('drumTableScroll', drumTable.scrollTop);

  guitarBoard.style.display = 'block';
  guitarTable.style.display = 'block';
  drumBoard.style.display = 'none';
  drumTable.style.display = 'none';
  updatePlaydataRouting('gf', stype, page);
  switchPlayerBoard('gf');
  history.replaceState({}, '', url);
  localStorage.setItem('lastGameType', 'gf');
};

guitarImage.onclick = switchToDrum;
insertedDrumImage.onclick = switchToDrum;
drumImage.onclick = switchToGuitar;
insertedGuitarImage.onclick = switchToGuitar;

// store table scroll value
window.onbeforeunload = () => {
  const currentTableScroll = gtype === 'gf' ? guitarTable.scrollTop : drumTable.scrollTop;
  localStorage.setItem(gtype === 'gf' ? 'guitarTableScroll' : 'drumTableScroll', currentTableScroll);
}

// insert tables
const guitarTableScroll = parseInt(localStorage.getItem('guitarTableScroll') ?? 0);
const drumTableScroll = parseInt(localStorage.getItem('drumTableScroll') ?? 0);

insertAfter(guitarTable, guitarBoard);
insertAfter(drumTable, drumBoard);
guitarTable.scroll(0, guitarTableScroll);
drumTable.scroll(0, drumTableScroll);

// Element({display: none})'s scroll value is 0
if (gtype === 'dm') {
  guitarBoard.style.display = 'none';
  guitarTable.style.display = 'none';
} else {
  drumBoard.style.display = 'none';
  drumTable.style.display = 'none';
}
