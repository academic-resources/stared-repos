export const fetchNotes = () => {
  return $.ajax({
    method: "GET",
    url: "api/notes",
  });
};

export const fetchNote = (id) => {
  return $.ajax({
    method: "GET",
    url: `api/notes/${id}`,
  });
};

export const createNote = (note) => {
  return $.ajax({
    method: "POST",
    url: "api/notes",
    data: { note },
  });
};

export const updateNote = (note) => {
  return $.ajax({
    method: "PATCH",
    url: `api/notes/${note.id}`,
    data: { note },
  });
};

export const deleteNote = (noteId) => {
  return $.ajax({
    method: "DELETE",
    url: `api/notes/${noteId}`,
  });
};
