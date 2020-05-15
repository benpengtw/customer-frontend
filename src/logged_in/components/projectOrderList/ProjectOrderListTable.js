import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Table, TableBody, TableCell, TablePagination, TableRow, withStyles } from '@material-ui/core'
import EnhancedTableHead from '../../../shared/components/EnhancedTableHead'
import ColorfulChip from '../../../shared/components/ColorfulChip'
import unixToDateString from '../../../shared/functions/unixToDateString'
import HighlightedInformation from '../../../shared/components/HighlightedInformation'
import currencyPrettyPrint from '../../../shared/functions/currencyPrettyPrint'

const styles = (theme) => ({
  tableWrapper: {
    overflowX: 'auto',
    width: '100%',
  },
  blackBackground: {
    backgroundColor: theme.palette.primary.main,
  },
  contentWrapper: {
    padding: theme.spacing(3),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
    width: '100%',
  },
  dBlock: {
    display: 'block !important',
  },
  dNone: {
    display: 'none !important',
  },
  firstData: {
    paddingLeft: theme.spacing(3),
  },
})

const rows = [
  {
    id: 'title',
    numeric: false,
    label: '案件名稱',
  },
  {
    id: 'amount',
    numeric: false,
    label: '投資金額',
  },
  {
    id: 'totalAmount',
    numeric: false,
    label: '案件貸款總額',
  },
  {
    id: 'irr',
    numeric: false,
    label: '年化報酬率',
  },
  {
    id: 'endDate',
    numeric: false,
    label: '案件結束日期',
  },
]
const thousands_separators = (num) => {
  let num_parts = num
    .toFixed(2)
    .toString()
    .split('.')
  num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return num_parts.join('.')
}
const rowsPerPage = 25

function ProjectOrderListTable(props) {
  const { theme, classes, projectOrderList } = props
  const [page, setPage] = useState(0)

  const handleChangePage = useCallback(
    (_, page) => {
      setPage(page)
    },
    [setPage]
  )
  console.log('ppp', projectOrderList)
  if (projectOrderList.length > 0) {
    return (
      <div className={classes.tableWrapper}>
        <Table aria-labelledby="tableTitle">
          <EnhancedTableHead rowCount={projectOrderList.length} rows={rows} />
          <TableBody>
            {projectOrderList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((transaction, index) => (
              <TableRow hover tabIndex={-1} key={index}>
                <TableCell component="th" scope="row" className={classes.firstData}>
                  {transaction.title}
                </TableCell>
                <TableCell component="th" scope="row">
                  <ColorfulChip label={`${transaction.amount} USDT`} color={theme.palette.error.dark} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {thousands_separators(transaction.totalAmount / 10000)} 萬
                </TableCell>
                <TableCell component="th" scope="row">
                  8.5%
                </TableCell>
                <TableCell component="th" scope="row">
                  {transaction.endDate ? transaction.endDate.slice(0, 10) : ''}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={projectOrderList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={handleChangePage}
          classes={{
            select: classes.dNone,
            selectIcon: classes.dNone,
            actions: projectOrderList.length > 0 ? classes.dBlock : classes.dNone,
            caption: projectOrderList.length > 0 ? classes.dBlock : classes.dNone,
          }}
          labelRowsPerPage=""
        />
      </div>
    )
  }
  return (
    <div className={classes.contentWrapper}>
      <HighlightedInformation>No transactions received yet.</HighlightedInformation>
    </div>
  )
}

ProjectOrderListTable.propTypes = {
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  projectOrderList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default withStyles(styles, { withTheme: true })(ProjectOrderListTable)
