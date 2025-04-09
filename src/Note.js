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
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      updateNote(note.id, { justDragged: true }); // 👈 notify drag
    }, { once: true });
    

  };

  return (
    <div
      className="note"
      style={{
        top: note.y,
        left: note.x,
        backgroundColor: note.color,
        position: "absolute",
      }}
      
    >
      <div
        className="note-header"
        onMouseDown={handleDragMouseDown}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <div className="color-buttons">
  {["#fff8a6", "#c7f7d4", "#d0e1ff", "#f8c7ec"].map((color) => (
    <button
      key={color}
      style={{
        backgroundColor: color,
        width: "16px",
        height: "16px",
        border: "1px solid #ccc",
        marginRight: "4px",
        cursor: "pointer",
      }}
      onClick={(e) => {
        e.stopPropagation();
        updateNote(note.id, { color });
      }}
    />
  ))}
</div>

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
