import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';
import Deletes from '../Function/Delete';

import { differenceBy } from 'lodash';
import Get from '../Function/Get';
import Update from '../Function/Update';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';

export default function LifeSilderTrash() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [LifeSilderTabledata, setLifeSilderTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [LifeSilderTabledataFilter, setLifeSilderTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getLifeSilderData = async () => {
    Get(Api.LifeSliderGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setLifeSilderTabledata(result.result);
      setLifeSilderTabledataFilter(result.result);
    } else {
      setLifeSilderTabledata(result.result);
      setLifeSilderTabledataFilter(result.result);
    }
  };

  var handleDelete = async (LifeSilderId) => {
    Deletes(`${Api.LifeSliderGetAPi}?LifeSilderId=${LifeSilderId}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (result) => {
    if (result.Status) {
      getLifeSilderData();
    } else {
      getLifeSilderData();
    }
  };

  var LifeSilderRestore = async (LifeSilderId) => {
    var raw = JSON.stringify({
      LifeSilderisActive: true
    });
    Update(`${Api.LifeSliderGetAPi}?LifeSilderId=${LifeSilderId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      getLifeSilderData();
    } else {
      getLifeSilderData();
    }
  };

  useEffect(() => {
    getLifeSilderData();
  }, []);
  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };

  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      LifeSilderRestore(Id);
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
  const LifeSildersDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.LifeSilderisActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.LifeSilderTitle }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: 'feature Image',
      selector: (row) => {
        if (row.LifeSilderisActive != true) {
          return (
            <>
              <img
                className="Image-table"
                src={row.LifeSilderimage ? `${Api.BaseURL}/${row.LifeSilderimage}` : '/demo.png'}
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
        if (row.LifeSilderisActive != true) {
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
        if (row.LifeSilderisActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  onClick={() => Restore(row.LifeSilderId)}
                  color="secondary"
                  aria-label="Edit"
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => LifeSildersDeletes(row.LifeSilderId)}
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
    var result = LifeSilderTabledata.filter((LifeSilder) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (LifeSilder.LifeSilderisActive != true) {
        return LifeSilder.LifeSilderTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setLifeSilderTabledataFilter(result);
  }, [Search, LifeSilderTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.LifeSilderId);
      const LifeID = Id.toString();

      if (LifeID != null) {
        Restore(LifeID);
        setLifeSilderTabledataFilter(differenceBy(LifeSilderTabledataFilter, 'LifeSilderTitle'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.LifeSilderId);
      const LifeID = Id.toString();

      if (LifeID != null) {
        LifeSildersDeletes(LifeID);
        setLifeSilderTabledataFilter(differenceBy(LifeSilderTabledataFilter, 'LifeSilderTitle'));
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
    LifeSilderTabledataFilter,
    selectedRows,
    setLifeSilderTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.LifeSliderGetAPi
  ]);

  return (
    <div>
      <DataTable
        data={LifeSilderTabledataFilter}
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
              placeholder="Search by keyword...."
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
