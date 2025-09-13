import React from 'react';

const styles = {
  flipContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s ease',
  },
  flipped: {
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
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  front: {
    // Front side - no rotation
  },
  back: {
    transform: 'rotateY(180deg)',
  },
  term: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: '20px',
    lineHeight: '1.2',
  },
  definition: {
    fontSize: '20px',
    color: '#4a5568',
    lineHeight: '1.5',
    marginBottom: '15px',
  },
  category: {
    fontSize: '12px',
    color: '#007bff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '20px',
    padding: '6px 12px',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    borderRadius: '20px',
    display: 'inline-block',
  },
  example: {
    fontSize: '16px',
    color: '#2d3748',
    fontStyle: 'italic',
    marginTop: '20px',
    padding: '15px',
    backgroundColor: 'rgba(0, 123, 255, 0.05)',
    borderRadius: '8px',
    borderLeft: '4px solid #007bff',
  },
  hint: {
    fontSize: '14px',
    color: '#718096',
    marginTop: '15px',
    opacity: 0.8,
  },
  difficultBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#ff6b35',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '15px',
    fontSize: '11px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  clickHint: {
    position: 'absolute',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '12px',
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
  const handleClick = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    onClick();
  };

  return (
    <div 
      style={{
        ...styles.flipContainer,
        ...(flip ? styles.flipped : {})
      }}
      onClick={handleClick}
    >
      {/* Front Side - Show ONLY term or definition */}
      <div style={{...styles.cardSide, ...styles.front}}>
        {isDifficult && <div style={styles.difficultBadge}>Difficult</div>}
        
        {category && <div style={styles.category}>{category}</div>}
        
        <div style={styles.term}>
          {showDefinitionFirst ? definition : term}
        </div>
        
        <div style={styles.clickHint}>
          Click to reveal {showDefinitionFirst ? 'term' : 'definition'}
        </div>
      </div>

      {/* Back Side - Show BOTH term and definition */}
      <div style={{...styles.cardSide, ...styles.back}}>
        {isDifficult && <div style={styles.difficultBadge}>Difficult</div>}
        
        {category && <div style={styles.category}>{category}</div>}
        
        <div style={styles.term}>{term}</div>
        <div style={styles.definition}>{definition}</div>
        
        {example && (
          <div style={styles.example}>
            <strong>Example:</strong> {example}
          </div>
        )}
        
        {hint && (
          <div style={styles.hint}>{hint}</div>
        )}
      </div>
    </div>
  );
};

export default Flashcard;
