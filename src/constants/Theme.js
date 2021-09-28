import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const SIZES = {
    width,
    height
};

export const FONTS = {
    bold: { fontFamily: 'Kanit-Bold' },
    regular: { fontFamily: 'Kanit-Regular' }
}

export default {
    SIZES,
    FONTS
}