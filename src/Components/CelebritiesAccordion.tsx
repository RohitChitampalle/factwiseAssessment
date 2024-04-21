import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, IconButton, TextField, Card, CardContent, CardActions, CardMedia, Grid } from '@mui/material';
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
  expanded: boolean;
  onChange: () => void;
}

const CelebritiesAccordion: React.FC<CelebritiesAccordionProps> = ({ celebrity, onDelete, expanded, onChange }) => {
  const [isEditingAge, setIsEditingAge] = useState<boolean>(false);
  const [dob, setDob] = useState<string>(celebrity.dob);
  const [age, setAge] = useState<number>(calculateAge(celebrity.dob));

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
    setAge(calculateAge(dob));
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
    <Accordion expanded={expanded} onChange={onChange}>
      <AccordionSummary expandIcon={<>{expanded ? <RemoveIcon /> : <ExpandMoreIcon />}</>}>
        <Typography>{celebrity.first}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Card style={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 50, height: 50, marginRight: 2, borderRadius: 100 }}
            image={celebrity.picture}
            alt={`${celebrity.first} ${celebrity.last}`}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {celebrity.first} {celebrity.last}
            </Typography>
            <Grid container spacing={2}>
            <Grid item xs={12}>
  <Typography variant="body2" color="text.secondary">
    {/* <strong>Date of Birth:</strong>  */}
    {isEditingAge ? (
      <TextField
        type="date"
        value={dob}
        onChange={(e) => setDob(e.target.value)}
        onBlur={handleSave}
      />
    ) : (
      <>
        Age: {age}
      </>
    )}
    &nbsp;&nbsp;&nbsp;
    <strong>Gender:</strong> {celebrity.gender}&nbsp;&nbsp;&nbsp;
    <strong>Country:</strong> {celebrity.country}<br />
  </Typography>
</Grid>

              {/* <Grid item xs={12} sm={6}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Gender:</strong> {celebrity.gender}<br />
                  <strong>Country:</strong> {celebrity.country}<br />
                </Typography>
              </Grid> */}
              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary">
                  <strong>Description:</strong> {celebrity.description}<br />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
         <div style={{ marginLeft: 'auto', marginTop: 'auto' }}>
 <CardActions>
    <IconButton aria-label="edit" onClick={handleEdit} style={{ color: 'blue' }}>
      <EditIcon />
    </IconButton>
    <IconButton aria-label="delete" onClick={handleDeleteClick} style={{ color: 'red' }}>
      <DeleteIcon />
    </IconButton>
  </CardActions>
</div>
        </Card>
      </AccordionDetails>
    </Accordion>
  );
};

export default CelebritiesAccordion;
