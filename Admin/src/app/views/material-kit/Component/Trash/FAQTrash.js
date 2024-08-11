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
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';
export default function FAQTrash() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  var [Search, setSearchTable] = useState('');
  var [FAQTabledataFilter, setFAQTabledataFilter] = useState([]);

  var [FAQTabledata, setFAQTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [FAQTabledataFilter, setFAQTabledataFilter] = useState([]);

  const handleCategoryChange = (category) => {
    setSelectedRows([]);
    setToggleCleared(!toggleCleared);
    var result = FAQTabledata.filter((FAQ) => {
      if (FAQ.FAQISActive != true && FAQ.FAQContents != null) {
        return FAQ.ParentId.toString().includes(category.toLowerCase());
      }
    });
    setFAQTabledataFilter(result);
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

  var getFAQData = async () => {
    Get(Api.FAQGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };

  const processGet = (result) => {
    if (result.Status) {
      setFAQTabledata(result.result);
      setFAQTabledataFilter(result.result);
    } else {
      setFAQTabledata(result.result);
      setFAQTabledataFilter(result.result);
    }
  };

  var handleDelete = async (Id) => {
    Deletes(`${Api.FAQGetAPi}?FAQId=${Id}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (result) => {
    if (result.Status) {
      getFAQData();
    } else {
      getFAQData();
    }
  };

  var FAQRestore = async (FAQId) => {
    var raw = JSON.stringify({
      FAQISActive: true
    });

    Update(`${Api.FAQGetAPi}?FAQId=${FAQId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (result) => {
    if (result.Status) {
      getFAQData();
    } else {
      getFAQData();
    }
  };

  const processRestore = (result, FAQId) => {
    if (result.isConfirmed) {
      FAQRestore(FAQId);
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
  const FAQsDeletes = async (FAQId) => {
    ActionSweet('Delete').then((result) => processDeleted(result, FAQId));
  };

  var RestoreData = (FAQId) => {
    ActionSweet('Restore').then((result) => processRestore(result, FAQId));
  };

  useEffect(() => {
    getFAQData();
  }, []);

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.FAQISActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.FAQTitle.substring(0, 20) + '....' }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: ' Author',
      selector: (row) => {
        if (row.FAQISActive != true) {
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
        if (row.FAQISActive != true) {
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
        if (row.FAQISActive != true) {
          return (
            <>
              <IconButton>
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => RestoreData(row.FAQId)}
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => FAQsDeletes(row.FAQId)}
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
    var result = FAQTabledata.filter((FAQ) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (FAQ.FAQISActive != true && FAQ.FAQContents != null) {
        return FAQ.FAQTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setFAQTabledataFilter(result);
  }, [Search, FAQTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.FAQId);
      const FaqID = Id.toString();

      if (FaqID != null) {
        RestoreData(FaqID);
        setFAQTabledataFilter(differenceBy(FAQTabledataFilter, 'FAQTitle'));
      }
    };
    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.FAQId);
      const FaqID = Id.toString();

      if (FaqID != null) {
        FAQsDeletes(FaqID);
        setFAQTabledataFilter(differenceBy(FAQTabledataFilter, 'FAQTitle'));
      }
    };

    return (
      <>
        {' '}
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
    FAQTabledataFilter,
    selectedRows,
    setFAQTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.FAQGetAPi
  ]);
  return (
    <div>
      <>
        <DataTable
          style={{ width: '100%' }}
          columns={columns}
          data={FAQTabledataFilter}
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
                  placeholder="Search by keyword...."
                  className=" form-control m-1 mb-4 w-auto"
                  value={Search}
                  onChange={(e) => setSearchTable(e.target.value)}
                />
              </div>

              <div className="jBBxnG justify-content-end">
                <h6 className=" m-1 mb-4">
                  <img src="/sort.png" style={{ width: '20px' }} /> Filter by:
                </h6>
                <select
                  className="form-select m-1 mb-4 w-50"
                  aria-label="Default select example"
                  onChange={(e) => handleCategoryChange(e.target.value)}
                >
                  <option value="">---Select Category---</option>
                  {FAQTabledata.map((obj) => {
                    if (
                      obj.FAQISActive == true &&
                      obj.IsHeading != null &&
                      obj.FAQContents == null
                    ) {
                      return <option value={obj.ParentId}>{obj.FAQTitle}</option>;
                    }
                  })}
                </select>
              </div>
            </>
          }
          subHeaderAlign="right"
        />
      </>
    </div>
  );
}
