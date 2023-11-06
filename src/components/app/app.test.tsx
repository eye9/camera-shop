import { MemoryHistory, createMemoryHistory } from 'history';
import { withHistory, withStore } from '../../utils/mock-component';
import { App } from './app';
import { makeFakeStore } from '../../utils/mocks';
import { AppRoutes } from '../../const';
import { render, screen } from '@testing-library/react';

describe('Application Routing', () => {
  let mockHistory: MemoryHistory;

  beforeEach(() => {
    mockHistory = createMemoryHistory();
  });

  it('should render Catalog Page on "/"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    mockHistory.push(AppRoutes.Main);

    render(withStoreComponent);

    expect(
      screen.getByText(/Каталог фото- и видеотехники/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();
  });

  it('should render Busket Page on "/busket"', () => {
    const withHistoryComponent = withHistory(<App />, mockHistory);
    const { withStoreComponent } = withStore(
      withHistoryComponent,
      makeFakeStore()
    );

    mockHistory.push(AppRoutes.Busket);

    render(withStoreComponent);

    expect(screen.getByText(/Оформить заказ/i)).toBeInTheDocument();
  });

});
