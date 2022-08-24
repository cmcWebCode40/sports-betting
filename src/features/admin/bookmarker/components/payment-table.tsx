import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import { DeleteForeverOutlined } from '@material-ui/icons';
import { IPayment } from '../../../../logic/admin/all-bookmarkers.logic';
import genRandomId from '../../../../helpers/gen-random-Id';

const useStyles = makeStyles({
  table: {},
  tableContainer: {
    margin: '1rem 0',
  },
});

type TData = {
  data: IPayment[];
  onDelete: (arg0: string) => void;
};

const PaymentTable = ({ data, onDelete }: TData): JSX.Element => {
  const classes = useStyles();
  return (
    <TableContainer className={classes.tableContainer} component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Payment</TableCell>
            <TableCell>Min</TableCell>
            <TableCell>Max</TableCell>
            <TableCell>Duration</TableCell>
            <TableCell>Currency</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: IPayment) => (
            <TableRow key={genRandomId()}>
              <TableCell component="th" scope="row">
                {row.paymentMethod}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.min}
              </TableCell>
              <TableCell align="right">{row.max}</TableCell>
              <TableCell align="right">{row.duration}</TableCell>
              <TableCell align="right">{row.currency}</TableCell>
              <TableCell align="right">
                <IconButton onClick={() => onDelete(row.id)}>
                  <DeleteForeverOutlined />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentTable;
