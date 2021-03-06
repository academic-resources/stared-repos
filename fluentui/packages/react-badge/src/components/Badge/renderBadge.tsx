import * as React from 'react';
import { getSlotsCompat } from '@fluentui/react-utilities';
import { badgeShorthandPropsCompat } from './useBadge';
import type { BadgeState } from './Badge.types';

export const renderBadge = (state: BadgeState) => {
  const { slots, slotProps } = getSlotsCompat(state, badgeShorthandPropsCompat);

  return (
    <slots.root {...slotProps.root}>
      {state.iconPosition === 'before' && <slots.icon {...slotProps.icon} />}
      {state.children}
      {state.iconPosition === 'after' && <slots.icon {...slotProps.icon} />}
    </slots.root>
  );
};
