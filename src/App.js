import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [cardId, setCardId] = useState('');
  const [location, setLocation] = useState('');
  const [message, setMessage] = useState('');
  const [lostCards, setLostCards] = useState([]);
  const [foundCard, setFoundCard] = useState(null);
  const [mode, setMode] = useState('');

  const handleReport = () => {
    setLostCards([...lostCards, { name, cardId, location, message }]);
    setName('');
    setCardId('');
    setLocation('');
    setMessage('');
  };

  const handleCheck = () => {
    const lostCard = lostCards.find(card => card.cardId === cardId);
    if (lostCard) {
      setFoundCard(lostCard);
    } else {
      alert('This card has not been reported as lost.');
    }
    setCardId('');
  };

  const handleFound = () => {
    setLostCards(lostCards.filter(card => card.cardId !== foundCard.cardId));
    setFoundCard(null);
  };

  return (
    <div>
      <button onClick={() => setMode('report')}>Report a Missing Card</button>
      <button onClick={() => setMode('find')}>Find my Missing Card</button>

      {mode === 'report' && (
        <>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <input
            type="text"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            placeholder="Enter Card ID"
          />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter current location of card"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a message"
          />
          <button onClick={handleReport}>Report Lost Card</button>
        </>
      )}

      {mode === 'find' && (
        <>
          <input
            type="text"
            value={cardId}
            onChange={(e) => setCardId(e.target.value)}
            placeholder="Enter Card ID"
          />
          <button onClick={handleCheck}>Check Lost Card</button>
        </>
      )}

      {foundCard && (
        <div>
          <h2>Found Card Details</h2>
          <p>Name: {foundCard.name}</p>
          <p>Card ID: {foundCard.cardId}</p>
          <p>Location: {foundCard.location}</p>
          <p>Message: {foundCard.message}</p>
          <button onClick={handleFound}>Found my card</button>
        </div>
      )}

      <p>Number of lost cards: {lostCards.length}</p>

      <table>
        <thead>
          <tr>
            <th>Last three digits of Card ID</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {lostCards.slice(-3).map((card, index) => (
            <tr key={index}>
              <td>{card.cardId.slice(-3)}</td>
              <td>{card.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
