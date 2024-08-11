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

export default function ServingTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

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

  var getServingData = async () => {
    Get(Api.ServingInGetAPi).then(handleResponse).then(processGet).catch(handleError);
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
  const ServingDeletes = async (ServingId) => {
    var raw = JSON.stringify({
      ServinginisActive: false
    });

    Update(`${Api.ServingInGetAPi}?ServingId=${ServingId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getServingData();
    } else {
      getServingData();
    }
  };

  useEffect(() => {
    getServingData();
  }, []);
  var ServingUpdate = (id) => {
    navigator(`/backend/update-serving?servingId=${id}`);
  };

  var ServingTrash = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      ServingDeletes(Id);
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
        if (row.ServinginisActive == true) {
          return <>{row.ServinginCity}</>;
        }
      },
      sortable: true
    },

    {
      name: ' Date',
      selector: (row) => {
        if (row.ServinginisActive == true) {
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
        if (row.ServinginisActive == true) {
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
      name: <div class="form-check-inline m-4 mb-0 mt-0 text-center">Action</div>,
      cell: (row) => {
        if (row.ServinginisActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => ServingUpdate(row.ServingId)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>{' '}
                <IconButton>
                  <Fab
                    onClick={() => ServingTrash(row.ServingId)}
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
    var result = ServingTabledata.filter((Serving) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Serving.ServinginisActive == true) {
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
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.ServingId);
      const ServingID = Id.toString();

      if (ServingID != null) {
        ServingTrash(ServingID);
        setServingTabledataFilter(differenceBy(ServingTabledataFilter, 'ServinginCity'));
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
                  to="/backend/manage-serving"
                  className="btn-primary form-control mb-4 w-50 w-auto btn-class"
                >
                  <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Serving In
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
