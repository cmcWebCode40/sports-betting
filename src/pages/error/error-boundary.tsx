/* eslint-disable prettier/prettier */
import React from 'react';
import PageError from './page-error';

type IError = string | null;

type StateProps = {
  errorInfo: IError;
};
type ErrorBoundaryProps = {
  children: React.ReactElement;
};
const bgColor ='linear-gradient(to right,#1e68c0 12%, #2b7d98 59%, #369074 100%)';
class ErrorBoundary extends React.Component<ErrorBoundaryProps, StateProps> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { errorInfo: null };
  }

  componentDidCatch(errorInfo: never): void {
    // Catch errors in any components below and re-render with error message
    this.setState({
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  render(): JSX.Element {
    const { errorInfo } = this.state;
    const { children } = this.props;
    if (errorInfo) {
      // Error path
      return (
         <PageError
         styles={{
           background:bgColor,
     
         }}
        title=" Something Went Wrong "
        link="/"
        linkText="Please go to home page"
        content="May be there is a network connection fail. Please try again later."
  />
      );
    }
    // Normally, just render children
    return children;
  }
}

export default ErrorBoundary;
