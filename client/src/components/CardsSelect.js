import React, { useState, useEffect } from "react";
import CardDataService from "../services/CardService";

const CardsSelect = () => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    retrieveTutorials();
  }, []);

  const retrieveTutorials = () => {
    CardDataService.getAll()
      .then(response => {
        setCards(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
      <div className="col-md-6">
        <h4>Cards List</h4>

        <ul className="list-group">
          {cards &&
            cards.map((card, index) => (
              <li
                key={index}
              >
                {card.number}
              </li>
            ))}
        </ul>
      </div>
  );
};

export default CardsSelect;