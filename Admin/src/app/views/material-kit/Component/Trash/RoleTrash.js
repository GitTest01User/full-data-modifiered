import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';

import { differenceBy } from 'lodash';

import UserIsLogin from '../UserLogin/UserIsLogin';
import Update from '../Function/Update';
import Delete from '../Function/Delete';

import { useAuthContext } from 'Context/AuthContext';

import Get from '../Function/Get';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';
export default function RoleTrash() {
  var { user } = useAuthContext();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [UserTabledata, setUserTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [UserTabledataFilter, setUserTabledataFilter] = useState([]);
  var [ShowEdit, setShowEdit] = useState(false);

  var [ShowDelete, setShowDelete] = useState(false);
  var UserDetail = user.user;

  var RoleId = UserDetail.user_role_Id;

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const processData = (data) => {
    if (data.Status) {
      setShowEdit(data.permissions.canEdit === true);
      setShowDelete(data.permissions.canDelete === true);
    } else {
      alert('User Not Found');
    }
  };

  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var UserRoleBar = () => {
    UserIsLogin(RoleId).then(handleResponse).then(processData).catch(handleError);
  };
  useEffect(() => {
    UserRoleBar();
  }, []);
  var getUserData = async () => {
    Get(Api.RoleAPiGet).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (data) => {
    if (data.Status) {
      setUserTabledata(data.result);
      setUserTabledataFilter(data.result);
    } else {
      setUserTabledata(data.result);
      setUserTabledataFilter(data.result);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  var UserRestore = async (Id) => {
    var raw = JSON.stringify({
      IsActive: true
    });
    Update(`${Api.RoleAPiGet}?RoleId=${Id}`, raw)
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

  var handleDelete = async (Id) => {
    Delete(`${Api.RoleAPiGet}?RoleId=${Id}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };

  const processDelete = (data) => {
    if (data.Status) {
      getUserData();
    } else {
      getUserData();
    }
  };

  const processRestore = (result, FAQId) => {
    if (result.isConfirmed) {
      UserRestore(FAQId);
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
  const UserDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };

  var Restores = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };

  var columns = [
    {
      name: ' Role',
      selector: (row) => {
        if (row.IsActive != true) {
          return <>{row.RoleName}</>;
        }
      },
      sortable: true
    },

    {
      name: 'Created Date',
      selector: (row) => {
        if (row.IsActive != true) {
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
        if (row.IsActive != true) {
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
            {row.IsActive ||
              (ShowEdit && (
                <IconButton>
                  {' '}
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => Restores(row.RoleId)}
                  >
                    <Icon className="democssicon">restore_icon</Icon>
                  </Fab>
                </IconButton>
              ))}

            {row.IsActive ||
              (ShowDelete && (
                <IconButton>
                  <Fab
                    onClick={() => UserDeletes(row.RoleId)}
                    className="button democss"
                    aria-label="Delete"
                    variant="outlined"
                  >
                    <Icon className="democssicon">delete</Icon>
                  </Fab>
                </IconButton>
              ))}
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
      if (User.IsActive == false) {
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
        Restores(RoleID);
        setUserTabledataFilter(differenceBy(UserTabledataFilter, 'RoleName'));
      }
    };
    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.RoleId);
      const RoleID = Id.toString();

      if (RoleID != null) {
        UserDeletes(RoleID);
        setUserTabledataFilter(differenceBy(UserTabledataFilter, 'RoleName'));
      }
    };

    return (
      <>
        <Button onClick={handleDelete} className="btn-primary form-control  w-50 w-auto btn-class ">
          Restore
        </Button>
        <Button
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
    Api.RoleAPiGet
  ]);
  return (
    <div>
      <>
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
