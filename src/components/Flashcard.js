import { useState } from 'react';

const styles = {
  flashcard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    position: 'relative',
    transform: 'rotateY(0deg)',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s',
    cursor: 'pointer',
  },
  flashcardFlip: {
    transform: 'rotateY(180deg)',
  },
  front: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  back: {
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
      <div style={styles.front}>{term}</div>
      <div style={styles.back}>{definition}</div>
    </div>
  );
};

export default Flashcard;
