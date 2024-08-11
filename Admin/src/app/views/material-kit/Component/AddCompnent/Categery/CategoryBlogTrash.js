import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import {
  Alert,
  Button,
  Dialog,
  Fab,
  Icon,
  IconButton,
  Snackbar,
  useMediaQuery
} from '@mui/material';

import { useTheme } from '@emotion/react';
import { differenceBy } from 'lodash';
import Get from '../../Function/Get';
import Updated from '../../Function/Update';

import ActionSweet from '../Dialog/ActionSweet';
import ConfirmedSweet from '../Dialog/ConfirmedSweet';
import CancelledSweet from '../Dialog/CancelledSweet';
import Swal from 'sweetalert2';
import Delete from '../../Function/Delete';

export default function BlogTable(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  var [BlogTabledata, setBlogTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [BlogTabledataFilter, setBlogTabledataFilter] = useState([]);
  var [TableCategory, setTableCategory] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category) => {
    var result = BlogTabledata.filter((Blog) => {
      if (Blog.BlogISActive != true && Blog.BlogCategories != null) {
        return Blog.BlogCateId.toString().includes(category.toLowerCase());
      }
    });
    setBlogTabledataFilter(result);
  };
  useEffect(() => {
    var result = BlogTabledata.filter((Blog) => {
      if (Blog.BlogISActive != true && Blog.BlogCategories != null) {
        return Blog.BlogCategories.toLowerCase().includes(Search.toLowerCase());
      }
    });

    setBlogTabledataFilter(result);
  }, [Search, BlogTabledata, TableCategory]);

  const processGet = (result) => {
    if (result.Status) {
      setBlogTabledata(result.result);
      setBlogTabledataFilter(result.result);
    } else {
      setBlogTabledata(result.result);
      setBlogTabledataFilter(result.result);
    }
  };
  var getBlogData = async () => {
    Get(Api.BlogsCategoryGetApi).then(handleResponse).then(processGet).catch(handleError);
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  useEffect(() => {
    setOpen(false);

    getBlogData();
  }, []);

  const BlogsDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDelete(result, Id));
  };
  const processDelete = (result, Id) => {
    if (result.isConfirmed) {
      handleDelete(Id);
      ConfirmedSweet('Delete');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getBlogData();
      setOpen(false);
    } else {
      getBlogData();
      setOpen(false);
    }
  };
  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processTrash(result, Id));
  };
  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      BlogRestore(Id);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };
  var BlogRestore = async (BlogCateId) => {
    var raw = JSON.stringify({
      BlogISActive: true
    });
    Updated(`${Api.BlogsCategoryGetApi}?BlogCateId=${BlogCateId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.BlogISActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.BlogCategories }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: 'Created Date',
      selector: (row) => {
        if (row.BlogISActive != true) {
          return (
            <>
              <span>
                Published <br></br> {dateFormat(row.BlogCreatedDate, 'mmmm dS, yyyy')}{' '}
              </span>
            </>
          );
        }
      },

      sortable: true
    },

    {
      name: 'Action',
      cell: (row) => {
        if (row.BlogISActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => Restore(row.BlogCateId)}
                >
                  <Icon>restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => BlogsDeletes(row.BlogCateId)}
                  className="button democss"
                  aria-label="Delete"
                  variant="outlined"
                >
                  <Icon className="democssicon">delete</Icon>
                </Fab>
              </IconButton>
            </>
          );
        }
      },
      sortable: true
    }
  ];

  var handleDelete = async (BlogCateId) => {
    Delete(`${Api.BlogsCategoryGetApi}?BlogCateId=${BlogCateId}`)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeletess = () => {
      const Id = selectedRows.map((r) => r.BlogCateId);
      const BlogID = Id.toString();

      if (BlogID != null) {
        Restore(BlogID);
        setBlogTabledataFilter(differenceBy(BlogTabledataFilter, 'BlogCategories'));
      }
    };
    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.BlogID);
      const BlogID = Id.toString();

      if (BlogID != null) {
        BlogsDeletes(BlogID);
        setBlogTabledataFilter(differenceBy(BlogTabledataFilter, 'BlogTitle'));
      }
    };
    return (
      <>
        <Button key="delete" onClick={handleDeletess} className="btn form-control  w-50 w-auto">
          Restore
        </Button>
        <Button
          key="delete"
          onClick={handlePermanentlyDelete}
          className="btn form-control  w-50 w-auto"
        >
          Permanently Delete
        </Button>
      </>
    );
  }, [
    BlogTabledataFilter,
    selectedRows,
    setBlogTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.BlogsCategoryGetApi,
    setOpen
  ]);
  return (
    <div>
      <DataTable
        style={{ width: '100%' }}
        columns={columns}
        data={BlogTabledataFilter}
        pagination
        fixedHeader
        fixedHeaderScrollHeight="auto"
        selectableRowsHighlight
        subHeader
        selectableRows
        actions={actions}
        contextActions={contextActions}
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={toggleCleared}
        subHeaderComponent={
          <>
            <div class="jBBxnG justify-content-end justify-content-lg-start">
              <h6 className=" m-1 mb-4">
                <img src="/loupe.png" style={{ width: '18px' }} /> Search :
              </h6>
              <input
                type="text"
                placeholder="Search by keyword...."
                className=" form-control m-1 mb-4 w-auto"
                value={Search}
                onChange={(e) => setSearchTable(e.target.value)}
              />
            </div>

            <div className="jBBxnG justify-content-end">
              <h6 className=" m-1 mb-4">
                <img src="/sort.png" style={{ width: '20px' }} /> Filter by:
              </h6>
              <select
                className="form-select m-1 mb-4 w-auto"
                aria-label="Default select example"
                selected={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">---Select Categery----</option>
                {BlogTabledata.map((obj) => {
                  if (obj.BlogISActive != true) {
                    return <option value={obj.BlogCateId}>{obj.BlogCategories}</option>;
                  }
                })}
              </select>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
