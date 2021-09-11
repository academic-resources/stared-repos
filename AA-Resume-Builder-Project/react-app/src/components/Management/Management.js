import React, { useEffect, useState } from 'react';
import './Management.css';
import * as resumeActions from '../../store/resume';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Management = () => {
  const { getResumes } = resumeActions;
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const resumes = useSelector((state) => state.resume.resume);

  useEffect(() => {
    dispatch(getResumes()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <>
      <h1 className="text-2xl z-10 relative bg-gray-200 p-4 font-sans font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">Your Resumes</h1>
      <div className="resume-container relative z-20 inset-x-2.5 flex flex-wrap justify-left">

        {((loaded && resumes) && Object.values(resumes).length > 0) ?
          (Object.values(resumes).map((resume) => {
            return (
              <a className="w-40 m-4 h-48 max-w-48 border border-black hover:shadow-md" href={`resumes/${resume.id}`}>
                <div>
                  {resume.user_tags.length > 0 ? resume.user_tags.map(tag => <div>{tag}</div>) : resume.id}
                </div>
              </a>
            );
          }))
          :
          <h2>You don't have any resumes! Click <NavLink to="/templates" className="underline">here</NavLink> to get started!</h2>
        }
      </div>
    </>
  );
};

export default Management;
