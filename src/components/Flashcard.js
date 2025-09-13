import { useState } from 'react';

const styles = {
  flashcard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    width: '100%',
    height: '100%',
    minHeight: '300px',
    perspective: '1000px',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s ease-in-out',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    border: '2px solid transparent',
  },
  flashcardDifficult: {
    borderColor: '#ff6b35',
    boxShadow: '0 4px 6px rgba(255, 107, 53, 0.2)',
  },
  flashcardFlip: {
    transform: 'rotateY(180deg)',
  },
  cardFace: {
    backfaceVisibility: 'hidden',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#fff',
  },
  back: {
    transform: 'rotateY(180deg)',
  },
  categoryTag: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    backgroundColor: '#007bff',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
  difficultTag: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#ff6b35',
    color: 'white',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '500',
  },
  content: {
    textAlign: 'center',
    maxWidth: '100%',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
  },
  term: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
    lineHeight: '1.2',
  },
  definition: {
    fontSize: '18px',
    color: '#555',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  example: {
    fontSize: '14px',
    color: '#777',
    fontStyle: 'italic',
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#f8f9fa',
    borderRadius: '6px',
    borderLeft: '3px solid #007bff',
  },
  hint: {
    fontSize: '12px',
    color: '#999',
    marginTop: '8px',
    padding: '6px 10px',
    backgroundColor: '#fff3cd',
    borderRadius: '4px',
    border: '1px solid #ffeaa7',
  },
  flipIndicator: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    fontSize: '12px',
    color: '#999',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  flipIcon: {
    fontSize: '14px',
    transform: 'rotate(180deg)',
  },
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
  // Determine what to show on front and back based on showDefinitionFirst
  const frontContent = showDefinitionFirst ? definition : term;
  const backContent = showDefinitionFirst ? term : definition;
  const frontIsDefinition = showDefinitionFirst;

  return (
    <div
      style={{
        ...styles.flashcard,
        ...(flip ? styles.flashcardFlip : {}),
        ...(isDifficult ? styles.flashcardDifficult : {}),
      }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`Flashcard: ${frontContent}. Click to reveal ${showDefinitionFirst ? 'term' : 'definition'}.`}
    >
      {/* Category Tag */}
      {category && (
        <div style={styles.categoryTag}>
          {category}
        </div>
      )}

      {/* Difficult Tag */}
      {isDifficult && (
        <div style={styles.difficultTag}>
          Review
        </div>
      )}

      {/* Front Face */}
      <div style={styles.cardFace}>
        <div style={styles.content}>
          {frontIsDefinition ? (
            <>
              <div style={styles.definition}>{frontContent}</div>
              {hint && (
                <div style={styles.hint}>
                  💡 {hint}
                </div>
              )}
            </>
          ) : (
            <div style={styles.term}>{frontContent}</div>
          )}
        </div>
        
        <div style={styles.flipIndicator}>
          <span style={styles.flipIcon}>🔄</span>
          <span>Click to flip</span>
        </div>
      </div>

      {/* Back Face */}
      <div style={{...styles.cardFace, ...styles.back}}>
        <div style={styles.content}>
          {frontIsDefinition ? (
            <div style={styles.term}>{backContent}</div>
          ) : (
            <>
              <div style={styles.definition}>{backContent}</div>
              {example && (
                <div style={styles.example}>
                  <strong>Example:</strong> {example}
                </div>
              )}
              {hint && (
                <div style={styles.hint}>
                  💡 {hint}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
