import React from 'react';
import {
  Dimensions,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import ButtonBar from '../ButtonBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  listContainer: {
    height: screenHeight - 128,
    width: screenWidth,
  },
  rowContainer: {
    width: screenWidth,
    paddingLeft: 15,
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFEF',
  },
  rowLabel: {
    fontSize: 16,
  },
});

const DefaultRowRenderer = ({ label, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.rowContainer}>
    <View>
      <Text style={styles.rowLabel}>{label}</Text>
    </View>
  </TouchableOpacity>
);

const ListRenderer = ({ items, ItemRenderer }) => (
  <View style={styles.listContainer}>
    <FlatList
      data={items}
      keyExtractor={({ id }) => id}
      renderItem={({ index, item }) => <ItemRenderer {...item} index={index} />}
    />
  </View>
);

const ListView = ({ items, ItemRenderer, buttons }) => (
  <View>
    <ListRenderer
      items={items}
      ItemRenderer={ItemRenderer || DefaultRowRenderer}
    />
    <ButtonBar
      buttons={buttons}
    />
  </View>
);

export default ListView;
