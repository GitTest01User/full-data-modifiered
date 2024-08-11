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
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';

export default function OfferTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [OfferTabledata, setOfferTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [OfferTabledataFilter, setOfferTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getOfferData = async () => {
    Get(Api.OngoingOffersGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setOfferTabledata(result.result);
      setOfferTabledataFilter(result.result);
    } else {
      setOfferTabledata(result.result);
      setOfferTabledataFilter(result.result);
    }
  };
  const OffersTrashed = async (OngoingOffersId) => {
    var raw = JSON.stringify({
      OngoingOffersisActive: false
    });
    Update(`${Api.OngoingOffersGetAPi}?OngoingOffersId=${OngoingOffersId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getOfferData();
    } else {
      getOfferData();
    }
  };
  useEffect(() => {
    getOfferData();
  }, []);
  var OfferUpdate = (id) => {
    navigator(`/backend/update-offers?offersId=${id}`);
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      OffersTrashed(Id);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };
  var OffersTrash = (id) => {
    ActionSweet('Trash').then((result) => processTrash(result, id));
  };
  var columns = [
    {
      name: 'Title ',
      selector: (row) => {
        if (row.OngoingOffersisActive == true) {
          return <>{row.OngoingOffersTitle}</>;
        }
      },
      sortable: true
    },
    {
      name: 'feature Image',
      selector: (row) => {
        if (row.OngoingOffersisActive == true) {
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
        if (row.OngoingOffersisActive == true) {
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
        if (row.OngoingOffersisActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => OfferUpdate(row.OngoingOffersId)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>
                <IconButton>
                  <Fab
                    onClick={() => OffersTrash(row.OngoingOffersId)}
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
    var result = OfferTabledata.filter((Offer) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Offer.OngoingOffersisActive == true) {
        return Offer.OngoingOffersTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setOfferTabledataFilter(result);
  }, [Search, OfferTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.OngoingOffersId);
      const OfferID = Id.toString();

      if (OfferID != null) {
        OffersTrash(OfferID);
        setOfferTabledataFilter(differenceBy(OfferTabledataFilter, 'OngoingOffersTitle'));
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
    OfferTabledataFilter,
    selectedRows,
    setOfferTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.OngoingOffersGetAPi
  ]);

  return (
    <div>
      <DataTable
        data={OfferTabledataFilter}
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
                to="/backend/manage-offers"
                className="btn-primary form-control mb-4 w-50 w-auto btn-class"
              >
                <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Offers
              </Link>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
