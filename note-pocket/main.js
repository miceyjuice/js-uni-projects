class Note {
  constructor() {
    if (
      window.location.pathname == "/index.html" ||
      window.location.pathname == "/"
    ) {
      this.notesCount = this.getCountOfNotes();
      this.createNoteBoard();
      this.deleteNote();
      this.addingNoteView();
    } else if (window.location.pathname == "/addnote.html") {
      this.getDataFromForm();
      this.changeNoteColor();
    }
  }

  getFullDate(date) {
    return date.toLocaleDateString();
  }

  changeNoteColor() {
    let active = 0;
    const activeClass = [
      "newNoteOptions__color__palette__default--active",
      "newNoteOptions__color__palette__turquoise--active",
      "newNoteOptions__color__palette__orange--active",
      "newNoteOptions__color__palette__red--active",
      "newNoteOptions__color__palette__pink--active",
      "newNoteOptions__color__palette__green--active",
    ];
    const colorBtns = document.querySelectorAll(".oneColor");

    for (let i = 0; i < colorBtns.length; i++) {
      colorBtns[i].addEventListener("click", () => {
        colorBtns[active].classList.remove(activeClass[active]);
        active = i;
        colorBtns[i].classList.add(activeClass[i]);
      });
    }
  }

  setCountOfNotes(numberOfNotes) {
    let noteCounter = parseInt(numberOfNotes);
    noteCounter += 1;
    localStorage.setItem("notesCount", noteCounter);
  }

  getDataFromForm() {
    const addBtn = document.querySelector(".newNoteView__buttons__add");

    addBtn.addEventListener("click", () => {
      const title = document.querySelector(".newNoteView__info__title__input")
        .value;
      const description = document.querySelector(
        ".newNoteView__info__description__input"
      ).value;
      const tags = document.querySelector(".newNoteView__info__tags__input")
        .value;
      if (title == "" || description == "" || tags == "") {
        return console.log("Wypelnij pola");
      } else {
        this.createNote(this.getFullDate(new Date()), title, description, tags);
        window.open("index.html", "_self");
      }
    });
  }

  togglePin(noteIndex) {
    const notes = this.getAllNotes();
    const note = JSON.parse(notes[noteIndex]);

    note.pinned = !note.pinned;
    localStorage.setItem(`note${noteIndex}`, JSON.stringify(note));
    window.location.reload();
  }

  addingNoteView() {
    if (
      window.location.pathname == "/" ||
      window.location.pathname == "/index.html"
    ) {
      if (this.getCountOfNotes() == 0) {
        document.querySelector(".noNotesBtn").addEventListener("click", () => {
          window.open("addnote.html", "_self");
        });
      } else {
        document
          .querySelector(".mainNotesView__topBar__search__input")
          .addEventListener("keydown", () => {
            this.searchThroughNotes();
          });
        document.querySelector(".topBtn").addEventListener("click", () => {
          window.open("addnote.html", "_self");
        });
      }
    }
  }

  changeView() {
    if (
      window.location.pathname == "/" ||
      window.location.pathname == "/index.html"
    ) {
      const mainContainer = document.querySelector(".mainNotesView__list");
      const content = `
      <div class="mainNotesView__list__noNotes">
        <div class="mainNotesView__list__noNotes__box">
          <div class="mainNotesView__list__noNotes__box__img"></div>
          <h2 class="mainNotesView__list__noNotes__box__alert">
            You have no notes
          </h2>
          <button class="mainNotesView__topBar__addNote__button noNotesBtn">
            <div class="mainNotesView__topBar__addNote__button__icon"></div>
            Add a note
          </button>
        </div>
      </div>
    `;

      document.querySelector(
        ".mainNotesView__topBar__addNote"
      ).style.visibility = "hidden";

      mainContainer.innerHTML = content;
    }
  }

  searchThroughNotes() {
    const searchBar = document.querySelector(
      ".mainNotesView__topBar__search__input"
    );
    const filter = searchBar.value.toUpperCase();

    const noteBoxes = document.querySelectorAll(
      ".mainNotesView__list__noteBox"
    );

    for (let i = 0; i < noteBoxes.length; i++) {
      const text = noteBoxes[i].getElementsByTagName("p");
      const head = noteBoxes[i].getElementsByTagName("h4")[0];

      const headValue = head.textContent || head.innerText;
      let textValue;

      for (let j = 0; j < text.length; j++) {
        textValue = text[j].textContent || text[j].innerText;
      }

      if (text != "" || head != "") {
        console.log(textValue);
        console.log(headValue);
        for (let k = 0; k < textValue.length; k++) {
          if (
            textValue[k].toUpperCase().indexOf(filter) > -1 ||
            headValue.toUpperCase().indexOf(filter) > -1
          ) {
            console.log(textValue.toUpperCase().indexOf(filter));
            noteBoxes[i].style.display = "flex";
          } else {
            noteBoxes[i].style.display = "none";
          }
        }
      }
    }
  }

  getCountOfNotes() {
    if (localStorage.getItem("notesCount") == null) {
      this.changeView();
      localStorage.setItem("notesCount", 0);
      return 0;
    } else if (localStorage.getItem("notesCount") == 0) {
      this.changeView();
      return 0;
    } else {
      return localStorage.getItem("notesCount");
    }
  }

  getAllNotes() {
    const localStorageLength = localStorage.length - 1;
    const notes = [];

    for (let i = 0; i < localStorageLength; i++) {
      notes.push(localStorage.getItem(`note${i}`));
    }
    return notes;
  }

  getActiveColor() {
    const colors = document.querySelectorAll(".oneColor");
    const schema = [
      {
        className: "newNoteOptions__color__palette__default--active",
        colorName: "default",
      },
      {
        className: "newNoteOptions__color__palette__turquoise--active",
        colorName: "turquoise",
      },
      {
        className: "newNoteOptions__color__palette__orange--active",
        colorName: "orange",
      },
      {
        className: "newNoteOptions__color__palette__red--active",
        colorName: "red",
      },
      {
        className: "newNoteOptions__color__palette__pink--active",
        colorName: "pink",
      },
      {
        className: "newNoteOptions__color__palette__green--active",
        colorName: "green",
      },
    ];
    let targetClassName = "";
    let rightColor;

    for (let i = 0; i < colors.length; i++) {
      if (colors[i].classList.length == 3) {
        console.log(colors[i].classList[2]);
        targetClassName = colors[i].classList[2];
      }
    }
    schema.map((value) => {
      if (value.className == targetClassName) {
        console.log(value.colorName);
        rightColor = value.colorName;
        return value.colorName;
      }
    });
    return rightColor;
  }

  createNote(
    noteDate,
    noteTitle,
    noteDescription,
    noteTags,
    notePinned = false
  ) {
    const noteColor = this.getActiveColor();
    const note = {
      title: noteTitle,
      description: noteDescription,
      tags: noteTags,
      date: noteDate,
      color: noteColor,
      pinned: notePinned,
    };

    console.log(noteColor);

    localStorage.setItem(`note${this.getCountOfNotes()}`, JSON.stringify(note));
    this.setCountOfNotes(this.getCountOfNotes());
  }

  createNoteBox(data, itemNumber) {
    const noteBox = document.createElement("div");
    const dataParsed = JSON.parse(data);
    noteBox.classList.add(`mainNotesView__list__noteBox`);
    noteBox.classList.add(`${dataParsed.color}`);

    console.log(dataParsed);

    let content = `
    <p class="mainNotesView__list__noteBox__date">${dataParsed.date}</p>
    <h4 class="mainNotesView__list__noteBox__title">${dataParsed.title}</h4>
    <p class="mainNotesView__list__noteBox__description">${dataParsed.description}</p>
    <p class="mainNotesView__list__noteBox__tags">${dataParsed.tags}</p>
    <div class="mainNotesView__list__noteBox__options">
      <div class="mainNotesView__list__noteBox__options__edit"></div>
      <div class="mainNotesView__list__noteBox__options__pin"></div>
      <div class="mainNotesView__list__noteBox__options__delete" data-key="${itemNumber}"></div>
      <div class="mainNotesView__list__noteBox__options__check"></div>
    </div>
    `;

    noteBox.innerHTML = content;
    noteBox
      .querySelector(".mainNotesView__list__noteBox__options__pin")
      .addEventListener("click", () => {
        this.togglePin(itemNumber);
      });
    return noteBox;
  }

  deleteNote() {
    if (this.getCountOfNotes() > 0) {
      const deleteBtn = document.querySelectorAll(
        ".mainNotesView__list__noteBox__options__delete"
      );

      for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", () => {
          for (let j = i; j < localStorage.length - 1; j++) {
            localStorage.setItem(
              `note${j}`,
              localStorage.getItem(`note${j + 1}`)
            );
          }
          localStorage.removeItem(`note${localStorage.length - 2}`);

          this.notesCount = this.getCountOfNotes();

          this.redrawNotes(i);
        });
      }
    }
  }
  pinNote() {
    const pinBtn = document.querySelectorAll(
      ".mainNotesView__list__noteBox__options__pin"
    );

    for (let i = 0; i < pinBtn.length; i++) {
      pinBtn[i].addEventListener("click", () => {});
    }
  }
  redrawNotes(keyOfNote) {
    const notes = this.getAllNotes();
    const countOfNotes = notes.length;
    localStorage.clear();
    this.setCountOfNotes(-1);
    for (let i = 0; i < countOfNotes; i++) {
      const note = JSON.parse(notes[i]);
      localStorage.setItem(
        `note${this.getCountOfNotes()}`,
        JSON.stringify(note)
      );
      this.setCountOfNotes(this.getCountOfNotes());
      console.log(note);
    }
    window.location.reload();
  }

  createNoteBoard() {
    const notes = this.getAllNotes();
    const board = document.querySelector(".mainNotesView__list");
    const boardPinned = document.querySelector(".mainNotesView__listPinned");

    for (let i = 0; i < notes.length; i++) {
      if (JSON.parse(notes[i]).pinned) {
        boardPinned.appendChild(this.createNoteBox(notes[i], i));
        boardPinned.style.visibility = "visible";
      } else {
        board.appendChild(this.createNoteBox(notes[i], i));
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new Note();
});
