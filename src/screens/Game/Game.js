import React, { useState, useEffect } from 'react';
import {
    View,
    Image,
    StyleSheet
} from 'react-native';
import Chess from './Chess';

// Screens
import { Menu } from '../../screens';

// Theme
import { menuBackground, SIZES } from '../../constants';

// Utilities
import { isEqual } from '../../util';

const Game = () => {
    // States
    const [board, setBoard] = useState([
        [0, -1, 0, -1, 0, -1, 0, -1],
        [-1, 0, -1, 0, -1, 0, -1, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 0, 1, 0, 1, 0]
    ]);
    const [currentPlayer, setCurrentPlayer] = useState(null);
    const [currentChess, setCurrentChess] = useState(null);
    const [forcePoints, setForcePoints] = useState(null);
    const [willForcedChesses, setWillForcedChesses] = useState(null);
    const [movePoints, setMovePoints] = useState(null);
    const [mustForce, setMustForce] = useState(false);
    const [isMove, setIsMove] = useState(false);

    // Life Cycle
    useEffect(() => {
        if (!isMove) {
            console.log(`isMove = false`);
            isForce();
        } else if (isMove) {
            console.log(`isMove = true`);
            let isIsForce = isForce();
            console.log(`isIsForce = ${isIsForce}`);
            setIsMove(false);
            if (!isIsForce) {
                setCurrentPlayer(-1 * currentPlayer);
            }
        }
        console.log();
    }, [currentPlayer, isMove]);

    // Suggest ways when user want to move
    function preMove(coordinate, value = 1) {
        if (isEqual(currentChess, coordinate) || forcePoints) {
            setCurrentChess(null);
            setForcePoints(null);
            setMovePoints(null);
            setWillForcedChesses(null);
            return;
        }
        setCurrentChess(coordinate);

        if (mustForce) {
            (value === (1 * currentPlayer))
                ? checkForce(coordinate)
                : isForceKing(coordinate, value);
            return;
        } else {
            (value === (1 * currentPlayer))
                ? checkMove(coordinate)
                : isForceKing(coordinate, 1);
        }
    }

    // Check every turn if it can force (must force)
    function isForce() {
        for (let row = 0; row < board.length; row++) {
            for (let column = 0; column < board[row].length; column++) {
                if (board[row][column] === currentPlayer) {
                    let leftTarget = board[row - (1 * currentPlayer)][column - (1 * currentPlayer)];
                    let rightTarget = board[row - (1 * currentPlayer)][column + (1 * currentPlayer)];

                    if (leftTarget === -1 * (1 * currentPlayer) && leftTarget !== 0) {
                        let nextLeftTarget = board[row - (2 * currentPlayer)][column - (2 * currentPlayer)];

                        if (nextLeftTarget === 0) {
                            setMustForce(true);
                            return true;
                        }
                    }
                    if (rightTarget === -1 * (1 * currentPlayer) && rightTarget !== 0) {
                        let nextRightTarget = board[row - (2 * currentPlayer)][column + (2 * currentPlayer)];

                        if (nextRightTarget === 0) {
                            setMustForce(true);
                            return true;
                        }
                    }
                } else if (board[row][column] === (2 * currentPlayer)) {
                    let isIsForceKing = isForceKing({ row, column });
                    console.log('isIsForceKing', isIsForceKing);
                    return isIsForceKing;
                }
            }
        }
        setMustForce(false);
        setIsMove(false);
        return false;
    }

    // Check king if it can force
    function isForceKing({ row, column }, value) {
        let forcePoints = [];
        let willForcedChesses = [];

        let movePoints = [];

        let boolValue = false;

        console.log('TL');
        findCurrentToTopLeft(row, column);
        console.log('TR');
        findCurrentToTopRight(row, column);
        console.log('BL');
        findCurrentToBottomLeft(row, column);
        console.log('BR');
        findCurrentToBottomRight(row, column);

        if (value === (2 * currentPlayer)) {
            setForcePoints(forcePoints);
            setWillForcedChesses(willForcedChesses);
            return true;
        }

        if (value === 1) {
            setMovePoints(movePoints);
        }

        return boolValue;

        function findCurrentToTopLeft(row, column, isFound = false) {
            if (isOutOfArray(row - 1, column - 1)) return;

            let target = board[row - 1][column - 1];
            console.log(`value: ${target}`, row - 1, column - 1)

            if (!isFound) {
                if (target === 0) {
                    if (value === 1) {
                        movePoints.push({ row: row - 1, column: column - 1 });
                    }
                    findCurrentToTopLeft(row - 1, column - 1);
                } else if (target === -1 * (1 * currentPlayer) || target === -1 * (2 * currentPlayer)) {
                    findCurrentToTopLeft(row - 1, column - 1, true);
                } else if (target === currentPlayer || target === (2 * currentPlayer)) {
                    return;
                }
            } else if (isFound) {
                if (target === 0) {
                    if (value === (2 * currentPlayer)) {
                        forcePoints.push({ row: row - 1, column: column - 1 });
                        willForcedChesses.push({ row, column });
                        return;
                    }
                    setMustForce(true);
                    console.log(`MustForce TL`);
                    boolValue = true;
                    return;
                }
            }
        }

        function findCurrentToTopRight(row, column, isFound = false) {
            if (isOutOfArray(row - 1, column + 1)) return;

            let target = board[row - 1][column + 1];
            console.log(`value: ${target}`, row - 1, column + 1)

            if (!isFound) {
                if (target === 0) {
                    if (value === 1) {
                        movePoints.push({ row: row - 1, column: column + 1 });
                    }
                    findCurrentToTopRight(row - 1, column + 1);
                } else if (target === -1 * (1 * currentPlayer) || target === -1 * (2 * currentPlayer)) {
                    findCurrentToTopRight(row - 1, column + 1, true);
                } else if (target === currentPlayer || target === (2 * currentPlayer)) {
                    return;
                }
            } else if (isFound) {
                if (target === 0) {
                    if (value === (2 * currentPlayer)) {
                        forcePoints.push({ row: row - 1, column: column + 1 });
                        willForcedChesses.push({ row, column });
                        return;
                    }
                    setMustForce(true);
                    console.log(`MustForce TR`);
                    boolValue = true;
                    return;
                }
            }
        }

        function findCurrentToBottomLeft(row, column, isFound = false) {
            if (isOutOfArray(row + 1, column - 1)) return;

            let target = board[row + 1][column - 1];
            console.log(`value: ${target}`, row + 1, column - 1)

            if (!isFound) {
                if (target === 0) {
                    if (value === 1) {
                        movePoints.push({ row: row + 1, column: column - 1 });
                    }
                    findCurrentToBottomLeft(row + 1, column - 1);
                } else if (target === -1 * (1 * currentPlayer) || target === -1 * (2 * currentPlayer)) {
                    findCurrentToBottomLeft(row + 1, column - 1, true);
                } else if (target === currentPlayer || target === (2 * currentPlayer)) {
                    return;
                }
            } else if (isFound) {
                if (target === 0) {
                    if (value === (2 * currentPlayer)) {
                        forcePoints.push({ row: row + 1, column: column - 1 });
                        willForcedChesses.push({ row, column });
                        return;
                    }
                    setMustForce(true);
                    console.log(`MustForce BL`);
                    boolValue = true;
                    return;
                }
            }
        }

        function findCurrentToBottomRight(row, column, isFound = false) {
            if (isOutOfArray(row + 1, column + 1)) return;

            let target = board[row + 1][column + 1];
            console.log(`value: ${target}`, row + 1, column + 1);

            if (!isFound) {
                if (target === 0) {
                    if (value === 1) {
                        movePoints.push({ row: row + 1, column: column + 1 });
                    }
                    findCurrentToBottomRight(row + 1, column + 1);
                } else if (target === -1 * (1 * currentPlayer) || target === -1 * (2 * currentPlayer)) {
                    findCurrentToBottomRight(row + 1, column + 1, true);
                } else if (target === currentPlayer || target === (2 * currentPlayer)) {
                    return;
                }
            } else if (isFound) {
                if (target === 0) {
                    if (value === (2 * currentPlayer)) {
                        forcePoints.push({ row: row + 1, column: column + 1 });
                        willForcedChesses.push({ row, column });
                        return;
                    }
                    setMustForce(true);
                    console.log(`MustForce BR`);
                    boolValue = true;
                    return;
                }
            }
        }

        function isOutOfArray(row, column) {
            if (row < 0 || column > 7 || row > 7) return true;
        }
    }

    // Suggest way when user going to force
    function checkForce({ row, column }) {
        let leftTarget = board[row - (1 * currentPlayer)][column - (1 * currentPlayer)];
        let rightTarget = board[row - (1 * currentPlayer)][column + (1 * currentPlayer)];

        let forcePoints = [];
        let willForcedChesses = [];

        if (leftTarget !== (1 * currentPlayer) && leftTarget !== 0) {
            let nextLeftTarget = board[row - (2 * currentPlayer)][column - (2 * currentPlayer)];

            if (nextLeftTarget === 0) {
                forcePoints.push({ row: row - (2 * currentPlayer), column: column - (2 * currentPlayer) });
                willForcedChesses.push({ row: row - (1 * currentPlayer), column: column - (1 * currentPlayer) });
            }
        }
        if (rightTarget !== (1 * currentPlayer) && rightTarget !== 0) {
            let nextRightTarget = board[row - (2 * currentPlayer)][column + (2 * currentPlayer)];

            if (nextRightTarget === 0) {
                forcePoints.push({ row: row - (2 * currentPlayer), column: column + (2 * currentPlayer) });
                willForcedChesses.push({ row: row - (1 * currentPlayer), column: column + (1 * currentPlayer) });
            }
        }

        setForcePoints(forcePoints);
        setWillForcedChesses(willForcedChesses);
    }

    // Suggest ways when user want to move and do nothing when mustForce is true
    function checkMove({ row, column }) {
        let leftTarget = board[row - (1 * currentPlayer)][column - (1 * currentPlayer)];
        let rightTarget = board[row - (1 * currentPlayer)][column + (1 * currentPlayer)];

        let movePoints = [];

        if (leftTarget === 0) {
            movePoints.push({ row: row - (1 * currentPlayer), column: column - (1 * currentPlayer) });
        }
        if (rightTarget === 0) {
            movePoints.push({ row: row - (1 * currentPlayer), column: column + (1 * currentPlayer) });
        }

        setMovePoints(movePoints);
    }

    // When user decide to move
    function executeMove({ row, column }, value = 1) {
        const { row: currRow, column: currColumn } = currentChess;
        let chessValue = board[currRow][currColumn];

        if (willForcedChesses) {
            for (let i = 0; i < forcePoints.length; i++) {
                if (isEqual(forcePoints[i], { row, column })) {
                    const { row: forcedRow, column: forcedColumn } = willForcedChesses[i];

                    setBoard(prevBoard => {
                        let board = [...prevBoard];

                        board[currRow][currColumn] = 0;
                        board[forcedRow][forcedColumn] = 0;
                        board[row][column] =
                            (row === 0 || row === 7)
                                ? (2 * currentPlayer)
                                : (chessValue === (2 * currentPlayer))
                                    ? (2 * currentPlayer)
                                    : currentPlayer;

                        return board;
                    });
                    setForcePoints(null);
                    setWillForcedChesses(null);
                    setIsMove(true);
                }
            }
        } else if (willForcedChesses === null) {
            setBoard(prevBoard => {
                let board = [...prevBoard];

                board[currRow][currColumn] = 0;
                board[row][column] =
                    (row === 0 || row === 7)
                        ? (2 * currentPlayer)
                        : (chessValue === (2 * currentPlayer))
                            ? (2 * currentPlayer)
                            : currentPlayer;

                return board;
            });
            setMovePoints(null);
            setIsMove(false);
            setCurrentPlayer(-1 * currentPlayer);
        }
    }

    // Initialize board
    function renderBoard() {
        let layout = board.map((rowItem, rowIndex) => {
            let chess = rowItem.map((columnItem, columnIndex) => {
                const layoutColor =
                    (rowIndex % 2 === 0)
                        ? (columnIndex % 2 === 0)
                            ? '#F2C8A1'
                            : '#6d4824'
                        : (rowIndex % 2 === 1)
                            ? (columnIndex % 2 === 0)
                                ? '#6d4824'
                                : '#F2C8A1'
                            : null;

                return (
                    <View
                        key={`chess-${columnIndex}`}
                        style={[styles.square, { backgroundColor: layoutColor }]}
                    >
                        <Chess
                            currentPlayer={currentPlayer}
                            coordinate={{ row: rowIndex, column: columnIndex }}
                            value={columnItem}
                            isSelect={isEqual({ row: rowIndex, column: columnIndex }, (currentChess) ? currentChess : {})}
                            forcePoints={forcePoints}
                            movePoints={movePoints}

                            function={{
                                preMove,
                                executeMove
                            }}
                        />
                    </View>
                )
            });

            return (
                <View
                    key={`row-${rowIndex}`}
                    style={styles.row}
                >
                    {chess}
                </View>
            );
        });

        return layout;
    }

    // Entry point
    return (
        <>
            {
                (currentPlayer)
                    ? <View style={styles.container}>
                        <Image
                            source={menuBackground}
                            style={{
                                position: 'absolute'
                            }}
                            blurRadius={7}
                        />
                        <View style={styles.playerTwoBox}>

                        </View>
                        <View style={styles.board}>
                            {renderBoard()}
                        </View>
                        <View style={styles.playerOneBox}>

                        </View>
                    </View>
                    : <Menu
                        setCurrentPlayer={setCurrentPlayer}
                    />
            }
        </>
    );
}

// UI Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#272635'
    },
    board: {
        height: SIZES.width,

    },
    row: {
        flex: 1,
        flexDirection: 'row',
    },
    square: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    playerOneBox: {
        flex: 1,
        borderTopWidth: 15,
        borderColor: '#54493f'

    },
    playerTwoBox: {
        flex: 1,
        borderBottomWidth: 15,
        borderColor: '#54493f'
    }
});

export default Game;