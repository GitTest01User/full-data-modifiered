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

export default function TestimonialsTable() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);
  var navigator = useNavigate();

  var [TestimonialsTabledata, setTestimonialsTabledata] = useState([]);
  var [Search, setSearchTable] = useState('');
  var [TestimonialsTabledataFilter, setTestimonialsTabledataFilter] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var getTestimonialsData = async () => {
    Get(`${Api.TestimonialsGetApi}?RoleTestimanial=${'Customer'}`)
      .then(handleResponse)
      .then(processGet)
      .catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setTestimonialsTabledata(result.result);
      setTestimonialsTabledataFilter(result.result);
    } else {
      setTestimonialsTabledata(result.result);
      setTestimonialsTabledataFilter(result.result);
    }
  };

  useEffect(() => {
    getTestimonialsData();
  }, []);
  var TestimonialsUpdate = (id) => {
    navigator(`/backend/update-testimonials?testimonialId=${id}`);
  };

  const processTrash = (result, Id) => {
    if (result.isConfirmed) {
      TestimonialssDeletes(Id);
      ConfirmedSweet('Trash');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };
  var TrashBox = (Id) => {
    ActionSweet('Trash').then((result) => processTrash(result, Id));
  };

  const TestimonialssDeletes = async (Testimonialid) => {
    var raw = JSON.stringify({
      TestimanialisActive: false
    });

    Update(`${Api.TestimonialsGetApi}?Testimonialid=${Testimonialid}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  const processUpdate = (data) => {
    if (data.Status) {
      getTestimonialsData();
    } else {
      getTestimonialsData();
    }
  };

  var columns = [
    {
      name: 'Name',
      selector: (row) => {
        if (row.TestimanialisActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.TestimonialName }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: ' Address',
      selector: (row) => {
        if (row.TestimanialisActive == true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.TestimonialAddress }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: ' Date',
      selector: (row) => {
        if (row.TestimanialisActive == true) {
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
      name: 'feature Image',
      selector: (row) => {
        if (row.TestimanialisActive == true) {
          return (
            <>
              {' '}
              <img
                className="Image-table"
                src={row.TestimonialImage ? `${Api.BaseURL}/${row.TestimonialImage}` : '/demo.png'}
              />
            </>
          );
        }
      },

      sortable: true
    },
    {
      name: <div class="form-check-inline m-4 mb-0 mt-0 text-center">Action</div>,
      cell: (row) => {
        if (row.TestimanialisActive == true) {
          return (
            <>
              <>
                {' '}
                <IconButton>
                  <Fab
                    onClick={() => TestimonialsUpdate(row.Testimonialid)}
                    className="button democss"
                    color="secondary"
                    aria-label="Edit"
                  >
                    <Icon className="democssicon">edit_icon</Icon>
                  </Fab>
                </IconButton>
                <IconButton>
                  <Fab
                    onClick={() => TrashBox(row.Testimonialid)}
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
    var result = TestimonialsTabledata.filter((Testimonials) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Testimonials.TestimanialisActive == true) {
        return Testimonials.TestimonialName.toLowerCase().includes(Search.toLowerCase());
      }
    });
    setTestimonialsTabledataFilter(result);
  }, [Search, TestimonialsTabledata]);

  const actions = <></>;

  const handleRowSelected = React.useCallback((state) => {
    setSelectedRows(state.selectedRows);
  }, []);

  const contextActions = React.useMemo(() => {
    const handleDelete = () => {
      const Id = selectedRows.map((r) => r.Testimonialid);
      const TestimonalID = Id.toString();

      if (TestimonalID != null) {
        TrashBox(TestimonalID);
        setTestimonialsTabledataFilter(
          differenceBy(TestimonialsTabledataFilter, 'TestimonialName')
        );
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
    TestimonialsTabledataFilter,
    selectedRows,
    setTestimonialsTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.TestimonialsGetApi
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
        data={TestimonialsTabledataFilter}
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
                to="/backend/manage-testimonials"
                className="btn-primary form-control m-3 mb-4 w-50 w-auto btn-class"
              >
                <img src="/add.png" width={16} style={{ filter: ' invert(1)' }} /> Add Testimonials
              </Link>
            </div>
          </>
        }
        subHeaderAlign="right"
      />
    </div>
  );
}
