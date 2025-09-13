import { useState, useEffect, useCallback } from 'react';
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
    justifyContent: 'flex-start',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  sessionStats: {
    display: 'flex',
    gap: '15px',
    fontSize: '14px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '10px 15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: '16px',
    color: '#007bff',
  },
  statLabel: {
    color: '#666',
    fontSize: '12px',
  },
  studyOptions: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '15px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
  },
  optionsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '15px',
    alignItems: 'center',
  },
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkbox: {
    width: '16px',
    height: '16px',
  },
  label: {
    fontSize: '14px',
    color: '#333',
    cursor: 'pointer',
  },
  select: {
    padding: '8px 12px',
    fontSize: '14px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
  },
  resetButton: {
    padding: '8px 12px',
    fontSize: '12px',
    color: '#666',
    backgroundColor: 'transparent',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
  },
  flashcard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '90%',
    maxWidth: '800px',
    margin: '20px auto',
    position: 'relative',
    minHeight: '300px',
  },
  completedScreen: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 8px 20px rgba(0, 0, 0, 0.15)',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '50px auto',
  },
  completedEmoji: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  completedTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '20px',
  },
  completedStats: {
    marginBottom: '30px',
    color: '#666',
  },
  completedStat: {
    margin: '8px 0',
    fontSize: '16px',
  },
  completedButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  progressBar: {
    width: '90%',
    height: '10px',
    backgroundColor: '#e0e0e0',
    borderRadius: '5px',
    margin: '20px 0',
    position: 'relative',
    maxWidth: '800px',
  },
  progress: {
    height: '100%',
    backgroundColor: '#007bff',
    borderRadius: '5px',
    transition: 'width 0.3s ease',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    maxWidth: '800px',
    margin: '20px auto',
  },
  navInfo: {
    textAlign: 'center',
    color: '#666',
  },
  navInfoMain: {
    fontSize: '16px',
    fontWeight: '500',
    marginBottom: '4px',
  },
  navInfoSub: {
    fontSize: '12px',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    minWidth: '100px',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    cursor: 'not-allowed',
  },
  difficultButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
  },
  markDifficultBtn: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#ff6b35',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  markEasyBtn: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  keyboardHint: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#999',
    marginTop: '15px',
  },
  fileInput: {
    marginTop: '20px',
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  loadingContent: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  spinner: {
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #007bff',
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 15px',
  },
};

// Add CSS animation for spinner
const spinKeyframes = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = spinKeyframes;
  document.head.appendChild(style);
}

const App = () => {
  const [flashcardData, setFlashcardData] = useState({});
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flip, setFlip] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Study options
  const [shuffleCards, setShuffleCards] = useState(false);
  const [showDefinitionFirst, setShowDefinitionFirst] = useState(false);
  const [autoAdvance, setAutoAdvance] = useState(false);
  
  // Session tracking
  const [sessionStats, setSessionStats] = useState({
    cardsViewed: 0,
    startTime: null,
    sessionDuration: 0,
    studyMode: 'active' // active, completed
  });
  const [sessionDifficultCards, setSessionDifficultCards] = useState(new Set());

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Load session data on component mount
  useEffect(() => {
    const savedSession = localStorage.getItem('brainbursh-session');
    if (savedSession) {
      try {
        const parsed = JSON.parse(savedSession);
        setSessionStats(parsed.stats || { 
          cardsViewed: 0, 
          startTime: Date.now(), 
          sessionDuration: 0,
          studyMode: 'active'
        });
        setSessionDifficultCards(new Set(parsed.difficultCards || []));
        setShuffleCards(parsed.options?.shuffle || false);
        setShowDefinitionFirst(parsed.options?.definitionFirst || false);
        setAutoAdvance(parsed.options?.autoAdvance || false);
      } catch (e) {
        console.log('Error loading session data:', e);
        initializeSession();
      }
    } else {
      initializeSession();
    }
  }, []);

  const initializeSession = () => {
    setSessionStats({
      cardsViewed: 0,
      startTime: Date.now(),
      sessionDuration: 0,
      studyMode: 'active'
    });
  };

  // Save session data whenever relevant state changes
  useEffect(() => {
    const sessionData = {
      stats: sessionStats,
      difficultCards: Array.from(sessionDifficultCards),
      options: {
        shuffle: shuffleCards,
        definitionFirst: showDefinitionFirst,
        autoAdvance: autoAdvance
      }
    };
    localStorage.setItem('brainbursh-session', JSON.stringify(sessionData));
  }, [sessionStats, sessionDifficultCards, shuffleCards, showDefinitionFirst, autoAdvance]);

  // Keyboard event handling
  const handleKeyPress = useCallback((event) => {
    if (sessionStats.studyMode === 'completed') return;
    
    switch (event.key) {
      case ' ':
        event.preventDefault();
        setFlip(prev => !prev);
        break;
      case 'ArrowRight':
        event.preventDefault();
        handleNext();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        handlePrev();
        break;
      case 'd':
      case 'D':
        if (flip) {
          event.preventDefault();
          markAsDifficult();
        }
        break;
      case 'e':
      case 'E':
        if (flip) {
          event.preventDefault();
          removeFromDifficult();
        }
        break;
    }
  }, [flip, sessionStats.studyMode]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  // Touch handling for swipe gestures
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const csvData = reader.result;
        const { data } = Papa.parse(csvData, { 
          header: true, 
          skipEmptyLines: true,
          transformHeader: (header) => header.toLowerCase().trim()
        });

        const groupedData = data.reduce((acc, row) => {
          const { subject, category = 'General', term, definition, example, hint } = row;
          
          if (!subject || !term || !definition) return acc;
          
          if (!acc[subject]) {
            acc[subject] = [];
          }
          acc[subject].push({ 
            term: term.trim(), 
            definition: definition.trim(), 
            category: category.trim(),
            example: example?.trim(),
            hint: hint?.trim()
          });
          return acc;
        }, {});

        setFlashcardData(groupedData);
        setLoading(false);
        
        // Auto-select first subject
        const firstSubject = Object.keys(groupedData)[0];
        if (firstSubject) {
          setSelectedSubject(firstSubject);
          resetStudySession();
        }
      } catch (error) {
        console.error('Error parsing CSV:', error);
        setLoading(false);
        alert('Error parsing CSV file. Please check the format.');
      }
    };

    reader.onerror = () => {
      setLoading(false);
      alert('Error reading file.');
    };

    reader.readAsText(file);
  };

  const categories = selectedSubject ? [...new Set(flashcardData[selectedSubject].map(card => card.category))] : [];

  let filteredFlashcards = selectedCategory === 'All'
    ? flashcardData[selectedSubject] || []
    : (flashcardData[selectedSubject] || []).filter(card => card.category === selectedCategory);

  // Apply shuffle if enabled
  if (shuffleCards && filteredFlashcards.length > 0) {
    const seed = selectedSubject + selectedCategory; // Consistent shuffle per subject/category
    filteredFlashcards = [...filteredFlashcards].sort(() => {
      return seed.charCodeAt(0) % 2 ? Math.random() - 0.5 : 0.5 - Math.random();
    });
  }

  const handleNext = () => {
    if (currentIndex >= filteredFlashcards.length - 1) {
      // Mark session as completed
      setSessionStats(prev => ({
        ...prev,
        studyMode: 'completed',
        sessionDuration: Date.now() - prev.startTime
      }));
    } else {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setFlip(false);
      setSessionStats(prev => ({
        ...prev,
        cardsViewed: Math.max(prev.cardsViewed, currentIndex + 2),
        sessionDuration: Date.now() - prev.startTime
      }));
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
      setFlip(false);
    }
  };

  const markAsDifficult = () => {
    const currentCard = filteredFlashcards[currentIndex];
    if (currentCard) {
      setSessionDifficultCards(prev => new Set([...prev, currentCard.term]));
    }
  };

  const removeFromDifficult = () => {
    const currentCard = filteredFlashcards[currentIndex];
    if (currentCard) {
      setSessionDifficultCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(currentCard.term);
        return newSet;
      });
    }
  };

  const resetStudySession = () => {
    setCurrentIndex(0);
    setFlip(false);
    setSessionStats({
      cardsViewed: 0,
      startTime: Date.now(),
      sessionDuration: 0,
      studyMode: 'active'
    });
    setSessionDifficultCards(new Set());
  };

  const restartDeck = () => {
    setCurrentIndex(0);
    setFlip(false);
    setSessionStats(prev => ({
      ...prev,
      studyMode: 'active',
      startTime: Date.now()
    }));
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    
    if (hours > 0) {
      return `${hours}:${(minutes % 60).toString().padStart(2, '0')}:${(seconds % 60).toString().padStart(2, '0')}`;
    }
    return `${minutes}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const progressWidth = filteredFlashcards.length > 0
    ? ((currentIndex + 1) / filteredFlashcards.length) * 100
    : 0;

  const currentCard = filteredFlashcards[currentIndex];
  const isDifficult = currentCard && sessionDifficultCards.has(currentCard.term);

  // Completed screen
  if (sessionStats.studyMode === 'completed') {
    return (
      <div style={styles.app}>
        <div style={styles.completedScreen}>
          <div style={styles.completedEmoji}>🎉</div>
          <h2 style={styles.completedTitle}>Deck Complete!</h2>
          <div style={styles.completedStats}>
            <div style={styles.completedStat}>
              <strong>Cards studied:</strong> {filteredFlashcards.length}
            </div>
            <div style={styles.completedStat}>
              <strong>Time:</strong> {formatTime(sessionStats.sessionDuration)}
            </div>
            <div style={styles.completedStat}>
              <strong>Difficult cards:</strong> {sessionDifficultCards.size}
            </div>
            <div style={styles.completedStat}>
              <strong>Success rate:</strong> {Math.round(((filteredFlashcards.length - sessionDifficultCards.size) / filteredFlashcards.length) * 100)}%
            </div>
          </div>
          <div style={styles.completedButtons}>
            <button
              style={styles.button}
              onClick={restartDeck}
            >
              Study Again
            </button>
            <button
              style={styles.button}
              onClick={resetStudySession}
            >
              New Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.app}>
      {loading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <div style={styles.spinner}></div>
            <p>Processing flashcards...</p>
          </div>
        </div>
      )}

      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>{selectedSubject || 'BrainBursh'}</h1>
          {selectedSubject && (
            <a
              style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer', fontSize: '14px' }}
              onClick={() => {
                setSelectedSubject(null);
                setSelectedCategory('All');
                resetStudySession();
              }}
            >
              Change Subject
            </a>
          )}
        </div>
        
        {selectedSubject && (
          <div style={styles.sessionStats}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>{sessionStats.cardsViewed}</div>
              <div style={styles.statLabel}>Studied</div>
            </div>
            <div style={styles.statItem}>
              <div style={{...styles.statValue, color: '#ff6b35'}}>{sessionDifficultCards.size}</div>
              <div style={styles.statLabel}>Difficult</div>
            </div>
            <div style={styles.statItem}>
              <div style={{...styles.statValue, color: '#28a745'}}>
                {formatTime(Date.now() - sessionStats.startTime)}
              </div>
              <div style={styles.statLabel}>Time</div>
            </div>
          </div>
        )}
      </div>

      {!flashcardData || Object.keys(flashcardData).length === 0 ? (
        <div style={styles.fileInput}>
          <input type="file" accept=".csv" onChange={handleFileUpload} />
          <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
            Upload a CSV file with columns: subject, category, term, definition
          </p>
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
                resetStudySession();
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
              {/* Study Options */}
              <div style={styles.studyOptions}>
                <div style={styles.optionsGrid}>
                  <div style={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="shuffle"
                      checked={shuffleCards}
                      onChange={(e) => setShuffleCards(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <label htmlFor="shuffle" style={styles.label}>Shuffle cards</label>
                  </div>
                  
                  <div style={styles.checkboxGroup}>
                    <input
                      type="checkbox"
                      id="defFirst"
                      checked={showDefinitionFirst}
                      onChange={(e) => setShowDefinitionFirst(e.target.checked)}
                      style={styles.checkbox}
                    />
                    <label htmlFor="defFirst" style={styles.label}>Show definition first</label>
                  </div>

                  <select
                    style={styles.select}
                    value={selectedCategory}
                    onChange={e => {
                      setSelectedCategory(e.target.value);
                      resetStudySession();
                    }}
                  >
                    <option value="All">All Categories</option>
                    {categories.map(category => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  <button
                    style={styles.resetButton}
                    onClick={resetStudySession}
                  >
                    Reset Session
                  </button>
                </div>
              </div>

              {filteredFlashcards.length > 0 ? (
                <>
                  <div 
                    style={styles.flashcard}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                  >
                    <Flashcard
                      term={currentCard.term}
                      definition={currentCard.definition}
                      category={currentCard.category}
                      example={currentCard.example}
                      hint={currentCard.hint}
                      flip={flip}
                      onClick={() => setFlip(!flip)}
                      showDefinitionFirst={showDefinitionFirst}
                      isDifficult={isDifficult}
                    />
                  </div>

                  {flip && (
                    <div style={styles.difficultButtons}>
                      {isDifficult ? (
                        <button
                          style={styles.markEasyBtn}
                          onClick={removeFromDifficult}
                          title="Press 'E' key"
                        >
                          ✓ Got it!
                        </button>
                      ) : (
                        <button
                          style={styles.markDifficultBtn}
                          onClick={markAsDifficult}
                          title="Press 'D' key"
                        >
                          Mark as Difficult
                        </button>
                      )}
                    </div>
                  )}

                  <div style={styles.progressBar}>
                    <div style={{ ...styles.progress, width: `${progressWidth}%` }}></div>
                  </div>

                  <div style={styles.navigation}>
                    <button
                      style={{
                        ...styles.button,
                        ...(currentIndex === 0 ? styles.buttonDisabled : {}),
                      }}
                      onClick={handlePrev}
                      disabled={currentIndex === 0}
                    >
                      Previous
                    </button>
                    
                    <div style={styles.navInfo}>
                      <div style={styles.navInfoMain}>
                        {currentIndex + 1} of {filteredFlashcards.length}
                      </div>
                      <div style={styles.navInfoSub}>
                        {Math.round(progressWidth)}% complete
                      </div>
                    </div>
                    
                    <button
                      style={styles.button}
                      onClick={handleNext}
                    >
                      {currentIndex === filteredFlashcards.length - 1 ? 'Finish' : 'Next'}
                    </button>
                  </div>

                  <div style={styles.keyboardHint}>
                    💡 Use Space to flip • Arrow keys to navigate • D for difficult • E for easy
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
