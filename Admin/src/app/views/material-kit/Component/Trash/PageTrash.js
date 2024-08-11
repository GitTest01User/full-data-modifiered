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
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
export default function PageTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [PageTabledata, setPageTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [PageTabledataFilter, setPageTabledataFilter] = useState([]);
  var [TableCategory, setTableCategory] = useState('');

  useEffect(() => {
    var result = PageTabledata.filter((Page) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Page.PolicyConditionisActive == false) {
        return Page.Title.toLowerCase().includes(Search.toLowerCase());
      }
    });

    setPageTabledataFilter(result);
  }, [Search, PageTabledata, TableCategory]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };
  var getPageData = async () => {
    Get(Api.PolicyDetailGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setPageTabledata(result.result);
      setPageTabledataFilter(result.result);
    } else {
      setPageTabledata(result.result);
      setPageTabledataFilter(result.result);
    }
  };

  useEffect(() => {
    getPageData();
  }, []);

  const processUpdate = (result) => {
    if (result.Status) {
      getPageData();
    } else {
      getPageData();
    }
  };
  var PageRestore = async (Id) => {
    var raw = JSON.stringify({
      PolicyConditionisActive: true
    });

    Update(`${Api.PolicyDetailGetAPi}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };

  const processRestore = (result, FAQId) => {
    if (result.isConfirmed) {
      PageRestore(FAQId);
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

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.PolicyConditionisActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Title }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: 'Route ',
      selector: (row) => {
        if (row.PolicyConditionisActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Route }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: ' Date',
      selector: (row) => {
        if (row.PolicyConditionisActive != true) {
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
      name: 'Action',
      cell: (row) => {
        if (row.PolicyConditionisActive != true) {
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
                  onClick={() => PageDeletes(row.Id)}
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

  const processDelete = (result) => {
    if (result.Status) {
      getPageData();
    } else {
      getPageData();
    }
  };
  const PageDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };

  var handleDelete = async (Id) => {
    Deletes(`${Api.PolicyDetailGetAPi}?Id=${Id}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.Id);
      const PageID = Id.toString();

      if (PageID != null) {
        Restore(PageID);
        setPageTabledataFilter(differenceBy(PageTabledataFilter, 'Title'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const PageID = Id.toString();

      if (PageID != null) {
        PageDeletes(PageID);
        setPageTabledataFilter(differenceBy(PageTabledataFilter, 'Title'));
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
    PageTabledataFilter,
    selectedRows,
    setPageTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.PolicyDetailGetAPi
  ]);
  return (
    <div>
      <>
        <DataTable
          style={{ width: '100%' }}
          columns={columns}
          data={PageTabledataFilter}
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
            </>
          }
          subHeaderAlign="right"
        />
      </>
    </div>
  );
}
