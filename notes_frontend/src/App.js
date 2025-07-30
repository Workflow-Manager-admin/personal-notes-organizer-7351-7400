import React, { useState, useEffect } from 'react';
import './App.css';
import NotesSidebar from './components/NotesSidebar';
import NotesHeader from './components/NotesHeader';
import NotesMain from './components/NotesMain';
import { fetchNotes, createNote, updateNote, deleteNote } from './services/notesApi';

// PUBLIC_INTERFACE
/**
 * Root App component. Handles layout, state management, and theme toggling.
 */
function App() {
  const [theme] = useState('light'); // Place-holder for theme toggling (if reimplemented)
  const [notes, setNotes] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [sortBy, setSortBy] = useState('date'); // or 'title'
  const [loading, setLoading] = useState(true);

  // Fetch notes from backend on mount
  useEffect(() => {
    setLoading(true);
    fetchNotes()
      .then((data) => {
        setNotes(data || []);
        if (data && data.length > 0) setSelectedId(data[0].id);
      })
      .finally(() => setLoading(false));
  }, []);

  // Handler: select note in sidebar
  // PUBLIC_INTERFACE
  const handleSelect = (noteId) => {
    setSelectedId(noteId);
  };

  // Handler: create new note and open it immediately
  // PUBLIC_INTERFACE
  const handleNew = async () => {
    const note = await createNote({ title: 'Untitled', content: '' });
    setNotes((prev) => [note, ...prev]);
    setSelectedId(note.id);
  };

  // Handler: update note (title/content)
  // PUBLIC_INTERFACE
  const handleUpdate = async (id, changes) => {
    const updated = await updateNote(id, changes);
    setNotes((prev) => prev.map(n => (n.id === id ? updated : n)));
  };

  // Handler: delete a note
  // PUBLIC_INTERFACE
  const handleDelete = async (id) => {
    await deleteNote(id);
    setNotes((prev) => prev.filter(n => n.id !== id));
    if (selectedId === id) {
      setSelectedId(notes.length > 1 ? notes.find(n => n.id !== id)?.id : null);
    }
  };

  // Handler: change sorting (date/title)
  // PUBLIC_INTERFACE
  const handleSort = (by) => {
    setSortBy(by);
  };

  // Compute sorted notes
  const sortedNotes = [...notes].sort((a, b) => {
    if (sortBy === 'title') return a.title.localeCompare(b.title);
    return new Date(b.updated_at || b.created_at) - new Date(a.updated_at || a.created_at);
  });

  const selectedNote = notes.find(n => n.id === selectedId) || null;

  return (
    <div className={`notes-app`} data-theme={theme}>
      <NotesHeader
        onNew={handleNew}
        sortBy={sortBy}
        onSort={handleSort}
      />
      <div className="notes-body">
        <NotesSidebar
          notes={sortedNotes}
          selectedId={selectedId}
          onSelect={handleSelect}
        />
        <NotesMain
          note={selectedNote}
          onChange={handleUpdate}
          onDelete={handleDelete}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;
