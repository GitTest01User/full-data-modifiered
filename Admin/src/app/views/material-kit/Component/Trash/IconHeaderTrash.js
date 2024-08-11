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

import { useTheme } from '@emotion/react';
import { differenceBy } from 'lodash';
import Get from '../Function/Get';
import Deletes from '../Function/Delete';
import Update from '../Function/Update';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
export default function IconHeaderTrash() {
  var [RowTrash, setRowTrash] = useState('');
  var [RowDelete, setRowDelete] = useState('');
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [opennew, setOpennew] = useState(false);

  const [open, setOpen] = React.useState(false);
  var [FollowTabledata, setFollowTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [FollowTabledataFilter, setFollowTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };
  var getFollowData = async () => {
    Get(Api.FollowGetHeaderIcon).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setFollowTabledata(result.result);
      setFollowTabledataFilter(result.result);
    } else {
      setFollowTabledata(result.result);
      setFollowTabledataFilter(result.result);
    }
  };

  var handleDelete = async (Id) => {
    Deletes(`${Api.FollowGetHeaderIcon}?Id=${Id}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (result) => {
    if (result.Status) {
      setOpennew(false);
      console.log(result);
    } else {
      setOpennew(false);
      console.log(result);
    }
    getFollowData();
  };

  var FollowRestore = async (Id) => {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      FollowIsActive: true
    });

    Update(`${Api.FollowGetHeaderIcon}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      setOpen(false);
      console.log(result);
    } else {
      setOpen(false);
      console.log(result);
    }
    getFollowData();
  };

  useEffect(() => {
    setOpen(false);

    getFollowData();
  }, []);

  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      FollowRestore(Id);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
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
  const FollowsDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.FollowIsActive != true) {
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
        if (row.FollowIsActive != true) {
          return (
            <>
              <i className={row.Icon}></i>
            </>
          );
        }
      },

      sortable: true
    },
    {
      name: ' Date',
      selector: (row) => {
        if (row.FollowIsActive != true) {
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
        if (row.FollowIsActive != true) {
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
                  onClick={() => FollowsDeletes(row.Id)}
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
    var result = FollowTabledata.filter((Follow) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Follow.FollowIsActive != true) {
        return Follow.Title.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setFollowTabledataFilter(result);
  }, [Search, FollowTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.Id);
      const LifeID = Id.toString();

      if (LifeID != null) {
        Restore(LifeID);

        setFollowTabledataFilter(differenceBy(FollowTabledataFilter, 'Title'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const LifeID = Id.toString();

      if (LifeID != null) {
        FollowsDeletes(LifeID);
        setFollowTabledataFilter(differenceBy(FollowTabledataFilter, 'Title'));
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
    FollowTabledataFilter,
    selectedRows,
    setFollowTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.FollowGetHeaderIcon
  ]);

  return (
    <div>
      <DataTable
        data={FollowTabledataFilter}
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
