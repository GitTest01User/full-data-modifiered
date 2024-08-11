// import React from 'react';
// import $ from 'jquery';
// export default function FileUpload() {
//   function readFile(input) {
//     console.log('input', input);
//     if (input.files && input.files[0]) {
//       var reader = new FileReader();

//       reader.onload = function (e) {
//         var htmlPreview =
//           '<img width="200" src="' +
//           e.target.result +
//           '" />' +
//           '<p>' +
//           input.files[0].name +
//           '</p>';
//         var wrapperZone = $(input).parent();
//         var previewZone = $(input).parent().parent().find('.preview-zone');
//         var boxZone = $(input)
//           .parent()
//           .parent()
//           .find('.preview-zone')
//           .find('.box')
//           .find('.box-body');

//         wrapperZone.removeClass('dragover');
//         previewZone.removeClass('d-none');
//         boxZone.empty();
//         boxZone.append(htmlPreview);
//       };

//       reader.readAsDataURL(input.files[0]);
//     }
//   }

//   $('#fileInput').change(function () {
//     readFile(this);
//   });

//   function reset(e) {
//     $(e).wrap('<form>').closest('form').get(0).reset();
//     $(e).unwrap();
//   }

//   $('.dropzone').change(function () {
//     readFile(this);
//   });

//   $('.dropzone-wrapper').on('dragover', function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $(this).addClass('dragover');
//   });

//   $('.dropzone-wrapper').on('dragleave', function (e) {
//     e.preventDefault();
//     e.stopPropagation();
//     $(this).removeClass('dragover');
//   });

//   $('.remove-preview').on('click', function () {
//     var boxZone = $(this).parents('.preview-zone').find('.box-body');
//     var previewZone = $(this).parents('.preview-zone');
//     var dropzone = $(this).parents('.form-group').find('.dropzone');
//     boxZone.empty();
//     previewZone.addClass('d-none');
//     reset(dropzone);
//   });

//   return (
//     <div>
//       {' '}
//       <section>
//         <form action="" method="POST" enctype="multipart/form-data">
//           <div class="container">
//             <div class="row">
//               <div class="col-md-12">
//                 <div class="form-group">
//                   <label class="control-label">Upload File</label>
//                   <div class="preview-zone d-none">
//                     <div class="box box-solid">
//                       <div class="box-header with-border">
//                         <div>
//                           <b>Preview</b>
//                         </div>
//                         <div class="box-tools pull-right">
//                           <button type="button" class="btn btn-danger btn-xs remove-preview">
//                             <i class="fa fa-times"></i> Reset This Form
//                           </button>
//                         </div>
//                       </div>
//                       <div class="box-body"></div>
//                     </div>
//                   </div>
//                   <div class="dropzone-wrapper">
//                     <div class="dropzone-desc">
//                       <i class="glyphicon glyphicon-download-alt"></i>
//                       <p>Choose an image file or drag it here.</p>
//                     </div>
//                     <input type="file" name="img_logo" class="dropzone" />
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div class="row">
//               <div class="col-md-12 ">
//                 <button type="submit" class="btn btn-primary pull-right">
//                   Upload
//                 </button>
//               </div>
//             </div>
//           </div>
//         </form>
//       </section>
//       <script src="assets/app.js"></script>
//     </div>
//   );
// }
