import React, { useState, useEffect } from "react";
import Note from "./Note";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

function App() {
  const [notes, setNotes] = useState(() => {
    const saved = localStorage.getItem("notes");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleCanvasClick = (e) => {
    if (e.target.className !== "canvas") return;

    const newNote = {
      id: uuidv4(),
      text: "",
      x: e.clientX,
      y: e.clientY,
    };
    setNotes([...notes, newNote]);
  };

  const updateNote = (id, newProps) => {
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

  return (
    <div className="canvas" onClick={handleCanvasClick}>
      {notes.map(note => (
        <Note key={note.id} note={note} updateNote={updateNote} />
      ))}
    </div>
  );
}

export default App;
