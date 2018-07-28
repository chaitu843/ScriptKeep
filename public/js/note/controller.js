import { reload, updateNote } from './service';

const saveNote = document.getElementById('saveNote');

saveNote.onclick = () => {
    updateNote();
}
reload();
