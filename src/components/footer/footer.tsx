/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ITheme } from '../../themes/theme';
import LanguageSelector from '../header/components/langauge-selector';
import { useAppSelector } from '../../provider/hooks/hooks';
import HeadlineModal from '../../pages/contact-us/contact-us-modal';
import { ContactUsData } from '../../logic/admin/webcontent.logic';
import LogoIcon from '../../assets/icons/oddsbug_logotype-01.svg';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.main,
      margin: theme.spacing(4, 0, 0, 0),
      height: '250px',
      padding: '51px 50px 50px 40px',

      boxShadow: '0 -1px 2px 0 #34312d',
      [theme.breakpoints.down('sm')]: {
        padding: '8px 10px 10px 10px',
      },

      '& ul': {
        listStyle: 'none',
        textTransform: 'capitalize',
        '& li': {
          color: theme.palette.white,
          margin: '5px 0',
          fontSize: '14px',
          '& a': {
            color: theme.palette.white,
            textDecoration: 'none',
          },
        },
      },
    },
    grid: {
      '& > *': {
        margin: '30px',
        [theme.breakpoints.down('sm')]: {
          margin: '10px',
        },
      },
    },
    img: {
      height: 60,
      margin: '-0.3rem 0rem 0.3rem -2rem',
    },
  }),
);

interface INavLinks {
  title: string;
  path: string;
}
export const data2 = (selectedSport: string): INavLinks[] => {
  return [
    {
      title: 'home',
      path: `/sport/${selectedSport}`,
    },
    {
      title: 'bet_text',
      path: `/bet/sport/${selectedSport}`,
    },
    {
      title: 'live_matches',
      path: `/live-scores/sport/${selectedSport}`,
    },
    {
      title: 'live_bet',
      path: `/live-bets/sport/${selectedSport}`,
    },
    { title: 'tips_text', path: '/tip' },
  ];
};

export const data3 = (selectedSport: string): INavLinks[] => {
  return [
    { title: 'matches_text', path: `/sport/${selectedSport}` },
    { title: 'bettings_tools_text', path: '/betting-tools-dashboard' },
    { title: 'bookmarks_text', path: '/bookmakers' },
  ];
};

const data4 = [
  { title: 'frequently_asked_questions_text', path: '/faq' },
  { title: 'privacy_policy_text', path: '/privacy-policy' },
  { title: 'terms_conditions_text', path: '/terms-conditions' },
];
const data5 = [{ title: 'widgets_text', path: '/widgets' }];

type TMethod = 'get' | 'patch' | 'put' | 'delete' | 'post';

export const Footer = (): JSX.Element => {
  const classes = useStyles();
  const { activeSport } = useAppSelector((state) => state.bookmarkers);
  const { t } = useTranslation();

  const [open, setOpen] = useState(false);
  const [action, setAction] = useState<TMethod>('post');
  const [contactUsItem, setContactUsItem] = useState<ContactUsData>({
    subject: '',
    email: '',
    message: '',
  });

  const openModal = () => {
    setAction('post');
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <Grid container className={classes.grid}>
        {open && (
          <HeadlineModal
            action={action}
            open={open}
            setOpen={setOpen}
            contactUsItem={contactUsItem}
            setContactUsItem={setContactUsItem}
          />
        )}
        <Grid item>
          <Link to="/">
            <img src={LogoIcon} className={classes.img} alt="company" />
          </Link>
          <div
            style={{
              margin: '-1rem 1.2rem 0 0rem',
            }}
          >
            <LanguageSelector />
          </div>
        </Grid>
        <Grid item>
          <ul>
            {data2(activeSport.name).map((list) => (
              <li key={list.title}>
                <Link to={list.path}>{t(`footer_section.${list.title}`)}</Link>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item>
          <ul>
            {data3(activeSport.name).map((list) => (
              <li key={list.title}>
                <Link to={list.path}>{t(`footer_section.${list.title}`)}</Link>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item>
          <ul>
            {data4.map((list) => (
              <li key={list.title}>
                <Link to={list.path}>{t(`footer_section.${list.title}`)}</Link>
              </li>
            ))}
            <li key="contact">
              <Link
                to="#"
                onClick={() => {
                  openModal();
                }}
              >
                {t(`footer_section.contact_us_text`)}
              </Link>
            </li>
          </ul>
        </Grid>
        <Grid item>
          <ul>
            {data5.map((list) => (
              <li key={list.title}>
                <Link to={list.path}>{t(`footer_section.${list.title}`)}</Link>
              </li>
            ))}
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default Footer;
