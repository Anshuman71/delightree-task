import React, {useState, useCallback} from 'react';

import {View, StyleSheet} from 'react-native';
import {deviceWidth} from '../utils/constants';

import ListItem from './ListItem';

const DEFAULT_HEIGHT = 60;

const styles = StyleSheet.create({
  children: {
    paddingLeft: deviceWidth * 0.1 + 10,
    paddingBottom: 20,
  },
});

function ExpandableGroup({children, main}) {
  const [minHeight, setMinHeight] = useState(DEFAULT_HEIGHT);
  const [isOpen, setIsOpen] = useState(0);

  const onSublistLayout = useCallback(event => {
    const newHeight = event.nativeEvent.layout.height;
    setMinHeight(newHeight);
  }, []);

  return (
    <View
      style={{
        height: isOpen ? minHeight + DEFAULT_HEIGHT : DEFAULT_HEIGHT,
        overflow: 'hidden',
      }}>
      <ListItem
        data={main}
        onExpand={() => setIsOpen(!isOpen)}
        isGroup
        isOpen={isOpen}
      />
      <View onLayout={onSublistLayout} style={styles.children}>
        {children}
      </View>
    </View>
  );
}

export default ExpandableGroup;
