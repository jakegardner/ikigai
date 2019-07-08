import React from 'react';
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import ButtonBar from '../ButtonBar';
import { isIphoneX } from '../../Common/util';

const { width: screenWidth, height: screenHeight } = Dimensions.get('screen');

const styles = StyleSheet.create({
  listContainer: {
    height: screenHeight - (isIphoneX ? 128 : 64),
    width: screenWidth,
  },
  rowContainer: {
    width: screenWidth,
    paddingLeft: 15,
    justifyContent: 'center',
    height: 50,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
  },
  rowLabel: {
    fontSize: 16,
  },
  underRow: {
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  deleteButton: {
    backgroundColor: '#FF0000',
    width: 75,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  underlayButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
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
    <SwipeListView
      useFlatList
      data={items}
      renderItem={({ index, item }) => <ItemRenderer {...item} index={index} />}
      renderHiddenItem={({ item }) => (
        <View style={styles.underRow}>
          <TouchableOpacity onPress={item.onDelete}>
            <View style={styles.deleteButton}>
              <Text style={styles.underlayButtonText}>Delete</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
      leftOpenValue={75}
      rightOpenValue={-150}
      disableRightSwipe
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
