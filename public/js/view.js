const content = document.getElementById('content');

export function createHTMLElement(html) {
    const template = document.createElement('template');
    template.innerHTML = html;
    return template.content.firstElementChild;
}

export function addListItem(e) {
    const html = `<input type="text" class="form-control form-control-sm listItems" placeholder="list item">`;
    const form = document.getElementById('form');
    let input = createHTMLElement(html);
    form.appendChild(input);
    input.onkeyup = (e) => {
        if (e.keyCode !== 13) return;
        addListItem();
    }
}

export function displayNoteView(listData) {
    let html = `<div class="card col-md-2 my-3 mx-3">
                    <h4 class="title">${listData.title}</h4>
                    <hr>
                    <ul>`;

    for (let key in listData) {
        if(key==="title") continue;
        if (listData.hasOwnProperty(key)) {
          var val = listData[key];
          html += `<li>${val}</li>`;
        }
      }
    
      html += `</ul>
                 </div>`;

     content.appendChild(createHTMLElement(html));

}
