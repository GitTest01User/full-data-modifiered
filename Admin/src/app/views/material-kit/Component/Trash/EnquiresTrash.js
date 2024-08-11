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
import Swal from 'sweetalert2';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
export default function EnquiresTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [EnquiresTabledata, setEnquiresTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [EnquiryTabledataFilter, setEnquiryTabledataFilter] = useState([]);
  var [TableCategory, setTableCategory] = useState('');

  useEffect(() => {
    var result = EnquiresTabledata.filter((Enquires) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Enquires.EnquiryisActive == false && Enquires.Email != null) {
        return Enquires.Name.toLowerCase().includes(Search.toLowerCase());
      }
    });

    setEnquiryTabledataFilter(result);
  }, [Search, EnquiresTabledata, TableCategory]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getEnquiresData = async () => {
    Get(Api.EnquiryGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setEnquiresTabledata(result.result);
      setEnquiryTabledataFilter(result.result);
    } else {
      setEnquiresTabledata(result.result);
      setEnquiryTabledataFilter(result.result);
    }
  };

  var handleDelete = async (Id) => {
    Deletes(`${Api.EnquiryGetAPi}?Id=${Id}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (result) => {
    if (result.Status) {
      getEnquiresData();
    } else {
      getEnquiresData();
    }
  };

  var EnquiresRestored = async (Id) => {
    var raw = JSON.stringify({
      EnquiryisActive: true
    });

    Update(`${Api.EnquiryGetAPi}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (result) => {
    if (result.Status) {
      getEnquiresData();
    } else {
      getEnquiresData();
    }
  };

  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };
  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      EnquiresRestored(Id);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  useEffect(() => {
    getEnquiresData();
  }, []);

  const EnquiressDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
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

  var columns = [
    {
      name: 'Name',
      selector: (row) => {
        if (row.EnquiryisActive != true) {
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
        if (row.EnquiryisActive != true) {
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
      name: ' Date',
      selector: (row) => {
        if (row.EnquiryisActive != true) {
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
      name: 'Source Page',
      selector: (row) => {
        if (row.EnquiryisActive != true) {
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
        if (row.EnquiryisActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => Restore(row.Id)}
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => EnquiressDeletes(row.Id)}
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

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.Id);
      const EnquiryID = Id.toString();

      if (EnquiryID != null) {
        Restore(EnquiryID);
        setEnquiryTabledataFilter(differenceBy(EnquiryTabledataFilter, 'Name'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const EnquiryID = Id.toString();

      if (EnquiryID != null) {
        EnquiressDeletes(EnquiryID);
        setEnquiryTabledataFilter(differenceBy(EnquiryTabledataFilter, selectedRows, 'Name'));
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
          <>
            <div class="jBBxnG justify-content-end justify-content-lg-start">
              <h6 className=" m-1 mb-4">
                <img src="/loupe.png" style={{ width: '18px' }} /> Search :
              </h6>
              <input
                type="text"
                placeholder=" Search by keyword...."
                className=" form-control m-1 mb-4 w-auto"
                value={Search}
                onChange={(e) => setSearchTable(e.target.value)}
              />
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
