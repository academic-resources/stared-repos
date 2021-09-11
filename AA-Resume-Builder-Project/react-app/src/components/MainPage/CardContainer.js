import React from 'react';
import Card from './Card';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurrentTemplate } from '../../store/template';
import './MainPage.css';

const CardContainer = ({ templates, resumes, loaded }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  let visibleTemplates;
  let visibleResumes;
  if (templates) {
    visibleTemplates = Object.keys(templates).slice(0, 5);
  }
  if (resumes) {
    visibleResumes = Object.values(resumes).slice(Object.values(resumes).length - 4);
  }

  if (!loaded) {
    return (
      <>
        <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">
          {templates ? 'Featured Templates' : 'Recent Resumes'}
        </h1>
        <div className="flex justify-center mt-24">
          <button
            type="button"
            className="focus:outline-none font-bold text-white text-sm py-2.5 px-5 rounded-md bg-accentLight"
            disabled
          >
            Loading...
          </button>
        </div>
      </>
    );
  }

  return (
    <div className="flex flex-col bg-main m-auto p-auto">
      <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800">
        {templates ? 'Featured Templates' : 'Recent Resumes'}
      </h1>
      <div className="flex overflow-x-hidden pb-10">
        {templates && loaded && (
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10 ">
            {visibleTemplates.map((template_name) => (
              <a
                key={template_name}
                href={`/resume/${user.id}/create`}
                onClick={(e) =>
                  dispatch(
                    updateCurrentTemplate({
                      name: template_name,
                      fields: templates[template_name]['field_data'],
                    })
                  )
                }
              >
                <Card title={template_name} tags={templates[template_name]['default_tags']} />
              </a>
            ))}
            <a href="/templates">
              <Card title={'Explore All Templates'} tags={false} button={true} />
            </a>
          </div>
        )}
        {resumes && loaded && (
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
            {visibleResumes.map((resume) => (
              <a href={`resumes/${resume.id}`} key={resume.id}>
                <Card title={resume['user_tags'][0]} tags={resume['user_tags']} />
              </a>
            ))}
            <a href="/resumes">
              <Card title={'Manage All Resumes'} tags={false} button={true} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardContainer;
