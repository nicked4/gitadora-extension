// element utils
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

// stat utils
const ss = {
  sum: (array) => array.reduce((sum, value) => sum + value),
};
ss.max = (array) => array.reduce((max, value) => max < value ? value : max);
ss.min = (array) => array.reduce((min, value) => min > value ? value : min);
ss.ave = (array) => ss.sum(array) / array.length;
ss.med = (array) => {
  array.sort((a, b) => a - b);
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

export { insertBefore, insertAfter, ss };
