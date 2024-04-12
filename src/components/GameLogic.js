"use client"
import { useState, useEffect, useCallback } from 'react';
import { useSelector } from "react-redux"

const useGameLogic = () => {
    const [matrix, setMatrix] = useState([]);
    const [activeColumns, setActiveColumns] = useState([0, 1]);
    const [points, setPoints] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const { speed: initialSpeed, timer: initialTimer } = useSelector((state) => state.game);
    const [speed, setSpeed] = useState(initialSpeed);
    const [timer, setTimer] = useState(initialTimer);

    // generate matrix
    const generateRandomBinary = useCallback(() => Math.round(Math.random()), []);
    const createMatrix = useCallback(() => {
        const newMatrix = Array.from({ length: 10 }, () =>
            Array.from({ length: 10 }, generateRandomBinary)
        );
        setMatrix(newMatrix);
    }, [generateRandomBinary]);

    const slideColumns = useCallback(() => {
        const newActiveColumns = activeColumns.map((col) => (col + 1) % 10);
        setActiveColumns(newActiveColumns);
    }, [activeColumns]);

    const handleClick = useCallback(
        (rowIndex, cellIndex) => {
            if (isRunning) {
                if (activeColumns.includes(cellIndex)) {
                    setPoints((prevPoints) => prevPoints - 10);
                } else if (!activeColumns.includes(cellIndex) && matrix[rowIndex][cellIndex] === 1) {
                    setPoints((prevPoints) => prevPoints + 10);
                }

                setClickCount((prevClickCount) => prevClickCount + 1);

                if (clickCount === 2) {
                    setClickCount(0);
                    setSpeed((prevSpeed) => Math.max(100, prevSpeed - 100));
                }
            }
        },
        [isRunning, activeColumns, matrix, clickCount]
    );

    const startGame = useCallback(() => {
        setIsRunning(true);
    }, []);

    const stopGame = useCallback(() => {
        setIsRunning(false);
    }, []);

    useEffect(() => {
        let gameTimer;

        if (isRunning) {
            gameTimer = setInterval(() => {
                setTimer((prevTimer) => {
                    if (prevTimer <= 0) {
                        clearInterval(gameTimer);
                        stopGame();
                        return 0;
                    }
                    return prevTimer - 1;
                });
            }, 1000);
        }

        return () => clearInterval(gameTimer);
    }, [isRunning, stopGame]);

    useEffect(() => {
        createMatrix();
    }, [createMatrix]);

    useEffect(() => {
        let sliderTimer;

        if (isRunning) {
            sliderTimer = setInterval(() => {
                slideColumns();
            }, speed);
        }

        return () => clearInterval(sliderTimer);
    }, [isRunning, slideColumns, speed]);

    return {
        matrix,
        activeColumns,
        points,
        speed,
        handleClick,
        startGame,
        stopGame,
        isRunning,
        timer,
    };
};

export default useGameLogic;
