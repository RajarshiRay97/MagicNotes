let addBtn = document.getElementById('addBtn');
let alertMessageTitle = document.getElementById('alertMessageTitle');
let alertMessageNote = document.getElementById('alertMessageNote');
let successMessage = document.getElementById('successMessage');
let modal = document.querySelector('.modal');
let closeBtn = document.getElementById('closeBtn');
let cancelBtn = document.getElementById('cancelBtn');
let deleteBtn = document.getElementById('deleteBtn');
let notesArray;
let indexVal = -1;

// Function to show notes
function showNotes() {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }
    let notesCollection = document.getElementById('notesCollection');
    let html = "";
    notesArray.forEach(function (element, index) {
        if (element[1]) {
            html += `<div class="noteCard card my-2 mx-2" style="width: 21.2rem;background: #f7fdff;box-shadow: 0.5px 0.5px 10px 1px yellow;">
                        <div class="card-body">
                            <div class="flexclass">
                                <h5 class="card-title" title="Created: ${element[3]}">${element[2]}</h5>
                                <button id="imp${index}" class="impBtn" onclick="convertToNotImp(this.id)"><i class="uis uis-star"></i></button>
                            </div>
                            <p class="card-text" style="text-align: justify;">${element[0]}</p>
                            <button id="delete${index}" class="btn btn-primary myBtnClass" onclick="dispalayModal(this.id)">Delete Note</button>
                        </div>
                    </div>`;
        }
        else {
            html += `<div class="noteCard card my-2 mx-2" style="width: 21.2rem;background: #f7fdff;box-shadow: none;">
                        <div class="card-body">
                            <div class="flexclass">
                                <h5 class="card-title" title="Created: ${element[3]}">${element[2]}</h5>
                                <button id="imp${index}" class="notimpBtn" onclick="convertToImp(this.id)"><i class="uil uil-star"></i></button>
                            </div>
                            <p class="card-text" style="text-align: justify;">${element[0]}</p>
                            <button id="delete${index}" class="btn btn-primary myBtnClass" onclick="dispalayModal(this.id)">Delete Note</button>
                        </div>
                    </div>`;
        }
    });
    if (notesArray.length !== 0) {
        notesCollection.innerHTML = html;
    }
    else {
        notesCollection.innerHTML = `Till now no notes are added. Please write your notes in the above area and click "Add Note" to save it.`;
    }
}

// function to display modal window when we click on 'Delete Note'
function dispalayModal(index) {
    // console.log(`Note ${index} is deleting`);
    let deleteNote = document.getElementById(index).parentNode.firstElementChild.firstElementChild.innerText;
    modal.querySelector('p').innerHTML = `Do you really want to delete Note "<span style="color: #0000b2;">${deleteNote}</span>"?`;
    modal.style.display = 'block';
    indexVal = Number(index.slice(6,index.length));
}

// function to add span element in the place of all searched text
function addSpan(st, textVal) {
    let arrOfDivSt = st.split(textVal);
    return arrOfDivSt.join(`<span>${textVal}</span>`);
}

// function to remove span element from the notes
function removeSpan(st) {
    let arrOfstWithoutSpan = st.split('<span>');
    let newSt = arrOfstWithoutSpan.join("");
    let newArr = newSt.split('</span>');
    return newArr.join("");
}

// function to convert a non-important note to an importent note
function convertToImp(index) {
    let i = Number(index.slice(3,index.length));
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }
    notesArray[i][1] = true;
    localStorage.setItem('notes', JSON.stringify(notesArray));
    showNotes();
}

// function to convert an important note to a non-importent note
function convertToNotImp(index) {
    let i = Number(index.slice(3,index.length));
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }
    notesArray[i][1] = false;
    localStorage.setItem('notes', JSON.stringify(notesArray));
    showNotes();
}

// function to add creation date with each note
function createdOn(){
    let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let createDate = new Date();
    let day = days[createDate.getDay()];
    let month = months[createDate.getMonth()];
    let date = createDate.getDate();
    let year = createDate.getFullYear();
    let hr = createDate.getHours();
    let min = createDate.getMinutes();
    let sec = createDate.getSeconds();
    let created;
    if (hr > 12){
        return `${day}, ${month} ${date}, ${year}, ${hr-12}:${min<10?'0'+min:min}:${sec<10?'0'+sec:sec} PM`;
    }
    else{
        return `${day}, ${month} ${date}, ${year}, ${hr}:${min<10?'0'+min:min}:${sec<10?'0'+sec:sec} AM`;
    }
}





// Main
// when we reload the page we can see the collected notes
showNotes();

// If user adds a note , add it to the localStorage
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }

    if (addTxt.value !== "" && addTitle.value !== "") {
        // notesArray is acollection of array where each array contains ----> [noteContent,important,noteTitle,createdDate]
        notesArray.push([addTxt.value, false, addTitle.value, createdOn()]);
        localStorage.setItem('notes', JSON.stringify(notesArray));
        addTxt.value = "";
        addTitle.value = "";
        // console.log(notesArray);
        // to show success alert
        if (successMessage.style.visibility === 'hidden') {
            successMessage.style.visibility = 'visible';
            // to disapear success alert after 2.5 sec
            setTimeout(function () {
                successMessage.style.visibility = 'hidden';
            }, 2500);
        }
        showNotes();
    }
    else if (addTxt.value !== "" && addTitle.value === "") {
        // to show no title warning
        alertMessageTitle.style.display = 'block';
    }
    else if (addTxt.value === "" && addTitle.value !== "") {
        // to show empty note warning
        alertMessageNote.style.display = 'block';
    }
});

// to close the modal window
closeBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    indexVal = -1;
});
cancelBtn.addEventListener('click', function () {
    modal.style.display = 'none';
    indexVal = -1;
});

// to delete note when we click 'Delete' button on modal window
deleteBtn.addEventListener('click', function () {
    // console.log(indexVal);
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notesArray = [];
    }
    else {
        notesArray = JSON.parse(notes);
    }
    notesArray.splice(indexVal, 1);
    localStorage.setItem('notes', JSON.stringify(notesArray));
    modal.style.display = 'none';
    showNotes();
    indexVal = -1;
});

// to disapear the alert message if it is there in the screen
document.body.addEventListener('click', function (e) {
    if (alertMessageTitle.style.display === 'block') {
        if (e.target !== alertMessageTitle && e.target !== addBtn && e.target !== document.querySelector('#alertMessageTitle strong') && e.target !== document.querySelector('#alertMessageTitle p')) {
            alertMessageTitle.style.display = 'none';
        }
    }
    else if (alertMessageNote.style.display === 'block') {
        if (e.target !== alertMessageNote && e.target !== addBtn && e.target !== document.querySelector('#alertMessageNote strong') && e.target !== document.querySelector('#alertMessageNote p')) {
            alertMessageNote.style.display = 'none';
        }
    }
});


// highlited the searched text (in Your Notes) given in the search box
let searchText = document.getElementById('searchText');
searchText.addEventListener('input', function (e) {
    let text = searchText.value;
    // console.log(text);
    let noteTextCollection = document.getElementById('notesCollection').getElementsByTagName('p');
    if (text === "") {
        showNotes();
    }
    Array.from(noteTextCollection).forEach(function (element) {
        element.innerText = removeSpan(element.innerHTML);
    });
    Array.from(noteTextCollection).forEach(function (element) {
        if (element.innerText.toLowerCase().includes(text.toLowerCase())) {
            element.innerHTML = addSpan(element.innerText, text);
        }
    });
});

// to search for targeted notes by clicking search button (searching by text in paragraph in Your Notes)
let searchBtn = document.getElementById('searchBtn');
searchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    let flag = true;
    let text = searchText.value;
    let noteTextCollection = document.getElementById('notesCollection').getElementsByTagName('p');
    Array.from(noteTextCollection).forEach(function (element) {
        element.innerText = removeSpan(element.innerHTML);
    });
    Array.from(noteTextCollection).forEach(function (element) {
        if (element.innerText.toLowerCase().includes(text.toLowerCase())) {
            element.parentElement.parentElement.style.display = 'block';

        }
        else {
            element.parentElement.parentElement.style.display = 'none';
        }
    });
    let arr = Array.from(document.getElementById('notesCollection').children);
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].style.display === 'block') {
            flag = false;
            break;
        }
    }
    if (flag) {
        document.getElementById('notesCollection').innerHTML = "Nothing found by searched text";
    }
});