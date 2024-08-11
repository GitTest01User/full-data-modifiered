import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';

import { differenceBy } from 'lodash';

import Get from '../Function/Get';
import Update from '../Function/Update';
import Deletes from '../Function/Delete';

import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';

import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';

export default function BlogTrash() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [BlogTabledata, setBlogTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [BlogTabledataFilter, setBlogTabledataFilter] = useState([]);
  var [TableCategory, setTableCategory] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');

  const [Categorys, setCategorys] = useState([]);
  const handleCategoryChange = (category) => {
    var result = BlogTabledata.filter((Blog) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Blog.BlogISActive == false && Blog.BlogContents != null) {
        return Blog.BlogCategories.toString().includes(category.toLowerCase());
      }
    });
    setBlogTabledataFilter(result);
  };
  useEffect(() => {
    var result = BlogTabledata.filter((Blog) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Blog.BlogISActive == false && Blog.BlogContents != null) {
        return Blog.BlogTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });

    setBlogTabledataFilter(result);
  }, [Search, BlogTabledata, TableCategory]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getBlogData = async () => {
    Get(Api.BlogsGetApi).then(handleResponse).then(processGet).catch(handleError);
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

  useEffect(() => {
    getBlogData();
    BlogsCategorydata();
  }, []);

  var BlogRestore = async (BlogId) => {
    var raw = JSON.stringify({
      BlogISActive: true
    });
    Update(`${Api.BlogsGetApi}?BlogId=${BlogId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (result) => {
    if (result.Status) {
      getBlogData();
    } else {
      console.log(result);
    }
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.BlogISActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.BlogTitle }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: ' Author',
      selector: (row) => {
        if (row.BlogISActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.BlogAuthor }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: ' Date',
      selector: (row) => {
        if (row.BlogISActive != true) {
          return (
            <>
              <span>
                Published <br></br> {dateFormat(row.BlogDate, 'mmmm dS, yyyy')}{' '}
              </span>
            </>
          );
        }
      },

      sortable: true
    },

    {
      name: 'feature Image',
      selector: (row) => {
        if (row.BlogISActive != true) {
          return (
            <>
              <img
                className="Image-table"
                src={row.BlogImage ? `${Api.BaseURL}/${row.BlogImage}` : '/demo.png'}
              />
            </>
          );
        }
      },

      sortable: true
    },
    {
      name: <div class="form-check-inline m-4 mb-0 mt-0 text-center">Action</div>,
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
                  onClick={() => Restore(row.BlogId)}
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => Delete(row.BlogId)}
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
      }
    }
  ];

  var BlogsCategorydata = () => {
    Get(Api.BlogsCategoryGetApi).then(handleResponse).then(processGetCategory).catch(handleError);
  };
  const processGetCategory = (result) => {
    if (result.Status) {
      setCategorys(result.result);
    } else {
      setCategorys(result.result);
    }
  };

  var Restore = (BlogId) => {
    ActionSweet('Restore').then((result) => processRestore(result, BlogId));
  };
  const processRestore = (result, BlogId) => {
    if (result.isConfirmed) {
      BlogRestore(BlogId);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  var Delete = (BlogId) => {
    ActionSweet('Delete').then((result) => processDelete(result, BlogId));
  };

  const processDelete = (result, BlogId) => {
    if (result.isConfirmed) {
      BlogDeleted(BlogId);
      ConfirmedSweet('Delete');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  var BlogDeleted = async (BlogId) => {
    Deletes(`${Api.BlogsGetApi}?BlogId=${BlogId}`)
      .then(handleResponse)
      .then(processDeleted)
      .catch(handleError);
  };

  const processDeleted = (result) => {
    if (result.Status) {
      getBlogData();
    } else {
      console.log(result);
    }
  };
  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.BlogId);
      const BlogID = Id.toString();

      if (BlogID != null) {
        Restore(BlogID);

        setBlogTabledataFilter(differenceBy(BlogTabledataFilter, 'BlogTitle'));
      }
    };
    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.BlogId);
      const BlogID = Id.toString();

      if (BlogID != null) {
        Delete(BlogID);

        setBlogTabledataFilter(differenceBy(BlogTabledataFilter, 'BlogTitle'));
      }
    };
    return (
      <>
        <Button
          key="delete"
          onClick={handleDeleteCheckBox}
          className="btn-primary form-control  w-50 w-auto btn-class "
        >
          Restore
        </Button>
        <Button
          key="delete"
          onClick={handlePermanentlyDelete}
          className="btn-primary form-control  w-50 w-auto btn-class "
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
    Api.BlogsGetApi
  ]);
  return (
    <div>
      <>
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
                  placeholder="Search by keyword..."
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

                  {Categorys.map((obj) => {
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
      </>
    </div>
  );
}
