import { useState } from 'react';

const styles = {
  flashcard: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    padding: '0', // Remove padding from main container
    width: '100%',
    height: '100%',
    perspective: '1000px',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s ease',
    cursor: 'pointer',
    position: 'relative',
    minHeight: '300px',
  },
  flashcardFlip: {
    transform: 'rotateY(180deg)',
  },
  side: {
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
    padding: '30px',
    borderRadius: '15px',
    backgroundColor: '#fff',
    overflow: 'auto',
    textAlign: 'center',
  },
  front: {
    // No additional transform needed for front
  },
  back: {
    transform: 'rotateY(180deg)',
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
    marginBottom: '10px',
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
  flipInstruction: {
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
  // Determine what to show on front and back based on showDefinitionFirst
  const frontContent = showDefinitionFirst ? definition : term;
  const backContent = showDefinitionFirst ? term : definition;
  const frontIsDefinition = showDefinitionFirst;

  return (
    <div
      style={{
        ...styles.flashcard,
        ...(flip ? styles.flashcardFlip : {}),
      }}
      onClick={onClick}
    >
      {/* Difficulty badge */}
      {isDifficult && <div style={styles.difficultBadge}>Difficult</div>}
      
      {/* Front side */}
      <div style={{...styles.side, ...styles.front}}>
        {category && <div style={styles.category}>{category}</div>}
        
        <div style={frontIsDefinition ? styles.definition : styles.term}>
          {frontContent}
        </div>
        
        {/* Only show hint on front if showing definition first */}
        {showDefinitionFirst && hint && (
          <div style={styles.hint}>💡 {hint}</div>
        )}
        
        <div style={styles.flipInstruction}>
          Click to see {frontIsDefinition ? 'term' : 'definition'}
        </div>
      </div>

      {/* Back side */}
      <div style={{...styles.side, ...styles.back}}>
        {category && <div style={styles.category}>{category}</div>}
        
        <div style={frontIsDefinition ? styles.term : styles.definition}>
          {backContent}
        </div>
        
        <div style={!frontIsDefinition ? styles.term : styles.definition}>
          {frontIsDefinition ? definition : term}
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
  );
};

export default Flashcard;
