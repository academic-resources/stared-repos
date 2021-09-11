import React, { useEffect, useState } from 'react';
import './Resume.css';
import * as resumeActions from '../../store/resume';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import DeleteButton from '../DeleteButton/DeleteButton';
import html2pdf from 'html2pdf.js';

const Resume = () => {
  const { resumeId } = useParams();
  const history = useHistory();

  const { getOneResume } = resumeActions;
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const resume = useSelector((state) => state.resume.resume);

  useEffect(() => {
    dispatch(getOneResume(resumeId)).then(() => setLoaded(true));
  }, [dispatch, getOneResume, resumeId]);

  const editResume = async (e) => {
    await dispatch(resumeActions.editResumes(resumeId));
    history.push('/resume/0/edit');
  };

  const saveAsPDF = () => {
    console.log('Saving as PDF...');
    const element = document.getElementById('save-resume');
    html2pdf(element);
  };

  return (
    <>
      {loaded && resume && (
        <>
          <div className="resume_space block">
            <div className="individual_resume border border-black overflow-hidden p-2 max-w-3xl max-h-96 min-w-content min-h-content">
              <div
                className="p-2"
                dangerouslySetInnerHTML={{ __html: resume.html }}
                id="save-resume"
              />
            </div>
            <div className="card bg-white py-3 px-5 rounded-xl flex flex-col mb-5">
              <div className="w-full py-3 flex justify-center">
                <div className="inline-block mr-2 mt-2">
                  <button
                    type="button"
                    className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-accentLight hover:bg-accentDark hover:shadow-lg"
                    onClick={editResume}
                  >
                    Edit
                  </button>
                </div>
                <div className="inline-block mr-2 mt-2">
                  <button
                    type="button"
                    className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-accentLight hover:bg-accentDark hover:shadow-lg"
                    onClick={saveAsPDF}
                  >
                    Save as PDF
                  </button>
                </div>
                <div className="inline-block mr-2 mt-2">
                  <DeleteButton />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Resume;
