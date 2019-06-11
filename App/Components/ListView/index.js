import React from 'react';
import { Dimensions, Text, View, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import NavigationBar from '../../Components/NavigationBar';
import ButtonBar from '../../Components/ButtonBar';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  listContainer: {
    height: screenHeight - 80,
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
      keyExtractor={({ label }) => label}
      renderItem={({ item }) => <ItemRenderer {...item} />}
    />
  </View>
);

const ListView = ({ title, navButtons, items, ItemRenderer, buttons }) => (
  <View>
    <NavigationBar
      title={title}
      navButtons={navButtons}
    />
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