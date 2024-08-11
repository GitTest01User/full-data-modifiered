import Swal from 'sweetalert2';

export default function DeleteSveetAlart(title, text) {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: ' Delete ',
    cancelButtonText: ' Cancel'
  });
}
