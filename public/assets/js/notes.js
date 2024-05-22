const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Path to the db.json file
const dbPath = path.resolve(__dirname, '../db/db.json');

// Helper function to read the db.json file
const readDbFile = () => {
    try {
        const data = fs.readFileSync(dbPath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading db.json:', error);
        return [];
    }
};

// Helper function to write to the db.json file
const writeDbFile = (data) => {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 4));
    } catch (error) {
        console.error('Error writing to db.json:', error);
    }
};

// GET route to retrieve all notes
router.get('/api/notes', (req, res) => {
    const notes = readDbFile();
    res.json(notes);
});

// POST route to add a new note
router.post('/api/notes', (req, res) => {
    const notes = readDbFile();
    const newNote = req.body;

    // Generate a unique ID for the new note
    newNote.id = Date.now().toString();

    notes.push(newNote);
    writeDbFile(notes);

    res.json(newNote);
});

// DELETE route to delete a note by ID
router.delete('/api/notes/:id', (req, res) => {
    const notes = readDbFile();
    const noteId = req.params.id;

    // Filter out the note with the specified ID
    const updatedNotes = notes.filter((note) => note.id !== noteId);

    writeDbFile(updatedNotes);

    res.sendStatus(200);
});

// GET route to serve the notes.html file
router.get('/notes', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/notes.html'));
});

// GET route to serve the index.html file as the landing page
router.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

module.exports = router;