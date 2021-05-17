document.addEventListener('DOMContentLoaded', AddNote(), Switch(), clearLocalStorage());

// When add note button clicked -- 01
function Analyze() {

    // get the value of title input field and textarea field
    let inputField = document.getElementById("title-input").value;
    let textareaField = document.getElementById("note-textarea").value;

    // alert paragraph element
    let alert = document.querySelector(".alert");

    // if both fields are empty
    if (inputField == "" || textareaField == "") {
        alert.innerText = "Both Fields are Required!";
        alert.style.display = "block";
    }
    // if length of inputField is greater than 40 char
    else if (inputField.length > 40) {
        alert.innerText = "Title Field must be less than 40 characters!";
        alert.style.display = "block";
    }
    // if upper both conditions are false then store data and add note
    else {
        alert.innerText = "";
        alert.style.display = "none";
        CheckAndStoreData(inputField, textareaField);
    }

}

// store Data to the localStorage -- 02
function CheckAndStoreData(title, textarea) {

    let num;

    if (localStorage.length == 0)
        num = 0;
    else
        num = localStorage.length / 2;

    if (sessionStorage.getItem('switch') == "true") {
        let filterTitle = document.createElement("div");
        filterTitle.innerHTML = title;

        localStorage.setItem('title-' + num, filterTitle.innerText);
        localStorage.setItem('text-' + num, textarea);
    } else {
        let filterTitle = document.createElement("div");
        filterTitle.innerHTML = title;

        let filterTextarea = document.createElement("div")
        filterTextarea.innerHTML = textarea;

        localStorage.setItem('title-' + num, filterTitle.innerText);
        localStorage.setItem('text-' + num, filterTextarea.innerText);
    }
    location.reload();
}


// Function for Add Note --- 003
function AddNote() {

    let parent = document.querySelector(".parent");
    for (let index = 0; index < localStorage.length / 2; index++) {

        if (localStorage.getItem('title-' + index).length != 0 && localStorage.getItem('text-' + index).length != 0) {

            let creatediv = document.createElement("div");
            creatediv.id = index;

            if (localStorage.getItem('text-' + index).length > 1000)
                creatediv.className = "col-md-12 column";
            else if (localStorage.getItem('text-' + index).length > 500)
                creatediv.className = "col-md-8 column";
            else
                creatediv.className = "col-md-4 column";

            creatediv.innerHTML = `
            <div class="all-notes">
                <div class="card">
                <div id="popup-${index}" class="popup text-center" style="display: none;">
                        <h4>Are You Sure?</h4>
                        <div class="popupBtns mt-1">
                            <a id="No-${index}">No</a>
                            <a id="yes-${index}">Yes</a>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="_alert"></div>
                        <h3> ${localStorage.getItem('title-' + index)} </h3>
                        <p> ${localStorage.getItem('text-' + index)} </p>
                        <div class="dropdown">
                            <button type="button" id="dropdownMenuButton" data-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <i class="fa fa-ellipsis-h"></i>
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                <a class="dropdown-item" id="${index}" onclick="Edit(id)">Edit</a>
                                <a class="dropdown-item delete" id="${index}" onclick="Delete(id)">Delete</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
            parent.appendChild(creatediv);
        }

    }

    document.getElementById("title-input").value = "";
    document.getElementById("note-textarea").value = "";
}

// Delete the note
function Delete(id) {

    let hideOptionBtn = document.getElementById(id).querySelector('.dropdown');
    hideOptionBtn.style.display = "none";

    let popup = document.getElementById("popup-" + id);
    popup.style.display = "block";

    let option_No = document.getElementById("No-" + id);
    let option_yes = document.getElementById("yes-" + id);

    option_No.addEventListener('click', function () {
        popup.style.display = "none";
        hideOptionBtn.style.display = "block";
    });

    option_yes.addEventListener('click', function () {
        document.getElementById(id).remove();
        localStorage.setItem('title-' + id, "");
        localStorage.setItem('text-' + id, "");
        hideOptionBtn.style.display = "block";
    });
}

function Edit(id) {

    // Hide the Dropdown Menu
    let hideOptionBtn = document.getElementById(id).querySelector('.dropdown');
    hideOptionBtn.style.display = "none";

    // Get the elemsts to append button
    let parent = document.getElementById(id).querySelector(".card-body");

    // Create the save button
    let saveBtn = document.createElement("a");
    saveBtn.className = "save-button";
    saveBtn.innerText = "save";

    // Append the save button to parent
    parent.appendChild(saveBtn);

    // get both the elements
    let titleElement = document.getElementById(id).querySelector(".card-body h3");
    let textELement = document.getElementById(id).querySelector(".card-body p");

    // create titlle input field
    let TitleField = document.createElement('input');
    TitleField.className = "form-control input";
    TitleField.value = titleElement.innerText;

    // create textarea input field
    let TextField = document.createElement('textarea');
    TextField.className = "form-control textarea";
    TextField.value = textELement.innerText;

    // Make both elements editable
    titleElement.replaceWith(TitleField);
    textELement.replaceWith(TextField);

    saveBtn.addEventListener('click', function () {

        let alert = document.getElementById(id).querySelector(".card-body ._alert");

        if (TextField.value == "" || TitleField.value == "") {
            alert.innerText = "Both Field are Required!";
            alert.style.display = "block";
        } 
        else if (TitleField.value.length > 40) {
            alert.innerText = "Title Field must be less than 40 characters!";
            alert.style.display = "block";
        } 
        else {
            alert.style.display = "none";

            let filterTitle = document.createElement("div");
            filterTitle.innerHTML = TitleField.value;

            let filterText = document.createElement("div");
            filterText.innerHTML = TextField.value;

            titleElement.innerHTML = filterTitle.innerText;
            textELement.innerHTML = filterText.innerText;

            localStorage.setItem('title-' + id, filterTitle.innerText);
            localStorage.setItem('text-' + id, filterText.innerText);

            TitleField.replaceWith(titleElement);
            TextField.replaceWith(textELement);

            saveBtn.remove();
            hideOptionBtn.style.display = "block";
        }
    });
}

// Function for checkbox
function Switch(id) {

    let elem = document.querySelector(".switch");

    if (id == "false") {
        sessionStorage.setItem('switch', true);
        elem.style.color = '#c31432';
        elem.id = "true";
    } else {
        sessionStorage.setItem('switch', false);
        elem.style.color = '#333';
        elem.id = "false";
    }
}

// Display total charaters of text area field
document.addEventListener('keyup', function () {
    let textarea = document.getElementById("note-textarea").value;
    let textareaLengthElem = document.getElementById("textarea-length");

    if (textarea.length > 0) {
        textareaLengthElem.innerHTML = textarea.length + 1 + " characters";
        textareaLengthElem.style.display = "block";
    } else {
        textareaLengthElem.style.display = "none";
    }
});

// Search function
document.addEventListener('keyup', function () {
    let searchValue = document.querySelector(".search input").value.toLowerCase();
    let notes = document.getElementsByClassName("column");

    for (let index = 0; index < notes.length; index++) {
        let title = notes[index].querySelector(".card-body h3").innerText.toLowerCase();

        if (title.indexOf(searchValue) > -1) {
            notes[index].style.display = "block";
        } else {
            notes[index].style.display = "none";
        }
    }
});

// Clear the localStorage when there is no notes
function clearLocalStorage() {
    if (document.getElementsByClassName('column').length == 0) {
        localStorage.clear();
    }
}
