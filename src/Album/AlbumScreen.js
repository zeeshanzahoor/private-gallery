import React from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, Image, TouchableOpacity } from 'react-native';
import { GContainer } from '../Components';
import { GHeader } from "../Components";
import Constants from '../Constants';
import withRedux from '../Store/withRedux';

const data = [
    { key: 'A' }, { key: 'B' }, { key: 'C' }, { key: 'D' }, { key: 'E' }, { key: 'F' }, { key: 'G' }, { key: 'H' }, { key: 'I' }, { key: 'J' },
];

const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
        data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
        numberOfElementsLastRow++;
    }
    return data;
};

const numColumns = 4;
class AlbumScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const title = navigation.state.params.Title;
        return {
            title,
            headerBackTitle:null,
            
        };
    };
    renderItem = ({ item, index }) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]} />;
        }
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => {
                this.props.navigation.navigate("Swiper");
            }} style={styles.item}>
                <Image style={styles.itemImage} resizeMode="cover" source={require('../../img/momina.jpg')}></Image>
            </TouchableOpacity>
        );
    };
    render() {
        return (
            <GContainer noPadding>
                <FlatList
                    data={formatData(data, numColumns)}
                    style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={numColumns} />
            </GContainer>
        );
    }
}

export default withRedux(AlbumScreen, { title: "Zee" });
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / numColumns, // approximate a square
    },
    itemInvisible: {
        backgroundColor: 'transparent',
    },
    itemImage: {
        flex: 1,
        width: '100%'
    },
});