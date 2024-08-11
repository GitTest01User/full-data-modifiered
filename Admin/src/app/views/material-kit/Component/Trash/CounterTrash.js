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
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';

export default function CounterTrash() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [CounterTabledata, setCounterTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [CounterTabledataFilter, setCounterTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getCounterData = async () => {
    Get(Api.CounterGetWebSite).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setCounterTabledata(result.result);
      setCounterTabledataFilter(result.result);
    } else {
      setCounterTabledata(result.result);
      setCounterTabledataFilter(result.result);
    }
  };

  var handleDeleted = async (Id) => {
    Deletes(`${Api.CounterGetWebSite}?Id=${Id}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (result) => {
    if (result.Status) {
      console.log(result);
    } else {
      console.log(result);
    }
    getCounterData();
  };

  var CounterRestored = async (Id) => {
    var raw = JSON.stringify({
      CounterISActive: true
    });

    Update(`${Api.CounterGetWebSite}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (result) => {
    if (result.Status) {
      console.log(result);
    } else {
      console.log(result);
    }
    getCounterData();
  };

  useEffect(() => {
    getCounterData();
  }, []);

  var CounterDeletes = (CounterId) => {
    ActionSweet('Delete').then((result) => processDeleted(result, CounterId));
  };

  const processDeleted = (result, CounterId) => {
    if (result.isConfirmed) {
      handleDeleted(CounterId);
      ConfirmedSweet('Delete');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  var Restore = (CounterId) => {
    ActionSweet('Restore').then((result) => processRestore(result, CounterId));
  };
  const processRestore = (result, CounterId) => {
    if (result.isConfirmed) {
      CounterRestored(CounterId);
      ConfirmedSweet('Restore');
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
        if (row.CounterISActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Title }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: 'Icon',
      selector: (row) => {
        if (row.CounterISActive != true) {
          return <>{row.BackendIcon}</>;
        }
      },
      sortable: true
    },

    {
      name: ' Date',
      selector: (row) => {
        if (row.CounterISActive != true) {
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
      name: 'Action',
      cell: (row) => {
        if (row.CounterISActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  onClick={() => Restore(row.Id)}
                  color="secondary"
                  aria-label="Edit"
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => CounterDeletes(row.Id)}
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
    var result = CounterTabledata.filter((Counter) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Counter.CounterISActive == false) {
        return Counter.Title.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setCounterTabledataFilter(result);
  }, [Search, CounterTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteRestore = () => {
      const Id = selectedRows.map((r) => r.Id);
      const Ids = Id.toString();

      if (Ids != null) {
        Restore(Ids);
        setCounterTabledataFilter(differenceBy(CounterTabledataFilter, 'Title'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const Ids = Id.toString();

      if (Ids != null) {
        CounterDeletes(Ids);
        setCounterTabledataFilter(differenceBy(CounterTabledataFilter, 'Title'));
      }
    };
    return (
      <>
        <Button
          key="delete"
          onClick={handleDeleteRestore}
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
    CounterTabledataFilter,
    selectedRows,
    setCounterTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.CounterGetWebSite
  ]);

  return (
    <div>
      <>
        {' '}
        <DataTable
          data={CounterTabledataFilter}
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
