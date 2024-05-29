import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Table_Categories() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Get the user from local storage
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || !user.token) {
          throw new Error('No token found');
        }

        // Fetch categories with token in the header
        const response = await fetch('http://localhost:5000/v1/api/superadmin/categories/getAll', {
          headers: {
            'Authorization': `Bearer ${user.token}`,
            'Content-Type': 'application/json',
          },
        });

        // Check if response is OK
        if (!response.ok) {
          if (response.status === 401) {
            throw new Error('Unauthorized: Invalid token');
          } else {
            throw new Error('Network response was not ok');
          }
        }

        // Parse the JSON response
        const data = await response.json();
        setCategories(data); // Assuming data is an array of categories
      } catch (error) {
        console.error('Error fetching categories:', error);
        setError(error.message);
      }
    };

    fetchCategories();
  }, []);

  return (
    <TableContainer component={Paper} sx={{ width: '50%', height: '50vh', overflow: 'auto' }}>
      <Table sx={{ width: '100%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Category ID</TableCell>
            <TableCell align="right">User ID</TableCell>
            <TableCell align="right">Category Type</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Level</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <TableRow
              key={category._id} 
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {category._id}
              </TableCell>
              <TableCell align="right">{category.user_id}</TableCell>
              <TableCell align="right">{category.cat_type}</TableCell>
              <TableCell align="right">{category.name_cat}</TableCell>
              <TableCell align="right">{category.desc}</TableCell>
              <TableCell align="right">{category.level_cat}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </TableContainer>
  );
}
