import React, { useState, useEffect, useRef } from "react";
import Note from "./Note";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  const justDragged = useRef(false); // 👈 this tracks dragging

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleCanvasClick = (e) => {
    if (justDragged.current) {
      justDragged.current = false; // reset it
      return; // prevent accidental note creation
    }

    if (e.target.className !== "canvas") return;

    const newNote = {
      id: uuidv4(),
      text: "",
      x: e.clientX,
      y: e.clientY,
      color: "#fff8a6", // default yellow
    };
    
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, newProps) => {
    if (newProps.justDragged) {
      justDragged.current = true;
      return;
    }

    if (newProps.delete) {
      setNotes(prevNotes => prevNotes.filter(note => note.id !== id));
    } else {
      setNotes(prevNotes =>
        prevNotes.map(note =>
          note.id === id ? { ...note, ...newProps } : note
        )
      );
    }
  };
  const isEmpty = notes.length === 0;

  return (
    <div className="canvas" onClick={handleCanvasClick}>
      {isEmpty && (
  <div className="welcome-message">
    <h2>📝 Welcome to Wisp</h2>
    <p>Click anywhere to add a note</p>
    <p>Drag to move • Resize freely • Click × to delete</p>
  </div>
)}

      {notes.map(note => (
        <Note key={note.id} note={note} updateNote={updateNote} />
      ))}

<div className="toolbar">
  <button onClick={() => setNotes([])}>🗑️ Clear All</button>
</div>

      
    </div>
  );
}

export default App;
