import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [players, setPlayers] = useState(0);
  const [eliminationScore, setEliminationScore] = useState(0);
  const [showPlayerInputs, setShowPlayerInputs] = useState(false);
  const [playerNames, setPlayerNames] = useState([]);

  const navigate = useNavigate();

  function numOfPlayers() {
    if (players > 0 && eliminationScore > 0) {
      setPlayerNames(Array(players).fill(""));
      setShowPlayerInputs(true);
    }
  }

  function handleNameChange(index, value) {
    const updatedNames = [...playerNames];
    updatedNames[index] = value;
    setPlayerNames(updatedNames);
  }

  function handleNext() {
    const allFilled = playerNames.every(name => name.trim() !== "");
    if (!allFilled) {
      alert("Please enter all player names.");
      return;
    }

    navigate('/gamepage', {
      state: {
        playersCount: players,
        eliminationScore,
        playerNames
      }
    });
  }

  return (
    <div style={styles.outerWrapper}>
      <div style={styles.container}>
        <h2 style={styles.heading}>Enter Number of Players</h2>
        <input
          type="number"
          placeholder="e.g. 3"
          style={styles.input}
          value={players}
          onChange={(e) => setPlayers(parseInt(e.target.value) || 0)}
        />

        <h3 style={styles.subheading}>Elimination Score</h3>
        <input
          type="number"
          placeholder="e.g. 100"
          style={styles.input}
          value={eliminationScore}
          onChange={(e) => setEliminationScore(parseInt(e.target.value) || 0)}
        />

        <button style={styles.button} onClick={numOfPlayers}>
          Submit
        </button>

        {showPlayerInputs && (
          <div style={styles.playerInputs}>
            <h3 style={styles.subheading}>Enter Player Names</h3>
            {playerNames.map((name, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Player ${idx + 1}`}
                value={name}
                onChange={(e) => handleNameChange(idx, e.target.value)}
                style={styles.nameInput}
              />
            ))}

            <p style={styles.note}>
              * Any player reaching <strong>{eliminationScore}</strong> points will be eliminated.
            </p>

            <button style={styles.button} onClick={handleNext}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  outerWrapper: {
    width: '100%',
    minHeight: '50vh',
    padding: '20px',
    paddingTop: '25px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#e9eff5',
    boxSizing: 'border-box',
  },

  container: {
    width: '100%',
    maxWidth: '500px',
    backgroundColor: '#f0f4f8',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },

  heading: {
    fontSize: '22px',
    color: '#333',
    marginBottom: '10px',
    textAlign: 'center'
  },

  subheading: {
    marginTop: '20px',
    marginBottom: '8px',
    fontSize: '18px',
    color: '#444',
    textAlign: 'center'
  },

  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1.5px solid #ccc',
    marginBottom: '15px',
    boxSizing: 'border-box',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
  },

  nameInput: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '10px',
    boxSizing: 'border-box',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
  },

  button: {
    marginTop: '15px',
    padding: '12px 30px',
    fontSize: '16px',
    borderRadius: '6px',
    backgroundColor: '#4A90E2',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
    width: '100%',
    maxWidth: '200px',
    transition: 'background-color 0.3s ease',
  },

  playerInputs: {
    marginTop: '25px',
    width: '100%',
  },

  note: {
    marginTop: '10px',
    fontSize: '14px',
    fontStyle: 'italic',
    color: '#555',
    textAlign: 'center'
  }
};

export default Home;
