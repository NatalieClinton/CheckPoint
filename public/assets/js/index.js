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

  const getNotes = () => fetch('/api/notes');

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
    // Implementation here
  };

  const handleNoteSave = () => {
    // Implementation here
  };

  const handleNoteDelete = (e) => {
    // Implementation here
  };

  const handleNoteView = (e) => {
    // Implementation here
  };

  const handleNewNoteView = (e) => {
    // Implementation here
  };

  const handleRenderBtns = () => {
    // Implementation here
  };

  const renderNoteList = async (notes) => {
    // Implementation here
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