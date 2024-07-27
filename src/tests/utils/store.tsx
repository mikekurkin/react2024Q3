import type { RenderOptions } from '@testing-library/react';
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';

import type { AppStore, RootState } from '../../state/store';
import { setupStore } from '../../state/store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithStore(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
): ReturnType<typeof render> {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = extendedRenderOptions;

  const Wrapper = ({ children }: PropsWithChildren) => <Provider store={store}>{children}</Provider>;

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}
