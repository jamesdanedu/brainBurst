import { useState } from 'react';
import Papa from 'papaparse';
import Flashcard from './Flashcard';

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f0f8ff',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  changeSubjectLink: {
    color: '#007bff',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '16px',
  },
  flashcard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '90%',
    maxWidth: '800px',
    margin: '20px auto',
    perspective: '1000px',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    minHeight: '200px',
  },
  flashcardFlip: {
    transform: 'rotateY(180deg)',
  },
  front: {
    backgroundColor: '#fff',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    padding: '20px',
    overflow: 'auto',
  },
  back: {
    backgroundColor: '#fff',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    color: '#666',
    transform: 'rotateY(180deg)',
    padding: '20px',
    overflow: 'auto',
  },
  progressBar: {
    width: '90%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    margin: '20px 0',
    position: 'relative',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: '5px',
    transition: 'width 0.3s',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '90%',
    maxWidth: '800px',
    margin: '20px auto',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    marginBottom: '20px',
    width: '100%',
    maxWidth: '300px',
  },
  fileInput: {
    marginTop: '20px',
  },
};

const App = () => {
  const [flashcardData, setFlashcardData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      const csvData = reader.result;
      const { data } = Papa.parse(csvData, { header: true });

      const groupedData = data.reduce((acc, row) => {
        const { subject, category, term, definition } = row;
        if (!acc[subject]) {
          acc[subject] = [];
        }
        acc[subject].push({ term, definition, category });
        return acc;
      }, {});

      setFlashcardData(groupedData);
    };

    reader.readAsText(file);
  };

  const categories = selectedSubject ? [...new Set(flashcardData[selectedSubject].map(card => card.category))] : [];

  const filteredFlashcards = selectedCategory === 'All'
    ? flashcardData[selectedSubject] || []
    : (flashcardData[selectedSubject] || []).filter(card => card.category === selectedCategory);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % filteredFlashcards.length);
    setFlip(false);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + filteredFlashcards.length) % filteredFlashcards.length);
    setFlip(false);
  };

  const progressWidth = filteredFlashcards.length > 0
    ? ((currentIndex + 1) / filteredFlashcards.length) * 100
    : 0;

  return (
    <div style={styles.app}>
      <div style={styles.header}>
        <h1 style={styles.title}>{selectedSubject || 'Flashcard App'}</h1>
        {selectedSubject && (
          
            style={styles.changeSubjectLink}
            onClick={() => {
              setSelectedSubject(null);
              setSelectedCategory('All');
              setCurrentIndex(0);
              setFlip(false);
            }}
          >
            Change Subject
          </a>
        )}
      </div>
      {!flashcardData || Object.keys(flashcardData).length === 0 ? (
        <div>
          <input type="file" accept=".csv" onChange={handleFileUpload} style={styles.fileInput} />
        </div>
      ) : (
        <>
          {!selectedSubject ? (
            <select
              style={styles.select}
              value={selectedSubject || ''}
              onChange={e => {
                setSelectedSubject(e.target.value);
                setSelectedCategory('All');
                setCurrentIndex(0);
                setFlip(false);
              }}
            >
              <option value="">Select Subject</option>
              {Object.keys(flashcardData).map(subject => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          ) : (
            <>
              <select
                style={styles.select}
                value={selectedCategory}
                onChange={e => {
                  setSelectedCategory(e.target.value);
                  setCurrentIndex(0);
                  setFlip(false);
                }}
              >
                <option value="All">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {filteredFlashcards.length > 0 ? (
                <>
                  <div className="flashcard" style={styles.flashcard}>
                    <Flashcard
                      term={filteredFlashcards[currentIndex].term}
                      definition={filteredFlashcards[currentIndex].definition}
                      flip={flip}
                      onClick={() => setFlip(!flip)}
                    />
                  </div>
                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progress, width: `${progressWidth}%` }}></div>
                  </div>
                  <div style={styles.navigation}>
                    <button
                      style={{
                        ...styles.button,
                        ...(currentIndex === 0 ? { opacity: 0.5, cursor: 'not-allowed' } : {}),
                      }}
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                      onMouseEnter={e => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                      onMouseLeave={e => e.target.style.backgroundColor = styles.button.backgroundColor}
                    >
                      Prev
                    </button>
                    <button
                      style={styles.button}
                      onClick={handleNext}
                      onMouseEnter={e => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
                      onMouseLeave={e => e.target.style.backgroundColor = styles.button.backgroundColor}
                    >
                      Next
                    </button>
                  </div>
                </>
              ) : (
                <p>No flashcards found for the selected category.</p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
