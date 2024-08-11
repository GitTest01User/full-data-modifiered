import Api from 'Service/Api';
import React from 'react';

import { useState } from 'react';
import dateFormat from 'dateformat';
import { Button, Fab, Icon, IconButton } from '@mui/material';

import Get from '../Function/Get';
import Deletes from '../Function/Delete';
import Update from '../Function/Update';
import { differenceBy } from 'lodash';
import { useEffect } from 'react';
import DataTable from 'react-data-table-component';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
export default function OpeningTrash() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [OpeningTabledata, setOpeningTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [OpeningTabledataFilter, setOpeningTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };
  var getOpeningData = async () => {
    Get(Api.OpeningsGetApi).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setOpeningTabledata(result.result);
      setOpeningTabledataFilter(result.result);
    } else {
      setOpeningTabledata(result.result);
      setOpeningTabledataFilter(result.result);
    }
  };

  const OpeningsDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };

  var handleDelete = async (OpeningsId) => {
    Deletes(`${Api.OpeningsGetApi}?OpeningsId=${OpeningsId}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (result) => {
    if (result.Status) {
      getOpeningData();
    } else {
      getOpeningData();
    }
  };

  var OpeningRestore = async (OpeningsId) => {
    var raw = JSON.stringify({
      OpeningsisActive: true
    });
    Update(`${Api.OpeningsGetApi}?OpeningsId=${OpeningsId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      getOpeningData();
    } else {
      getOpeningData();
    }
  };

  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };
  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      OpeningRestore(Id);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const processDeleted = (result, Id) => {
    if (result.isConfirmed) {
      handleDelete(Id);
      ConfirmedSweet('Delete');
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
        if (row.OpeningsisActive != true) {
          return <>{row.OpeningsTitle}</>;
        }
      },
      sortable: true
    },
    {
      name: ' City',
      selector: (row) => {
        if (row.OpeningsisActive != true) {
          return <>{row.OpeningsCity}</>;
        }
      },
      sortable: true
    },
    {
      name: ' Experience',
      selector: (row) => {
        if (row.OpeningsisActive != true) {
          return <>{row.OpeningsExperience}</>;
        }
      },
      sortable: true
    },

    {
      name: ' Date',
      selector: (row) => {
        if (row.OpeningsisActive != true) {
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
        if (row.OpeningsisActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => Restore(row.OpeningsId)}
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => OpeningsDeletes(row.OpeningsId)}
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

  useEffect(() => {
    var result = OpeningTabledata.filter((Opening) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Opening.OpeningsisActive == false) {
        return Opening.OpeningsTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setOpeningTabledataFilter(result);
  }, [Search, OpeningTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.OpeningsId);
      const OpeningsID = Id.toString();

      if (OpeningsID != null) {
        Restore(OpeningsID);
        setOpeningTabledataFilter(differenceBy(OpeningTabledataFilter, 'OpeningsTitle'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.OpeningsId);
      const OpeningsID = Id.toString();

      if (OpeningsID != null) {
        OpeningsDeletes(OpeningsID);
        setOpeningTabledataFilter(differenceBy(OpeningTabledataFilter, 'OpeningsTitle'));
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
    OpeningTabledataFilter,
    selectedRows,
    setOpeningTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.OpeningsGetApi
  ]);
  useEffect(() => {
    getOpeningData();
  }, []);
  return (
    <div>
      <DataTable
        data={OpeningTabledataFilter}
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
          <div class="jBBxnG justify-content-end justify-content-lg-start">
            <h6 className=" m-1 mb-4">
              <img src="/loupe.png" style={{ width: '18px' }} /> Search :
            </h6>
            <input
              type="text"
              placeholder=" Search by keyword...."
              className=" form-control m-1 mb-4 w-auto"
              value={Search}
              onChange={(e) => setSearchTable(e.target.value)}
            />
          </div>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
