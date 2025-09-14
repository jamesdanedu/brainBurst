import { useState, useEffect, useCallback } from 'react';
import Papa from 'papaparse';
import Flashcard from './Flashcard';

const styles = {
  app: {
    fontFamily: 'Arial, sans-serif',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: '20px',
    // Background image styling
    backgroundImage: 'url(/brainB.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'relative',
  },
  // Overlay to improve readability over background image
  backgroundOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(240, 248, 255, 0.85)', // Light blue overlay with transparency
    zIndex: -1,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '15px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  title: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: '10px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  sessionStats: {
    display: 'flex',
    gap: '15px',
    fontSize: '14px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '12px 15px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
    backdropFilter: 'blur(5px)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    padding: '20px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '800px',
    marginBottom: '20px',
    backdropFilter: 'blur(10px)',
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
    fontWeight: '500',
  },
  select: {
    padding: '10px 12px',
    fontSize: '14px',
    borderRadius: '8px',
    border: '2px solid #e2e8f0',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(5px)',
    fontWeight: '500',
  },
  resetButton: {
    padding: '8px 12px',
    fontSize: '12px',
    color: '#666',
    backgroundColor: 'transparent',
    border: 'none',
    textDecoration: 'underline',
    cursor: 'pointer',
    fontWeight: '500',
  },
  flashcardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    padding: '20px',
    width: '90%',
    maxWidth: '800px',
    margin: '20px auto',
    position: 'relative',
    minHeight: '300px',
    backdropFilter: 'blur(15px)',
    perspective: '1000px', // Added for 3D flip
    cursor: 'pointer', // Added cursor
  },
  completedScreen: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '20px',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
    padding: '40px',
    textAlign: 'center',
    maxWidth: '500px',
    margin: '50px auto',
    backdropFilter: 'blur(15px)',
  },
  completedEmoji: {
    fontSize: '60px',
    marginBottom: '20px',
  },
  completedTitle: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: '20px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  completedStats: {
    marginBottom: '30px',
    color: '#4a5568',
  },
  completedStat: {
    margin: '8px 0',
    fontSize: '16px',
    fontWeight: '500',
  },
  completedButtons: {
    display: 'flex',
    gap: '15px',
    justifyContent: 'center',
  },
  progressBar: {
    width: '90%',
    height: '12px',
    backgroundColor: 'rgba(224, 224, 224, 0.8)',
    borderRadius: '6px',
    margin: '20px 0',
    position: 'relative',
    maxWidth: '800px',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  },
  progress: {
    height: '100%',
    background: 'linear-gradient(90deg, #007bff, #0056b3)',
    borderRadius: '6px',
    transition: 'width 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
  },
  navigation: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    maxWidth: '800px',
    margin: '20px auto',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '15px 20px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    backdropFilter: 'blur(10px)',
  },
  navInfo: {
    textAlign: 'center',
    color: '#4a5568',
  },
  navInfoMain: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '4px',
    color: '#2d3748',
  },
  navInfoSub: {
    fontSize: '12px',
    color: '#718096',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    background: 'linear-gradient(135deg, #007bff, #0056b3)',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    minWidth: '100px',
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
  },
  buttonDisabled: {
    background: '#ccc',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  difficultButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    marginBottom: '20px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    padding: '15px',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  markDifficultBtn: {
    padding: '10px 20px',
    fontSize: '14px',
    background: 'linear-gradient(135deg, #ff6b35, #e55a2b)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '600',
    boxShadow: '0 3px 10px rgba(255, 107, 53, 0.3)',
  },
  markEasyBtn: {
    padding: '10px 20px',
    fontSize: '14px',
    background: 'linear-gradient(135deg, #28a745, #1e7e34)',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    fontWeight: '600',
    boxShadow: '0 3px 10px rgba(40, 167, 69, 0.3)',
  },
  keyboardHint: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#718096',
    marginTop: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '8px',
    padding: '8px 15px',
    backdropFilter: 'blur(5px)',
    maxWidth: '600px',
    margin: '15px auto 0',
  },
  // NEW: Data source selection styles
  dataSourceContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    padding: '40px',
    width: '90%',
    maxWidth: '600px',
    textAlign: 'center',
    marginBottom: '20px',
    backdropFilter: 'blur(15px)',
  },
  dataSourceTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: '30px',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  optionButton: {
    width: '100%',
    padding: '20px',
    margin: '15px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    background: 'linear-gradient(135deg, #28a745, #1e7e34)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
  },
  optionButtonSecondary: {
    background: 'linear-gradient(135deg, #007bff, #0056b3)',
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
  },
  optionButtonIcon: {
    fontSize: '24px',
  },
  optionButtonText: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  optionButtonSubtext: {
    fontSize: '14px',
    opacity: '0.9',
    fontWeight: 'normal',
  },
  orDivider: {
    margin: '25px 0',
    color: '#666',
    fontSize: '16px',
    fontWeight: 'bold',
  },
  fileInput: {
    display: 'none',
  },
  fileInputLabel: {
    width: '100%',
    padding: '20px',
    margin: '15px 0',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#fff',
    background: 'linear-gradient(135deg, #007bff, #0056b3)',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
    minHeight: '120px', // Ensures consistent height with optionButton
  },
  errorText: {
    color: '#dc3545',
    fontSize: '16px',
    marginTop: '20px',
    padding: '15px',
    backgroundColor: 'rgba(220, 53, 69, 0.1)',
    borderRadius: '8px',
    border: '1px solid rgba(220, 53, 69, 0.2)',
  },
  dataSourceInfo: {
    fontSize: '12px',
    color: '#666',
    marginTop: '15px',
    fontStyle: 'italic',
  },
  loadingOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
    backdropFilter: 'blur(5px)',
  },
  loadingContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: '30px',
    borderRadius: '15px',
    textAlign: 'center',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
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
  
  // NEW: Track data source and error state
  const [dataSource, setDataSource] = useState(null); // 'default' or 'uploaded'
  const [error, setError] = useState(null);
  
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
  }, [sessionStats, sessionDifficultCards, showDefinitionFirst, autoAdvance]);

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

  // NEW: Process CSV data (shared function for both default and uploaded)
  const processCSVData = (csvData, source) => {
    try {
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
      setDataSource(source);
      setError(null);
      
      // Reset to subject selection screen
      setSelectedSubject(null);
      setSelectedCategory('All');
      setCurrentIndex(0);
      setFlip(false);
      
    } catch (error) {
      console.error('Error parsing CSV:', error);
      setError('Error parsing CSV file. Please check the format.');
      throw error;
    }
  };

  // NEW: Load default CSV from public folder
  const loadDefaultCSV = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/default-flashcards.csv');
      
      if (!response.ok) {
        throw new Error(`Failed to load default flashcards: ${response.statusText}`);
      }
      
      const csvData = await response.text();
      processCSVData(csvData, 'default');
      
    } catch (err) {
      console.error('Error loading default CSV:', err);
      setError('Failed to load default flashcards. Please try uploading your own file.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setLoading(true);
    setError(null);
    
    const reader = new FileReader();

    reader.onload = () => {
      try {
        processCSVData(reader.result, 'uploaded');
      } catch (error) {
        setError('Failed to process the uploaded file. Please check the CSV format.');
      } finally {
        setLoading(false);
      }
    };

    reader.onerror = () => {
      setError('Failed to read the uploaded file.');
      setLoading(false);
    };

    reader.readAsText(file);
  };

  // NEW: Reset app to data source selection
  const resetApp = () => {
    setFlashcardData({});
    setSelectedSubject(null);
    setSelectedCategory('All');
    setCurrentIndex(0);
    setFlip(false);
    setDataSource(null);
    setError(null);
    resetStudySession();
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
        <div style={styles.backgroundOverlay}></div>
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
      <div style={styles.backgroundOverlay}></div>
      
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
          <h1 style={styles.title}>{selectedSubject || 'BrainBurst'}</h1>
          {selectedSubject && (
            <a
              style={{ color: '#007bff', textDecoration: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}
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

      {/* NEW: Show data source selection if no data loaded */}
      {!flashcardData || Object.keys(flashcardData).length === 0 ? (
        <div style={styles.dataSourceContainer}>
          <h2 style={styles.dataSourceTitle}>Choose Your Flashcard Source</h2>
          
          <button
            style={styles.optionButton}
            onClick={loadDefaultCSV}
            disabled={loading}
          >
            <div style={styles.optionButtonIcon}>🎓</div>
            <div style={styles.optionButtonText}>Use Default Study Sets</div>
            <div style={styles.optionButtonSubtext}>Multiple subjects available</div>
          </button>

          <div style={styles.orDivider}>— OR —</div>

          <label 
            htmlFor="file-upload" 
            style={{...styles.fileInputLabel, ...(loading ? {opacity: 0.6, cursor: 'not-allowed'} : {})}}
          >
            <div style={styles.optionButtonIcon}>📁</div>
            <div style={styles.optionButtonText}>Upload Your CSV File</div>
            <div style={styles.optionButtonSubtext}>Format: subject,category,term,definition</div>
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".csv"
            onChange={handleFileUpload}
            style={styles.fileInput}
            disabled={loading}
          />

          {error && <p style={styles.errorText}>{error}</p>}
        </div>
      ) : (
        <>
          {!selectedSubject ? (
            <div style={{textAlign: 'center', backgroundColor: 'rgba(255, 255, 255, 0.95)', padding: '30px', borderRadius: '15px', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'}}>
              <select
                style={{...styles.select, minWidth: '300px', fontSize: '16px', padding: '15px'}}
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
              
              {dataSource && (
                <p style={styles.dataSourceInfo}>
                  Using {dataSource === 'default' ? 'default study sets' : 'uploaded CSV file'}
                </p>
              )}
              
              <button
                style={{...styles.resetButton, marginTop: '20px', fontSize: '14px'}}
                onClick={resetApp}
              >
                ← Back to data source selection
              </button>
            </div>
          ) : (
            <>
              {/* Study Options */}
              <div style={styles.studyOptions}>
                <div style={styles.optionsGrid}>
                  
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
                  <div style={styles.flashcardContainer}>
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

                  {dataSource && (
                    <p style={styles.dataSourceInfo}>
                      Using {dataSource === 'default' ? 'default study sets' : 'uploaded CSV file'}
                    </p>
                  )}
                </>
              ) : (
                <p style={{ color: '#4a5568', fontSize: '18px', textAlign: 'center' }}>
                  No flashcards found for the selected category.
                </p>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default App;
