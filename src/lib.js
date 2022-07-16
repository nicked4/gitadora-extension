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

export { insertBefore, insertAfter };
