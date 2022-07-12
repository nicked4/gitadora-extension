// stat utils
const ss = {
  sum: (array) => array.reduce((sum, value) => sum + value),
};
ss.max = (array) => array.reduce((max, value) => max < value ? value : max);
ss.min = (array) => array.reduce((min, value) => min > value ? value : min);
ss.ave = (array) => ss.sum(array) / array.length;
ss.med = (array) => {
  if (array.length % 2 == 1) {
    return array[Math.floor((array.length - 1) / 2)];
  }
  const former = Math.floor(array.length / 2);
  const latter = former + 1;
  return (array[former] + array[latter]) / 2;
};
ss.std = (array) => {
  const ave = ss.ave(array);
  const variance = array.reduce((vari, value) => vari + (ave - value) ** 2, 0) / array.length;
  return Math.sqrt(variance);
};

// add row number
const emptyTh = document.createElement('th');
const div = document.createElement('div');
div.style.width = '28px';
emptyTh.appendChild(div);

const seqTd = document.getElementsByClassName('sequence')[0];
const seqTdParent = seqTd.parentElement;
seqTdParent.insertBefore(emptyTh, seqTd);

let i = 1;
Array.from(document.getElementsByClassName('music_cell'))
  .forEach(c => {
    const numTd = document.createElement('td');
    numTd.innerText = i++;
    numTd.style.textAlign = 'center';
    if (i % 2 === 1) {
      numTd.className = 'zebra_black';
    }
    const cParent = c.parentElement;
    cParent.insertBefore(numTd, c);
  });

// statistics
const skills = [];
const completionRates = [];
const levels = [];
Array.from(document.getElementsByClassName('skill_cell'))
  .forEach(c => skills.push(parseFloat(c.innerText.replace('pts', '').trim())));
Array.from(document.getElementsByClassName('achive_cell'))
  .forEach(c => completionRates.push(parseFloat(c.innerText.replace('%', '').trim())));
Array.from(document.getElementsByClassName('diff_cell'))
  .forEach(c => levels.push(parseFloat(c.innerText.trim())));

const calcStats = (array) => {
  return {
    sum: ss.sum(array),
    max: ss.max(array),
    ave: ss.ave(array),
    med: ss.med(array),
    min: ss.min(array),
    std: ss.std(array),
}};
const skillStats = calcStats(skills);
const completionRateStats = calcStats(completionRates);
const levelStats = calcStats(levels);

const statObj = {
  skill: skillStats,
  completionRate: completionRateStats,
  level: levelStats,
};

const statTable = document.createElement('table');
const thead = document.createElement('thead');
const tbody = document.createElement('tbody');
const headTr = document.createElement('tr');

headTr.appendChild(document.createElement('th'));
for (let [k, v] of Object.entries(statObj.skill)) {
  const th = document.createElement('th');
  th.innerText = k[0].toUpperCase() + k.slice(1);
  headTr.appendChild(th);
}
thead.appendChild(headTr);

for (let [name, statObjV] of Object.entries(statObj)) {
  const bodyTr = document.createElement('tr');

  const nameTd = document.createElement('td');
  if (name === 'skill') {
    nameTd.innerText = '曲別スキル';
  }
  else if (name === 'completionRate') {
    nameTd.innerText = '達成率';
    nameTd.className = 'zebra_black';
  }
  else if (name === 'level') {
    nameTd.innerText = '難度値';
  }
  nameTd.style.textAlign = 'center';
  bodyTr.appendChild(nameTd);

  for (let [k, v] of Object.entries(statObjV)) {
    const td = document.createElement('td');

    // text
    let text = v.toFixed(2);
    if (name === 'skill' && k !== 'std') {
      text += ' pts';
    }
    else if (name === 'completionRate' && k !== 'std') {
      text += '%';
    }

    if (['completionRate', 'level'].indexOf(name) !== -1 && k === 'sum') {
      text = '-';
    }
    td.innerText = text;

    // style
    td.style.textAlign = 'center';
    if (name === 'completionRate') {
      td.className = 'zebra_black';
    }
    bodyTr.appendChild(td);
  }

  tbody.appendChild(bodyTr);
}

statTable.appendChild(thead);
statTable.appendChild(tbody);

statTable.className = 'skill_table_tb common_tb';
statTable.style.marginBottom = '12px';

const skillSelect = document.getElementsByClassName('skill_select')[0];
const skillSelectParent = skillSelect.parentElement;
skillSelectParent.insertBefore(statTable, skillSelect.nextElementSibling);
