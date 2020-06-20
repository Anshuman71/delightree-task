import React, {useState, useCallback} from 'react';

import {View, StyleSheet} from 'react-native';
import {deviceWidth} from '../utils/constants';

import ListItem from './ListItem';

const DEFAULT_HEIGHT = 60;

function ExpandableGroup({children, main}) {
  const [expandedHeight, setExpandedHeight] = useState(DEFAULT_HEIGHT);
  const [minHeight, setMinHeight] = useState('auto');
  const [isOpen, setIsOpen] = useState(0);
  const onLayout = useCallback(
    event => {
      const newHeight = event.nativeEvent.layout.height;
      if (newHeight > DEFAULT_HEIGHT && newHeight !== expandedHeight) {
        setExpandedHeight(newHeight);
        setMinHeight(DEFAULT_HEIGHT);
        setIsOpen(0);
      }
    },
    [expandedHeight],
  );

  return (
    <View
      onLayout={onLayout}
      style={{
        height: isOpen ? expandedHeight : minHeight,
        overflow: 'hidden',
      }}>
      <ListItem
        data={main}
        onExpand={() => setIsOpen(!isOpen)}
        isGroup
        isOpen={isOpen}
      />
      <View
        style={{
          paddingLeft: deviceWidth * 0.1 + 10,
        }}>
        {children}
      </View>
    </View>
  );
}

export default ExpandableGroup;
