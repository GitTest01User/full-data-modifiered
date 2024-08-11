import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';

import { differenceBy } from 'lodash';
import Get from '../Function/Get';
import Deletes from '../Function/Delete';
import Update from '../Function/Update';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
export default function PressTrash() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [PressTabledata, setPressTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [PressTabledataFilter, setPressTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  const processGet = (result) => {
    if (result.Status) {
      setPressTabledata(result.result);
      setPressTabledataFilter(result.result);
    } else {
      setPressTabledata(result.result);
      setPressTabledataFilter(result.result);
    }
  };

  var getPressData = async () => {
    Get(Api.PressGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };

  var handleDelete = async (id) => {
    Deletes(`${Api.PressGetAPi}?id=${id}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };

  const processDelete = (result) => {
    if (result.Status) {
      getPressData();
    } else {
      getPressData();
    }
  };

  var PressRestore = async (id) => {
    var raw = JSON.stringify({
      PressISActive: true
    });

    Update(`${Api.PressGetAPi}?id=${id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      getPressData();
    } else {
      getPressData();
    }
  };

  useEffect(() => {
    getPressData();
  }, []);

  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };
  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      PressRestore(Id);
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
  const PresssDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };

  var columns = [
    {
      name: 'Name',
      selector: (row) => {
        if (row.PressISActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.PressTitle.substring(0, 15) + '....' }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: ' Author',
      selector: (row) => {
        if (row.PressISActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.PressAuthor }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: ' Date',
      selector: (row) => {
        if (row.PressISActive != true) {
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
      name: 'feature Image',
      selector: (row) => {
        if (row.PressISActive != true) {
          return (
            <>
              <img
                className="Image-table"
                src={row.PressImage ? `${Api.BaseURL}/${row.PressImage}` : '/demo.png'}
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
        if (row.PressISActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => Restore(row.id)}
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => PresssDeletes(row.id)}
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
    var result = PressTabledata.filter((Press) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Press.PressISActive != true) {
        return Press.PressTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setPressTabledataFilter(result);
  }, [Search, PressTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.id);
      const PressID = Id.toString();

      if (PressID != null) {
        Restore(PressID);
        setPressTabledataFilter(differenceBy(PressTabledataFilter, 'PressTitle'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.id);
      const PressID = Id.toString();

      if (PressID != null) {
        PresssDeletes(PressID);
        setPressTabledataFilter(differenceBy(PressTabledataFilter, 'PressTitle'));
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
    PressTabledataFilter,
    selectedRows,
    setPressTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.PressGetAPi
  ]);

  return (
    <div>
      <>
        {' '}
        <DataTable
          data={PressTabledataFilter}
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
      </>
    </div>
  );
}
