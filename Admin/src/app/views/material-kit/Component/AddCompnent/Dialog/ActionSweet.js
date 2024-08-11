import Swal from 'sweetalert2';

export default function ActionSweet(value) {
  var newValue = value.toString();
  if (newValue === 'Trash') {
    return Swal.fire({
      title: 'Move trash !',
      text: 'Are you sure you want to move trash!',
      //   icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Trash',
      cancelButtonText: 'Cancel'
    });
  } else if (newValue === 'Restore') {
    return Swal.fire({
      title: 'Restore this!',
      text: 'Are you sure you want to restore this?',
      //   icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Restore',
      cancelButtonText: 'Cancel'
    });
  } else if (newValue === 'Delete') {
    return Swal.fire({
      title: 'Delete this!',
      text: 'Are you sure you want to delete this?',
      //   icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    });
  }
}
