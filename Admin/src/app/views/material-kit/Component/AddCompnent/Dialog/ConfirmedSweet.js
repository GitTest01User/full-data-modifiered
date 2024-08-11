import Swal from 'sweetalert2';

export default function ConfirmedSweet(value) {
  if (value == 'Trash') {
    return Swal.fire({
      title: ' Trash!',
      text: 'Your file has been trash.',
      //   icon: 'success',

      showConfirmButton: true,
      timer: 1500
    });
  } else if (value == 'Restore') {
    return Swal.fire({
      title: ' Restore!',
      text: 'Your file has been restore.',
      //   icon: 'success',

      showConfirmButton: true,
      timer: 1500
    });
  } else if (value == 'Delete') {
    return Swal.fire({
      title: ' Delete!',
      text: 'Your file has been delete.',
      //   icon: 'success',

      showConfirmButton: true,
      timer: 1500
    });
  }
}
