import displayNoteView from './view';

function generateRandomId() {
  return Math.floor((Math.random() * 1000000) + 1);
}

export function displayNote() {
  const form = document.getElementById('form');
  const children = form.children;
  const title = children[0];
  const listData = {
    id: generateRandomId(),
    title: title.value,
  };
  let i = 1;
  for (const child in children) {
    // if (child === '0' || typeof (myVariable) === 'undefined' || myVariable === '') continue;
    if (child !== '0' && typeof (children[child].value) !== 'undefined' && children[child].value !== '') {
      listData[i] = {
        item: children[child].value,
        completed: false,
      };
      i += 1;
    }
  }

  displayNoteView(listData);

  const url = 'http://localhost:3000/notes';
  const fetchData = {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(listData), // body data type must match "Content-Type" header
  };

  fetch(url, fetchData);
}

export function reload() {
  document.getElementById('content').innerHTML = ''; // for relaoding after updation
  const url = 'http://localhost:3000/notes';

  fetch(url)
    .then(resp => resp.json())
    .then((data) => {
      data.map((object) => {
        displayNoteView(object);
        return null;
      });
    });
}

export function deleteNote(id) {
  document.getElementById(id).parentElement.parentElement.remove();

  const url = `http://localhost:3000/notes/${id}`;
  const fetchData = {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
  };

  fetch(url, fetchData);
}

export function updateNote() {
  const childDiv = document.getElementById('noteModalCheck').firstChild.children;
  let i = 1;
  const listData = {
    id: parseInt(childDiv[0].value, 10) - 1,
    title: document.getElementById('noteModalForm').firstElementChild.value,
  };
  while (i < childDiv.length) {
    const div = childDiv[i];
    if (div.firstElementChild.checked === true) {
      const date = new Date();
      listData[i] = {
        item: div.firstElementChild.value,
        completed: true,
        date: `${date.toDateString().substr(4)} ${date.toTimeString().substr(0, 8)}`,
      };
    } else {
      listData[i] = {
        item: div.firstElementChild.value,
        completed: false,
      };
    }
    i += 1;
  }
  const url = `http://localhost:3000/notes/${listData.id}`;
  const fetchData = {
    method: 'PUT', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // "Content-Type": "application/x-www-form-urlencoded",
    },
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // no-referrer, *client
    body: JSON.stringify(listData), // body data type must match "Content-Type" header
  };

  fetch(url, fetchData)
    .then(() => {
      reload();
    });
}
