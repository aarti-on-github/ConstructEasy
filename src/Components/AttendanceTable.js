import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable({data}) {
  console.log(data);
  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Attendance Date</TableCell>
            <TableCell align="right">Worker Name</TableCell>
            <TableCell align="right">Address</TableCell>
            <TableCell align="right">Phone no.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {new Date(row.date).toLocaleDateString()}
              </TableCell>
              <TableCell align="right">{row.worker.name}</TableCell>
              <TableCell align="right">{row.worker.address}</TableCell>
              <TableCell align="right">{row.worker.contact}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
