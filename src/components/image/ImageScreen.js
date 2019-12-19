import React, { Component } from 'react';
import { View, Button, Text, Image, StyleSheet } from 'react-native';
import { connect } from "react-redux";
import * as IamgeActions from './reducer';
import PropTypes from "prop-types";


class ImageScreen extends Component {
    static navigationOptions = {
        title: 'Image',
    };
    state = {};

    componentDidMount = () => {
        const id = this.props.navigation.getParam('imageId');
        this.props.getImage(id);
    };

    render() {
        const loading = (
            <View style={ { alignItems: 'center', marginTop: 100 } }><Text style={ { fontSize: 25 } }>Loading...</Text></View>
        )
        const errorMes = (
            <View style={ { alignItems: 'center', marginTop: 100 } }><Text style={ { fontSize: 30, color: 'red' } }>Error!!!</Text></View>
        )
        const { navigate } = this.props.navigation;
        const { imageData, isLoading, error } = this.props;
        // console.log("imageData", imageData)
        let styles = StyleSheet.create({
            canvas: {
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }
        })
        // console.log("imageData.urls.full ", imageData.full)
        return (
            isLoading ? loading : (
                error ? errorMes : (
                    // <View style={ { flex: 1, alignItems: 'center', justifyContent: 'center' } }>
                        <Image style={ styles.canvas } source={ { uri: imageData.full } }></Image>
                    // </View>
                ))
        );
    }
}

const mapStateToProps = ({ image }) => {
    return {
        imageData: image.data,
        isLoading: image.loading,
        error: image.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getImage: (id) => {
            dispatch(IamgeActions.getImage(id));
        }
    }
}

ImageScreen.PropTypes = {
    imageData: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired,
    getImage: PropTypes.func.isRequired,
}


export default connect(mapStateToProps, mapDispatchToProps)(ImageScreen);