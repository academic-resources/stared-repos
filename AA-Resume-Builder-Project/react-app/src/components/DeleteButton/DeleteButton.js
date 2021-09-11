import React, { useEffect, useState } from 'react';
import * as resumeActions from '../../store/resume';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';

const DeleteButton = () => {
  const { resumeId } = useParams();
  const [loaded, setLoaded] = useState(false);
  const { deleteAResume, getResumes } = resumeActions;
  const dispatch = useDispatch();
  const history = useHistory();

  const byeResume = async (e) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      // Save it!
      await dispatch(deleteAResume(resumeId)).then(() =>
        dispatch(getResumes())
          .then(() => setLoaded(true))
          .then(() => history.push('/resumes'))
      );
    } else {
      return;
    }
  };

  return (
    <>
      <button
        onClick={byeResume}
        type="button"
        className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-accentDark hover:shadow-lg"
      >
        Delete
      </button>
    </>
  );
};

export default DeleteButton;
