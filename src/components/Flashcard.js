import React from 'react';

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

  // Simple conditional rendering instead of 3D transforms
  return (
    <div 
      onClick={handleClick}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '30px',
        boxSizing: 'border-box',
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      {isDifficult && (
        <div style={{
          position: 'absolute',
          top: '15px',
          right: '15px',
          backgroundColor: '#ff6b35',
          color: 'white',
          padding: '4px 8px',
          borderRadius: '10px',
          fontSize: '10px',
          fontWeight: 'bold',
        }}>
          Difficult
        </div>
      )}

      {category && (
        <div style={{
          fontSize: '12px',
          color: '#007bff',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          marginBottom: '20px',
          padding: '6px 12px',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderRadius: '15px',
          display: 'inline-block',
        }}>
          {category}
        </div>
      )}

      {!flip ? (
        // Front side - show term or definition
        <>
          <div style={{
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#1a365d',
            marginBottom: '20px',
            lineHeight: '1.2',
          }}>
            {showDefinitionFirst ? definition : term}
          </div>
          <div style={{
            position: 'absolute',
            bottom: '15px',
            fontSize: '12px',
            color: '#a0aec0',
            opacity: 0.7,
          }}>
            Click to reveal {showDefinitionFirst ? 'term' : 'definition'}
          </div>
        </>
      ) : (
        // Back side - show both term and definition
        <>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#1a365d',
            marginBottom: '15px',
            lineHeight: '1.2',
          }}>
            {term}
          </div>
          <div style={{
            fontSize: '18px',
            color: '#4a5568',
            lineHeight: '1.4',
            marginBottom: '15px',
          }}>
            {definition}
          </div>
          {example && (
            <div style={{
              fontSize: '14px',
              color: '#2d3748',
              fontStyle: 'italic',
              marginTop: '15px',
              padding: '10px 15px',
              backgroundColor: 'rgba(0, 123, 255, 0.05)',
              borderRadius: '8px',
              borderLeft: '3px solid #007bff',
              maxWidth: '100%',
            }}>
              <strong>Example:</strong> {example}
            </div>
          )}
          {hint && (
            <div style={{
              fontSize: '12px',
              color: '#718096',
              marginTop: '10px',
              opacity: 0.8,
            }}>
              {hint}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Flashcard;
