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

import UserIsLogin from '../UserLogin/UserIsLogin';
import Update from '../Function/Update';

import Get from '../Function/Get';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
export default function UserTable() {
  var { user } = useAuthContext();

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [UserTabledata, setUserTabledata] = useState([]);
  var [ShowEdit, setShowEdit] = useState(false);

  var [ShowDelete, setShowDelete] = useState(false);
  var [Search, setSearchTable] = useState('');
  var [UserTabledataFilter, setUserTabledataFilter] = useState([]);
  var UserDetail = user.user;

  var RoleId = UserDetail.user_role_Id;

  const processData = (data) => {
    if (data.Status) {
      setShowEdit(data.permissions.canEdit === true);
      setShowDelete(data.permissions.canDelete === true);
    } else {
      alert('User Not Found');
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

  var UserRoleBar = () => {
    UserIsLogin(RoleId).then(handleResponse).then(processData).catch(handleError);
  };

  var getUserData = async () => {
    Get(Api.RoleAPiGet).then(handleResponse).then(processGet).catch(handleError);
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

  var UserTrash = (id) => {
    ActionSweet('Trash').then((result) => processTrash(result, id));
  };

  const processTrash = (result, FAQId) => {
    if (result.isConfirmed) {
      UsersDeletes(FAQId);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const UsersDeletes = async (Id) => {
    var raw = JSON.stringify({
      IsActive: false
    });
    Update(`${Api.RoleAPiGet}?RoleId=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  useEffect(() => {
    UserRoleBar();
    getUserData();
  }, []);

  var UserUpdate = (id) => {
    navigator(`/backend/update-role?roleId=${id}`);
  };

  var columns = [
    {
      name: 'Role',
      selector: (row) => {
        if (row.IsActive == true) {
          return <>{row.RoleName}</>;
        }
      },
      sortable: true
    },

    {
      name: 'Created Date',
      selector: (row) => {
        if (row.IsActive == true) {
          return (
            <>
              <span>
                Created Date :<br></br> {dateFormat(row.CreatedDate, 'mmmm dS, yyyy')}{' '}
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
        if (row.IsActive == true) {
          return (
            <>
              <span>
                Modified :<br></br> {dateFormat(row.ModifiedDate, 'mmmm dS, yyyy')}{' '}
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
        return (
          <>
            {row.IsActive && ShowEdit && (
              <IconButton>
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => UserUpdate(row.RoleId)}
                >
                  <Icon className="democssicon">edit_icon</Icon>
                </Fab>
              </IconButton>
            )}

            {row.IsActive && ShowDelete && (
              <IconButton>
                <Fab
                  onClick={() => UserTrash(row.RoleId)}
                  className="button democss"
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
      if (User.IsActive == true) {
        return User.RoleName.toLowerCase().includes(Search.toLowerCase());
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
      const Id = selectedRows.map((r) => r.RoleId);
      const RoleID = Id.toString();

      if (RoleID != null) {
        UserTrash(RoleID);
        setUserTabledataFilter(differenceBy(UserTabledataFilter, 'RoleName'));
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
    Api.RoleAPiGet
  ]);

  const processUpdate = (data) => {
    if (data.Status) {
      getUserData();
    } else {
      getUserData();
    }
  };
  return (
    <div>
      <>
        {' '}
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
                  placeholder="Search by keyword...."
                  className=" form-control m-1 mb-4 w-auto"
                  value={Search}
                  onChange={(e) => setSearchTable(e.target.value)}
                />
              </div>
              <div>
                <Link to="/backend/role-manage" className="btn btn-primary form-control m-1 mb-4 ">
                  <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Role
                </Link>
              </div>
            </>
          }
          subHeaderAlign="right"
        />
      </>
    </div>
  );
}
