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
export default function OfficeDetailTable(props) {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [OpeningTabledata, setOpeningTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [OpeningTabledataFilter, setOpeningTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getOpeningData = async () => {
    Get(Api.FooterDetailSite).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setOpeningTabledata(result.result);
      setOpeningTabledataFilter(result.result);
    } else {
      setOpeningTabledata(result.result);
      setOpeningTabledataFilter(result.result);
    }
  };
  const OpeningsTrashed = async (Id) => {
    var raw = JSON.stringify({
      DetailsisActive: false
    });

    Update(`${Api.FooterDetailSite}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getOpeningData();
    } else {
      getOpeningData();
    }
  };
  useEffect(() => {
    getOpeningData();
  }, []);
  var OpeningUpdate = (id) => {
    navigator(`/backend/footer-detail-update?Id=${id}`);
  };

  var OpeningTrash = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };
  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      OpeningsTrashed(Id);
      ConfirmedSweet('Trash');
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
        if (row.DetailsisActive == true) {
          return <>{row.Title}</>;
        }
      },
      sortable: true
    },

    {
      name: 'Icon',
      selector: (row) => {
        if (row.DetailsisActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Icon }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: 'Created Date',
      selector: (row) => {
        if (row.DetailsisActive == true) {
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
        if (row.DetailsisActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => OpeningUpdate(row.Id)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>{' '}
                <IconButton>
                  <Fab
                    onClick={() => OpeningTrash(row.Id)}
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
    var result = OpeningTabledata.filter((Opening) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Opening.DetailsisActive == true) {
        return Opening.Title.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setOpeningTabledataFilter(result);
  }, [Search, OpeningTabledata]);

  const actions = <></>;
  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const Ids = Id.toString();

      if (
        window.confirm(`Are you sure you want to Trash:\r ${selectedRows.map((r) => r.Title)}?`)
      ) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
          DetailsisActive: false
        });

        Update(`${Api.FooterDetailSite}?Id=${Ids}`, raw)
          .then(handleResponse)
          .then(processUpdate)
          .catch(handleError);

        setToggleCleared(!toggleCleared);
        setOpeningTabledataFilter(differenceBy(OpeningTabledataFilter, selectedRows, 'Title'));
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
    OpeningTabledataFilter,
    selectedRows,
    setOpeningTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.FooterDetailSite
  ]);
  return (
    <div>
      <DataTable
        data={OpeningTabledataFilter}
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
            {' '}
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
            <div class="jBBxnG justify-content-end justify-content-lg-start mb-3">
              <Link
                key="add"
                to="/backend/manage-detail"
                className="btn-primary form-control m-3 mb-4 w-50 w-auto btn-class"
              >
                <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Details
              </Link>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
