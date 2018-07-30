import { deleteNote } from './service';
import createHTMLElement from '../view';

function showNote(div) {
  const children = div.children;
  const title = children[0].firstElementChild.innerHTML;
  const html = `<input type="text" class="form-control" value=${title}>`;
  const noteForm = document.getElementById('noteModalForm');
  noteForm.innerHTML = '';
  noteForm.appendChild(createHTMLElement(html));

  let form = `<div>
                <input type="hidden" value="${div.id}">`;
  const list = children[2].children;


  for (const item in list) {
    const myVariable = `${list[item].innerHTML}`;
    if (typeof (myVariable) === 'undefined' || item === 'length' || item === 'item' || item === 'namedItem') continue;
    if (list[item].firstElementChild !== null) {
      const str = list[item].firstElementChild.innerText;
      form += `<div class = "listItems"><input type="checkbox" checked="true" class="form-check-input" id="${item}" value="${str.substr(0, str.length - 1)}">
                <label class="form-check-label" for="${item}">${str.substr(0, str.length - 1)}</label></div>`;
      continue;
    }
    form += `<div class = "listItems"><input type="checkbox" class="form-check-input" id="${item}" value="${myVariable}">
                <label class="form-check-label" for="${item}">${myVariable}</label></div>`;
  }
  form += '</div>';
  const noteFormCheck = document.getElementById('noteModalCheck');
  noteFormCheck.innerHTML = '';
  noteFormCheck.appendChild(createHTMLElement(form));
}

export default function displayNoteView(listData) {
  const content = document.getElementById('content');
  const divID = parseInt(`${listData.id}`) + 1;
  let html = `<div class="card col-md-2 my-3 mx-3" data-toggle = "modal" data-target = "#noteModal" id="${divID}">
                <div class = "title">
                    <h4>${listData.title}</h4>
                    <button type="button" class="close" aria-label="Close" id="${listData.id}" >
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <hr>
                    <ul>`;

  for (const key in listData) {
    if (key === 'title' || key === 'id') continue;
    if (listData.hasOwnProperty(key)) {
      const val = listData[key];
      if (val.completed === true) {
        html += `<li><div>${val.item}<span title="${val.date}" class="tick">&#10004;</span></div></li>`;
      } else {
        html += `<li>${val.item}</li>`;
      }
    }
  }

  html += `</ul>
                 </div>`;
  const note = createHTMLElement(html);
  content.appendChild(note);

  note.onclick = () => {
    showNote(note);
  };

  document.getElementById(`${listData.id}`).onclick = (event) => {
    event.stopPropagation();
    deleteNote(`${listData.id}`);
  };
}
