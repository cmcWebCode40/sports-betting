import React from 'react';
import { makeStyles, createStyles, Box } from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import { Link } from 'react-router-dom';
import { ITheme } from '../../themes/theme';
import { TAppBookMaker } from '../../models/bookmarkers.model';
import { useAppSelector } from '../../provider/hooks/hooks';

const useStyles = makeStyles((theme: ITheme) =>
  createStyles({
    root: {
      padding: theme.spacing(1, 0.3),
    },
    tableBody: {
      textTransform: 'capitalize',
      backgroundColor: theme.palette.veryLightPink.main,
    },
    box: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& > *': {
        margin: theme.spacing(0.3, 0.7),
      },
    },
    tableHead: {
      margin: '16px 320px 6px 51px',
      fontSize: '16px',
      textAlign: 'center',
      color: theme.palette.grayishBrown.main,
    },
    bookmarkerLogo: {
      width: '150px',
      height: '40px',
      margin: ' 0 29px 2px 0',
      padding: '9px 17px 10px',
      borderRadius: '2px',
    },
    title: {
      height: '25px',
      margin: ' 7px 108px 10px 29px',
      fontSize: theme.typography.h4.fontSize,
      color: theme.palette.grayishBrown.main,
    },
    rating: {
      color: theme.palette.grayishBrown.main,
    },
    ratingValue: {
      margin: '-9px 0px 0px 24px',
      fontSize: theme.typography.h4.fontSize,
      fontWeight: 600,
      textAlign: 'center',
      color: '#2f353d',
    },
    currencyValue: {
      margin: '0px 15px',
      fontSize: theme.typography.h4.fontSize,
      textAlign: 'center',
      color: '#2f353d',
    },
    websiteLink: {
      width: ' 170px',
      height: '30px',
      margin: '10px 0px 5px 0px',
      borderRadius: ' 3px',
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 'bold',
    },
    buttonCaptionText: {
      margin: '5px 45px',
      fontSize: theme.typography.h6.fontSize,
      fontWeight: 'bold',
      fontStyle: 'italic',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.white,
    },
  }),
);

const BookmarkerList = (): JSX.Element => {
  const classes = useStyles();
  const { oddsBugBookmakers } = useAppSelector((state) => state.bookmarkers);

  return (
    <TableContainer className={classes.root}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" />
            <TableCell padding="default" align="left" />
            <TableCell align="justify" />
            <TableCell align="justify" className={classes.tableHead}>
              Percent
            </TableCell>
            <TableCell align="justify" className={classes.tableHead}>
              Deposit
            </TableCell>
            <TableCell align="justify" className={classes.tableHead}>
              Bonus
            </TableCell>
            <TableCell align="justify" />
          </TableRow>
        </TableHead>
        <Box component="tbody" borderRadius={6} boxShadow={3} className={classes.tableBody}>
          {oddsBugBookmakers.map((item: TAppBookMaker) => (
            <TableRow key={item.id}>
              <TableCell className={classes.title} align="left" component="th" scope="row">
                <Link className={classes.link} to={`/bookmakers/${item.slug}`}>
                  <span className={classes.bookmarkerLogo}>
                    <img height="40" src={item.logo} alt={item.name} />
                  </span>
                </Link>
              </TableCell>
              <TableCell className={classes.title}>{item.name}</TableCell>
              <TableCell align="right">
                <Rating name="read-only" className={classes.rating} value={2.5} readOnly />
                <span className={classes.ratingValue}> 3.5</span>
              </TableCell>
              <TableCell align="center" className={classes.currencyValue}>
                100
              </TableCell>
              <TableCell align="center" className={classes.currencyValue}>
                {item?.deposit[0]?.currency} {item?.deposit[0]?.min}
              </TableCell>
              <TableCell align="center" className={classes.currencyValue}>
                $25
              </TableCell>
              <TableCell align="right">
                <Button
                  variant="contained"
                  className={classes.websiteLink}
                  size="small"
                  target="_blanck"
                  href={item.registrationLink}
                  color="primary"
                >
                  GO TO WEBSITE
                </Button>
                <br />
                <Typography
                  className={classes.buttonCaptionText}
                  variant="overline"
                  color="primary"
                >
                  WIN BONUS!
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </Box>
      </Table>
    </TableContainer>
  );
};

export default BookmarkerList;
