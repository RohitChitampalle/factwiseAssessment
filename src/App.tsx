import React, { useState } from 'react';
import CelebritiesAccordion from './Components/CelebritiesAccordion';
import SearchBar from './Components/SearchBar';
import celebrityData from './celebrities_data/celebrities.json';

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

const App: React.FC = () => {
  const [celebrities, setCelebrities] = useState<Celebrity[]>(celebrityData);
  const [filteredCelebrities, setFilteredCelebrities] = useState<Celebrity[]>(celebrityData);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    const updatedCelebrities = celebrities.filter((celebrity) => celebrity.id !== id);
    setCelebrities(updatedCelebrities);
    setFilteredCelebrities(updatedCelebrities);
  };

  const handleSearch = (query: string) => {
    const filteredList = celebrities.filter((celebrity) =>
      celebrity.first.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredCelebrities(filteredList);
  };

  const handleAccordionChange = (id: number | null) => {
    setExpandedId(id);
  };

  return (
    <div>
      <h1>Celebrities</h1>
      <SearchBar onSearch={handleSearch} />
      {filteredCelebrities.map((celebrity, index) => (
        <CelebritiesAccordion
          key={index}
          celebrity={celebrity}
          onDelete={handleDelete}
          expanded={celebrity.id === expandedId}
          onChange={() => handleAccordionChange(celebrity.id === expandedId ? null : celebrity.id)}
        />
      ))}
    </div>
  );
};

export default App;
