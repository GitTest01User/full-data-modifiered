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
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';

export default function StoriesTable(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [StoriesTabledata, setStoriesTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [StoriesTabledataFilter, setStoriesTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getStoriesData = async () => {
    Get(Api.StoriesGetApi).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setStoriesTabledata(result.result);
      setStoriesTabledataFilter(result.result);
    } else {
      setStoriesTabledata(result.result);
      setStoriesTabledataFilter(result.result);
    }
  };
  const StoriessDeletes = async (StoriesId) => {
    var raw = JSON.stringify({
      StoriesisActive: false
    });

    Update(`${Api.StoriesGetApi}?StoriesId=${StoriesId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getStoriesData();
    } else {
      getStoriesData();
    }
  };

  useEffect(() => {
    getStoriesData();
  }, []);
  var StoriesUpdate = (id) => {
    navigator(`/backend/update-stories?storiesId=${id}`);
  };
  var StoriesTrash = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      StoriessDeletes(Id);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  var columns = [
    {
      name: 'Title ',
      selector: (row) => {
        if (row.StoriesisActive == true) {
          return <>{row.StoriesTitle}</>;
        }
      },
      sortable: true
    },
    {
      name: 'feature Image',
      selector: (row) => {
        if (row.StoriesisActive == true) {
          return (
            <>
              {' '}
              <img
                className="Image-table"
                src={row.StoriesImage ? `${Api.BaseURL}/${row.StoriesImage}` : '/demo.png'}
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
        if (row.StoriesisActive == true) {
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
        if (row.StoriesisActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => StoriesUpdate(row.StoriesId)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>
                <IconButton>
                  <Fab
                    onClick={() => StoriesTrash(row.StoriesId)}
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
    var result = StoriesTabledata.filter((Stories) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Stories.StoriesisActive == true) {
        return Stories.StoriesTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setStoriesTabledataFilter(result);
  }, [Search, StoriesTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.StoriesId);
      const StoriesID = Id.toString();

      if (StoriesID != null) {
        StoriesTrash(StoriesID);
        setStoriesTabledataFilter(differenceBy(StoriesTabledataFilter, 'StoriesTitle'));
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
    StoriesTabledataFilter,
    selectedRows,
    setStoriesTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.OngoingOffersGetAPi
  ]);

  return (
    <div>
      <>
        <DataTable
          data={StoriesTabledataFilter}
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
                  placeholder="Search by keyword..."
                  className=" form-control m-1 mb-4 w-auto"
                  value={Search}
                  onChange={(e) => setSearchTable(e.target.value)}
                />
              </div>
              <div class="jBBxnG justify-content-end mb-3 justify-content-lg-start">
                <Link
                  key="add"
                  to="/backend/manage-stories"
                  className="btn-primary form-control mb-4 w-50 w-auto btn-class"
                >
                  <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Stories
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
