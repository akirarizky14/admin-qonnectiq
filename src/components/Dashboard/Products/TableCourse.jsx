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
import AddIcon from '@mui/icons-material/Add';

const headCells = [
  { id: 'edit', numeric: false, disablePadding: true, label: 'Edit' },
  { id: 'id', numeric: false, disablePadding: true, label: 'Course ID' },
  { id: 'title', numeric: false, disablePadding: true, label: 'Title' },
  { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
  { id: 'difficulty', numeric: false, disablePadding: false, label: 'Difficulty' },
  { id: 'cat_type', numeric: false, disablePadding: false, label: 'Category Type' },
  { id: 'price', numeric: false, disablePadding: false, label: 'Price' },
  { id: 'stars', numeric: false, disablePadding: false, label: 'Stars' },
  { id: 'file', numeric: false, disablePadding: false, label: 'File' },
  { id: 'created_at', numeric: false, disablePadding: false, label: 'Created' },
  { id: 'created_by', numeric: false, disablePadding: false, label: 'Created By' },
  { id: 'thumbnail', numeric: false, disablePadding: false, label: 'Thumbnail' },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
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
  rowCount: PropTypes.number.isRequired
};

function EnhancedTableToolbar(props) {
  const { numSelected, selected, setUsers, users, setSelected,handleCreateClick  } = props;
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const handleDelete = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('No token found');
      }
      const selectedUserId = selected[0];
      const response = await fetch(`http://localhost:5000/v1/api/superadmin/course/deleteCourseById/${selectedUserId}`, {
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
          Courses
        </Typography>
      )}
      <Tooltip title="Create">
        <IconButton onClick={handleCreateClick}>
          <AddIcon />
        </IconButton>
      </Tooltip>

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

export default function TableCourse() {
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('full_name');
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [users, setUsers] = useState([]);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newCategory, setNewCategory] = useState({
    name_cat: '',
    desc: ''
  });
  const handleCreateClick = () => {
    setIsCreateOpen(true);
  };
  
  const handleCreateClose = () => {
    setIsCreateOpen(false);
    setNewCategory({
      name_cat: '',
      desc: ''
    });
  };
  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({ ...newCategory, [name]: value });
  };
  const handleCreateSubmit = async (event) => {
    event.preventDefault();
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user || !user.token) {
        throw new Error('No token found');
      }
      const response = await fetch('http://localhost:5000/v1/api/superadmin/categories/postCat', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name_cat: newCategory.name_cat,
          desc: newCategory.desc,
        }),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const createdCategory = await response.json();
      setUsers([...users, createdCategory]);
      setIsCreateOpen(false);
      setNewCategory({
        name_cat: '',
        desc: ''
      });
    } catch (error) {
      console.error('Error creating category:', error);
    }
  };
  
  const [editUser, setEditUser] = useState({
    name_cat: '',
    desc: ''
  });

  const handleEditClick = (user) => {
    setEditUser({
      _id: user._id,
      name_cat: user.name_cat || '',
      desc: user.desc || ''
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
      const response = await fetch(`http://localhost:5000/v1/api/superadmin/categories/updateCategoryById/${editUser._id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name_cat: editUser.name_cat,
          desc: editUser.desc,
        }),
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
        const response = await fetch('http://localhost:5000/v1/api/superadmin/course/getAllCourses',{
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
          handleCreateClick={handleCreateClick}
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
                      {row.title}
                    </TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="left">{row.difficulty}</TableCell>
                    <TableCell align="left">{row.cat_type}</TableCell>
                    <TableCell align="left">{row.price}</TableCell>
                    <TableCell align="left">{row.stars}</TableCell>
                    <TableCell align="left">{row.file}</TableCell>
                    <TableCell align="left">{row.created_at}</TableCell>
                    <TableCell align="left">{row.created_by}</TableCell>
                    <TableCell align="left">{row.thumbnail}</TableCell>
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
      {isCreateOpen && (
        <Dialog open={isCreateOpen} onClose={handleCreateClose}>
          <DialogTitle>Create Category</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              name="name_cat"
              value={newCategory.name_cat}
              onChange={handleCreateChange}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              name="desc"
              value={newCategory.desc}
              onChange={handleCreateChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCreateClose}>Cancel</Button>
            <Button onClick={handleCreateSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
      )}

      {isEditOpen && (
        <Dialog open={isEditOpen} onClose={handleEditClose}>
          <DialogTitle>Edit Category</DialogTitle>
          <DialogContent>
            <TextField
              margin="dense"
              label="Category Name"
              type="text"
              fullWidth
              name="name_cat"
              value={editUser.name_cat}
              onChange={handleEditChange}
            />
            <TextField
              margin="dense"
              label="Description"
              type="text"
              fullWidth
              name="desc"
              value={editUser.desc}
              onChange={handleEditChange}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleEditClose}>Cancel</Button>
            <Button onClick={handleEditSubmit}>Save</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
}