import Swal from 'sweetalert2';

const SweetAlart = () => {
  Swal.fire({
    title: 'Order List !',
    text: 'You have changed the order list. Please update the navigation!',
    // icon: 'warning',
    showCancelButton: false,
    confirmButtonColor: 'rgb(18 1 141)'
  });

  return;
};

export default SweetAlart;
