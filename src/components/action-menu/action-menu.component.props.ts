import React from 'react';

export interface ActionMenuComponentProps {
  menuIndex: number;
  openMenuIndex?: number;
  openMenu: (value?: number) => void;
  menuComponent: React.ReactNode;
}
