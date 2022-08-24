import React from 'react';
import Typography, { TypographyProps } from '@material-ui/core/Typography';
import Skeleton from '@material-ui/lab/Skeleton';
import genRandomId from '../../../helpers/gen-random-Id';

const variants = [
  'h1',
  'h3',
  'body1',
  'body1',
  'body1',
  'body1',
  'caption',
] as TypographyProps['variant'][];

export default function UserProfileSkeleton(): JSX.Element {
  return (
    <div>
      {variants.map((variant) => (
        <Typography component="span" key={genRandomId()} variant={variant}>
          <Skeleton />
        </Typography>
      ))}
    </div>
  );
}
