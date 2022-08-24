import Resizer from 'react-image-file-resizer';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const resizeFile = (file: any) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      800,
      30,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'file',
    );
  });
