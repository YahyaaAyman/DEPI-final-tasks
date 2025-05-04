import React, { useState } from 'react';

const MessageList = ({ messages, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editMessage, setEditMessage] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  const handleEditChange = (e) => {
    setEditMessage({ ...editMessage, [e.target.name]: e.target.value });
  };

  const handleSaveEdit = () => {
    onUpdate(editIndex, editMessage);
    setIsEditing(false);
    setEditMessage({});
  };

  return (
    <div>
      <h2>Saved Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {messages.map((msg, index) => (
            <li key={index} style={messageStyle}>
              {isEditing && editIndex === index ? (
                <>
                  <input
                    name="name"
                    value={editMessage.name}
                    onChange={handleEditChange}
                    style={inputStyle}
                  />
                  <input
                    name="email"
                    value={editMessage.email}
                    onChange={handleEditChange}
                    style={inputStyle}
                  />
                  <textarea
                    name="message"
                    value={editMessage.message}
                    onChange={handleEditChange}
                    style={textareaStyle}
                  />
                  <button onClick={handleSaveEdit} style={buttonStyle}>
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={{ ...buttonStyle, backgroundColor: 'red' }}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <strong>{msg.name}</strong> ({msg.email}): {msg.message}
                  <br />
                  <button onClick={() => onDelete(index)} style={deleteButtonStyle}>
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      setIsEditing(true);
                      setEditMessage(msg);
                      setEditIndex(index);
                    }}
                    style={editButtonStyle}
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const messageStyle = {
  marginBottom: '1rem',
  padding: '10px',
  borderBottom: '1px solid #ccc',
};

const inputStyle = {
  padding: '10px',
  margin: '5px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
};

const textareaStyle = {
  padding: '10px',
  margin: '5px 0',
  borderRadius: '5px',
  border: '1px solid #ccc',
  minHeight: '80px',
};

const buttonStyle = {
  padding: '10px 20px',
  borderRadius: '5px',
  border: 'none',
  backgroundColor: '#4CAF50',
  color: 'white',
  cursor: 'pointer',
};

const editButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#FFA500',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  marginLeft: '10px',
};

const deleteButtonStyle = {
  padding: '5px 10px',
  backgroundColor: '#FF6347',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
};

export default MessageList;
