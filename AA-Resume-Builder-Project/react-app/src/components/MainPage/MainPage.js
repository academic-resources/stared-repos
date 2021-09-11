import React, { useEffect, useState } from 'react';
import CardContainer from './CardContainer.js';
// import Carousel from './Carousel.js';
import * as resumeActions from '../../store/resume';
import { getTemplates, updateCurrentTemplate } from '../../store/template';
import './MainPage.css';
import { useDispatch, useSelector } from 'react-redux';

const MainPage = () => {
  const dispatch = useDispatch();
  const { getResumes } = resumeActions;
  let templates = useSelector((state) => state.template.templates);
  const resumes = useSelector((state) => state.resume.resume);
  let [loaded, setLoaded] = useState(false);

  useEffect(() => {
    dispatch(getTemplates())
      .then(() => dispatch(getResumes()))
      .then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <>
      <section>
        <CardContainer resumes={resumes} loaded={loaded} />
      </section>
      <section>
        <CardContainer templates={templates} loaded={loaded} />
      </section>
    </>
  );
};

export default MainPage;
