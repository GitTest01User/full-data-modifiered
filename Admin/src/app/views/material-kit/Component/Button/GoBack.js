import { useNavigate } from 'react-router-dom';

export default function GoBack(props) {
  var nav = props.value;
  var navigator = useNavigate();
  var handleSubmitBack = () => {
    navigator(`/backend/${nav}`);
  };
  return (
    <div>
      {' '}
      <button
        onClick={handleSubmitBack}
        style={{ backgroundColor: 'black' }}
        className="btn  btn-secondary"
      >
        <i class="fas fa-arrow-left mr-3"></i> Go back
      </button>
    </div>
  );
}
