import { useState, useEffect, useRef } from "react";
import Note from "./note";
import "./notes.css";

const Notes = () => {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState("");
  const isFirstLoad = useRef(true); // 👈 флаг

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("stickyNotes")) || [];
    setNotes(stored);
  }, []);

  useEffect(() => {
    // Пропускаем первый рендер
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }
    localStorage.setItem("stickyNotes", JSON.stringify(notes));
  }, [notes]);

  const handleAdd = () => {
    if (input.trim() === "") return;
    const newNote = {
      id: Date.now(),
      text: input,
    };
    setNotes([newNote, ...notes]);
    setInput("");
  };

  const handleEdit = (id, newText) => {
    const updated = notes.map((note) =>
      note.id === id ? { ...note, text: newText } : note
    );
    setNotes(updated);
  };
  const handleDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
  };

  return (
    <div className="notes-container">
      <h1 className="notes-title">📌 Sticky Notes</h1>
      <div className="notes-input">
        <textarea
          placeholder="Write your note here..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={handleAdd}>Add Note</button>
      </div>

      <div className="drag-area">
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </div>
    </div>
  );
};

export default Notes;
