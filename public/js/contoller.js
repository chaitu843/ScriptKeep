import {addListItem} from './view';
import {displayNote, reload} from './service';
const input = document.getElementById("listItem")
const saveButton = document.getElementById('saveButton');

input.onkeyup = (e) => {
    if(e.keyCode !== 13) return;
    addListItem();
}

saveButton.onclick = () => {
    
    displayNote();
    
}


reload();