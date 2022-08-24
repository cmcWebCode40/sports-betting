import React, { useEffect } from 'react';
import axios from 'axios';
import { createStyles, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../../provider/hooks/hooks';

const useStyles = makeStyles(() =>
  createStyles({
    root: {},
    header: {
      margin: '14px 0 33px 0',
      color: '#4a4a4a',
    },
    rectangle: {
      margin: '8px 0 27px',
      padding: '16px 18px 24px 29px',
      backgroundColor: '#f0f0f0',
    },
  }),
);

const PriPoli = (): JSX.Element => {
  const classes = useStyles();
  const language = useAppSelector((state) => state.bookmarkers.selectedLanguage.code);
  const pathToTranslation = 'footer_section';
  const { t } = useTranslation();

  const [ppContent, setppContent] = React.useState<any>([]);
  useEffect(() => {
    async function getContent() {
      const res = await axios.get(
        `${process.env.REACT_APP_API_BASE_URI}/privacy-policy?lng=${language}`,
      );
      const resData = res.data?.data;
      setppContent(resData);
    }
    getContent();
  }, [language]);

  return (
    <>
      <div className={classes.header}>
        <h1>{t(`${pathToTranslation}.privacy_policy_text`)}</h1>
      </div>
      <div className={classes.rectangle}>
        <p>{ppContent.text}</p>
      </div>
    </>
  );
};

export default PriPoli;
