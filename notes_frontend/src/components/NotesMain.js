import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './NotesMain.css';

/**
 * Main content area—shows note editor or placeholder.
 * PUBLIC_INTERFACE
 */
function NotesMain({ note, onChange, onDelete, loading }) {
  const [editing, setEditing] = useState(false);
  const [fields, setFields] = useState({
    title: note ? note.title : '',
    content: note ? note.content : ''
  });
  React.useEffect(() => {
    setFields({
      title: note ? note.title : '',
      content: note ? note.content : ''
    });
    setEditing(false);
  }, [note]);

  if (loading) {
    return <main className="main"><div className="loading-placeholder">Loading…</div></main>;
  }

  if (!note) {
    return <main className="main"><div className="empty-main">Select or create a note to get started.</div></main>;
  }

  // PUBLIC_INTERFACE
  const handleEdit = () => setEditing(true);

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    setFields({ ...fields, [e.target.name]: e.target.value });
  };

  // PUBLIC_INTERFACE
  const handleSave = () => {
    if (
      fields.title.trim() &&
      (fields.title !== note.title || fields.content !== note.content)
    ) {
      onChange(note.id, fields);
    }
    setEditing(false);
  };

  // PUBLIC_INTERFACE
  const handleDelete = () => {
    if (window.confirm('Delete this note?')) {
      onDelete(note.id);
    }
  };

  return (
    <main className="main">
      {editing ? (
        <div className="note-editor">
          <input
            name="title"
            value={fields.title}
            onChange={handleChange}
            className="note-title-input"
            placeholder="Title"
            autoFocus
            maxLength={120}
          />
          <textarea
            name="content"
            value={fields.content}
            onChange={handleChange}
            className="note-content-input"
            rows={12}
            placeholder="Write your note…"
          />
          <div className="editor-actions">
            <button className="btn btn-primary" onClick={handleSave}>Save</button>
            <button className="btn btn-flat" onClick={() => setEditing(false)}>Cancel</button>
            <button className="btn btn-danger right" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      ) : (
        <div className="note-view">
          <div className="note-view-title">{note.title || '(untitled)'}</div>
          <div className="note-view-date">{new Date(note.updated_at || note.created_at).toLocaleString()}</div>
          <div className="note-view-content">{note.content || <span className="placeholder">No content</span>}</div>
          <div className="viewer-actions">
            <button className="btn btn-primary" onClick={handleEdit}>Edit</button>
            <button className="btn btn-danger right" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </main>
  );
}

NotesMain.propTypes = {
  note: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default NotesMain;
