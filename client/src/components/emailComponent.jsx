import React, { useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const EmailComponent = ({ id}) => {
  const [loading, setLoading] = useState(false);
  const[SuccessMessage,setSuccessMessage] = useState(false);
  const handleDeleteClick = async (event) => {
    event.preventDefault();
    const confirmDelete = window.confirm("Êtes-vous sûr de vouloir déplacer cet e-mail vers la corbeille ?");

    if (confirmDelete) {
      console.log('Trying to move to trash. Email ID:', id);
      try {
        setLoading(true);
        console.log('URL for the request:', `http://localhost:5000/trash/move-to-trash/${id}`);
        const response = await axios.put(`${process.env.REACT_APP_API_LINK}trash/move-to-trash/${id}`);
        console.log('Response:', response);

        if (response.status === 200) {
          console.log('Email moved to trash successfully');
          // Assurez-vous que setSuccessMessage est une fonction définie
          if (typeof setSuccessMessage === 'function') {
            setSuccessMessage('Email moved to trash successfully');
          } 
          window.location.reload();
          } else {
            console.error('Failed to move email to trash');
          }
      } catch (error) {
        console.error('Error moving email to trash:', error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <a href="sent" onClick={handleDeleteClick} disabled={loading}>
        <FaTrash className={`text-gray-600 mx-2 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`} />
      </a>
    </div>
  );
};

export default EmailComponent;

