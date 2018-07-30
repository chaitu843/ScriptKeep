import createHTMLElement from '../view';

export function addListItem() {
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
  const form = document.getElementById('myForm');
  form.reset();
  const children = document.getElementById('form').children;
  while (children.length > 2) {
    children[2].remove();
  }
}
