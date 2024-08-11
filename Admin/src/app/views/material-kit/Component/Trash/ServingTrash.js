import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';

import { differenceBy } from 'lodash';
import Deletes from '../Function/Delete';
import Get from '../Function/Get';
import Update from '../Function/Update';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import Swal from 'sweetalert2';

export default function ServingTrash() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [ServingTabledata, setServingTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [ServingTabledataFilter, setServingTabledataFilter] = useState([]);

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
      setServingTabledata(result.result);
      setServingTabledataFilter(result.result);
    } else {
      setServingTabledata(result.result);
      setServingTabledataFilter(result.result);
    }
  };

  var getServingData = async () => {
    Get(Api.ServingInGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getServingData();
    } else {
      getServingData();
    }
  };

  var handleDelete = async (ServingId) => {
    Deletes(`${Api.ServingInGetAPi}?ServingId=${ServingId}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (data) => {
    if (data.Status) {
      getServingData();
    } else {
      getServingData();
    }
  };
  var ServingRestore = async (ServingId) => {
    var raw = JSON.stringify({
      ServinginisActive: true
    });
    Update(`${Api.ServingInGetAPi}?ServingId=${ServingId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  useEffect(() => {
    getServingData();
  }, []);

  const processRestore = (result, ServingId) => {
    if (result.isConfirmed) {
      ServingRestore(ServingId);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const processDeleted = (result, ServingId) => {
    if (result.isConfirmed) {
      handleDelete(ServingId);
      ConfirmedSweet('Delete');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const ServingDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };
  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.ServinginisActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.ServinginCity }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: ' Date',
      selector: (row) => {
        if (row.ServinginisActive != true) {
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
      name: 'Modified Date',
      selector: (row) => {
        if (row.ServinginisActive != true) {
          return (
            <>
              <span>
                Modified <br></br> {dateFormat(row.ModifiedDate, 'mmmm dS, yyyy')}{' '}
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
        if (row.ServinginisActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  onClick={() => Restore(row.ServingId)}
                  color="secondary"
                  aria-label="Edit"
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => ServingDeletes(row.ServingId)}
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
    var result = ServingTabledata.filter((Serving) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Serving.ServinginisActive == false) {
        return Serving.ServinginCity.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setServingTabledataFilter(result);
  }, [Search, ServingTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.ServingId);
      const ServingID = Id.toString();

      if (ServingID != null) {
        Restore(ServingID);
        setServingTabledataFilter(differenceBy(ServingTabledataFilter, 'ServinginCity'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.ServingId);
      const ServingID = Id.toString();

      if (ServingID != null) {
        ServingDeletes(ServingID);
        setServingTabledataFilter(differenceBy(ServingTabledataFilter, 'ServinginCity'));
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
    ServingTabledataFilter,
    selectedRows,
    setServingTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.ServingInGetAPi
  ]);

  return (
    <div>
      <>
        {' '}
        <DataTable
          data={ServingTabledataFilter}
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
                placeholder="Search By KeyWord...."
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
