import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
function CardDeck() {
  const [deck, setDeck] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [isShuffling, setIsShuffling] = useState(false);

  useEffect(() => {
    async function fetchDeck() {
      const response = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/');
      setDeck(response.data);
    }
    fetchDeck();
  }, []);

  const drawCard = async () => {
    if (!deck || deck.remaining === 0) {
      alert('Error: no cards remaining!');
      return;
    }
    const response = await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
    const card = response.data.cards[0];
    setDrawnCards([...drawnCards, card]);
    setDeck({ ...deck, remaining: response.data.remaining });
  };

  const shuffleDeck = async () => {
    setIsShuffling(true);
    await axios.get(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
    setDrawnCards([]);
    setIsShuffling(false);
  };

  return (
    <div>
      <button onClick={drawCard}>Draw Card</button>
      <button onClick={shuffleDeck} disabled={isShuffling}>
        {isShuffling ? 'Shuffling...' : 'Shuffle Deck'}
      </button>
      <div>
        {drawnCards.map((card) => (
          <Card key={card.code} image={card.image} value={card.value} suit={card.suit} />
        ))}
      </div>
    </div>
  );
}

export default CardDeck;
