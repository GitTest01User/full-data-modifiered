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
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
export default function PartnersTrash() {
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [toggleCleared, setToggleCleared] = React.useState(false);

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
    Get(`${Api.TestimonialsGetApi}?RoleTestimanial=${'Partners'}`)
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
  const TestimonialssDeletes = async (Id) => {
    ActionSweet('Delete').then((result) => processDeleted(result, Id));
  };

  var Restore = (Id) => {
    ActionSweet('Restore').then((result) => processRestore(result, Id));
  };

  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      TestimonialsRestore(Id);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  const processDeleted = (result, Id) => {
    if (result.isConfirmed) {
      handleDeletes(Id);
      ConfirmedSweet('Delete');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
    }
  };

  var handleDeletes = async (Testimonialid) => {
    Deletes(`${Api.TestimonialsGetApi}?Testimonialid=${Testimonialid}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (result) => {
    if (result.Status) {
      getTestimonialsData();
    } else {
      getTestimonialsData();
    }
  };

  const processUpdate = (result) => {
    if (result.Status) {
      getTestimonialsData();
    } else {
      getTestimonialsData();
    }
  };

  var TestimonialsRestore = async (Testimonialid) => {
    var raw = JSON.stringify({
      TestimanialisActive: true
    });
    Update(`${Api.TestimonialsGetApi}?Testimonialid=${Testimonialid}`, raw)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };

  useEffect(() => {
    getTestimonialsData();
  }, []);

  var columns = [
    {
      name: 'Name',
      selector: (row) => {
        if (row.TestimanialisActive != true) {
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
      name: 'Company Name',
      selector: (row) => {
        if (row.TestimanialisActive != true) {
          return (
            <>
              <p dangerouslySetInnerHTML={{ __html: row.CompanyName }} />
            </>
          );
        }
      },
      sortable: true
    },
    {
      name: 'Created Date',
      selector: (row) => {
        if (row.TestimanialisActive != true) {
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
        if (row.TestimanialisActive != true) {
          return (
            <>
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
        if (row.TestimanialisActive != true) {
          return (
            <>
              <IconButton>
                {' '}
                <Fab
                  className="button democss"
                  color="secondary"
                  aria-label="Edit"
                  onClick={() => Restore(row.Testimonialid)}
                >
                  <Icon className="democssicon">restore_icon</Icon>
                </Fab>
              </IconButton>
              <IconButton>
                <Fab
                  onClick={() => TestimonialssDeletes(row.Testimonialid)}
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
    var result = TestimonialsTabledata.filter((Testimonials) => {
      setSelectedRows([]);
      setToggleCleared(!toggleCleared);
      if (Testimonials.TestimanialisActive != true) {
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
    const handleDeleteCheckBox = () => {
      const Id = selectedRows.map((r) => r.Testimonialid);
      const TestimonialID = Id.toString();

      if (TestimonialID != null) {
        Restore(TestimonialID);
        setTestimonialsTabledataFilter(
          differenceBy(TestimonialsTabledataFilter, 'TestimonialName')
        );
      }
    };

    const handlePermanentlyDelete = () => {
      const Id = selectedRows.map((r) => r.Testimonialid);
      const TestimonialID = Id.toString();

      if (TestimonialID != null) {
        TestimonialssDeletes(TestimonialID);
        setTestimonialsTabledataFilter(
          differenceBy(TestimonialsTabledataFilter, 'TestimonialName')
        );
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
    TestimonialsTabledataFilter,
    selectedRows,
    setTestimonialsTabledataFilter,
    setToggleCleared,
    toggleCleared,
    Api.PartnerGetApi
  ]);
  return (
    <div>
      <>
        {' '}
        <DataTable
          style={{ width: '100%' }}
          data={TestimonialsTabledataFilter}
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
