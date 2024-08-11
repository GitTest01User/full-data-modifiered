import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';

import { differenceBy } from 'lodash';
import Get from '../Function/Get';
import Update from '../Function/Update';
import Deletes from '../Function/Delete';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';
export default function StoriesTrash(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

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

  const processGet = (result) => {
    if (result.Status) {
      setStoriesTabledata(result.result);
      setStoriesTabledataFilter(result.result);
    } else {
      setStoriesTabledata(result.result);
      setStoriesTabledataFilter(result.result);
    }
  };

  var getStoriesData = async () => {
    Get(Api.StoriesGetApi).then(handleResponse).then(processGet).catch(handleError);
  };

  const processDelete = (data) => {
    if (data.Status) {
      getStoriesData();
    } else {
      getStoriesData();
    }
  };
  var handleDelete = async (StoriesId) => {
    Deletes(`${Api.StoriesGetApi}?StoriesId=${StoriesId}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getStoriesData();
    } else {
      getStoriesData();
    }
  };
  var StoriesRestore = async (StoriesId) => {
    var raw = JSON.stringify({
      StoriesisActive: true
    });

    Update(`${Api.StoriesGetApi}?StoriesId=${StoriesId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  useEffect(() => {
    getStoriesData();
  }, []);

  const processRestore = (result, FAQId) => {
    if (result.isConfirmed) {
      StoriesRestore(FAQId);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const processDeleted = (result, FAQId) => {
    if (result.isConfirmed) {
      handleDelete(FAQId);
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
  const StoriessDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.StoriesisActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.StoriesTitle }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: 'feature Image',
      selector: (row) => {
        if (row.StoriesisActive != true) {
          return (
            <>
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
        if (row.StoriesisActive != true) {
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
        if (row.StoriesisActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  onClick={() => Restore(row.StoriesId)}
                  color="secondary"
                  aria-label="Edit"
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => StoriessDeletes(row.StoriesId)}
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
    var result = StoriesTabledata.filter((Stories) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Stories.StoriesisActive == false) {
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
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.StoriesId);
      const StoriesID = Id.toString();

      if (StoriesID != null) {
        Restore(StoriesID);
        setStoriesTabledataFilter(differenceBy(StoriesTabledataFilter, 'StoriesTitle'));
      }
    };
    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.StoriesId);
      const StoriesID = Id.toString();

      if (StoriesID != null) {
        StoriessDeletes(StoriesID);
        setStoriesTabledataFilter(differenceBy(StoriesTabledataFilter, 'StoriesTitle'));
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
        {' '}
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
            <div class="jBBxnG justify-content-end justify-content-lg-start">
              <h6 className=" m-1 mb-4">
                <img src="/loupe.png" style={{ width: '18px' }} /> Search :
              </h6>
              <input
                type="text"
                placeholder="Stories by keyword..."
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
