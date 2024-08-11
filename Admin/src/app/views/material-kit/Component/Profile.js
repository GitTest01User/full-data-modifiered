import { Stack } from '@mui/material';

import { Box, styled } from '@mui/material';
import { SimpleCard } from 'app/components';

import { useState } from 'react';
import { useEffect } from 'react';

import Api from 'Service/Api';
import { useNavigate } from 'react-router-dom';

import dateFormat from 'dateformat';

import { useAuthContext } from 'Context/AuthContext';

import UserDetail from './UserLogin/UserDetail';
const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));

const Profile = () => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [ProfileImage, setProfileImage] = useState();
  var { user } = useAuthContext();
  const [userDetailData, setuserDetailData] = useState([]);

  var navigator = useNavigate();

  const handleSubmit = () => {
    navigator('/backend/profile-manage');
  };

  const handleResponse = (response) => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const processData = (data) => {
    if (data.Status) {
      setuserDetailData(data.result[0]);
    } else {
      alert('User Not Found');
    }
  };

  const handleError = (error) => {
    console.log('Error fetching user role:', error);
  };

  var LayouttapBar = () => {
    var UserDetails = user.user;
    var UserData = UserDetails;
    var UserId = UserData.Id;
    UserDetail(UserId).then(handleResponse).then(processData).catch(handleError);
  };

  useEffect(() => {
    LayouttapBar();
  }, []);

  const handleFileChange = (e) => {
    e.preventDefault();

    if (!e.target.files || e.target.files.length === 0) {
      alert('No file selected. Please select an image file.');
      return;
    }

    let reader = new FileReader();
    var file = e.target.files[0];

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    reader.onloadend = () => {
      setImagePreviewUrl(reader.result);
      setProfileImage(reader.result);
    };
  };
  let $imagePreview = null;
  if (imagePreviewUrl) {
    $imagePreview = (
      <div className="previewText">
        <img
          id="imgprev_3_3"
          src={imagePreviewUrl}
          accept="image/*"
          style={{ width: '160px', height: '160px' }}
          className="rounded-circle "
          alt="Preview"
        />
      </div>
    );
  } else {
    $imagePreview = (
      <div className="previewText">
        <img
          id="imgprev_3_3"
          src={
            userDetailData.image_name
              ? `${Api.BaseURL}/${userDetailData.image_name}`
              : '/default-user-image.png'
          }
          accept="image/*"
          style={{ width: '160px', height: '160px' }}
          className="rounded-circle "
          alt="Preview"
        />
      </div>
    );
  }

  return (
    <Container>
      <Stack spacing={3} className="container mt-0">
        <title>Digi2l - Profile </title>

        <Box className="m-3">
          <Stack>
            <div class="card-headers  ">
              <div class="row align-items-center">
                <div class="col">
                  <h2 class="fs-5 mb-0 card-title">Your Info</h2>
                </div>
              </div>
            </div>
            <SimpleCard>
              <div class="form-group  ">
                <div className="row p-2">
                  <div className="col-md-12 mb-5 text-center">
                    <div className="editprofilepicbox mx-auto">{$imagePreview}</div>
                    <span style={{ fontSize: 'smaller' }} className="text-muted d-block"></span>
                  </div>
                  <div className="col-md-4 mb-5">
                    <span className="fw-bold d-block">
                      <b className="sizeText fw-bold">{userDetailData.first_name}</b>
                    </span>
                    <span style={{ fontSize: 'smaller' }} className="text-muted d-block">
                      First Name
                    </span>
                  </div>
                  <div className="col-md-4 mb-5">
                    <span className="fw-bold d-block">
                      <b className="sizeText fw-bold">{userDetailData.last_name}</b>
                    </span>
                    <span style={{ fontSize: 'smaller' }} className="text-muted d-block">
                      Last Name
                    </span>
                  </div>
                  <div className="col-md-4 mb-5">
                    <span className="fw-bold d-block">
                      <b className="sizeText fw-bold">{userDetailData.user_email}</b>
                    </span>
                    <span style={{ fontSize: 'smaller' }} className="text-muted d-block">
                      Email{' '}
                    </span>
                  </div>
                  <div className="col-md-4 mb-3">
                    <span className="fw-bold d-block">
                      <b className="sizeText fw-bold">{userDetailData.user_phone}</b>
                    </span>
                    <span style={{ fontSize: 'smaller' }} className="text-muted d-block">
                      Phone{' '}
                    </span>
                  </div>
                  <div className="col-md-4 mb-3">
                    <span className="fw-bold d-block">
                      <b className="sizeText fw-bold">
                        {' '}
                        {dateFormat(userDetailData.user_last_login, 'mmmm dS, yyyy')}
                      </b>
                    </span>
                    <span style={{ fontSize: 'smaller' }} className="text-muted d-block">
                      Last Login
                    </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-6"></div>
                  <div class="col-6">
                    <div class="text-end w-100">
                      <button onClick={handleSubmit} className=" btn btn-primary mainshadow">
                        <span>
                          <img src="/pen.png" width={16} style={{ filter: ' invert(1)' }} /> Edit
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SimpleCard>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default Profile;
