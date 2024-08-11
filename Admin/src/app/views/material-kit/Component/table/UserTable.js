import Api from 'Service/Api';

import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import { differenceBy } from 'lodash';

import { useAuthContext } from 'Context/AuthContext';

import Get from '../Function/Get';
import Update from '../Function/Update';

import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import Swal from 'sweetalert2';
import UserDetail from '../UserLogin/UserDetail';

export default function UserTable() {
  var { user } = useAuthContext();
  var navigator = useNavigate();

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [UserTabledata, setUserTabledata] = useState([]);
  var [ShowEdit, setShowEdit] = useState(false);
  var [ShowView, setShowView] = useState(false);

  var [ShowDelete, setShowDelete] = useState(false);
  var [Search, setSearchTable] = useState('');
  var [UserTabledataFilter, setUserTabledataFilter] = useState([]);

  var UserDetails = user.user;

  var RoleId = UserDetails.Id;

  var UserRoleBar = () => {
    UserDetail(RoleId).then(handleResponse).then(processData).catch(handleError);
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };
  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const processData = (data) => {
    if (data.Status) {
      setShowView(data.permissions.canView === true);
      setShowEdit(data.permissions.canEdit === true);
      setShowDelete(data.permissions.canDelete === true);
    } else {
      alert('User Not Found');
    }
  };

  useEffect(() => {
    UserRoleBar();
  }, []);

  var getUserData = async () => {
    Get(Api.RegisterAPiGet).then(handleResponse).then(processGet).catch(handleError);
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
  const UsersDeletes = async (Id) => {
    var raw = JSON.stringify({
      user_status: false
    });

    Update(`${Api.RegisterAPiGet}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getUserData();
    } else {
      getUserData();
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  var UserUpdate = (id) => {
    navigator(`/backend/users?Id=${id}`);
  };

  var UserView = (id) => {
    navigator(`/backend/userview?Id=${id}`);
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      UsersDeletes(Id);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };
  var Deletes = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };

  var columns = [
    {
      name: 'Frist Name',
      selector: (row) => {
        if (row.user_status == true) {
          return <>{row.first_name}</>;
        }
      },
      sortable: true
    },
    {
      name: 'Last Name',
      selector: (row) => {
        if (row.user_status == true) {
          return <>{row.last_name}</>;
        }
      },
      sortable: true
    },
    {
      name: 'Registered Date',
      selector: (row) => {
        if (row.user_status == true) {
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
        if (row.user_status == true) {
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
        return (
          <>
            {row.user_status && ShowView && (
              <IconButton>
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => UserView(row.Id)}
                >
                  <Icon className="democssicon">visibility</Icon>
                </Fab>
              </IconButton>
            )}
            {row.user_status && ShowEdit && (
              <IconButton>
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => UserUpdate(row.Id)}
                >
                  <Icon className="democssicon">edit_icon</Icon>
                </Fab>
              </IconButton>
            )}

            {row.user_status && ShowDelete && (
              <IconButton>
                <Fab
                  onClick={() => Deletes(row.Id)}
                  className="button democss margin"
                  aria-label="Delete"
                  variant="outlined"
                >
                  <Icon className="democssicon">delete</Icon>
                </Fab>
              </IconButton>
            )}
          </>
        );
      },
      sortable: true
    }
  ];

  useEffect(() => {
    var result = UserTabledata.filter((User) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (User.user_status == true) {
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
        Deletes(UserID);
        setUserTabledataFilter(differenceBy(UserTabledataFilter, 'Title'));
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
          <>
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

            <div>
              {' '}
              <Link to="/backend/user-manage" className="btn btn-primary form-control m-1 mb-4 ">
                <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> New User
              </Link>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
