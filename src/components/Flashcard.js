import React from 'react';

const styles = {
  flashcard: {
    width: '100%',
    height: '100%',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s ease',
    cursor: 'pointer',
    position: 'relative',
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
    padding: '30px',
    boxSizing: 'border-box',
  },
  back: {
    transform: 'rotateY(180deg)',
  },
  term: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: '15px',
    lineHeight: '1.2',
  },
  definition: {
    fontSize: '16px',
    color: '#4a5568',
    lineHeight: '1.4',
    marginBottom: '15px',
  },
  category: {
    fontSize: '11px',
    color: '#007bff',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    marginBottom: '15px',
    padding: '4px 8px',
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    borderRadius: '12px',
    display: 'inline-block',
  },
  example: {
    fontSize: '13px',
    color: '#2d3748',
    fontStyle: 'italic',
    marginTop: '10px',
    padding: '8px 12px',
    backgroundColor: 'rgba(0, 123, 255, 0.05)',
    borderRadius: '6px',
    borderLeft: '3px solid #007bff',
  },
  hint: {
    fontSize: '11px',
    color: '#718096',
    marginTop: '10px',
    opacity: 0.8,
  },
  difficultBadge: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    backgroundColor: '#ff6b35',
    color: 'white',
    padding: '3px 6px',
    borderRadius: '10px',
    fontSize: '9px',
    fontWeight: 'bold',
  },
  clickHint: {
    position: 'absolute',
    bottom: '10px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '10px',
    color: '#a0aec0',
    opacity: 0.6,
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
    e.stopPropagation();
    e.preventDefault();
    onClick();
  };

  return (
    <div 
      style={{
        ...styles.flashcard,
        ...(flip ? styles.flipped : {})
      }}
      onClick={handleClick}
    >
      {/* Front Side */}
      <div style={styles.cardSide}>
        {isDifficult && <div style={styles.difficultBadge}>Difficult</div>}
        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
          {category && <div style={styles.category}>{category}</div>}
          
          <div style={styles.term}>
            {showDefinitionFirst ? definition : term}
          </div>
        </div>
        
        <div style={styles.clickHint}>
          Click to flip
        </div>
      </div>

      {/* Back Side */}
      <div style={{...styles.cardSide, ...styles.back}}>
        {isDifficult && <div style={styles.difficultBadge}>Difficult</div>}
        
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flex: 1}}>
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
    </div>
  );
};

export default Flashcard;
