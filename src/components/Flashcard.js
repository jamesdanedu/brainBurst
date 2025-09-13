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
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
  back: {
    fontSize: '18px',
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%) rotateY(180deg)',
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
      <div style={styles.back}>
        <div>{term}</div>
        <div>{definition}</div>
      </div>
    </div>
  );
};

export default Flashcard;
