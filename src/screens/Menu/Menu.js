import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

// Theme
import { SIZES, FONTS, menuBackground, menuLogo } from '../../constants';

const Menu = (props) => {
    const {
        setCurrentPlayer
    } = props;
    const [randomNumber, setRandomNumber] = useState(null);

    function onPressPlay() {
        setRandomNumber('...');

        getRandomNumber(1, 2)
            .then((result) => {
                setRandomNumber(result);
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        (result === 1)
                            ? resolve(result)
                            : resolve(-1)
                    }, 2000)
                });
            }).then((player) => {
                setCurrentPlayer(player);
            });
    }

    function getRandomNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Math.floor(Math.random() * (max - min + 1) + min));
            }, 2000);
        });
    }

    return (
        <View style={styles.container}>
            <Image
                source={menuBackground}
                style={styles.backgroundImage}
                blurRadius={7}
            />
            <Image
                source={menuLogo}
                style={styles.logoImage}
            />
            <View style={styles.menuLogo}>
                <Text style={{ ...FONTS.bold, color: '#B11B1B', fontSize: 36 }}>PISADAN EDITION</Text>
                <Text style={{ ...FONTS.bold, color: '#B11B1B', fontSize: 26 }}>อยู่หรือตาย นายเลือกเอง</Text>
            </View>
            {(randomNumber) && <View style={styles.randomNumber}>
                <Text style={{ ...FONTS.regular, color: '#FFF', fontSize: 30 }}>Player</Text>
                <Text style={{ ...FONTS.regular, color: '#FFF', fontSize: 64, color: (randomNumber === '...') ? '#FFF' : (randomNumber === 1) ? '#ed1212' : '#2626d6' }}>{randomNumber}</Text>
                <Text style={{ ...FONTS.regular, color: '#FFF', fontSize: 30 }}>First</Text>
            </View>}
            <TouchableOpacity
                style={styles.menu}
                onPress={onPressPlay}
            >
                <Text style={{ ...FONTS.regular, color: '#FFF', fontSize: 36 }}>PLAY</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    backgroundImage: {
        position: 'absolute'
    },
    menuLogo: {
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 220,
        right: 20
    },
    logoImage: {
        transform: [
            { scale: .5 }
        ],
        position: 'absolute',
        top: 0,
        tintColor: '#B11B1B'
    },
    menu: {
        position: 'absolute',
        bottom: '30%',
        right: 25,
        paddingLeft: 20,
        borderStartWidth: 3,
        borderColor: 'white'
    },
    randomNumber: {
        position: 'absolute',
        left: 20,
        bottom: '5%'
    }
});

export default Menu;