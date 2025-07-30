import React from 'react';
import PropTypes from 'prop-types';
import './NotesSidebar.css';

/**
 * Sidebar for navigating between notes.
 * PUBLIC_INTERFACE
 */
function NotesSidebar({ notes, selectedId, onSelect }) {
  return (
    <aside className="sidebar">
      <nav>
        {notes.length === 0 ? (
          <p className="empty-sidebar">No notes yet.</p>
        ) : (
          <ul className="notes-list">
            {notes.map(note => (
              <li
                key={note.id}
                className={note.id === selectedId ? 'active' : ''}
                onClick={() => onSelect(note.id)}
                tabIndex={0}
                aria-selected={note.id === selectedId}
                role="option"
              >
                <div className="note-title">{note.title || '(untitled)'}</div>
                <div className="note-date">{new Date(note.updated_at || note.created_at).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        )}
      </nav>
    </aside>
  );
}

NotesSidebar.propTypes = {
  notes: PropTypes.array.isRequired,
  selectedId: PropTypes.any,
  onSelect: PropTypes.func.isRequired,
};

export default NotesSidebar;
