import Swal from 'sweetalert2';

export default function RestoreSweet(title, text) {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'success',

    showConfirmButton: false,
    timer: 1500
  });
}
