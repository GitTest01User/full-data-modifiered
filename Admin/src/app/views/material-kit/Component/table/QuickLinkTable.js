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
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';

export default function QuickTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [QuickTabledata, setQuickTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [QuickTabledataFilter, setQuickTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getQuickData = async () => {
    Get(Api.QuickLinkGetSite).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setQuickTabledata(result.result);
      setQuickTabledataFilter(result.result);
    } else {
      setQuickTabledata(result.result);
      setQuickTabledataFilter(result.result);
    }
  };
  const QuickTrashed = async (Id) => {
    var raw = JSON.stringify({
      QuickLinkIsActive: false
    });
    Update(`${Api.QuickLinkGetSite}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getQuickData();
    } else {
      getQuickData();
    }
  };
  useEffect(() => {
    getQuickData();
  }, []);
  var QuickUpdate = (obj) => {
    navigator(`/backend/update-link?Id=${obj.Id}&&routeId=${obj.BrowserRoutersId}`);
  };

  var QuickTrash = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      QuickTrashed(Id);
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
        if (row.QuickLinkIsActive == true) {
          return <>{row.Title}</>;
        }
      },
      sortable: true
    },
    {
      name: 'Link',
      selector: (row) => {
        if (row.QuickLinkIsActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.PermaLink }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: 'Author',
      selector: (row) => {
        if (row.QuickLinkIsActive == true) {
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
        if (row.QuickLinkIsActive == true) {
          return (
            <>
              <span>
                Published <br></br> {dateFormat(row.Date, 'mmmm dS, yyyy')}{' '}
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
        if (row.QuickLinkIsActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => QuickUpdate(row)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>{' '}
                <IconButton>
                  <Fab
                    onClick={() => QuickTrash(row.Id)}
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

  useEffect(() => {
    var result = QuickTabledata.filter((Quick) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Quick.QuickLinkIsActive == true) {
        return Quick.Title.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setQuickTabledataFilter(result);
  }, [Search, QuickTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const sId = Id.toString();

      if (sId != null) {
        QuickTrash(sId);
        setQuickTabledataFilter(differenceBy(QuickTabledataFilter, 'Title'));
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
    QuickTabledataFilter,
    selectedRows,
    setQuickTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.QuickLinkGetSite
  ]);

  return (
    <div>
      <>
        {' '}
        <DataTable
          data={QuickTabledataFilter}
          style={{ width: '100%' }}
          columns={columns}
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
              {' '}
              <div class="jBBxnG justify-content-end justify-content-lg-start">
                <h6 className=" m-1 mb-4">
                  <img src="/loupe.png" style={{ width: '18px' }} /> Search :
                </h6>
                <input
                  type="text"
                  placeholder=" Search by keyword...."
                  className=" form-control m-1 mb-4  w-auto"
                  value={Search}
                  onChange={(e) => setSearchTable(e.target.value)}
                />
              </div>
              <div class="jBBxnG justify-content-end mb-3 justify-content-lg-start">
                <Link
                  key="add"
                  to="/backend/manage-quicklink"
                  className="btn-primary form-control mb-4 w-50 w-auto btn-class"
                >
                  <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Quick Links
                </Link>
              </div>{' '}
            </>
          }
          subHeaderAlign="right"
        />
      </>
    </div>
  );
}
