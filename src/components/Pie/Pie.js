import React from 'react'
import styles from '../MainPage.module.css'

const Pie = ({counter}) => {
  const size = 100 / counter;
  const r = () => Math.floor(Math.random() * 256);
  const getRandomColor = () => `rgb(${r()}, ${r()}, ${r()})`;
  const getGradients = () => {
    let segments = [];
    for (let i = 0; i < counter; i++) {
      segments.push(
        `${getRandomColor()} ${3.6 * i * size}deg ${3.6 * (i + 1) * size}deg`
      );
    }
    return segments.join(", ");
  };
  const gradient = `conic-gradient(${getGradients()})`;

  return <div className={styles.pie} style={{ backgroundImage: `${gradient}` }}/>

};

export default Pie;