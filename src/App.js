import './App.css';
import React from 'react';
import Die from './Die';

function App() {
  function getRandomDies () {
    return (new Array(10)).fill(1).map(() => ({
      selected: false,
      value: Math.floor(Math.random() * 6) + 1
    }));
  }

  var [dies, setDies] = React.useState(getRandomDies());
  var [finished, setFinished] = React.useState(false);

  function toggleDie (toggleIndex) {
    var selectedDies = dies.filter(elem => elem.selected);
    if (!selectedDies.length || selectedDies[0].value === dies[toggleIndex].value) {
      setDies(prevDies => prevDies.map((elem, index) => {
        return {
          ...elem,
          selected: index === toggleIndex ? !elem.selected : elem.selected
        };
      }));
    }
  }

  React.useEffect(() => {
    setFinished(dies.filter(elem => !elem.selected).length === 0);
  }, [dies]);

  function initDies () {
    setDies(getRandomDies());
  }

  function roll () {
    setDies(prevDies => prevDies.map((elem) => {
      if (elem.selected) {
        return {...elem};
      } else {
        return {
          selected: false,
          value: Math.floor(Math.random() * 6) + 1
        }
      }
    }));
  }

  var diesMap = dies.map((die, index) => {
    return (
      <Die selected={die.selected} value={die.value} key={index} clickHandler={() => {toggleDie(index)}} />
    )
  });

  return (
    <div className="App">
      <main className="game">
        <h1 className="title">
          Tenzies
        </h1>
        <article className="description">
          Roll until all dice are the same. Click each die to freeze it at its current value between rolls.
        </article>
        <div className="field">
          {diesMap}
        </div>
        <button className="roll" onClick={finished ? initDies : roll}>{finished ? 'Restart' : 'Roll'}</button>
      </main>
    </div>
  );
}

export default App;
