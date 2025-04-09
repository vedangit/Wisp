import React, { useRef, useEffect } from "react";

const Note = ({ note, updateNote }) => {
  const noteRef = useRef();

  // Set initial text only once on mount
  useEffect(() => {
    if (noteRef.current) {
      noteRef.current.innerText = note.text;
    }
  }, []); // <- run only once on mount

  const handleInput = (e) => {
    updateNote(note.id, { text: e.target.innerText });
  };

  const handleDragMouseDown = (e) => {
    const noteEl = noteRef.current;
    const shiftX = e.clientX - noteEl.getBoundingClientRect().left;
    const shiftY = e.clientY - noteEl.getBoundingClientRect().top;

    const moveAt = (pageX, pageY) => {
      updateNote(note.id, {
        x: pageX - shiftX,
        y: pageY - shiftY,
      });
    };

    const onMouseMove = (e) => moveAt(e.pageX, e.pageY);

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener(
      "mouseup",
      () => document.removeEventListener("mousemove", onMouseMove),
      { once: true }
    );
  };

  return (
    <div
      className="note"
      style={{
        top: note.y,
        left: note.x,
        position: "absolute",
      }}
    >
      <div
        className="note-header"
        onMouseDown={handleDragMouseDown}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <button
          className="delete-btn"
          onClick={(e) => {
            e.stopPropagation();
            updateNote(note.id, { delete: true });
          }}
        >
          ×
        </button>
      </div>
      <div
        className="note-content"
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        ref={noteRef}
        style={{
          minHeight: "50px",
          padding: "8px",
          outline: "none",
          resize: "both",
          overflow: "auto",
        }}
      />
    </div>
  );
};

export default Note;
