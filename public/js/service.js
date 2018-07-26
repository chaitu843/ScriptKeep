import {displayNoteView} from './view';

export function displayNote(){
    const form = document.getElementById('form');
    const children = form.children;
    const title = children[0];
    let listData = {
        "title" : title.value
    }
    let i = 1;
    for(let child in children){
        const myVariable = children[child].value;
        if(child==="0" || typeof(myVariable) === "undefined") continue;
        listData[i] = myVariable;
        i++;
    }

    displayNoteView(listData);

    const url = "http://localhost:3000/notes";
    const fetchData = {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        mode: "cors", // no-cors, cors, *same-origin
        cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
        credentials: "same-origin", // include, same-origin, *omit
        headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
        },
        redirect: "follow", // manual, *follow, error
        referrer: "no-referrer", // no-referrer, *client
        body: JSON.stringify(listData) // body data type must match "Content-Type" header
    }

    fetch(url,fetchData);
}

export function reload(){
    const url = "http://localhost:3000/notes";

    fetch(url)
    .then((resp)=>resp.json())
    .then((data)=>{
        data.map((object) =>{
            displayNoteView(object);
        })
    });

}