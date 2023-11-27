import { fireEvent, render, screen } from '@testing-library/react';
import {
  withHistory,
  withRouter,
  withStore,
} from '../../../../utils/mock-component';
import { makeFakeStore } from '../../../../utils/mocks';
import { CatalogFilter } from './catalog-filter';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import {
  FilterCategories,
  FilterCategory,
  FilterLevels,
  FilterType,
  FilterTypes,
} from '../../const';

describe('Component: CatalogFilter rendering', () => {
  it('should render properly', () => {
    const { withStoreComponent } = withStore(
      <CatalogFilter minPrice={0} maxPrice={100} />,
      makeFakeStore()
    );
    const preparedComponent = withRouter(withStoreComponent);

    render(preparedComponent);

    expect(screen.getByText('Сбросить фильтры')).toBeInTheDocument();
    expect(screen.getAllByRole('checkbox').length).toBe(9);
    FilterCategories.forEach((item) => {
      expect(screen.getByTestId(item.name)).toBeInTheDocument();
    });
    FilterTypes.forEach((item) => {
      expect(screen.getByTestId(item.name)).toBeInTheDocument();
    });
    FilterLevels.forEach((item) => {
      expect(screen.getByTestId(item.name)).toBeInTheDocument();
    });
  });

  it('should set default search params on reset button click', async () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      <CatalogFilter minPrice={0} maxPrice={100} />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    await userEvent.click(screen.getByRole('button'));

    expect(mockHistory.location.search).toMatch(
      'page=1&category=&level=&type='
    );
  });

  it('should set search params on category change', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      <CatalogFilter minPrice={0} maxPrice={100} />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    FilterCategories.forEach((item) => {
      fireEvent.click(screen.getByTestId(item.name));
      expect(mockHistory.location.search).toMatch(`category=${item.name}`);
    });
  });

  it('should set search params on type select for one type selected', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      <CatalogFilter minPrice={0} maxPrice={100} />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    FilterTypes.forEach((item) => {
      fireEvent.click(screen.getByTestId(item.name));
      expect(mockHistory.location.search).toMatch(`type=${item.name}`);
      fireEvent.click(screen.getByRole('button'));
    });
  });

  it('should set search params on type select for each type selected', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      <CatalogFilter minPrice={0} maxPrice={100} />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    FilterTypes.forEach((item) => {
      fireEvent.click(screen.getByTestId(item.name));
      expect(mockHistory.location.search).toMatch(`${item.name}`);
    });
  });

  it('should set search params on level select for one level selected', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      <CatalogFilter minPrice={0} maxPrice={100} />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);
    FilterLevels.forEach((item) => {
      fireEvent.click(screen.getByTestId(item.name));
      expect(mockHistory.location.search).toMatch(`level=${item.name}`);
      fireEvent.click(screen.getByRole('button'));
    });
  });

  it('should set search params on level select for each level selected', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      <CatalogFilter minPrice={0} maxPrice={100} />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    FilterLevels.forEach((item) => {
      fireEvent.click(screen.getByTestId(item.name));
      expect(mockHistory.location.search).toMatch(`${item.name}`);
    });
  });
});

describe('CatalogFilter interactions ', () => {
  it('should disable options on camera category selection', () => {
    const mockHistory = createMemoryHistory();
    const { withStoreComponent } = withStore(
      <CatalogFilter minPrice={0} maxPrice={100} />,
      makeFakeStore()
    );
    const preparedComponent = withHistory(withStoreComponent, mockHistory);

    render(preparedComponent);

    fireEvent.click(screen.getByTestId(FilterCategory.Video));
    expect(screen.getByTestId(FilterCategory.Photo)).toBeDisabled();
    expect(screen.getByTestId(FilterType.Film)).toBeDisabled();
    expect(screen.getByTestId(FilterType.Snapshot)).toBeDisabled();
  });
});
