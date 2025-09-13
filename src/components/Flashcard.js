import { useState } from 'react';

const styles = {
  flashcard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    height: '100%',
    perspective: '1000px',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
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
    fontSize: 'inherit',
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
    fontSize: 'inherit',
    color: '#666',
    transform: 'rotateY(180deg)',
    padding: '20px',
    overflow: 'auto',
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
      <div style={styles.front}>{term}</div>
      <div style={styles.back}>{definition}</div>
    </div>
  );
};

export default Flashcard;
