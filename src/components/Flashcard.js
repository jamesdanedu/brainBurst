import { useState } from 'react';

const styles = {
  flashcard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    perspective: '1000px',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
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
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'rotateY(180deg)',
    padding: '20px',
    overflow: 'auto',
  },
  term: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  definition: {
    fontSize: '18px',
  },
};

const Flashcard = ({ term, definition, flip, onClick }) => {
  return (
    <div 
      style={{
        ...styles.flashcard,
        ...(flip ? styles.flashcardFlip : {}),
      }}
      onClick={onClick}
    >
      <div style={styles.front}>
        <div style={styles.term}>{term}</div>
      </div>
      <div style={styles.back}>
        <div style={styles.term}>{term}</div>
        <div style={styles.definition}>{definition}</div>
      </div>
    </div>
  );
};

export default Flashcard;
