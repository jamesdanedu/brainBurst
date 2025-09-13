import React from 'react';

const styles = {
  flashcard: {
    backgroundColor: 'transparent', // Make container transparent
    borderRadius: '15px',
    padding: '0',
    width: '100%',
    height: '100%',
    perspective: '1000px',
    cursor: 'pointer',
    position: 'relative',
    minHeight: '300px',
  },
  flashcardInner: {
    position: 'relative',
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s ease',
  },
  flashcardFlip: {
    transform: 'rotateY(180deg)',
  },
  cardSide: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '30px',
    borderRadius: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    textAlign: 'center',
    overflow: 'auto',
  },
  front: {
    // Front side - no additional transform
  },
  back: {
    transform: 'rotateY(180deg)', // Back side rotated 180 degrees
  },
  term: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: '15px',
    lineHeight: '1.2',
  },
  definition: {
    fontSize: '18px',
    color: '#4a5568',
    lineHeight: '1.5',
    marginBottom: '20px',
  },
  category: {
    fontSize: '12px',
    color: '#007bff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '15px',
    padding: '4px 12px',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    borderRadius: '20px',
    display: 'inline-block',
  },
  example: {
    fontSize: '14px',
    color: '#2d3748',
    fontStyle: 'italic',
    marginTop: '15px',
    padding: '10px 15px',
    backgroundColor: 'rgba(0, 123, 255, 0.05)',
    borderRadius: '8px',
    borderLeft: '3px solid #007bff',
  },
  hint: {
    fontSize: '12px',
    color: '#718096',
    marginTop: '10px',
    opacity: 0.8,
  },
  difficultBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#ff6b35',
    color: 'white',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '10px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  flipHint: {
    position: 'absolute',
    bottom: '15px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '11px',
    color: '#a0aec0',
    opacity: 0.7,
  }
};

const Flashcard = ({ 
  term, 
  definition, 
  category, 
  example, 
  hint, 
  flip, 
  onClick, 
  showDefinitionFirst = false, 
  isDifficult = false 
}) => {
  return (
    <div style={styles.flashcard} onClick={onClick}>
      <div style={{
        ...styles.flashcardInner,
        ...(flip ? styles.flashcardFlip : {})
      }}>
        {/* Front Side */}
        <div style={{...styles.cardSide, ...styles.front}}>
          {isDifficult && <div style={styles.difficultBadge}>Difficult</div>}
          
          {category && <div style={styles.category}>{category}</div>}
          
          <div style={styles.term}>
            {showDefinitionFirst ? definition : term}
          </div>
          
          {showDefinitionFirst && hint && (
            <div style={styles.hint}>💡 {hint}</div>
          )}
          
          <div style={styles.flipHint}>
            Click to flip
          </div>
        </div>

        {/* Back Side */}
        <div style={{...styles.cardSide, ...styles.back}}>
          {isDifficult && <div style={styles.difficultBadge}>Difficult</div>}
          
          {category && <div style={styles.category}>{category}</div>}
          
          <div style={styles.term}>
            {showDefinitionFirst ? term : term}
          </div>
          
          <div style={styles.definition}>
            {showDefinitionFirst ? term : definition}
          </div>
          
          {example && (
            <div style={styles.example}>
              <strong>Example:</strong> {example}
            </div>
          )}
          
          {!showDefinitionFirst && hint && (
            <div style={styles.hint}>💡 {hint}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
