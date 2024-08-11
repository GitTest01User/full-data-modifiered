import { useState } from 'react';

import { useEffect } from 'react';

import Sortable from 'sortablejs';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import $ from 'jquery';

import Api from 'Service/Api';

import Error from '../AddCompnent/Dialog/Error';


import Get from '../Function/Get';
import Update from '../Function/Update';

import SweetAlart from '../AddCompnent/Dialog/SweetAlart';
import EnquriySweetAlart from '../AddCompnent/Dialog/EnquriySweetAlart';
import ActionSweet from '../AddCompnent/Dialog/ActionSweet';
import ConfirmedSweet from '../AddCompnent/Dialog/ConfirmedSweet';
import Swal from 'sweetalert2';
import CancelledSweet from '../AddCompnent/Dialog/CancelledSweet';

export const Content = () => {
  var objArr = [];
  $(document).ready(function () {
    $('#btnSubmit').click();
  });
  var myRef = useRef();

  $('.accordion').click(function () {
    $(this).toggleClass('active');
    var panel = $(this).next();
    if (panel.css('display') === 'block') {
      panel.slideUp();
    } else {
      panel.slideDown();
    }
  });

  const [open, setOpen] = useState(false);

  var [DataUpdate, setDataUpdate] = useState();

  var navigator = useNavigate();

  var count = 1;

  {
    const [cards, setCards] = useState([]);

    const fetchMenuItems = async () => {
      Get(Api.HeaderMenuGetApi).then(handleResponse).then(processGet).catch(handleError);
    };
    const processGet = (result) => {
      if (result.Status) {
        setCards(result.result);
      } else {
        setCards(result.result);
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
    useEffect(() => {
      fetchMenuItems();
      handleChange();
    }, []);

    const handleEdit = (data) => {
      if (data.BrowserRoutersId != null) {
        navigator(`/backend/update-menu?id=${data.id}&routeId=${data.BrowserRoutersId}`);
      } else {
        navigator(`/backend/update-menu?id=${data.id}`);
      }
    };

    const handleDelete = (cardId) => {
      ActionSweet('Trash').then((result) => processTrash(result, cardId));
    };
    const processTrash = (result, cardId) => {
      if (result.isConfirmed) {
        TrashMove(cardId);
        ConfirmedSweet('Trash');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        CancelledSweet();
      }
    };

    var handleView = (cardId) => {
      $('#submenu_' + cardId).show();
      const requestOptions = {
        method: 'GET',

        redirect: 'follow'
      };

      $('.nested-sortable').each(function () {
        new Sortable(this, {
          group: 'nested',
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 0.65
        });
      });
    };

    var CleanHand = () => {
      myRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    var TrashMove = (cardId) => {
      var requestOptions = JSON.stringify({
        HeaderisActive: false
      });
      Update(`${Api.HeaderMenuGetApi}?id=${cardId}`, requestOptions)
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
    const handleChange = () => {
      setOpen(false);
      const listGroup = document.querySelector('.list-group.nested-sortable');
      if (!listGroup) return;

      listGroup.addEventListener('change', () => {
        const dragItem = document.querySelector('.list-group-item.sortable-chosen');
        const dropItem = document.querySelector('.list-group-item.sortable-ghost');

        if (!dragItem || !dropItem) return;

        const dragSId = dragItem.querySelector('input[type="hidden"]').value;
        const oPId = dragItem.querySelector('input[type="hidden"]').getAttribute('parentId');
        const dragItemId = dragItem.parentElement.id.replace('submenu_', '');

        const dropSId = dropItem.querySelector('input[type="hidden"]').value;
        const nPId = dropItem.querySelector('input[type="hidden"]').getAttribute('parentId');
        const dropItemId = dropItem.parentElement.id.replace('submenu_', '');
    

        var obj = {
          submenuId: parseInt(dragSId),
          oldParentId: parseInt(oPId),
          newParentId: parseInt(dropItemId)
        };

        var DuplicateCount = 0;
        if (objArr != null && objArr.length > 0) {
          // debugger;
          objArr.map(function (item) {
            // debugger;
            console.log('item', item);
            if (parseInt(item.submenuId) == parseInt(dragSId)) {
              var index = objArr.indexOf(item);
              objArr.splice(index, 1);
              DuplicateCount += 1;
            }
          });
          console.log('obj', obj);
          objArr.push(obj);
        } else {
          objArr.push(obj);
        }

        setDataUpdate(objArr);
        console.log('objArr', objArr);
        const hiddenInputs1 = $('#tblSelectChecked div[draggable="false"] [type="hidden"]');

        const idValues1 = hiddenInputs1
          .map(function () {
            return $(this).val();
          })
          .get();
        const IdElm1 = idValues1.join(',');
        console.log('IdElm1', IdElm1);
      });
    };

    const handleFetchRequest = (url, body, submenuId) => {
      const myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      const requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify(body),
        redirect: 'follow'
      };

      return fetch(url, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result.Status) {
            setOpen(false);
            fetchMenuItems();
          } else {
            setOpen(false);
          }
        })
        .catch((error) => console.log(`Error updating submenuId ${submenuId}:`, error));
    };

    const updateData = () => {
      if (DataUpdate != null) {
        DataUpdate.forEach((item) => {
          item.newParentId = isNaN(item.newParentId) ? null : item.newParentId;
          console.log('item', item, 'item.submenuId', item.submenuId);

          const requestBody = {
            HeaderPerantId: item.newParentId,
            HeaderisActive: true
          };
          console.log('requestBody', requestBody);
          handleFetchRequest(
            `${Api.HeaderMenuGetApi}?id=${item.submenuId}`,
            requestBody,
            item.submenuId
          );
        });

        const hiddenInputs = $('#tblSelectChecked [type="hidden"]');
        var idValues = hiddenInputs
          .map(function () {
            return $(this).val();
          })
          .get();

        var srNum = 0;
        idValues.forEach((item) => {
          srNum += 1;
          const requestBody = {
            serialNo: srNum
          };
          handleFetchRequest(`${Api.HeaderMenuGetApi}?id=${item}`, requestBody, item);
        });
        EnquriySweetAlart('Update').then(() => {
          setOpen(true);
        });
      } else {
        SweetAlart();
      }
    };

    return (
      <>
        <div class="justify-content-center row">
          <div class="col-md-12">
            <div class=" mb-3">
              <div class="" ref={myRef}></div>
              <div
                class="bg-light border-3 card cards p-3"
                style={{ backgroundColor: '#ffffff61' }}
              >
                <div className="row  ">
                  <div className="col-lg-12">
                    <div class=" ">
                      <div class="">
                        <ul className="mb-0 p-0 pb-0">
                          <table id="tblSelectChecked" className="w-100">
                            <div id="nestedDemo" class="list-group nested-sortable ">
                              {cards.map((obj, index) => {
                                if (obj.HeaderPerantId == null && obj.HeaderisActive == true) {
                                  return (
                                    <>
                                      {cards.map((obj1, index) => {
                                        if (
                                          obj.HeaderPerantId == null &&
                                          obj1.HeaderisActive == true &&
                                          obj1.HeaderTitle == obj.HeaderTitle
                                        ) {
                                          count++;

                                          return (
                                            <>
                                              <div
                                                key={index}
                                                className={`list-group-item  nested-${obj1.id}`}
                                              >
                                                <div
                                                  key={index}
                                                  className=" d-flex justify-content-between "
                                                  style={{ alignItems: 'baseline' }}
                                                >
                                                  <div>
                                                    <input
                                                      type="hidden"
                                                      value={obj1.id}
                                                      parentId={obj1.HeaderPerantId}
                                                      serialNo={obj1.serialNo}
                                                      id="hiddenField1"
                                                    />
                                                    <div className="d-inline m-1">
                                                      <img src="/drag-4.png" className="drag_1" />
                                                    </div>

                                                    {obj1.HeaderTitle}
                                                  </div>

                                                  <div>
                                                    {obj1.isMenu == true ? (
                                                      <Button
                                                        style={{
                                                          fontSize: '11px',
                                                          color: 'black'
                                                        }}
                                                        id="btnSubmit"
                                                        onClick={() => handleView(obj1.id)}
                                                      ></Button>
                                                    ) : null}
                                                    <button onClick={() => handleEdit(obj1)}>
                                                      <img src="/pen.png" width={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(obj1.id)}>
                                                      <img src="/delete.png" width={20} />
                                                    </button>
                                                  </div>
                                                </div>

                                                <div
                                                  className="list-group nested-sortable"
                                                  id={`submenu_${obj1.id}`}
                                                >
                                                  {cards.map((obj2, index) => {
                                                    if (
                                                      obj2.HeaderPerantId == obj1.id &&
                                                      obj2.HeaderisActive == true
                                                    ) {
                                                      return (
                                                        <>
                                                          {' '}
                                                          <div
                                                            key={index}
                                                            className={`list-group-item item-${index} nested-${count} sub-menu`}
                                                          >
                                                            <div
                                                              key={index}
                                                              className=" d-flex justify-content-between "
                                                              style={{ alignItems: 'baseline' }}
                                                            >
                                                              <div>
                                                                <input
                                                                  type="hidden"
                                                                  value={obj2.id}
                                                                  parentId={obj2.HeaderPerantId}
                                                                  serialNo={obj2.serialNo}
                                                                  id={`submenu_${obj1.id}`}
                                                                />
                                                                <div className="d-inline m-1">
                                                                  <img
                                                                    src="/drag-4.png"
                                                                    className="drag_1"
                                                                  />
                                                                </div>
                                                                {obj2.HeaderTitle}
                                                              </div>

                                                              <div>
                                                                <span>
                                                                  <i>sub menu</i>
                                                                </span>

                                                                <button
                                                                  onClick={() => handleEdit(obj2)}
                                                                >
                                                                  <img src="/pen.png" width={18} />
                                                                </button>
                                                                <button
                                                                  onClick={() =>
                                                                    handleDelete(obj2.id)
                                                                  }
                                                                >
                                                                  <img
                                                                    src="/delete.png"
                                                                    width={20}
                                                                  />
                                                                </button>
                                                              </div>
                                                            </div>
                                                          </div>
                                                        </>
                                                      );
                                                    }
                                                  })}
                                                </div>
                                              </div>
                                            </>
                                          );
                                        }
                                      })}
                                    </>
                                  );
                                }
                              })}
                            </div>
                          </table>
                        </ul>
                        <div className="">
                          <div className="row p-2 mt-3">
                            <div className="col-6 text-start">
                              {' '}
                              <button
                                id="btnCheck"
                                className="btn  btn-secondary"
                                onClick={() => CleanHand()}
                              >
                                Back to top
                              </button>
                            </div>
                            <div className="col-6 text-end">
                              {open ? (
                                <button
                                  id="btnCheck"
                                  className="btn btn-gradient "
                                  onClick={updateData}
                                  disabled
                                >
                                  Saved
                                </button>
                              ) : (
                                <button
                                  id="btnCheck"
                                  className="btn btn-gradient "
                                  onClick={updateData}
                                >
                                  Save
                                </button>
                              )}
                            </div>
                          </div>
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
  }
};
