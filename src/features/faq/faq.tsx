import React, { useEffect } from 'react';
import axios from 'axios';
import { Typography, createStyles, makeStyles } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
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
      margin: '33px 0 27px',
      padding: '36px 130px 51px',
      backgroundColor: '#f0f0f0',
    },
    accordionHeader: {
      fontSize: '22px',
      color: '#4a4a4a',
    },
    accordionHeaderExpanded: {
      fontSize: '22px',
      color: '#369074',
    },
    accordionTop: {
      marginTop: '36px',
    },
    answerText: {
      fontSize: '18px',
      color: '#4a4a4a',
      width: '870px',
    },
    iconExpanded: {
      margin: '15px 0 0 10px',
      color: '#369074',
    },
  }),
);

const Accordion = withStyles({
  root: {
    width: '910px',
    height: '100px',
    marginBottom: '11px',
    padding: '20px 0 0 0',
    border: 'solid 1px #4a4a4a',
    borderRadius: '4px',
  },
  expanded: {
    width: '910px',
    height: '220px',
    border: 'solid 1px #369074',
    borderRadius: '4px',
  },
})(MuiAccordion);

const Faq = (): JSX.Element => {
  const classes = useStyles();
  const language = useAppSelector((state) => state.bookmarkers.selectedLanguage.code);
  const pathToTranslation = 'footer_section';
  const { t } = useTranslation();

  const [expanded, setExpanded] = React.useState<string | boolean>(false);
  const [faqContent, setfaqContent] = React.useState<any>([]);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<Record<string, never>>, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  useEffect(() => {
    async function getContent() {
      const res = await axios.get(`${process.env.REACT_APP_API_BASE_URI}/faq?lng=${language}`);
      const resData = res.data?.data;
      setfaqContent(resData);
    }
    getContent();
  }, [language]);

  return (
    <>
      <div className={classes.header}>
        <h1>{t(`${pathToTranslation}.frequently_asked_questions_text`)}</h1>
      </div>
      <div className={classes.rectangle}>
        {faqContent.map((faq: any) => (
          <div key={faqContent.id}>
            <Accordion
              expanded={expanded === `panel${faq.id}`}
              onChange={handleChange(`panel${faq.id}`)}
              className={classes.accordionTop}
            >
              <AccordionSummary expandIcon={expanded !== `panel${faq.id}` && <AddIcon />}>
                <Typography
                  className={
                    expanded === `panel${faq.id}`
                      ? classes.accordionHeaderExpanded
                      : classes.accordionHeader
                  }
                >
                  {faq.question}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography className={classes.answerText}>{faq.answer}</Typography>
                <RemoveIcon className={classes.iconExpanded} />
              </AccordionDetails>
            </Accordion>
          </div>
        ))}
      </div>
    </>
  );
};

export default Faq;
