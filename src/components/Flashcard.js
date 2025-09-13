import { useState } from 'react';

const styles = {
  flashcardContainer: {
    width: '100%',
    height: '100%',
    minHeight: '300px',
    perspective: '1000px',
    cursor: 'pointer',
  },
  flashcard: {
    width: '100%',
    height: '100%',
    minHeight: '300px',
    position: 'relative',
    transformStyle: 'preserve-3d',
    transition: 'transform 0.6s ease-in-out',
    backgroundColor: 'transparent',
  },
  flashcardFlip: {
    transform: 'rotateY(180deg)',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '25px',
    borderRadius: '15px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(15px)',
    boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)',
    border: '3px solid transparent',
  },
  cardFaceDifficult: {
    borderColor: '#ff6b35',
    boxShadow: '0 8px 30px rgba(255, 107, 53, 0.3)',
  },
  cardFaceHover: {
    boxShadow: '0 12px 40px rgba(0, 0, 0, 0.2)',
  },
  cardBack: {
    transform: 'rotateY(180deg)',
  },
  categoryTag: {
    position: 'absolute',
    top: '15px',
    left: '15px',
    background: 'linear-gradient(135deg, #007bff, #0056b3)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 8px rgba(0, 123, 255, 0.3)',
  },
  difficultTag: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    background: 'linear-gradient(135deg, #ff6b35, #e55a2b)',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '12px',
    fontSize: '12px',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 8px rgba(255, 107, 53, 0.3)',
    animation: 'pulse 2s infinite',
  },
  content: {
    textAlign: 'center',
    maxWidth: '100%',
    wordWrap: 'break-word',
    overflowWrap: 'break-word',
    zIndex: 1,
  },
  term: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#1a365d',
    marginBottom: '15px',
    lineHeight: '1.2',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  definition: {
    fontSize: '20px',
    color: '#2d3748',
    lineHeight: '1.6',
    marginBottom: '20px',
    fontWeight: '500',
  },
  example: {
    fontSize: '16px',
    color: '#4a5568',
    fontStyle: 'italic',
    marginTop: '15px',
    padding: '15px',
    backgroundColor: 'rgba(59, 130, 246, 0.1)',
    borderRadius: '10px',
    borderLeft: '4px solid #007bff',
    backdropFilter: 'blur(5px)',
    boxShadow: '0 2px 10px rgba(59, 130, 246, 0.1)',
  },
  hint: {
    fontSize: '14px',
    color: '#d69e2e',
    marginTop: '12px',
    padding: '10px 15px',
    backgroundColor: 'rgba(237, 137, 54, 0.1)',
    borderRadius: '8px',
    border: '2px solid rgba(237, 137, 54, 0.2)',
    fontWeight: '500',
    backdropFilter: 'blur(5px)',
  },
  flipIndicator: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    fontSize: '12px',
    color: '#718096',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: '6px 10px',
    borderRadius: '20px',
    backdropFilter: 'blur(5px)',
    fontWeight: '500',
  },
  flipIcon: {
    fontSize: '16px',
    transition: 'transform 0.3s ease',
  },
};

// Add pulse animation for difficult tag
const pulseKeyframes = `
  @keyframes pulse {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;

if (typeof document !== 'undefined') {
  const existingStyle = document.getElementById('flashcard-pulse-animation');
  if (!existingStyle) {
    const style = document.createElement('style');
    style.id = 'flashcard-pulse-animation';
    style.textContent = pulseKeyframes;
    document.head.appendChild(style);
  }
}

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
  const [isHovered, setIsHovered] = useState(false);

  // Determine what to show on front and back based on showDefinitionFirst
  const frontContent = showDefinitionFirst ? definition : term;
  const backContent = showDefinitionFirst ? term : definition;
  const frontIsDefinition = showDefinitionFirst;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div
      style={styles.flashcardContainer}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
      <div
        style={{
          ...styles.flashcard,
          ...(flip ? styles.flashcardFlip : {}),
        }}
      >
        {/* Front Face */}
        <div
          style={{
            ...styles.cardFace,
            ...(isDifficult ? styles.cardFaceDifficult : {}),
            ...(isHovered ? styles.cardFaceHover : {}),
          }}
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
            <span style={{
              ...styles.flipIcon,
              ...(isHovered ? { transform: 'scale(1.1)' } : {})
            }}>🔄</span>
            <span>Click to flip</span>
          </div>
        </div>

        {/* Back Face */}
        <div
          style={{
            ...styles.cardFace,
            ...styles.cardBack,
            ...(isDifficult ? styles.cardFaceDifficult : {}),
            ...(isHovered ? styles.cardFaceHover : {}),
          }}
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

          <div style={styles.content}>
            {frontIsDefinition ? (
              <div style={styles.term}>{backContent}</div>
            ) : (
              <>
                <div style={styles.definition}>{backContent}</div>
                {example && (
                  <div style={styles.example}>
                    <strong>📝 Example:</strong> {example}
                  </div>
                )}
                {hint && (
                  <div style={styles.hint}>
                    💡 <strong>Hint:</strong> {hint}
                  </div>
                )}
              </>
            )}
          </div>
          
          <div style={styles.flipIndicator}>
            <span style={styles.flipIcon}>🔄</span>
            <span>Click to flip back</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
