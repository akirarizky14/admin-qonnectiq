import { useEffect, useState,useMemo } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import EditIcon from '@mui/icons-material/Edit';
import { Dialog, DialogTitle, DialogContent, DialogActions,TextField,Button } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
const headCells = [
  { id: 'edit', numeric: false, disablePadding: true, label: 'Edit' },
  { id: 'id', numeric: false, disablePadding: true, label: 'User ID' },
  { id: 'full_name', numeric: false, disablePadding: true, label: 'Full Name' },
  { id: 'nick_name', numeric: false, disablePadding: false, label: 'Nick Name' },
  { id: 'gender', numeric: false, disablePadding: false, label: 'Gender' },
  { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
  { id: 'born', numeric: false, disablePadding: false, label: 'Born' },
  { id: 'job_positions', numeric: false, disablePadding: false, label: 'Job Position' },
  { id: 'job_industries', numeric: false, disablePadding: false, label: 'Job Industry' },
  { id: 'roles', numeric: false, disablePadding: false, label: 'Role' },
  { id: 'created', numeric: false, disablePadding: false, label: 'Created' },
  { id: 'photos ', numeric: false, disablePadding: false, label: 'Photos' },
  { id: 'isEmailVerified', numeric: false, disablePadding: false, label: 'Email Verification' },
  { id: 'countries', numeric: false, disablePadding: false, label: 'Country' },
  { id: 'provinces', numeric: false, disablePadding: false, label: 'Province' },
  { id: 'cities', numeric: false, disablePadding: false, label: 'City' },
  { id: 'district', numeric: false, disablePadding: false, label: 'District' },
  { id: 'otp', numeric: false, disablePadding: false, label: 'OTP' }
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

function EnhancedTableToolbar(props) {
  const { numSelected, selected, setUsers, users, setSelected } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('No token found');
      }
      const selectedUserId = selected[0];
      const response = await fetch(`http://localhost:5000/v1/api/superadmin/users/${selectedUserId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        setSnackbarOpen(true);
      }
      const updatedUsers = users.filter(user => user._id !== selectedUserId);
      setUsers(updatedUsers);
      setSelected([]);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },  
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      <Snackbar
        open={snackbarOpen} // Atur properti open berdasarkan state
        autoHideDuration={6000}
        message="You Can't delete all user"
      />
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Users
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  selected: PropTypes.array.isRequired,
  setUsers: PropTypes.func.isRequired,
  users: PropTypes.array.isRequired,
};

export default function TableCategories() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('full_name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editUser, setEditUser] = useState({
    email: '',
    full_name: '',
    nick_name: '',
    gender: '',
    password: '',
    born: '',
    ads: '',
    job_positions: '',
    job_industries: '',
    countries: '',
    provinces: '',
    cities: '',
    district: '',
    roles: '',
    photos: '',
    otp: '',
    isEmailVerified: false,
  });
  const handleEditClick = (user) => {
    setEditUser({
      _id: user._id,
      email: user.email || '',
      full_name: user.full_name || '',
      nick_name: user.nick_name || '',
      gender: user.gender || '',
      password: user.password || '',
      born: user.born || '',
      ads: user.ads || '',
      job_positions: user.job_positions || '',
      job_industries: user.job_industries || '',
      countries: user.countries || '',
      provinces: user.provinces || '',
      cities: user.cities || '',
      district: user.district || '',
      roles: user.roles || '',
      photos: user.photos || '',
      otp: user.otp || '',
      isEmailVerified: user.isEmailVerified || false,
    });
    setIsEditOpen(true);
  };

  const handleEditClose = () => {
    setIsEditOpen(false);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditUser({ ...editUser, [name]: value });
  };
  
  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('No token found');
      }
      const response = await fetch(`http://localhost:5000/v1/api/superadmin/users/${editUser._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editUser),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const updatedUser = await response.json();
      const updatedUsers = users.map(user => user._id === updatedUser._id ? updatedUser : user);
      setUsers(updatedUsers);
      setIsEditOpen(false);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          throw new Error('No token found');
        }
        const response = await fetch('http://localhost:5000/v1/api/superadmin/users',{
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ?  'desc'  : 'asc');
    setOrderBy(property);
  };
  // Fungsi perbandingan untuk sorting data
  const getComparator = (order, orderBy) => {
    return order === 'desc'
        ? (a, b) => descendingComparator(a[orderBy], b[orderBy])
        : (a, b) => -descendingComparator(a[orderBy], b[orderBy]);
  };

  const descendingComparator = (a, b) => {
    if (b < a) {
        return -1;
    }
    if (b > a) {
        return 1;
    }
    return 0;
  };
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = users.map((user) => user.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }
  
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - users.length) : 0;

  const visibleRows = useMemo(
    () =>
      stableSort(users, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [order, orderBy, page, rowsPerPage, users],
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar 
          setSelected={setSelected}
          numSelected={selected.length} 
          selected={selected} 
          setUsers={setUsers} 
          users={users}
        />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={users.length}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const isItemSelected = isSelected(row._id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row._id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row._id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      <IconButton onClick={() => handleEditClick(row)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="left">{row._id}</TableCell>
                    <TableCell component="th" id={labelId} scope="row" padding="none">
                      {row.full_name}
                    </TableCell>
                    <TableCell align="left">{row.nick_name}</TableCell>
                    <TableCell align="left">{row.gender}</TableCell>
                    <TableCell align="left">{row.email}</TableCell>
                    <TableCell align="left">
                      {row.born ? new Date(row.born).toLocaleDateString('en-CA') : ''}
                    </TableCell>
                    <TableCell align="left">{row.job_positions}</TableCell>
                    <TableCell align="left">{row.job_industries}</TableCell>
                    <TableCell align="left">{row.roles}</TableCell>
                    <TableCell align="left">
                      {new Date(row.created).toLocaleString('en-CA', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit',
                      })}
                    </TableCell>
                    <TableCell align="left">{row.photos}</TableCell>
                    <TableCell align="left">{row.isEmailVerified ? "True" : "False"}</TableCell>
                    <TableCell align="left">{row.countries}</TableCell>
                    <TableCell align="left">{row.provinces}</TableCell>
                    <TableCell align="left">{row.cities}</TableCell>
                    <TableCell align="left">{row.district}</TableCell>
                    <TableCell align="left">{row.otp}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={9} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      {isEditOpen && (
        <Dialog open={isEditOpen} onClose={handleEditClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
        <Box component="form" onSubmit={handleEditSubmit} sx={{ m: 2 }}>
          <Typography variant="h6">Edit User</Typography>
          <TextField
            name="email"
            label="Email"
            value={editUser.email}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="full_name"
            label="Full Name"
            value={editUser.full_name}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="nick_name"
            label="Nick Name"
            value={editUser.nick_name}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="gender"
            label="Gender"
            value={editUser.gender}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={editUser.password}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="born"
            label="Born"
            type="date"
            value={editUser.born}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            name="ads"
            label="Ads"
            value={editUser.ads}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="job_positions"
            label="Job Positions"
            value={editUser.job_positions}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="job_industries"
            label="Job Industries"
            value={editUser.job_industries}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="countries"
            label="Countries"
            value={editUser.countries}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="provinces"
            label="Provinces"
            value={editUser.provinces}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="cities"
            label="Cities"
            value={editUser.cities}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="district"
            label="District"
            value={editUser.district}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="roles"
            label="Roles"
            value={editUser.roles}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="photos"
            label="Photos"
            value={editUser.photos}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <TextField
            name="otp"
            label="OTP"
            value={editUser.otp}
            onChange={handleEditChange}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            label="Email Verification"
            control={
              <Switch
                name="isEmailVerified"
                color="primary"
                checked={editUser.isEmailVerified}
                onChange={(event) => setEditUser({ ...editUser, isEmailVerified: event.target.checked })}
              />
            }
          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>Cancel</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
      )}
    </Box>
  );
}