import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Preview from "../Templates/Preview";

import { saveResumes } from "../../store/resume";
import { loadStyles } from "../../store/template";
import styleFinder from "../../utils/styleFinder";
import html2pdf from "html2pdf.js";

const EditingPage = () => {
  const path = window.location.pathname;

  const dispatch = useDispatch();
  const history = useHistory();

  const current_template_object = useSelector((state) =>
    state ? state.template.current : null,
  );
  const current_resume = useSelector((state) =>
    state ? state.resume.resume : null,
  );
  const styles = useSelector((state) =>
    state.template.styles ? state.template.styles : null,
  );
  const user_id = useSelector((state) => state.user.id);

  const current_template = current_template_object
    ? current_template_object.fields
    : null;
  const current_template_name = current_template_object
    ? current_template_object.name
    : null;

  const valueHolder = {};

  if (current_template || current_resume.fields) {
    if (path.includes("edit")) {
      if (current_resume.fields) {
        for (let i = 0; i < current_resume.fields.length; i++) {
          valueHolder[i] = current_resume.fields[i].value;
        }
      }
    } else if (current_template) {
      for (let i = 0; i < current_template.length; i++) {
        valueHolder[i] = "";
      }
    }
  }

  const [values, setValues] = useState(valueHolder);
  const [loaded, setLoaded] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState(1);
  const currentStyle = styleFinder(parseInt(selectedStyle, 10));

  let tagValue;

  const currentdate = new Date();
  const rightNow =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " @ " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();

  if (path.includes("edit")) {
    if (current_resume.user_tags.length > 0) {
      tagValue = current_resume.user_tags.join(", ");
    } else {
      tagValue = rightNow;
    }
  } else {
    tagValue = rightNow;
  }
  const [userTags, setUserTags] = useState(tagValue);

  const saveAsPDF = () => {
    console.log("Saving as PDF...");
    const element = document.getElementById("resume-to-save");
    html2pdf(element);
  };

  const saveResume = async (e) => {
    const resumeData = {};
    resumeData["fields"] = [];

    if (path.includes("edit")) {
      Object.keys(values).forEach((value) => {
        resumeData["fields"][value] = {
          field_id: current_resume.fields[value].field_id,
          page_order: value,
          value: values[value],
        };
      });
    } else {
      Object.keys(values).forEach((value) => {
        resumeData["fields"][value] = {
          field_id: current_template[value].field_id,
          page_order: value,
          value: values[value],
        };
      });
    }

    const resumeDiv = document.getElementById("resume-to-save");
    const resumeHTML = resumeDiv.innerHTML;

    resumeData["html"] = resumeHTML;
    console.log(resumeData);
    resumeData["style_id"] = parseInt(selectedStyle, 10);
    resumeData["user_id"] = user_id;
    resumeData["resume_id"] = path.includes("edit") ? current_resume.id : "NEW";
    resumeData["user_tags"] =
      userTags.split(", ").join(",").length > 0
        ? userTags.split(", ").join(",").split(",")
        : [rightNow];

    await dispatch(saveResumes(resumeData)).then(() =>
      history.push("/resumes"),
    );
  };

  useEffect(() => {
    if (!loaded) dispatch(loadStyles()).then(() => setLoaded(true));
  }, [dispatch]);

  if (path.includes("edit")) {
    return (
      current_resume &&
      loaded && (
        <div className="editing-page w-full h-5/6">
          <div className="w-full h-5/6 grid grid-cols-12 grid-rows-1 justify-items-center bg-main">
            <div className="m-2 col-start-1 col-end-6 w-11/12 h-30 p-2 text-accentDark bg-white">
              <h1 className="w-full text-center">Edit Resume</h1>
              <form className="w-full h-auto">
                <Preview
                  template_name={""}
                  template={current_resume.fields}
                  values={values}
                  preview={true}
                  form={true}
                  setValues={setValues}
                />
              </form>
            </div>
            <div className="m-2 col-start-6 col-end-8 h-full flex flex-col items-center justify-start space-y-4">
              <label htmlFor="user-tags">
                Comma Separated Tags (Use to identify your resume)
              </label>
              <input
                className="w-full text-center h-min"
                name="user-tags"
                value={userTags}
                onChange={(e) => setUserTags(e.target.value)}
              />
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="style">Style</label>
                <select
                  className="w-full text-center h-min"
                  name="style"
                  value={selectedStyle}
                  onChange={(e) => {
                    setSelectedStyle(e.target.value);
                  }}>
                  {Object.keys(styles).map((styleId) => (
                    <option key={styleId} value={parseInt(styleId, 10)}>
                      {styles[styleId]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-accentLight hover:bg-accentDark hover:shadow-lg"
                onClick={saveResume}>
                Save Resume
              </button>
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-accentLight hover:bg-accentDark hover:shadow-lg"
                onClick={saveAsPDF}>
                Download as PDF
              </button>
            </div>
            <div className="m-2 w-11/12 col-start-8 col-end-13 bg-main p-2 h-11/12">
              <h1 className="w-full text-center">Resume Preview</h1>
              <Preview
                template_name={"Resume Preview"}
                template={current_resume.fields}
                values={values}
                preview={true}
                form={false}
                setValues={setValues}
                currentStyle={currentStyle}
              />
            </div>
          </div>
        </div>
      )
    );
  } else {
    return (
      current_template_object &&
      loaded && (
        <div className="editing-page w-full h-5/6">
          <div className="w-full h-5/6 grid grid-cols-12 grid-rows-1 justify-items-center bg-main">
            <div className="m-2 col-start-1 col-end-6 w-11/12 h-30 p-2 text-accentDark bg-white">
              <h1 className="w-full text-center">Edit Resume</h1>
              <form className="w-full h-auto">
                <Preview
                  template_name={current_template_name}
                  template={current_template}
                  values={values}
                  preview={true}
                  form={true}
                  setValues={setValues}
                />
              </form>
            </div>
            <div className="m-2 col-start-6 col-end-8 h-full flex flex-col items-center justify-start space-y-4">
              <label htmlFor="user-tags">
                Comma Separated Tags (Use to identify your resume)
              </label>
              <input
                className="w-full text-center h-min"
                name="user-tags"
                value={userTags}
                onChange={(e) => setUserTags(e.target.value)}
              />
              <div className="flex flex-col items-center justify-center">
                <label htmlFor="style">Style</label>
                <select
                  className="w-full text-center h-min"
                  name="style"
                  value={selectedStyle}
                  onChange={(e) => {
                    setSelectedStyle(e.target.value);
                  }}>
                  {Object.keys(styles).map((styleId) => (
                    <option key={styleId} value={parseInt(styleId, 10)}>
                      {styles[styleId]}
                    </option>
                  ))}
                </select>
              </div>
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-accentLight hover:bg-accentDark hover:shadow-lg"
                onClick={saveResume}>
                Save Resume
              </button>
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-accentLight hover:bg-accentDark hover:shadow-lg"
                onClick={saveAsPDF}>
                Download as PDF
              </button>
            </div>
            <div className="m-2 w-11/12 col-start-8 col-end-13 bg-main p-2 h-11/12">
              <h1 className="w-full text-center">Resume Preview</h1>
              <Preview
                template_name={current_template_name}
                template={current_template}
                values={values}
                preview={true}
                form={false}
                setValues={setValues}
                currentStyle={currentStyle}
              />
            </div>
          </div>
        </div>
      )
    );
  }
};

export default EditingPage;
