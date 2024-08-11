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
export default function OngoingOffersTrash(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [OngoingOffersTabledata, setOngoingOffersTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [OngoingOffersTabledataFilter, setOngoingOffersTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };
  var getOngoingOffersData = async () => {
    Get(Api.OngoingOffersGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setOngoingOffersTabledata(result.result);
      setOngoingOffersTabledataFilter(result.result);
    } else {
      setOngoingOffersTabledata(result.result);
      setOngoingOffersTabledataFilter(result.result);
    }
  };

  var handleDeletes = async (OngoingOffersId) => {
    Deletes(`${Api.OngoingOffersGetAPi}?OngoingOffersId=${OngoingOffersId}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };

  const processDelete = (result) => {
    if (result.Status) {
      getOngoingOffersData();
    } else {
      getOngoingOffersData();
    }
  };

  var OngoingOffersRestore = async (OngoingOffersId) => {
    var raw = JSON.stringify({
      OngoingOffersisActive: true
    });
    Update(`${Api.OngoingOffersGetAPi}?OngoingOffersId=${OngoingOffersId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      getOngoingOffersData();
    } else {
      getOngoingOffersData();
    }
  };

  useEffect(() => {
    getOngoingOffersData();
  }, []);

  const OngoingOfferssDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };
  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };

  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      OngoingOffersRestore(Id);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const processDeleted = (result, Id) => {
    if (result.isConfirmed) {
      handleDeletes(Id);
      ConfirmedSweet('Delete');
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
        if (row.OngoingOffersisActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.OngoingOffersTitle }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: 'feature Image',
      selector: (row) => {
        if (row.OngoingOffersisActive != true) {
          return (
            <>
              <img
                className="Image-table"
                src={
                  row.OngoingOffersImage ? `${Api.BaseURL}/${row.OngoingOffersImage}` : '/demo.png'
                }
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
        if (row.OngoingOffersisActive != true) {
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
        if (row.OngoingOffersisActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  onClick={() => Restore(row.OngoingOffersId)}
                  color="secondary"
                  aria-label="Edit"
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => OngoingOfferssDeletes(row.OngoingOffersId)}
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
    var result = OngoingOffersTabledata.filter((OngoingOffers) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (OngoingOffers.OngoingOffersisActive != true) {
        return OngoingOffers.OngoingOffersTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setOngoingOffersTabledataFilter(result);
  }, [Search, OngoingOffersTabledata]);

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const actions = <></>;

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.OngoingOffersId);
      const OfferID = Id.toString();

      if (OfferID != null) {
        Restore(OfferID);
        setOngoingOffersTabledataFilter(
          differenceBy(OngoingOffersTabledataFilter, 'OngoingOffersTitle')
        );
      }
    };
    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.OngoingOffersId);
      const OfferID = Id.toString();

      if (OfferID != null) {
        OngoingOfferssDeletes(OfferID);
        setOngoingOffersTabledataFilter(
          differenceBy(OngoingOffersTabledataFilter, 'OngoingOffersTitle')
        );
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
    OngoingOffersTabledataFilter,
    selectedRows,
    setOngoingOffersTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.OngoingOffersGetAPi
  ]);

  return (
    <div>
      <DataTable
        data={OngoingOffersTabledataFilter}
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
              placeholder="Search by keyword..."
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
