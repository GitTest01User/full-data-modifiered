// import {
//   Box,
//   Fab,
//   Icon,
//   IconButton,
//   styled,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow
// } from '@mui/material';
// import { result } from 'lodash';

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const StyledTable = styled(Table)(() => ({
//   whiteSpace: 'pre',
//   '& thead': {
//     '& tr': { '& th': { paddingLeft: 0, paddingRight: 0 } }
//   },
//   '& tbody': {
//     '& tr': { '& td': { paddingLeft: 0, textTransform: 'capitalize' } }
//   }
// }));

// const PaginationTable = () => {
//   const [FAQ, setFAQ] = useState([]);
//   const [FAQUpDate, setFAQUpDate] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   var navigator = useNavigate();

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   useEffect(() => {
//     fetchFAQData();
//   }, []);

//   // const fetchFAQData = async () => {
//   //   try {
//   //     const response = await fetch('http://localhost:8000/Status/Digi2l/FAQ');
//   //     if (response.ok) {
//   //       const result = await response.json();
//   //       setFAQ(result.result);
//   //     } else {
//   //       console.error('Failed to fetch FAQ data');
//   //     }
//   //   } catch (error) {
//   //     console.error('Error fetching FAQ data:', error);
//   //   }
//   // };

//   var FQADelete = (id) => {
//     alert(`Deleting item with ID: ${id}`);
//     navigator('/material/ClickedElement');
//   };

//   var FQAUpdate = (id) => {
//     alert(`FQAUpdate item with ID: ${id}`);
//     var myHeaders = new Headers();
//     myHeaders.append('Content-Type', 'application/json');

//     var raw = JSON.stringify({});

//     var requestOptions = {
//       method: 'PUT',
//       headers: myHeaders,
//       body: raw,
//       redirect: 'follow'
//     };
//   };
//   return (
//     <Box width="100%" overflow="auto">
//       <StyledTable>
//         <TableHead>
//           <TableRow>
//             <TableCell align="left">Title</TableCell>
//             <TableCell align="left">Contents</TableCell>
//             <TableCell align="center">Opration</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {FAQ.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(
//             (subscriber, index) => {
//               if (subscriber.FAQContents != 'Null' && index != 0) {
//                 return (
//                   <TableRow>
//                     <TableCell align="left">
//                       <p dangerouslySetInnerHTML={{ __html: subscriber.FAQTitle }} />
//                     </TableCell>
//                     <TableCell align="left">
//                       <p dangerouslySetInnerHTML={{ __html: subscriber.FAQContents }} />
//                     </TableCell>

//                     <TableCell align="center">
//                       <IconButton>
//                         <Fab
//                           style={{ width: '40px', height: '40px', backgroundColor: '#8233cd' }}
//                           color="secondary"
//                           aria-label="Edit"
//                           className="button"
//                           onClick={() => FQAUpdate(subscriber.FAQId)}
//                         >
//                           <Icon>edit_icon</Icon>
//                         </Fab>
//                       </IconButton>
//                       <IconButton>
//                         <Fab
//                           style={{ width: '40px', height: '40px', backgroundColor: '#8233cd' }}
//                           onClick={() => FQADelete(subscriber.FAQId)}
//                           aria-label="Delete"
//                           className="button"
//                         >
//                           <Icon>delete</Icon>
//                         </Fab>
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 );
//               }
//             }
//           )}
//         </TableBody>
//       </StyledTable>

//       <TablePagination
//         sx={{ px: 2 }}
//         page={page}
//         component="div"
//         rowsPerPage={rowsPerPage}
//         count={FAQ.length}
//         onPageChange={handleChangePage}
//         rowsPerPageOptions={[5, 10, 25]}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         nextIconButtonProps={{ 'aria-label': 'Next Page' }}
//         backIconButtonProps={{ 'aria-label': 'Previous Page' }}
//       />
//     </Box>
//   );
// };

// export default PaginationTable;

import React from 'react';

export default function PaginationTable() {
  return <div>PaginationTable</div>;
}
