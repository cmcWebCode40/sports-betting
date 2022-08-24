import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDepositStyles } from '../styles/bookmakers-details.styles';
import { TDeposit } from '../../../models/bookmarkers.model';
import genRandomId from '../../../helpers/gen-random-Id';

interface IDeposits {
  deposit: TDeposit[];
}
const Deposits = ({ deposit }: IDeposits): JSX.Element => {
  const classes = useDepositStyles();

  return (
    <TableContainer className={classes.root}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHead}>Payment Method</TableCell>
            <TableCell className={classes.tableHead}>min. Deposit</TableCell>
            <TableCell className={classes.tableHead}>Max. Deposit</TableCell>
            <TableCell className={classes.tableHead}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {deposit.map((row) => (
            <TableRow key={genRandomId()}>
              <TableCell className={classes.firstItem} align="left" component="th" scope="row">
                {row.paymentMethod}
              </TableCell>
              <TableCell className={classes.title} align="left">
                {row.min}
              </TableCell>
              <TableCell className={classes.title} align="left">
                {row.max}
              </TableCell>
              <TableCell className={classes.title} align="left">
                {row.duration}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Deposits;
