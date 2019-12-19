import React, { Component } from 'react';
import { View, Image, Text, TouchableHighlight } from 'react-native';

const ImageItem = ({image, id, userName, showImage}) => (


    <TouchableHighlight  onPress={()=>{ showImage(id) }}>
        <View style={ { marginVertical: 15 } }>

            <Image style={ { width: 180, height: 180 } } source={ { uri: image} } />
            <Text style={ { fontSize: 18, marginHorizontal: 3 } }>{userName}</Text>
        </View>
    </TouchableHighlight >


)
export default ImageItem