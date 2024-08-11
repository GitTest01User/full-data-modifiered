import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import {
  Alert,
  Button,
  Dialog,
  Fab,
  Icon,
  IconButton,
  Snackbar,
  useMediaQuery
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import { differenceBy } from 'lodash';
import NoDataComponent from '../Trash/NoDataComponent';
import { useTheme } from '@emotion/react';
import Get from '../Function/Get';
import Update from '../Function/Update';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';
export default function LifeTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [LifeTabledata, setLifeTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [LifeTabledataFilter, setLifeTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getLifeData = async () => {
    Get(Api.LifeSliderGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setLifeTabledata(result.result);
      setLifeTabledataFilter(result.result);
    } else {
      setLifeTabledata(result.result);
      setLifeTabledataFilter(result.result);
    }
  };
  const LifesTrasshed = async (LifeSilderId) => {
    var raw = JSON.stringify({
      LifeSilderisActive: false
    });

    Update(`${Api.LifeSliderGetAPi}?LifeSilderId=${LifeSilderId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getLifeData();
    } else {
      getLifeData();
    }
  };
  useEffect(() => {
    getLifeData();
  }, []);
  var LifeUpdate = (id) => {
    navigator(`/backend/update-life?lifeId=${id}`);
  };
  var LifeTrash = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      LifesTrasshed(Id);
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
        if (row.LifeSilderisActive == true) {
          return <>{row.LifeSilderTitle}</>;
        }
      },
      sortable: true
    },
    {
      name: 'feature Image',
      selector: (row) => {
        if (row.LifeSilderisActive == true) {
          return (
            <>
              {' '}
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
        if (row.LifeSilderisActive == true) {
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
        if (row.LifeSilderisActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => LifeUpdate(row.LifeSilderId)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>
                <IconButton>
                  <Fab
                    onClick={() => LifeTrash(row.LifeSilderId)}
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
    var result = LifeTabledata.filter((Life) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Life.LifeSilderisActive == true) {
        return Life.LifeSilderTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setLifeTabledataFilter(result);
  }, [Search, LifeTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.LifeSilderId);
      const LifeID = Id.toString();

      if (LifeID != null) {
        LifeTrash(LifeID);
        setLifeTabledataFilter(differenceBy(LifeTabledataFilter, 'LifeSilderTitle'));
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
    LifeTabledataFilter,
    selectedRows,
    setLifeTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.LifeSliderGetAPi
  ]);
  return (
    <div>
      <DataTable
        data={LifeTabledataFilter}
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
                to="/backend/manage-life"
                className="btn-primary form-control mb-4 w-50 w-auto btn-class"
              >
                <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Life
              </Link>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
