import { useState, useEffect } from 'react';
import './App.css';
import Gallery from './components/Gallery';

function App() {
  // State variables
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch tours data from the API
  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/react-tours-project');
      if (!response.ok) {
        throw new Error('Failed to fetch tours');
      }
      const data = await response.json();
      setTours(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch tours when the component mounts
  useEffect(() => {
    fetchTours();
  }, []);

  // Function to remove a tour by its ID
  const removeTour = (id) => {
    setTours((prevTours) => prevTours.filter((tour) => tour.id !== id));
  };

  // Conditional rendering: Show loading, error, or content
  if (loading) {
    return <h2 className="status-message">Loading...</h2>;
  }

  if (error) {
    return <h2 className="status-message">Error: {error}</h2>;
  }

  if (tours.length === 0) {
    return (
      <div className="no-tours">
        <h2>No Tours Left</h2>
        <button onClick={fetchTours} className="refresh-btn">
          Refresh
        </button>
      </div>
    );
  }

  // Main application layout
  return (
    <div className="app">
      <header className="app-header">
        <h1>Tour Gallery</h1>
      </header>
      <main>
        <Gallery tours={tours} onRemove={removeTour} />
      </main>
    </div>
  );
}

export default App;
