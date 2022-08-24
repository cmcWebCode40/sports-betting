import { render } from '@testing-library/react';

import { ActionMenuComponent } from './action-menu.component';

describe('ActionMenuComponent', () => {
  it('should render without crashing', () => {
    const { container } = render(
      <ActionMenuComponent
        menuIndex={0}
        openMenu={jest.fn}
        menuComponent={<span data-testid="menu">Menu</span>}
      />,
    );

    expect(container).toBeDefined();
  });

  describe('Action menu', () => {
    it('should not be open when menuIndex and openMenuIndex are not equal', () => {
      const { queryByTestId } = render(
        <ActionMenuComponent
          menuIndex={0}
          openMenu={jest.fn}
          menuComponent={<span data-testid="menu">Menu</span>}
        />,
      );

      expect(queryByTestId('menu')).not.toBeInTheDocument();
    });

    it('should be open when menuIndex and openMenuIndex are equal', () => {
      const { getByTestId } = render(
        <ActionMenuComponent
          menuIndex={0}
          openMenuIndex={0}
          openMenu={jest.fn}
          menuComponent={<span data-testid="menu">Menu</span>}
        />,
      );

      expect(getByTestId('menu')).toBeInTheDocument();
    });
  });
});
