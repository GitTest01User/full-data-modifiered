import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';

import { differenceBy } from 'lodash';

import Get from '../Function/Get';
import Deletes from '../Function/Delete';
import Update from '../Function/Update';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
export default function PartnerTrash(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [PartnerTabledata, setPartnerTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [PartnerTabledataFilter, setPartnerTabledataFilter] = useState([]);

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
      setPartnerTabledata(result.result);
      setPartnerTabledataFilter(result.result);
    } else {
      setPartnerTabledata(result.result);
      setPartnerTabledataFilter(result.result);
    }
  };
  var getPartnerData = async () => {
    Get(Api.PartnerGetApi).then(handleResponse).then(processGet).catch(handleError);
  };

  var handleDelete = async (PartnerId) => {
    Deletes(`${Api.PartnerGetApi}?PartnerId=${PartnerId}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (result) => {
    if (result.Status) {
      getPartnerData();
    } else {
      getPartnerData();
    }
  };

  useEffect(() => {
    getPartnerData();
  }, []);

  const processRestore = (result, id) => {
    if (result.isConfirmed) {
      PartnerRestore(id);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const processDeleted = (result, id) => {
    if (result.isConfirmed) {
      handleDelete(id);
      ConfirmedSweet('Delete');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  var Restore = (id) => {
    ActionSweet('Restore').then((result) => processRestore(result, id));
  };
  var Deleted = (id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, id));
  };

  var PartnerRestore = async (PartnerId) => {
    var raw = JSON.stringify({
      PartnerISActive: true
    });
    Update(`${Api.PartnerGetApi}?PartnerId=${PartnerId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      getPartnerData();
    } else {
      getPartnerData();
    }
  };
  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.PartnerISActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.PartnerTitle }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: 'feature Image',
      selector: (row) => {
        if (row.PartnerISActive != true) {
          return (
            <>
              <img
                className="Image-table"
                src={row.PartnerImage ? `${Api.BaseURL}/${row.PartnerImage}` : '/demo.png'}
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
        if (row.PartnerISActive != true) {
          return (
            <>
              <span>
                Published <br></br> {dateFormat(row.PartnerDate, 'mmmm dS, yyyy')}{' '}
              </span>
            </>
          );
        }
      },

      sortable: true
    },
    {
      name: 'Action',
      cell: (row) => {
        if (row.PartnerISActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => Restore(row.PartnerId)}
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => Deleted(row.PartnerId)}
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
    var result = PartnerTabledata.filter((Partner) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Partner.PartnerISActive != true) {
        return Partner.PartnerTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setPartnerTabledataFilter(result);
  }, [Search, PartnerTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.PartnerId);
      const PartnerID = Id.toString();

      if (PartnerID != null) {
        Restore(PartnerID);
        setPartnerTabledataFilter(differenceBy(PartnerTabledataFilter, 'PartnerTitle'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.PartnerId);
      const PartnerID = Id.toString();

      if (PartnerID != null) {
        Deleted(PartnerID);
        setPartnerTabledataFilter(differenceBy(PartnerTabledataFilter, 'PartnerTitle'));
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
    PartnerTabledataFilter,
    selectedRows,
    setPartnerTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.PartnerGetApi
  ]);
  return (
    <div>
      <>
        {' '}
        <DataTable
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
          data={PartnerTabledataFilter}
          subHeaderComponent={
            <div class="jBBxnG justify-content-end justify-content-lg-start">
              <h6 className=" m-1 mb-4">
                <img src="/loupe.png" style={{ width: '18px' }} /> Search :
              </h6>
              <input
                type="text"
                placeholder=" Search by keyword..."
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
