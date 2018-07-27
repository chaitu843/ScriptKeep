import { addListItem, refreshModal } from './view';
import { displayNote } from '../note/service';

const input = document.getElementById('listItem');
input.onkeyup = (e) => {
  if (e.keyCode !== 13) return;
  addListItem();
};

const saveButton = document.getElementById('saveButton');
saveButton.onclick = () => {
  displayNote();
  refreshModal();
};
