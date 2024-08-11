import Update from '../Function/Update';
import Get from '../Function/Get';
import Deletes from '../Function/Delete';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';
import Swal from 'sweetalert2';

import { useState } from 'react';
import Api from 'Service/Api';
import { useEffect } from 'react';

export const FooterContentTrash = () => {
  const [cards, setCards] = useState([]);

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };
  const fetchMenuItems = async () => {
    Get(Api.FooterMenuGetApi).then(handleResponse).then(processGet).catch(handleError);
  };
  const processGet = (result) => {
    if (result.Status) {
      setCards(result.result);
    } else {
      setCards(result.result);
    }
  };

  var TrashMove = (cardId) => {
    var requestOptions = JSON.stringify({
      FooterisActive: true
    });
    Update(`${Api.FooterMenuGetApi}?FooterId=${cardId}`, requestOptions)
      .then(handleResponse)
      .then(processUpdate)
      .catch(handleError);
  };
  const processUpdate = (result) => {
    if (result.Status) {
      fetchMenuItems();
    } else {
      fetchMenuItems();
    }
  };

  var permanentDeleted = (cardId) => {
    Deletes(`${Api.FooterMenuGetApi}?FooterId=${cardId}`)
      .then(handleResponse)
      .then(processDelete)
      .catch(handleError);
  };
  const processDelete = (result) => {
    if (result.Status) {
      fetchMenuItems();
    } else {
      fetchMenuItems();
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const handleRestore = (cardId) => {
    ActionSweet('Restore').then((result) => processRestore(result, cardId));
  };
  const processRestore = (result, Id) => {
    if (result.isConfirmed) {
      TrashMove(Id);
      ConfirmedSweet('Restore');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
    }
  };
  const handleDelete = (cardId) => {
    ActionSweet('Delete').then((result) => processDeleted(result, cardId));
  };

  const processDeleted = (result, Id) => {
    if (result.isConfirmed) {
      permanentDeleted(Id);
      ConfirmedSweet('Delete');
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      CancelledSweet();
    }
  };

  const RestoreHand = () => {
    const hiddenInputs = document.querySelectorAll('#tblSelectChecked1 [type="hidden"]');

    const hiddenValues = Array.from(hiddenInputs).map((input) => input.value);

    const joinedValues = hiddenValues.join(',');
    handleRestore(joinedValues);
  };
  const DeleteHand = () => {
    const hiddenInputs = document.querySelectorAll('#tblSelectChecked1 [type="hidden"]');

    const hiddenValues = Array.from(hiddenInputs).map((input) => input.value);

    const joinedDeleteValues = hiddenValues.join(',');
    handleDelete(joinedDeleteValues);
  };

  return (
    <>
      <div class="justify-content-center row">
        <div class="col-md-12">
          <div class=" mb-3">
            <div class="bg-light border-3 card cards p-3 " style={{ backgroundColor: '#ffffff61' }}>
              <div className="row ">
                <div className="col-lg-12">
                  <div class="">
                    <div class="">
                      <ul className="mb-0 p-0 pb-0">
                        <table id="tblSelectChecked1" className="w-100">
                          <div id="nestedDemo" class="list-group  nested-sortable">
                            {cards.map((obj) => {
                              if (obj.FooterisActive != true) {
                                return (
                                  <div
                                    class="d-flex justify-content-between list-group-item nested-1"
                                    style={{ alignItems: 'baseline' }}
                                  >
                                    {' '}
                                    <input type="hidden" value={obj.FooterId} />
                                    <div>{obj.FooterTitle}</div>
                                    <div>
                                      <button onClick={() => handleRestore(obj.FooterId)}>
                                        <img src="/restore.png" width={20} />
                                      </button>
                                      <button onClick={() => handleDelete(obj.FooterId)}>
                                        <img src="/delete.png" width={20} />
                                      </button>
                                    </div>
                                  </div>
                                );
                              }
                            })}
                          </div>
                        </table>
                      </ul>

                      <div className="">
                        <>
                          <div className="mt-3 p-2 row">
                            <div className="col-6 text-start">
                              {' '}
                              <button
                                id="btnCheck"
                                className="btn  btn-secondary"
                                onClick={() => RestoreHand()}
                              >
                                <img
                                  src="/restore.png"
                                  width={20}
                                  style={{ filter: ' invert(1)' }}
                                />{' '}
                                Restore all
                              </button>
                            </div>
                            <div className="col-6 text-end">
                              {' '}
                              <button
                                id="btnCheck"
                                onClick={() => DeleteHand()}
                                className="btn btn-gradient "
                              >
                                <img
                                  src="/delete.png"
                                  width={20}
                                  style={{ filter: ' invert(1)' }}
                                />{' '}
                                Delete all
                              </button>
                            </div>
                          </div>
                        </>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6"></div>
      </div>
    </>
  );
};
