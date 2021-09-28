import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import { isEqual } from '../../util';

const Chess = (props) => {
    const {
        currentPlayer,
        value,
        coordinate,
        isSelect,
        forcePoints,
        movePoints,

        function: {
            preMove,
            executeMove
        }
    } = props;

    const chessColor =
        (value === 1 || value === 2)
            ? '#ed1212'
            : (value === -1 || value === -2)
                ? '#2626d6'
                : null;

    function onPressChess() {
        preMove(coordinate, value);
    }

    function onPressMove() {
        executeMove(coordinate);
    }

    function checkMovePoint() {
        if (movePoints) {
            for (const movePoint of movePoints) {
                if (isEqual(movePoint, coordinate)) return true;
            }

            return false;
        }

        return false;
    }

    function checkForcePoint() {
        if (forcePoints) {
            for (const forcePoint of forcePoints) {
                if (isEqual(forcePoint, coordinate)) return true;
            }

            return false;
        }

        return false;
    }

    return (
        <>
            {
                chessColor &&
                <TouchableWithoutFeedback
                    onPress={onPressChess}
                    disabled={(currentPlayer !== value && (2 * currentPlayer) !== value)}
                >
                    <View style={[styles.container, { backgroundColor: chessColor, opacity: (isSelect) ? 0.7 : 1.0 }]}>
                        <Text style={styles.value}>{(value === -1 * (2 * currentPlayer) || value === (2 * currentPlayer)) ? 'K' : null}</Text>
                    </View>
                </TouchableWithoutFeedback>
            }
            {
                ((checkForcePoint()) || (checkMovePoint())) &&
                <TouchableWithoutFeedback
                    onPress={onPressMove}
                >
                    <View style={[styles.container, { backgroundColor: (currentPlayer === 1) ? '#ed1212' : '#2626d6', opacity: 0.3 }]}>
                    </View>
                </TouchableWithoutFeedback>
            }
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        height: '90%',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#111'
    },
    value: {
        color: '#FFF',
        fontSize: 20
    }
});

export default Chess;