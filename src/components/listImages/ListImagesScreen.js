import React, { Component } from 'react';
import { View, Button, Text, Image, ScrollView } from 'react-native';
import * as getListImagesActions from './reducer';
import { connect } from 'react-redux';
import ImageItem from "./ImageItem";
import PropTypes from "prop-types";

class ListImagesScreen extends Component {
    static navigationOptions = {
        title: 'List Images',
    };

    state = {};
    componentDidMount() {

        this.props.getListImages();
    }

    showImage = (id)=>{
        this.props.navigation.navigate('Image', {
            imageId: `${id}`,
        });
    }

    render() {
        const { navigate } = this.props.navigation;
        const { listImages, isLoading, error } = this.props;
        const MapListImages = listImages.map(item => {
            return <ImageItem image={ item.urls.thumb } id={item.id} key={item.id} userName={ item.user.name } showImage={this.showImage} />
        });
        
        const loading = (
            <View style={ {alignItems: 'center', marginTop: 100} }><Text style={{fontSize: 25}}>Loading...</Text></View>
        )
        const errorMes = (
            <View style={ {alignItems: 'center', marginTop: 100 } }><Text style={{fontSize: 30, color: 'red'}}>Error!!!</Text></View>
        )

        return( 
            isLoading? loading:(
                error?errorMes:(
            <ScrollView >
                <View style={ { flexDirection: 'row', justifyContent: 'space-around', flexWrap: 'wrap' } }>
                    { MapListImages }
                </View>
            </ScrollView>))
        );
    }
}

const mapStateToProps = ({ listImages }) => {
    return {
        listImages: listImages.data,
        isLoading: listImages.loading,
        error: listImages.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        getListImages: () => {
            dispatch(getListImagesActions.getListImages());
        }
    }
}

ListImagesScreen.propTypes = {
    listImages: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    error: PropTypes.bool.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ListImagesScreen);