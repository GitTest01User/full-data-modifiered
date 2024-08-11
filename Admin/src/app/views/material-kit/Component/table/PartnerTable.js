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

export default function PartnerTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

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

  var getPartnerData = async () => {
    Get(Api.PartnerGetApi).then(handleResponse).then(processGet).catch(handleError);
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

  useEffect(() => {
    getPartnerData();
  }, []);
  var PartnerUpdate = (id) => {
    navigator(`/backend/update-partner?partnerId=${id}`);
  };
  var PartnersTrash = (id) => {
    ActionSweet('Trash').then((result) => processTrash(result, id));
  };

  const processTrash = (result, FAQId) => {
    if (result.isConfirmed) {
      PartnersTrashed(FAQId);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };
  const PartnersTrashed = async (Id) => {
    var raw = JSON.stringify({
      PartnerISActive: false
    });

    Update(`${Api.PartnerGetApi}?PartnerId=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getPartnerData();
    } else {
      getPartnerData();
    }
  };
  var columns = [
    {
      name: 'Title ',
      selector: (row) => {
        if (row.PartnerISActive == true) {
          return <>{row.PartnerTitle}</>;
        }
      },
      sortable: true
    },
    {
      name: 'feature Image',
      selector: (row) => {
        if (row.PartnerISActive == true) {
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
        if (row.PartnerISActive == true) {
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
        if (row.PartnerISActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => PartnerUpdate(row.PartnerId)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>{' '}
                <IconButton>
                  <Fab
                    onClick={() => PartnersTrash(row.PartnerId)}
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
    var result = PartnerTabledata.filter((Partner) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Partner.PartnerISActive == true) {
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
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.PartnerId);
      const PartnerID = Id.toString();

      if (PartnerID != null) {
        PartnersTrash(PartnerID);
        setPartnerTabledataFilter(differenceBy(PartnerTabledataFilter, 'PartnerTitle'));
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
    PartnerTabledataFilter,
    selectedRows,
    setPartnerTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.PartnerGetApi
  ]);

  return (
    <div>
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
                to="/backend/manage-partner"
                className="btn-primary form-control mb-4 w-50 w-auto btn-class"
              >
                <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Partner
              </Link>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
