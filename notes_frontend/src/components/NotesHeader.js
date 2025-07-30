import React from 'react';
import PropTypes from 'prop-types';
import './NotesHeader.css';

/**
 * Header for note app - shows title, new note button, and sort buttons.
 * PUBLIC_INTERFACE
 */
function NotesHeader({ onNew, sortBy, onSort }) {
  return (
    <header className="header">
      <div className="app-title">📝 Personal Notes</div>
      <div className="header-actions">
        <button className="btn btn-primary" onClick={onNew} title="Create new note">
          + New Note
        </button>
        <span className="sort-label">Sort:</span>
        <button
          className={`btn btn-flat${sortBy === "date" ? ' selected' : ''}`}
          onClick={() => onSort('date')}
        >
          Date
        </button>
        <button
          className={`btn btn-flat${sortBy === "title" ? ' selected' : ''}`}
          onClick={() => onSort('title')}
        >
          Title
        </button>
      </div>
    </header>
  );
}

NotesHeader.propTypes = {
  onNew: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default NotesHeader;
