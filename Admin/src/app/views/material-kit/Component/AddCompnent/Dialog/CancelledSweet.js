import Swal from 'sweetalert2';

export default function CancelledSweet() {
  return Swal.fire({
    title: 'Cancelled',
    text: 'Your file has not move trash.',

    showConfirmButton: true,
    timer: 1500
  });
}
