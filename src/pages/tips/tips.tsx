import React from 'react';
import PageError from '../error/page-error';

const TipsPage = (): JSX.Element => {
  return (
    <PageError
      styles={{
        width: '100%',
      }}
      hideHeader
      title="Page Under Construction"
      link="/"
      linkText="Please go to home page"
      content="This page will be available on our next release"
    />
  );
};

export default TipsPage;
