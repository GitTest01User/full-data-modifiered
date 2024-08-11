import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';

import Get from '../Function/Get';
import Update from '../Function/Update';
import Deletes from '../Function/Delete';
import { differenceBy } from 'lodash';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';
export default function UserTable(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [UserTabledata, setUserTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [UserTabledataFilter, setUserTabledataFilter] = useState([]);

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
      setUserTabledata(result.result);
      setUserTabledataFilter(result.result);
    } else {
      setUserTabledata(result.result);
      setUserTabledataFilter(result.result);
    }
  };

  var getUserData = async () => {
    Get(Api.RegisterAPiGet).then(handleResponse).then(processGet).catch(handleError);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const processUpdate = (data) => {
    if (data.Status) {
      getUserData();
    } else {
      getUserData();
    }
  };
  var UserRestore = async (Id) => {
    var raw = JSON.stringify({
      user_status: true
    });
    Update(`${Api.RegisterAPiGet}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processDelete = (data) => {
    if (data.Status) {
      getUserData();
    } else {
      getUserData();
    }
  };

  var handleDelete = async (Id) => {
    Deletes(`${Api.RegisterAPiGet}?Id=${Id}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };

  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      UserRestore(Id);
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

  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };

  const UserDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };

  var columns = [
    {
      name: 'Frist Name',
      selector: (row) => {
        if (row.user_status != true) {
          return <>{row.first_name}</>;
        }
      },
      sortable: true
    },
    {
      name: 'Last Name',
      selector: (row) => {
        if (row.user_status != true) {
          return <>{row.last_name}</>;
        }
      },
      sortable: true
    },

    {
      name: 'Registered Date',
      selector: (row) => {
        if (row.user_status != true) {
          return (
            <>
              <span>
                registered <br></br> {dateFormat(row.user_registered, 'mmmm dS, yyyy')}{' '}
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
        if (row.user_status != true) {
          return (
            <>
              <img
                className="Image-table"
                src={`${Api.BaseURL}/${
                  row.image_name ? row.image_name : 'placeholder-01-01 1.png'
                }`}
              />
            </>
          );
        }
      },

      sortable: true
    },
    {
      name: 'Action',
      cell: (row) => {
        if (row.user_status != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => Restore(row.Id)}
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => UserDeletes(row.Id)}
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
    var result = UserTabledata.filter((User) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (User.user_status == false) {
        return User.first_name.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setUserTabledataFilter(result);
  }, [Search, UserTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const UserID = Id.toString();

      if (UserID != null) {
        Restore(UserID);
        setUserTabledataFilter(differenceBy(UserTabledataFilter, 'Title'));
      }
    };
    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const UserID = Id.toString();

      if (UserID != null) {
        UserDeletes(UserID);

        setUserTabledataFilter(differenceBy(UserTabledataFilter, 'Title'));
      }
    };

    return (
      <>
        <Button
          key="delete"
          onClick={handleDelete}
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
    UserTabledataFilter,
    selectedRows,
    setUserTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.RegisterAPiGet
  ]);
  return (
    <div>
      <DataTable
        style={{ width: '100%' }}
        columns={columns}
        data={UserTabledataFilter}
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
              placeholder="Search existing users"
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
