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
export default function QuickLinkTrash() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [QuickTabledata, setQuickTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [QuickTabledataFilter, setQuickTabledataFilter] = useState([]);

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
      setQuickTabledata(result.result);
      setQuickTabledataFilter(result.result);
    } else {
      setQuickTabledata(result.result);
      setQuickTabledataFilter(result.result);
    }
  };

  var getQuickData = async () => {
    Get(Api.QuickLinkGetSite).then(handleResponse).then(processGet).catch(handleError);
  };

  var handleDelete = async (Id) => {
    Deletes(`${Api.QuickLinkGetSite}?Id=${Id}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };

  const processDelete = (result) => {
    if (result.Status) {
      getQuickData();
    } else {
      getQuickData();
    }
  };

  const processUpdate = (result) => {
    if (result.Status) {
      getQuickData();
    } else {
      getQuickData();
    }
  };
  var QuickRestore = async (Id) => {
    var raw = JSON.stringify({
      QuickLinkIsActive: true
    });
    Update(`${Api.QuickLinkGetSite}?Id=${Id}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  useEffect(() => {
    getQuickData();
  }, []);

  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      QuickRestore(Id);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
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

  const QuickDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };
  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.QuickLinkIsActive != true) {
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
      name: 'Link',
      selector: (row) => {
        if (row.QuickLinkIsActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.PermaLink }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: 'Author',
      selector: (row) => {
        if (row.QuickLinkIsActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.Author }} />
            </>
          );
        }
      },
      sortable: true
    },

    {
      name: ' Date',
      selector: (row) => {
        if (row.QuickLinkIsActive != true) {
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
        if (row.QuickLinkIsActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  onClick={() => Restore(row.Id)}
                  color="secondary"
                  aria-label="Edit"
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => QuickDeletes(row.Id)}
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
    var result = QuickTabledata.filter((Quick) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Quick.QuickLinkIsActive == false) {
        return Quick.Title.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setQuickTabledataFilter(result);
  }, [Search, QuickTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.Id);
      const Ids = Id.toString();

      if (Ids != null) {
        Restore(Ids);
        setQuickTabledataFilter(differenceBy(QuickTabledataFilter, 'Title'));
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.Id);
      const IdP = Id.toString();

      if (IdP != null) {
        QuickDeletes(IdP);
        setQuickTabledataFilter(differenceBy(QuickTabledataFilter, 'Title'));
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
    QuickTabledataFilter,
    selectedRows,
    setQuickTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.QuickLinkGetSite
  ]);

  return (
    <div>
      <>
        {' '}
        <DataTable
          data={QuickTabledataFilter}
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
                placeholder="Search by keyword...."
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
