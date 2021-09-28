import React from 'react';
import {
    View,
    Text,
    StyleSheet
} from 'react-native';

import { SIZES, FONTS } from '../../constants';
import Chess from './Chess';

const PlayerBanner = (props) => {
    const {
        player,
        playerChessCount
    } = props;

    function renderChessCount() {
        let chesses = new Array(playerChessCount)
        chesses.fill(null, 0, chesses.length);

        let layout = chesses.map((element, index) => {
            return (
                <View
                    key={`chess-count-${index}`}
                    style={[styles.chess, { backgroundColor: (player === 1) ? '#ED1212' : '#2626D6' }]}
                ></View>
            )
        });
        return layout;
    }

    return (
        <>
            <View style={styles.player}>
                <Text style={{ ...FONTS.regular, fontSize: 30, color: '#FFF' }}>Player {player}</Text>
            </View>
            <View style={styles.chessCount}>
                {renderChessCount()}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    player: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    chessCount: {
        flex: 2,
        flexDirection: 'row'
    },
    chess: {
        width: 30,
        height: 30,
        borderRadius: 50,
        marginHorizontal: 2
    }
});

export default PlayerBanner;