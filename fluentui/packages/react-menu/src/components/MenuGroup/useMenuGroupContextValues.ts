import * as React from 'react';
import type { MenuGroupContextValues, MenuGroupState } from './MenuGroup.types';

export function useMenuGroupContextValues(state: MenuGroupState): MenuGroupContextValues {
  const { headerId } = state;
  const menuGroup = React.useMemo(() => ({ headerId }), [headerId]);

  return { menuGroup };
}
