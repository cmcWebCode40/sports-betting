/* eslint-disable @typescript-eslint/ban-types */
declare module 'react-phone-input-2' {
  import React from 'react';

  interface ICountryData {
    name: string;
    dialCode: string;
    countryCode: string;
    format: string;
  }

  interface IStyle {
    containerClass?: string;
    inputClass?: string;
    buttonClass?: string;
    dropdownClass?: string;
    searchClass?: string;

    containerStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    buttonStyle?: React.CSSProperties;
    dropdownStyle?: React.CSSProperties;
    searchStyle?: React.CSSProperties;
  }

  interface IPhoneInputEventsProps {
    onChange?(value: string, data: ICountryData): void;
    onFocus?(event: React.FocusEvent<HTMLInputElement>, data: ICountryData | {}): void;
    onBlur?(event: React.FocusEvent<HTMLInputElement>, data: ICountryData | {}): void;
    onClick?(event: React.MouseEvent<HTMLInputElement>, data: ICountryData | {}): void;
    onKeyDown?(event: React.KeyboardEvent<HTMLInputElement>): void;
  }

  export interface IPhoneInputProps extends IPhoneInputEventsProps, IStyle {
    country?: string;
    value?: string;
    onlyCountries?: string[];
    preferredCountries?: string[];
    excludeCountries?: string[];
    placeholder?: string;
    searchPlaceholder?: string;
    // eslint-disable-next-line @typescript-eslint/ban-types
    inputProps?: object;

    autoFormat?: boolean;
    disabled?: boolean;
    disableDropdown?: boolean;
    disableCountryCode?: boolean;
    enableAreaCodes?: boolean;
    enableTerritories?: boolean;
    enableLongNumbers?: boolean;
    countryCodeEditable?: boolean;
    enableSearch?: boolean;
    disableSearchIcon?: boolean;
  }
  const PhoneInput: React.FC<IPhoneInputProps>;
  export default PhoneInput;
}
