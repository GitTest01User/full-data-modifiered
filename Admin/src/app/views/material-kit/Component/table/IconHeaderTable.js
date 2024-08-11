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

import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';
import Update from '../Function/Update';
export default function IconHeaderTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [IconHeaderTabledata, setIconHeaderTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [IconHeaderTabledataFilter, setIconHeaderTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getIconData = async () => {
    Get(Api.FollowGetHeaderIcon).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setIconHeaderTabledata(result.result);
      setIconHeaderTabledataFilter(result.result);
    } else {
      setIconHeaderTabledata(result.result);
      setIconHeaderTabledataFilter(result.result);
    }
  };
  const IconsTrashed = async (Id) => {
    var raw = JSON.stringify({
      FollowIsActive: false
    });

    Update(`${Api.FollowGetHeaderIcon}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (data) => {
    if (data.Status) {
      getIconData();
    } else {
      getIconData();
    }
  };
  useEffect(() => {
    getIconData();
  }, []);
  var IconUpdate = (id) => {
    navigator(`/backend/update-icon?followId=${id}`);
  };
  var IconTrash = (cardId) => {
    ActionSweet('Trash').then((result) => processRestore(result, cardId));
  };

  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      IconsTrashed(Id);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
    }
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.FollowIsActive == true) {
          return <>{row.Title}</>;
        }
      },
      sortable: true
    },
    {
      name: 'Icon',
      selector: (row) => {
        if (row.FollowIsActive == true) {
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
        if (row.FollowIsActive == true) {
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
        if (row.FollowIsActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => IconUpdate(row.Id)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>
                <IconButton>
                  <Fab
                    onClick={() => IconTrash(row.Id)}
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
    var result = IconHeaderTabledata.filter((Icon) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Icon.FollowIsActive == true) {
        return Icon.Title.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setIconHeaderTabledataFilter(result);
  }, [Search, IconHeaderTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const IconID = Id.toString();

      if (IconID != null) {
        IconTrash(IconID);
        setIconHeaderTabledataFilter(differenceBy(IconHeaderTabledataFilter, 'Title'));
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
    IconHeaderTabledataFilter,
    selectedRows,
    setIconHeaderTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.IconSliderGetAPi
  ]);
  return (
    <div>
      <DataTable
        data={IconHeaderTabledataFilter}
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
                to="/backend/manage-icon"
                className="btn-primary form-control mb-4 w-50 w-auto btn-class"
              >
                <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Icon
              </Link>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
