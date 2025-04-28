import React from 'react';
import TourCard from './TourCard';
import './Gallery.css';

// Gallery component to display a list of tours
function Gallery({ tours, onRemove }) {
  return (
    <div className="gallery">
      {tours.map((tour) => (
        <TourCard key={tour.id} tour={tour} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default Gallery;