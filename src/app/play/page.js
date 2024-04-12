"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";

// import css files
import styles from "./play.module.css";

// import game logic
// This code is a Next.js component 
//for a simple  game. 
//It utilizes the useGameLogic custom hook for 
//managing the game's state, 
//such as the game matrix, points, and active columns.
import useGameLogic from '@/components/GameLogic';
// There are 3 sections

// section1: Displays the current points and the elapsed time in the game.
// section2: Contains the cube game. Each row of the matrix is rendered as a row of blue or transparent cells, and the active columns are displayed in red.
// section3: Displays the Start and Back buttons. The Start button initializes the game and enables the player to interact with the cube. The Back button navigates the player back to the homepage.

const Play = () => {
    const router = useRouter();

    const {
        matrix,
        activeColumns,
        points,
        handleClick,
        startGame,
        isRunning,
        timer,
    } = useGameLogic();

    const [gameRunning, setGameRunning] = useState(false);
// The useEffect hook ensures that the gameRunning state is synchronized with the isRunning state from the useGameLogic hook.
    useEffect(() => {
        if (isRunning !== gameRunning) {
            setGameRunning(isRunning);
        }
    }, [isRunning, gameRunning]);
// The handleStartClick function starts the game by calling the startGame function from the useGameLogic hook.
    const handleStartClick = () => {
        startGame();
    };
// The handleBackClick function navigates the player back to the homepage by using the router.push('/') function.
    const handleBackClick = () => {
        router.push('/');
    };
// The formatTime function converts the total elapsed seconds into a string with the format 'mm:ss'.
    const formatTime = (totalSeconds) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.body}>
            <div className={`${styles.row} ${styles.section1}`}>
                <div>
                    Points: {points}
                </div>
                <div>
                    Time: {formatTime(timer)}
                </div>
            </div>
            <div className={`${styles.row} ${styles.section2}`}>
                <div className={styles.cube}>
                    {matrix.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ display: 'flex' }}>
                            {row.map((cell, cellIndex) => (
                                <div
                                    key={cellIndex}
                                    className={styles.tile}
                                    style={{
                                        backgroundColor:
                                            activeColumns.includes(cellIndex) ? 'red' : cell === 1 ? 'blue' : 'transparent'
                                    }}
                                    onClick={() => handleClick(rowIndex, cellIndex)}
                                ></div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${styles.row} ${styles.section3}`}>
                <button className={`${styles.btn} ${styles.start}`} onClick={handleStartClick} disabled={isRunning}>
                   Let's Start!
                </button>
                <button className={`${styles.btn} ${styles.back}`} onClick={handleBackClick}>
                   Go Back!
                </button>
            </div>
        </div>
    )
}

export default Play