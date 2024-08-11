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
import { Link, useNavigate } from 'react-router-dom';

import { differenceBy } from 'lodash';

import { useTheme } from '@emotion/react';
import Get from '../../Function/Get';
import Updated from '../../Function/Update';
import Swal from 'sweetalert2';
import CancelledSweet from '../Dialog/CancelledSweet';
import ConfirmedSweet from '../Dialog/ConfirmedSweet';
import ActionSweet from '../Dialog/ActionSweet';

export default function BlogTable(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  const [open, setOpen] = React.useState(false);
  var [BlogTabledata, setBlogTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [BlogTabledataFilter, setBlogTabledataFilter] = useState([]);
  var [TableCategory, setTableCategory] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');

  const handleCategoryChange = (category) => {
    var result = BlogTabledata.filter((Blog) => {
      if (Blog.BlogISActive == true && Blog.BlogCategories != null) {
        return Blog.BlogCateId.toString().includes(category.toLowerCase());
      }
    });
    setBlogTabledataFilter(result);
  };
  useEffect(() => {
    var result = BlogTabledata.filter((Blog) => {
      if (Blog.BlogISActive == true && Blog.BlogCategories != null) {
        return Blog.BlogCategories.toLowerCase().includes(Search.toLowerCase());
      }
    });

    setBlogTabledataFilter(result);
  }, [Search, BlogTabledata, TableCategory]);

  var getBlogData = async () => {
    Get(Api.BlogsCategoryGetApi).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setBlogTabledata(result.result);
      setBlogTabledataFilter(result.result);
    } else {
      setBlogTabledata(result.result);
      setBlogTabledataFilter(result.result);
    }
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
  var BlogsTrash = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };
  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      BlogsDeletes(Id);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };
  const BlogsDeletes = async (Id) => {
    var raw = JSON.stringify({
      BlogISActive: false
    });
    Updated(`${Api.BlogsCategoryGetApi}?BlogCateId=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getBlogData();
    } else {
      getBlogData();
    }
  };
  useEffect(() => {
    getBlogData();
  }, []);

  var BlogUpdate = (id) => {
    navigator(`/backend/update-category-blog?categoryId=${id}`);
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.BlogISActive == true) {
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
      name: 'Author',
      selector: (row) => {
        if (row.BlogISActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Author }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: ' Date',
      selector: (row) => {
        if (row.BlogISActive == true) {
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
      name: <div class="form-check-inline m-4 mb-0 mt-0 text-center">Action</div>,
      cell: (row) => {
        if (row.BlogISActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => BlogUpdate(row.BlogCateId)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>{' '}
                <IconButton>
                  <Fab
                    onClick={() => BlogsTrash(row.BlogCateId)}
                    className="button democss"
                    aria-label="Delete"
                    variant="outlined"
                  >
                    <Icon className="democssicon">delete</Icon>
                  </Fab>
                </IconButton>
              </>
            </>
          );
        }
      },
      sortable: true
    }
  ];

  const actions = (
    <Link
      key="add"
      to="/backend/manage-blog-category"
      className="btn-primary form-control mb-4 w-50 w-auto btn-class"
    >
      <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Categories
    </Link>
  );

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.BlogCateId);
      const BlogID = Id.toString();

      if (BlogID != null) {
        BlogsTrash(BlogID);
        setBlogTabledataFilter(differenceBy(BlogTabledataFilter, 'BlogTitle'));
      }
    };

    return (
      <Button key="delete" onClick={handleDelete} className="btn form-control  w-50 w-auto">
        Trash
      </Button>
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
                <option value="">---Select Category---</option>
                {BlogTabledata.map((obj) => {
                  if (obj.BlogISActive == true) {
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
