import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import RemoveIcon from '@mui/icons-material/Remove';

interface Celebrity {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}

interface CelebritiesAccordionProps {
  celebrity: Celebrity;
  onDelete: (id: number) => void;
}

const CelebritiesAccordion: React.FC<CelebritiesAccordionProps> = ({ celebrity, onDelete }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [isEditingAge, setIsEditingAge] = useState<boolean>(false);
  const [dob, setDob] = useState<string>(celebrity.dob);

  function calculateAge(dateOfBirth: string): number {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    // Check if age is editable (above 18)
    if (calculateAge(dob) >= 18) {
      setIsEditingAge(true);
    } else {
      alert("You cannot edit age if the celebrity is under 18 years old.");
    }
  };

  const handleSave = () => {
    setIsEditingAge(false);
    // Update the JSON data with the new date of birth
    // For simplicity, let's assume the JSON data is updated externally
    // You can add your logic here to update the JSON data
  };

  const handleDeleteClick = () => {
    if (window.confirm(`Are you sure to delete ${celebrity.first}?`)) {
      onDelete(celebrity.id);
    }
  };

  return (
    <Accordion expanded={expanded} onChange={handleExpand}>
      <AccordionSummary expandIcon={<>{expanded ? <RemoveIcon /> : <ExpandMoreIcon />}</>}>
        <Typography>{celebrity.first}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          <strong>Last Name:</strong> {celebrity.last}<br />
          <strong>Date of Birth:</strong> 
          {isEditingAge ? (
            <TextField
              type="date"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              onBlur={handleSave}
            />
          ) : (
            celebrity.dob
          )}
          <br />
          <strong>Gender:</strong> {celebrity.gender}<br />
          <strong>Email:</strong> {celebrity.email}<br />
          <strong>Country:</strong> {celebrity.country}<br />
          <strong>Description:</strong> {celebrity.description}<br />
        </Typography>
        <div style={{ marginLeft: 'auto' }}>
          <IconButton aria-label="edit" onClick={handleEdit}>
            <EditIcon />
          </IconButton>
          <IconButton aria-label="delete" onClick={handleDeleteClick}>
            <DeleteIcon />
          </IconButton>
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CelebritiesAccordion;
