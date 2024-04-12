"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useDispatch } from "react-redux";
import { updateSpeedAndTime } from "@/redux/features/game";

import styles from './styles/page.module.css';

const Home = () => { 
  const logStyles = 'color: blue;';
  console.log(`Created by %cPurva%c.`, logStyles, '', logStyles);

  const router = useRouter();
  const dispatch = useDispatch();

  const [selectedLevel, setSelectedLevel] = useState(0);
  const [selectedTime, setSelectedTime] = useState(3);

  const handleLevelChange = (event) => {
    setSelectedLevel(Number(event.target.value));
  };

  const handleTimeChange = (event) => {
    setSelectedTime(Number(event.target.value));
  };

  const handleStartGame = () => {
    dispatch(updateSpeedAndTime({ selectedLevel, selectedTime }));
    router.push('/play');
  };

  return (
    <div className={styles.body}>
      <div className={styles.title}>New Game</div>

     
      <div className={styles.section}>
        <div className={styles.subtitle}>Game Duration</div>
        <div className={styles.content}>
          <input
            type="radio"
            className={styles['btn-check']}
            name="game-time"
            id="1min"
            value={1}
            checked={selectedTime === 1}
            onChange={handleTimeChange}
          />
          <label className={`${styles.btn} ${styles['btn-secondary']}`} htmlFor="1min">
            1 Min
          </label>

          <input
            type="radio"
            className={styles['btn-check']}
            name="game-time"
            id="3min"
            value={3}
            checked={selectedTime === 3}
            onChange={handleTimeChange}
          />
          <label className={`${styles.btn} ${styles['btn-secondary']}`} htmlFor="3min">
            3 Min
          </label>

          <input
            type="radio"
            className={styles['btn-check']}
            name="game-time"
            id="5min"
            value={5}
            checked={selectedTime === 5}
            onChange={handleTimeChange}
          />
          <label className={`${styles.btn} ${styles['btn-secondary']}`} htmlFor="5min">
            5 Min
          </label>
        </div>
      </div>

      <div className={styles.section}>
        <button type='submit' className={`${styles.btn} ${styles.startGameBtn}`} onClick={handleStartGame} >
          Start Game
        </button>
      </div>
      <div className={styles.section}>
        <div className={styles.subtitle}>
          Read The Instructions Below😊
        </div>
        <div>
          <ol>
            <li>
              Focus on clicking the blue tile avoiding clicking on red tile.
            </li>
            <li>
              Each click on blue tile increase your score by 10.
            </li>
              <li>
              Each click on red tile decrease your score by 10.
            </li>
            <li>
              Every 3 successful clicks increase the game speed that makes the game more challenging.
            </li>
          </ol>
        </div>
      </div>
    </div>
  )
}

export default Home
