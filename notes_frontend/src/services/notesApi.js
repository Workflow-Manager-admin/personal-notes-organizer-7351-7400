const API_BASE = process.env.REACT_APP_NOTES_API_URL || "http://localhost:8080"; // Adjust as needed for deployment

// PUBLIC_INTERFACE
/**
 * Fetch all notes.
 * @returns {Promise<Array>} Array of note objects.
 */
export async function fetchNotes() {
  const res = await fetch(`${API_BASE}/notes`);
  if (!res.ok) throw new Error('Failed to fetch notes');
  return res.json();
}

// PUBLIC_INTERFACE
/**
 * Create new note.
 * @param {Object} note Data for new note (title, content)
 * @returns {Promise<Object>} The created note.
 */
export async function createNote(note) {
  const res = await fetch(`${API_BASE}/notes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(note)
  });
  if (!res.ok) throw new Error('Failed to create note');
  return res.json();
}

// PUBLIC_INTERFACE
/**
 * Update existing note.
 * @param {string|number} id
 * @param {Object} changes Fields to update.
 * @returns {Promise<Object>} Updated note.
 */
export async function updateNote(id, changes) {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes)
  });
  if (!res.ok) throw new Error('Failed to update note');
  return res.json();
}

// PUBLIC_INTERFACE
/**
 * Delete a note.
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export async function deleteNote(id) {
  const res = await fetch(`${API_BASE}/notes/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Failed to delete note');
}
