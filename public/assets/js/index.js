document.addEventListener('DOMContentLoaded', () => {
  let noteForm = document.querySelector('.note-form');
  let noteTitle = document.querySelector('.note-title');
  let noteText = document.querySelector('.note-textarea');
  let saveNoteBtn = document.querySelector('.save-note');
  let newNoteBtn = document.querySelector('.new-note');
  let clearBtn = document.querySelector('.clear-btn');
  let noteList = document.querySelector('.list-container .list-group');
  let activeNote = {};

  const show = (elem) => {
    elem.style.display = 'inline';
  };

  const hide = (elem) => {
    elem.style.display = 'none';
  };

  const getNotes = () => fetch('/api/notes').then(res => res.json());

  const saveNote = (note) =>
    fetch('/api/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    });

  const deleteNote = (id) =>
    fetch(`/api/notes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });

  const renderActiveNote = () => {
    hide(saveNoteBtn);

    if (activeNote.id) {
      noteTitle.value = activeNote.title;
      noteText.value = activeNote.text;
      noteTitle.setAttribute('readonly', true);
      noteText.setAttribute('readonly', true);
    } else {
      noteTitle.value = '';
      noteText.value = '';
      noteTitle.removeAttribute('readonly');
      noteText.removeAttribute('readonly');
    }
  };

  const handleNoteSave = () => {
    const newNote = {
      title: noteTitle.value,
      text: noteText.value
    };

    saveNote(newNote).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

  const handleNoteDelete = (e) => {
    e.stopPropagation();

    const note = e.target;
    const noteId = JSON.parse(note.parentElement.getAttribute('data-note')).id;

    if (activeNote.id === noteId) {
      activeNote = {};
    }

    deleteNote(noteId).then(() => {
      getAndRenderNotes();
      renderActiveNote();
    });
  };

  const handleNoteView = (e) => {
    e.preventDefault();
    activeNote = JSON.parse(e.target.parentElement.getAttribute('data-note'));
    renderActiveNote();
  };

  const handleNewNoteView = (e) => {
    activeNote = {};
    renderActiveNote();
  };

  const handleRenderBtns = () => {
    if (!noteTitle.value.trim() || !noteText.value.trim()) {
      hide(saveNoteBtn);
    } else {
      show(saveNoteBtn);
    }
  };

  const renderNoteList = async (notes) => {
    let jsonNotes = await notes;
    if (window.location.pathname === '/notes') {
      noteList.innerHTML = '';

      const noteListItems = [];

      jsonNotes.forEach((note) => {
        const li = document.createElement('li');
        li.classList.add('list-group-item');
        li.dataset.note = JSON.stringify(note);

        const span = document.createElement('span');
        span.innerText = note.title;
        span.addEventListener('click', handleNoteView);

        const delBtn = document.createElement('i');
        delBtn.classList.add('fas', 'fa-trash-alt', 'float-right', 'text-danger', 'delete-note');
        delBtn.addEventListener('click', handleNoteDelete);

        li.append(span, delBtn);
        noteListItems.push(li);
      });

      noteListItems.forEach((note) => noteList.append(note));
    }
  };

  const getAndRenderNotes = () => getNotes().then(renderNoteList);

  if (window.location.pathname === '/notes') {
    saveNoteBtn.addEventListener('click', handleNoteSave);
    newNoteBtn.addEventListener('click', handleNewNoteView);
    clearBtn.addEventListener('click', renderActiveNote);
    noteForm.addEventListener('input', handleRenderBtns);
  }

  getAndRenderNotes();
});