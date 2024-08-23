import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Button ({ iconName, text, onPress, style, textStyle }:any){
    return (
        <TouchableOpacity onPress={onPress} style={[{ padding: 10, flexDirection: 'row', alignItems: 'center' }, style]}>
            {iconName && <FontAwesome name={iconName} size={24} color="black" style={{ marginRight: 5 }} />}
            {text && <Text style={textStyle}>{text}</Text>}
        </TouchableOpacity>
    );
};

