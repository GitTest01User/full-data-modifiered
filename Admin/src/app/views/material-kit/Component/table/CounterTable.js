import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Alert, Button, Dialog, Fab, Icon, IconButton, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { differenceBy } from 'lodash';

import Get from '../Function/Get';
import Update from '../Function/Update';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';

export default function CounterTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [CounterTabledata, setCounterTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [CounterTabledataFilter, setCounterTabledataFilter] = useState([]);

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
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  const CounterTrashed = async (Id) => {
    var raw = JSON.stringify({
      CounterISActive: false
    });
    Update(`${Api.CounterGetWebSite}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getCounterData();
    } else {
      getCounterData();
    }
  };
  useEffect(() => {
    getCounterData();
  }, []);
  var CounterUpdate = (id) => {
    navigator(`/backend/update-counter?Id=${id}`);
  };

  var CounterTrash = (cardId) => {
    ActionSweet('Trash').then((result) => processTrash(result, cardId));
  };

  const processTrash = (result, cardId) => {
    if (result.isConfirmed) {
      CounterTrashed(cardId);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
    }
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.CounterISActive == true) {
          return <>{row.Title}</>;
        }
      },
      sortable: true
    },
    {
      name: 'Icon',
      selector: (row) => {
        if (row.CounterISActive == true) {
          return <>{row.BackendIcon}</>;
        }
      },
      sortable: true
    },

    {
      name: ' Date',
      selector: (row) => {
        if (row.CounterISActive == true) {
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
        if (row.CounterISActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => CounterUpdate(row.Id)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>{' '}
                <IconButton>
                  <Fab
                    onClick={() => CounterTrash(row.Id)}
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
    var result = CounterTabledata.filter((Counter) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Counter.CounterISActive == true) {
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
    const handleTrashCheckBox = () => {
      const Id = selectedRows.map((r) => r.Id);
      const Ids = Id.toString();

      if (Ids != null) {
        CounterTrash(Ids);

        setCounterTabledataFilter(differenceBy(CounterTabledataFilter, 'Title'));
      }
    };

    return (
      <Button
        key="delete"
        onClick={handleTrashCheckBox}
        className="btn-primary form-control  w-50 w-auto btn-class "
      >
        Trash
      </Button>
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
                
              </div>
            </>
          }
          subHeaderAlign="right"
        />
      </>
      <div></div>
    </div>
  );
}
