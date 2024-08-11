import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import { Button, Fab, Icon, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { differenceBy } from 'lodash';

import Get from '../Function/Get';
import Update from '../Function/Update';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';

export default function EnquiresTable() {
  var navigator = useNavigate();

  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [EnquiryTabledata, setEnquiryTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [EnquiryTabledataFilter, setEnquiryTabledataFilter] = useState([]);
  var [TableCategory, setTableCategory] = useState('');

  useEffect(() => {
    var result = EnquiryTabledata.filter((Enquiry) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Enquiry.EnquiryisActive == true && Enquiry.Email != null) {
        return Enquiry.SourcePage.toLowerCase().includes(Search.toLowerCase());
      }
    });

    setEnquiryTabledataFilter(result);
  }, [Search, EnquiryTabledata, TableCategory]);

  var getEnquiryData = async () => {
    Get(Api.EnquiryGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setEnquiryTabledata(result.result);
      setEnquiryTabledataFilter(result.result);
    } else {
      setEnquiryTabledata(result.result);
      setEnquiryTabledataFilter(result.result);
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

  const EnquiresTrashed = async (Id) => {
    var raw = JSON.stringify({
      EnquiryisActive: false
    });
    Update(`${Api.EnquiryGetAPi}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getEnquiryData();
    } else {
      getEnquiryData();
    }
  };
  useEffect(() => {
    getEnquiryData();
  }, []);

  var EnquiryUpdate = (id) => {
    navigator(`/backend/update-contact-enquires?enquiresId=${id}`);
  };
  var EnquiresTrash = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      EnquiresTrashed(Id);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  var columns = [
    {
      name: 'Name',
      selector: (row) => {
        if (row.EnquiryisActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Name }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: 'Email ',
      selector: (row) => {
        if (row.EnquiryisActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Email }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: 'Created Date',
      selector: (row) => {
        if (row.EnquiryisActive == true) {
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
      name: 'Source ',
      selector: (row) => {
        if (row.EnquiryisActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.SourcePage }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: <div class="form-check-inline m-4 mb-0 mt-0 text-center">Action</div>,
      cell: (row) => {
        if (row.EnquiryisActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => EnquiryUpdate(row.Id)}
                  >
                    <Icon className="democssicon">visibility</Icon>
                  </Fab>
                </IconButton>{' '}
                <IconButton>
                  <Fab
                    onClick={() => EnquiresTrash(row.Id)}
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

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.Id);

      const EnquiryID = Id.toString();

      if (EnquiryID != null) {
        EnquiresTrash(EnquiryID);
        setEnquiryTabledataFilter(differenceBy(EnquiryTabledataFilter, 'Name'));
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
    EnquiryTabledataFilter,
    selectedRows,
    setEnquiryTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.EnquiryGetAPi
  ]);

  return (
    <div>
      <DataTable
        style={{ width: '100%' }}
        columns={columns}
        data={EnquiryTabledataFilter}
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
    </div>
  );
}
