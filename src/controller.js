// MEMO: current > last > no params
// parameter
const lastGameType = localStorage.getItem('lastGameType') ?? 'gf';
const lastSkillType = localStorage.getItem('lastSkillType') ?? 1;
const lastPage = localStorage.getItem('lastPage') ?? 1;

const params = new URLSearchParams(location.search);
const currentGtype = params.get('gtype');
const currentStype = params.get('stype');
const currentPage = params.get('page');

const gtype = currentGtype ?? lastGameType;
const stype = currentStype ?? lastSkillType;
const page = currentPage ?? lastPage;

localStorage.setItem('lastGameType', gtype);
localStorage.setItem('lastSkillType', stype);
localStorage.setItem('lastPage', page);

// override href
updatePlaydataRouting(gtype, stype, page);

function updatePlaydataRouting(gtype, stype, page) {
  const profile = document.getElementById('profile');
  const battle = document.getElementById('battle');
  const rivallist = document.getElementById('rivallist');
  const music = document.getElementById('music');
  const skill = document.getElementById('skill');
  const stageResult = document.getElementById('stage_result');

  const baseUrl = '/game/gfdm/gitadora_highvoltage/p/playdata';
  profile.firstElementChild.setAttribute('href', `${baseUrl}/profile.html?gtype=${gtype}`);
  battle.firstElementChild.setAttribute('href', `${baseUrl}/battledata.html?gtype=${gtype}`);
  rivallist.firstElementChild.setAttribute('href', `${baseUrl}/rival.html?gtype=${gtype}`);
  music.firstElementChild.setAttribute('href', `${baseUrl}/music.html?gtype=${gtype}`);
  skill.firstElementChild.setAttribute('href', `${baseUrl}/skill.html?gtype=${gtype}&stype=${stype}`);
  stageResult.firstElementChild.setAttribute('href', `${baseUrl}/stage_result.html?gtype=${gtype}&page=${page}`);
}
