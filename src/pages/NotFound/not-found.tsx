import React from 'react';
import PageError from '../error/page-error';

const NotFound: React.FC = () => (
  <PageError
    title="Sorry!"
    link="/"
    linkText="RELOAD AGAIN"
    content="There is a network connection fail. Please try again later."
  />
);

export default NotFound;
