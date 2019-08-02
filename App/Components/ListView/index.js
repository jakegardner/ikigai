import React from 'react';
import {
  Dimensions,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SwipeListView } from 'react-native-swipe-list-view';
import ButtonBar from '../ButtonBar';
import { isIphoneX } from '../../Common/util';
import { defaultFont } from '../../Common/font';
import { bgGradient } from '../../Common/styles';

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
    backgroundColor: 'transparent',
  },
  rowLabel: {
    fontFamily: defaultFont,
    fontSize: 14,
    color: '#FFFFFF',
  },
  underRow: {
    backgroundColor: 'transparent',
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
    fontFamily: defaultFont,
    fontSize: 12,
    paddingTop: 2,
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  linearGradient: {
    flex: 1,
  },
  divider: {
    backgroundColor: '#505153',
    height: StyleSheet.hairlineWidth,
    width: screenWidth - 60,
  },
});

const Divider = () => (
  <View style={styles.divider} />
);

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
      renderItem={({ index, item }) => (
        <React.Fragment>
          <ItemRenderer {...item} index={index} />
          {index < items.length - 1 && <Divider />}
        </React.Fragment>
      )}
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
  <LinearGradient colors={bgGradient} style={styles.linearGradient}>
    <ListRenderer
      items={items}
      ItemRenderer={ItemRenderer || DefaultRowRenderer}
    />
    <ButtonBar
      buttons={buttons}
    />
  </LinearGradient>
);

export default ListView;
