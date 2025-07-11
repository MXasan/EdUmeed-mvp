import React, { useState } from 'react';

const Note = ({ id, text, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(text);

    const handleSave = () => {
        onEdit(id, editedText); 
        setIsEditing(false);
        console.log(isEditing)
    };

    return (
        <div className="noteItem" onClick={() => !isEditing &&  setIsEditing(true)} >
            <button className="delete-btnNote" onClick={() => onDelete(id)}>×</button>

            {isEditing ? (
                <>
                    <textarea
                        className="edit-area"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                    />
                    <button className="save-btn" onClick={handleSave}>💾</button>
                </>
            ) : (
                <>
                    <p>{text}</p>
                </>
            )}
        </div >
    );
};

export default Note;
