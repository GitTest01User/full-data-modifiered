import Swal from 'sweetalert2';

export default function EnquriySweetAlart(value, error) {
  if (value === 'Update') {
    return Swal.fire({
      title: ' Success!',
      text: 'Your file has been Update Success.',
      //   icon: 'success',

      showConfirmButton: true,
      timer: 1500
    });
  } else if (value === 'Create') {
    return Swal.fire({
      title: 'Create Post!',
      text: 'You can display a post and message',
      //   icon: 'success',

      showConfirmButton: true,
      timer: 1500
    });
  } else if (value === 'Fail-Update') {
    return Swal.fire({
      title: 'Fail Update!',
      text: error ? error : 'Your file Fail Update.',
      //   icon: 'error',

      showConfirmButton: true,
      timer: 1500
    });
  } else if (value === 'Fail-Create') {
    return Swal.fire({
      title: 'Fail Post!',
      text: error ? error : 'Your file Create.',
      //   icon: 'error',

      showConfirmButton: true,
      timer: 1500
    });
  }
}
