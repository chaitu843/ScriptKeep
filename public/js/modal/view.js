import { createHTMLElement } from '../view';

export function addListItem(e) {
  const html = '<input type="text" class="form-control form-control-sm listItems" placeholder="list item">';
  const form = document.getElementById('form');
  const input = createHTMLElement(html);
  form.appendChild(input);
  input.onkeyup = (e) => {
    if (e.keyCode !== 13) return;
    addListItem();
  };
}

export function refreshModal() {
  const html = `<input type="text" class="form-control" id="listTitle" placeholder="Note Title">
    <input type="text" class="form-control form-control-sm listItems" id="listItem" placeholder="list item">`;
  const form = document.getElementById('myForm');
  form.reset();
  const children = document.getElementById('form').children;
  while (children.length > 2) {
    children[2].remove();
  }
}
