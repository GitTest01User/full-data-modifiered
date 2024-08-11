import Api from 'Service/Api';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import dateFormat from 'dateformat';
import DataTable from 'react-data-table-component';
import {
  Alert,
  Button,
  Dialog,
  Fab,
  Icon,
  IconButton,
  Snackbar,
  useMediaQuery
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { differenceBy } from 'lodash';

import { useTheme } from '@emotion/react';
import Get from '../../Function/Get';
import Updates from '../../Function/Update';
import ActionSweet from '../Dialog/ActionSweet';
import ConfirmedSweet from '../Dialog/ConfirmedSweet';
import Swal from 'sweetalert2';
import CancelledSweet from '../Dialog/CancelledSweet';

export default function FAQTable() {
  var [RowTrash, setRowTrash] = useState('');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  var navigator = useNavigate();
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  var [FAQTabledata, setFAQTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [FAQTabledataFilter, setFAQTabledataFilter] = useState([]);

  var [Search, setSearchTable] = useState('');
  var [FAQTabledataFilter, setFAQTabledataFilter] = useState([]);
  var [FAQTabledataFilter, setFAQTabledataFilter] = useState([]);
  var [TableCategory, setTableCategory] = useState('');

  const [selectedCategory, setSelectedCategory] = useState('');
  const processGet = (result) => {
    if (result.Status) {
      setFAQTabledata(result.result);
      setFAQTabledataFilter(result.result);
    } else {
      setFAQTabledata(result.result);
      setFAQTabledataFilter(result.result);
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

  var getFAQData = async () => {
    Get(Api.FAQGetAPi).then(handleResponse).then(processGet).catch(handleError);
  };
  var FaqTrash = (FAQId) => {
    ActionSweet('Trash').then((result) => processTrash(result, FAQId));
  };

  const processTrash = (result, FAQId) => {
    if (result.isConfirmed) {
      FAQUpdateYes(FAQId);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };
  var FAQUpdateYes = (FAQId) => {
    var raw = JSON.stringify({
      FAQISActive: false
    });
    Updates(`${Api.FAQGetAPi}?FAQId=${FAQId}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getFAQData();
    } else {
      getFAQData();
    }
  };
  useEffect(() => {
    setOpen(false);

    getFAQData();
  }, []);

  var FAQUpdate = (id) => {
    navigator(`/backend/update-category?headingId=${id}`);
  };

  const handleCategoryChange = (category) => {
    var result = FAQTabledata.filter((FAQ) => {
      if (FAQ.FAQISActive == true && FAQ.IsHeading != null) {
        return FAQ.FAQTitle.toLowerCase().includes(category.toLowerCase());
      }
    });
    setFAQTabledataFilter(result);
  };

  var columns = [
    {
      name: 'Title',
      selector: (row) => {
        if (row.FAQISActive === true && row.IsHeading !== null) {
          return (
            <div className="d-flex">
              <p
                className="p-0"
                dangerouslySetInnerHTML={{
                  __html: row.FaqFlag
                    ? '<img src="/red-flagtrue.png" width="20px" className="p-5"></img>'
                    : '<img src="/red-flagfalse.png" width="18px" className="p-5"></img>'
                }}
              />
              <p dangerouslySetInnerHTML={{ __html: row.FAQTitle.substring(0, 20) + '....' }} />
            </div>
          );
        }
        return null;
      },
      sortable: true
    },

    {
      name: 'Author',
      selector: (row) => {
        if (row.FAQISActive == true) {
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
        if (row.FAQISActive == true) {
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
        if (row.FAQISActive == true) {
          return (
            <>
              <>
                <IconButton>
                  <Fab
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                    onClick={() => FAQUpdate(row.FAQId)}
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>

                <IconButton>
                  <Fab
                    onClick={() => FaqTrash(row.FAQId)}
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
      }
    }
  ];

  useEffect(() => {
    var result = FAQTabledata.filter((FAQ) => {
      if (FAQ.FAQISActive == true && FAQ.FAQId == FAQ.ParentId) {
        return FAQ.FAQTitle.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setFAQTabledataFilter(result);
  }, [Search, FAQTabledata]);
  const actions = (
    <Link
      key="add"
      to="/backend/manage-faq-category"
      className="btn-primary form-control mb-4 w-50 w-auto btn-class"
    >
      <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> New Categories
    </Link>
  );

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.FAQId);
      const FaqID = Id.toString();

      if (FaqID != null) {
        FaqTrash(FaqID);
        setFAQTabledataFilter(differenceBy(FAQTabledataFilter, 'FAQTitle'));
      }
    };

    return (
      <Button key="delete" onClick={handleDelete} className="btn form-control  w-50 w-auto">
        Trash
      </Button>
    );
  }, [
    FAQTabledataFilter,
    selectedRows,
    setFAQTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.FAQGetAPi,
    setOpen
  ]);
  return (
    <div>
      {' '}
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
                selected={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                <option value="">---Select Category---</option>
                {FAQTabledata.map((obj) => {
                  if (obj.FAQISActive == true && obj.IsHeading != null) {
                    return <option value={obj.FAQTitle}>{obj.FAQTitle}</option>;
                  }
                })}
              </select>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
