import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function GamePage() {
  const location = useLocation();
  const { playerNames = [], eliminationScore = 0 } = location.state || {};

  const [gameData, setGameData] = useState(playerNames.map(() => []));
  const [rounds, setRounds] = useState(0);
  const [lastWinnerIndex, setLastWinnerIndex] = useState(null);
  const [currentRoundInputs, setCurrentRoundInputs] = useState({});

  const totalScores = gameData.map(player =>
    player.reduce((sum, val) => sum + (typeof val === 'number' ? val : 0), 0)
  );

  const eliminated = totalScores.map(score => score >= eliminationScore);

  const handleNextGame = (winnerIndex) => {
    const updated = [...gameData];
    playerNames.forEach((_, idx) => {
      if (eliminated[idx]) {
        updated[idx].push('X');
      } else if (idx === winnerIndex) {
        updated[idx].push(0);
      } else {
        updated[idx].push(null);
      }
    });
    setGameData(updated);
    setRounds(prev => prev + 1);
    setLastWinnerIndex(winnerIndex);
    setCurrentRoundInputs({});
  };

  const handleChange = (e, playerIdx) => {
    const val = e.target.value;
    if (val === '' || /^\d{0,3}$/.test(val)) {
      setCurrentRoundInputs(prev => ({
        ...prev,
        [playerIdx]: val
      }));
    }
  };

  const handleSubmitScores = () => {
    const updated = [...gameData];

    playerNames.forEach((_, playerIdx) => {
      const val = currentRoundInputs[playerIdx];
      if (val !== undefined) {
        const updatedPlayer = [...updated[playerIdx]];
        updatedPlayer[rounds - 1] = val === '' ? null : parseInt(val, 10);
        updated[playerIdx] = updatedPlayer;
      }
    });

    setGameData(updated);
    setCurrentRoundInputs({});
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>Game Scoreboard</h2>

      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead style={styles.thead}>
            <tr>
              <th style={th}>Round</th>
              {playerNames.map((name, idx) => (
                <th key={idx} style={th}>{name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(rounds)].map((_, roundIdx) => (
              <tr key={roundIdx} style={{ backgroundColor: roundIdx % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                <td style={td}>Game {roundIdx + 1}</td>
                {playerNames.map((_, playerIdx) => {
                  const cellValue = gameData[playerIdx][roundIdx];
                  const isEditable = roundIdx === rounds - 1 && cellValue === null && !eliminated[playerIdx];

                  return (
                    <td key={playerIdx} style={td}>
                      {isEditable ? (
                        <input
                          type="text"
                          inputMode="numeric"
                          value={currentRoundInputs[playerIdx] ?? ''}
                          style={{ width: '60px', textAlign: 'center' }}
                          onChange={(e) => handleChange(e, playerIdx)}
                        />
                      ) : (
                        cellValue === null ? '-' : cellValue
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            <tr style={{ backgroundColor: '#ddd', fontWeight: 'bold' }}>
              <td style={td}>Total</td>
              {totalScores.map((score, idx) => (
                <td key={idx} style={td}>{score}</td>
              ))}
            </tr>

            <tr style={{ backgroundColor: '#eee', fontStyle: 'italic' }}>
              <td style={td}>Status</td>
              {playerNames.map((_, idx) => {
                if (eliminated[idx]) return <td key={idx} style={td}>Eliminated ❌</td>;
                if (lastWinnerIndex === idx && rounds > 0) return <td key={idx} style={td}>Winner 🏆</td>;
                return <td key={idx} style={td}>Playing ✅</td>;
              })}
            </tr>
          </tbody>
        </table>
      </div>

      {rounds > 0 && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <button
            onClick={handleSubmitScores}
            style={styles.submitButton}
          >
            ✅ Submit Scores
          </button>
        </div>
      )}

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '10px' }}>Select Winner for Game {rounds + 1}</h3>
        {playerNames.map((name, idx) => (
          <button
            key={idx}
            onClick={() => handleNextGame(idx)}
            disabled={eliminated[idx]}
            style={{
              margin: '5px',
              padding: '10px 20px',
              fontSize: '16px',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: eliminated[idx] ? '#ccc' : '#4A90E2',
              color: '#fff',
              cursor: eliminated[idx] ? 'not-allowed' : 'pointer'
            }}
          >
            {name}
          </button>
        ))}
      </div>

      <p style={{
        textAlign: 'center',
        marginTop: '20px',
        color: '#666',
        fontSize: '16px'
      }}>
        🛑 Elimination Score: <strong>{eliminationScore}</strong>
      </p>
    </div>
  );
}

const styles = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#eef2f5',
    padding: '20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
  },
  title: {
    fontSize: '28px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center'
  },
  tableWrapper: {
    overflowX: 'auto',
    maxWidth: '100%',
    marginBottom: '20px'
  },
  table: {
    width: '100%',
    minWidth: '600px',
    backgroundColor: '#fff',
    borderCollapse: 'collapse',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  thead: {
    backgroundColor: '#4A90E2',
    color: '#fff'
  },
  submitButton: {
    padding: '10px 30px',
    fontSize: '16px',
    borderRadius: '5px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    cursor: 'pointer'
  }
};

const th = {
  padding: '12px 16px',
  fontWeight: '600',
  textAlign: 'center',
  borderBottom: '2px solid #e0e0e0',
  whiteSpace: 'nowrap'
};

const td = {
  padding: '10px',
  textAlign: 'center',
  borderBottom: '1px solid #e0e0e0',
  whiteSpace: 'nowrap'
};

export default GamePage;
