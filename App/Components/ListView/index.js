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
import { compose, withHandlers } from 'recompose';
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

const ListRenderer = ({ items, ItemRenderer, onSwipe }) => (
  <View style={styles.listContainer}>
    <SwipeListView
      data={items}
      keyExtractor={({ id }) => id}
      renderItem={({ index, item }) => (
        <ItemRenderer
          {...item}
          index={index}
        />
      )}
      renderHiddenItem={() => <View />}
      ItemSeparatorComponent={Divider}
      rightOpenValue={-screenWidth}
      onSwipeValueChange={onSwipe}
    />
  </View>
);

const ListView = ({
  items,
  ItemRenderer,
  buttons,
  onSwipe,
}) => (
  <LinearGradient colors={bgGradient} style={styles.linearGradient}>
    <ListRenderer
      items={items}
      ItemRenderer={ItemRenderer || DefaultRowRenderer}
      onSwipe={onSwipe}
    />
    <ButtonBar
      buttons={buttons}
    />
  </LinearGradient>
);

export default compose(
  withHandlers({
    onSwipe: ({ onDeleteItem }) => ({ key, value }) => {
      if (value <= -screenWidth && onDeleteItem) {
        onDeleteItem(key);
      }
    },
  }),
)(ListView);
