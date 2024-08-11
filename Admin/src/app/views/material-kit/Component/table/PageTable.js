import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { differenceBy } from 'lodash';

import Get from '../Function/Get';
import Update from '../Function/Update';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';

export default function PageTable(props) {
  var navigator = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [PageTabledata, setPageTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [PageTabledataFilter, setPageTabledataFilter] = useState([]);
  var [TableCategory, setTableCategory] = useState('');

  useEffect(() => {
    var result = PageTabledata.filter((Page) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Page.PolicyConditionisActive == true) {
        return Page.Title.toLowerCase().includes(Search.toLowerCase());
      }
    });

    setPageTabledataFilter(result);
  }, [Search, PageTabledata, TableCategory]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getPageData = async () => {
    Get(Api.PolicyDetailGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setPageTabledata(result.result);
      setPageTabledataFilter(result.result);
    } else {
      setPageTabledata(result.result);
      setPageTabledataFilter(result.result);
    }
  };

  const PagesTrashed = async (Id) => {
    var raw = JSON.stringify({
      PolicyConditionisActive: false
    });

    Update(`${Api.PolicyDetailGetAPi}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getPageData();
    } else {
      getPageData();
    }
  };
  useEffect(() => {
    getPageData();
  }, []);

  var PageUpdate = (obj) => {
    navigator(`/backend/update-routes-page?Id=${obj.Id}&&routesId=${obj.BrowserRoutersId}`);
  };
  var PageTrash = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      PagesTrashed(Id);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };
  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.PolicyConditionisActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Title.substring(0, 15) + '....' }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: 'Route',
      selector: (row) => {
        if (row.PolicyConditionisActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Route }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: ' Date',
      selector: (row) => {
        if (row.PolicyConditionisActive == true) {
          return (
            <>
              <span>
                Published <br></br> {dateFormat(row.CreatedDate, 'mmmm dS, yyyy')}{' '}
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
        if (row.PolicyConditionisActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => PageUpdate(row)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>{' '}
                <IconButton>
                  <Fab
                    onClick={() => PageTrash(row.Id)}
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

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const PageID = Id.toString();

      if (PageID != null) {
        PageTrash(PageID);
        setPageTabledataFilter(differenceBy(PageTabledataFilter, 'Title'));
      }
    };

    return (
      <Button
        key="delete"
        onClick={handleDelete}
        className="btn-primary form-control  w-50 w-auto btn-class "
      >
        Trash
      </Button>
    );
  }, [
    PageTabledataFilter,
    selectedRows,
    setPageTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.PolicyDetailGetAPi
  ]);

  return (
    <div>
      <>
        <DataTable
          style={{ width: '100%' }}
          columns={columns}
          data={PageTabledataFilter}
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
              <div class="jBBxnG justify-content-end mb-3 justify-content-lg-start">
                <Link
                  key="add"
                  to="/backend/manage-routes-page"
                  className="btn-primary form-control mb-4 w-50 w-auto btn-class"
                >
                  <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Page
                </Link>
              </div>
            </>
          }
          subHeaderAlign="right"
        />
      </>
    </div>
  );
}
