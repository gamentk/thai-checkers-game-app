import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Button
} from 'react-native';

const Test = () => {
    const [board, setBoard] = useState([
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0],
    ]);

    useEffect(() => {
        console.log(board)
    }, [board]);

    return (
        <Button
            title="Click"
            onPress={() => {
                setBoard((prevBoard) => {
                    let board = [...prevBoard];
                    board[0][1] = 5;

                    return board;
                });
            }}
        />
    );
}

export default Test;