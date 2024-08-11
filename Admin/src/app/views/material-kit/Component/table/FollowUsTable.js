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
export default function FollowUsTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [FollowUsTabledata, setFollowUsTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [FollowUsTabledataFilter, setFollowUsTabledataFilter] = useState([]);

  var getFollowData = async () => {
    Get(Api.FollowGetIcon).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setFollowUsTabledata(result.result);
      setFollowUsTabledataFilter(result.result);
    } else {
      setFollowUsTabledata(result.result);
      setFollowUsTabledataFilter(result.result);
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

  const FollowsTrashed = async (Id) => {
    var raw = JSON.stringify({
      FollowIsActive: false
    });

    Update(`${Api.FollowGetIcon}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (data) => {
    if (data.Status) {
      getFollowData();
    } else {
      getFollowData();
    }
  };
  useEffect(() => {
    getFollowData();
  }, []);
  var FollowUpdate = (id) => {
    navigator(`/backend/update-follow?followId=${id}`);
  };
  var FollowTrash = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      FollowsTrashed(Id);
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
        if (row.FollowIsActive == true) {
          return <>{row.Title}</>;
        }
      },
      sortable: true
    },
    {
      name: 'feature Image',
      selector: (row) => {
        if (row.FollowIsActive == true) {
          return (
            <>
              {' '}
              <img
                className=" filter-bg"
                src={row.Image ? `${Api.BaseURL}/${row.Image}` : '/demo.png'}
              />
            </>
          );
        }
      },

      sortable: true
    },

    {
      name: ' Date',
      selector: (row) => {
        if (row.FollowIsActive == true) {
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
        if (row.FollowIsActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => FollowUpdate(row.Id)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>
                <IconButton>
                  <Fab
                    onClick={() => FollowTrash(row.Id)}
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
    var result = FollowUsTabledata.filter((Follow) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Follow.FollowIsActive == true) {
        return Follow.Title.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setFollowUsTabledataFilter(result);
  }, [Search, FollowUsTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.Id);
      const FollowID = Id.toString();

      if (FollowID != null) {
        FollowTrash(FollowID);
        setFollowUsTabledataFilter(differenceBy(FollowUsTabledataFilter, 'Title'));
      }
    };

    return (
      <Button
        key="delete"
        onClick={handleDeleteCheckBox}
        className="btn-primary form-control  w-50 w-auto btn-class "
      >
        Trash
      </Button>
    );
  }, [
    FollowUsTabledataFilter,
    selectedRows,
    setFollowUsTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.FollowSliderGetAPi
  ]);
  return (
    <div>
      <DataTable
        data={FollowUsTabledataFilter}
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
            <div className="jBBxnG justify-content-end mb-3 justify-content-lg-start">
              <Link
                key="add"
                to="/backend/manage-follow"
                className="btn-primary form-control mb-4 w-50 w-auto btn-class"
              >
                <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Follow Us
              </Link>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
