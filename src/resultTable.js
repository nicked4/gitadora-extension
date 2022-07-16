// TODO: import with webpack
// TODO: DESIGN insertAfter(drumImage, guitarImage);
function insertBefore(insertElement, insertedElement) {
  const parent = insertedElement.parentElement;
  parent.insertBefore(insertElement, insertedElement);
}

function insertAfter(insertElement, insertedElement) {
  const parent = insertedElement.parentElement;
  if (insertedElement.nextElementSibling === null) {
    parent.appendChild(insertElement);
    return;
  }

  parent.insertBefore(insertElement, insertedElement.nextElementSibling);
}

// generate diffs
const guitarDiffTitles = document.getElementsByClassName('board_inner')[0].getElementsByClassName('diff_title');
const drumDiffTitles = document.getElementsByClassName('board_inner')[1].getElementsByClassName('diff_title');

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

if (localStorage.getItem('lastGameType') === 'dm') {
  guitarBoard.style.display = 'none';
  guitarTable.style.display = 'none';
} else {
  drumBoard.style.display = 'none';
  drumTable.style.display = 'none';
}

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

// event handle
guitarImage.onclick = () => {
  guitarBoard.style.display = 'none';
  guitarTable.style.display = 'none';
  drumBoard.style.display = 'block';
  drumTable.style.display = 'block';
  localStorage.setItem('lastGameType', 'dm');
};
drumImage.onclick = () => {
  guitarBoard.style.display = 'block';
  guitarTable.style.display = 'block';
  drumBoard.style.display = 'none';
  drumTable.style.display = 'none';
  localStorage.setItem('lastGameType', 'gf');
};

// insert tables
insertAfter(guitarTable, guitarBoard);
insertAfter(drumTable, drumBoard);
