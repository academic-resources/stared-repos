import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFieldSaved, removeFieldSaved } from "../../store/resume";
import { addFieldTemplate, removeFieldTemplate } from "../../store/template";
import "./EditHelper.css";

const EditHelper = ({ field, form, value, setValues, number }) => {
  const dispatch = useDispatch();
  const path = window.location.pathname;

  let returnField;
  if (form) {
    switch (field.name) {
      case "full_name":
        returnField = (
          <h1 className="w-6/12">
            <input
              className="m-1 placeholder-gray-400"
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
          </h1>
        );
        break;
      case "github":
        returnField = (
          <>
            <div className="flex justify-center space-x-1">
              <input
                className="m-1 placeholder-gray-400"
                type="text"
                value={value}
                onChange={(e) => {
                  e.persist();
                  setValues((prev) => {
                    let newState = Object.assign({}, prev);
                    newState[number] = e.target.value;
                    return newState;
                  });
                }}
                placeholder={field.placeholder}
              />
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-accentDark hover:shadow-lg"
                onClick={(e) => {
                  path.includes("edit")
                    ? dispatch(removeFieldSaved(field))
                    : dispatch(removeFieldTemplate(field));
                }}>
                Remove Field
              </button>
            </div>
          </>
        );
        break;
      case "city":
        returnField = (
          <input
            className="m-1 placeholder-gray-400"
            type="text"
            value={value}
            onChange={(e) => {
              e.persist();
              setValues((prev) => {
                let newState = Object.assign({}, prev);
                newState[number] = e.target.value;
                return newState;
              });
            }}
            placeholder={field.placeholder}
          />
        );
        break;
      case "phone_number":
        returnField = (
          <input
            className="m-1 placeholder-gray-400"
            type="text"
            value={value}
            onChange={(e) => {
              e.persist();
              setValues((prev) => {
                let newState = Object.assign({}, prev);
                newState[number] = e.target.value;
                return newState;
              });
            }}
            placeholder={field.placeholder}
          />
        );
        break;
      case "linkedin":
        returnField = (
          <input
            className="m-1 placeholder-gray-400"
            type="text"
            value={value}
            onChange={(e) => {
              e.persist();
              setValues((prev) => {
                let newState = Object.assign({}, prev);
                newState[number] = e.target.value;
                return newState;
              });
            }}
            placeholder={field.placeholder}
          />
        );
        break;
      case "intro_header":
        returnField = (
          <h2 className="w-full">
            <input
              className="m-1 placeholder-gray-400 w-8/12"
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
          </h2>
        );
        break;
      case "intro_skill":
        returnField = (
          <div className="w-full">
            <input
              className="w-11/12 m-1 placeholder-gray-400"
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
            <div className="flex justify-center space-x-1">
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-accentLight hover:bg-accentDark hover:shadow-lg"
                onClick={(e) => {
                  path.includes("edit")
                    ? dispatch(addFieldSaved(field))
                    : dispatch(addFieldTemplate(field));
                }}>
                Add Skill
              </button>
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-accentDark hover:shadow-lg"
                onClick={(e) => {
                  path.includes("edit")
                    ? dispatch(removeFieldSaved(field))
                    : dispatch(removeFieldTemplate(field));
                }}>
                Remove Skill
              </button>
            </div>
          </div>
        );
        break;
      case "experience_company":
        returnField = (
          <h2 className="w-full">
            <input
              className="w-8/12 m-1 placeholder-gray-400"
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
          </h2>
        );
        break;
      case "experience_city":
        returnField = (
          <p className="w-full">
            <input
              className="m-1 w-11/12 placeholder-gray-400"
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
          </p>
        );
        break;
      case "experience_date":
        returnField = (
          <p className="w-6/12">
            <input
              className="m-1 placeholder-gray-400"
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
          </p>
        );
        break;
      case "experience_title":
        returnField = (
          <h2 className="m-1 placeholder-gray-400">
            <input
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
          </h2>
        );
        break;
      case "education_facility":
        returnField = (
          <h2 className="m-1 placeholder-gray-400 w-6/12">
            <input
              className="w-full"
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
          </h2>
        );
        break;
      case "education_degree":
        returnField = (
          <p className="m-1 placeholder-gray-400 w-6/12">
            <input
              className="w-full"
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
          </p>
        );
        break;
      case "education_graduation_date":
        returnField = (
          <p className="m-1 placeholder-gray-400 w-full">
            <input
              className="w-6/12"
              type="text"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}
            />
          </p>
        );
        break;
      case "education_gpa":
        returnField = (
          <p className="m-1 placeholder-gray-400 w-full">
            <div className="flex justify-start space-x-1 w-full">
              <input
                className="w-6/12"
                type="text"
                value={value}
                onChange={(e) => {
                  e.persist();
                  setValues((prev) => {
                    let newState = Object.assign({}, prev);
                    newState[number] = e.target.value;
                    return newState;
                  });
                }}
                placeholder={field.placeholder}
              />
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-accentDark hover:shadow-lg"
                onClick={(e) => {
                  path.includes("edit")
                    ? dispatch(removeFieldSaved(field))
                    : dispatch(removeFieldTemplate(field));
                }}>
                Remove GPA
              </button>
            </div>
          </p>
        );
        break;
      case "education_minor":
        returnField = (
          <p className="m-1 placeholder-gray-400 w-full">
            <div className="flex justify-start space-x-1 w-full">
              <input
                className="w-6/12"
                type="text"
                value={value}
                onChange={(e) => {
                  e.persist();
                  setValues((prev) => {
                    let newState = Object.assign({}, prev);
                    newState[number] = e.target.value;
                    return newState;
                  });
                }}
                placeholder={field.placeholder}
              />
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-accentDark hover:shadow-lg"
                onClick={(e) => {
                  path.includes("edit")
                    ? dispatch(removeFieldSaved(field))
                    : dispatch(removeFieldTemplate(field));
                }}>
                Remove Minor
              </button>
            </div>
          </p>
        );
        break;
      case "email":
        returnField = (
          <input
            className="m-1 placeholder-gray-400"
            type="email"
            value={value}
            onChange={(e) => {
              e.persist();
              setValues((prev) => {
                let newState = Object.assign({}, prev);
                newState[number] = e.target.value;
                return newState;
              });
            }}
            placeholder={field.placeholder}
          />
        );
        break;
      case "intro_mission":
        returnField = (
          <p className="w-full">
            <textarea
              rows={2}
              className="w-full m-1 placeholder-gray-400"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}></textarea>
          </p>
        );
        break;
      case "intro_long":
        returnField = (
          <p className="w-full">
            <textarea
              rows={7}
              className="w-full m-1 placeholder-gray-400"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}></textarea>
          </p>
        );
        break;
      case "experience_description":
        returnField = (
          <p className="w-full">
            <textarea
              row={2}
              className="w-full m-1 placeholder-gray-400"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}></textarea>
          </p>
        );
        break;
      case "experience_responsibility":
        returnField = (
          <div className="w-full">
            <textarea
              row={3}
              className="w-full m-1 placeholder-gray-400"
              value={value}
              onChange={(e) => {
                e.persist();
                setValues((prev) => {
                  let newState = Object.assign({}, prev);
                  newState[number] = e.target.value;
                  return newState;
                });
              }}
              placeholder={field.placeholder}></textarea>
            <div className="flex justify-center space-x-1">
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-accentLight hover:bg-accentDark hover:shadow-lg"
                onClick={(e) => {
                  path.includes("edit")
                    ? dispatch(addFieldSaved(field))
                    : dispatch(addFieldTemplate(field));
                }}>
                Add Responsibility
              </button>
              <button
                className="focus:outline-none text-white text-sm py-2.5 px-5 rounded-md bg-red-500 hover:bg-accentDark hover:shadow-lg"
                onClick={(e) => {
                  path.includes("edit")
                    ? dispatch(removeFieldSaved(field))
                    : dispatch(removeFieldTemplate(field));
                }}>
                Remove Responsibility
              </button>
            </div>
          </div>
        );
        break;
      default:
        returnField = <p>Field Not Found</p>;
        break;
    }
  } else {
    switch (field.name) {
      case "full_name":
        returnField = (
          <h1 className="w-full text-xl">{value || field.placeholder}</h1>
        );
        break;
      case "github":
        returnField = <p className="text-sm">{value || field.placeholder}</p>;
        break;
      case "city":
        returnField = <p className="text-sm">{value || field.placeholder}</p>;
        break;
      case "phone_number":
        returnField = <p className="text-sm">{value || field.placeholder}</p>;
        break;
      case "linkedin":
        returnField = <p className="text-sm">{value || field.placeholder}</p>;
        break;
      case "intro_header":
        returnField = (
          <h2 className="text-base font-semibold">
            {value || field.placeholder}
          </h2>
        );
        break;
      case "intro_skill":
        returnField = <li className="text-sm">{value || field.placeholder}</li>;
        break;
      case "experience_company":
        returnField = (
          <h2 className="text-base">{value || field.placeholder}</h2>
        );
        break;
      case "experience_city":
        returnField = <p className="text-base">{value || field.placeholder}</p>;
        break;
      case "experience_date":
        returnField = (
          <p className="w-full text-small">{value || field.placeholder}</p>
        );
        break;
      case "experience_title":
        returnField = (
          <h2 className="text-base">{value || field.placeholder}</h2>
        );
        break;
      case "education_facility":
        returnField = (
          <h2 className="text-base">{value || field.placeholder}</h2>
        );
        break;
      case "education_degree":
        returnField = (
          <p className="text-base"> {value || field.placeholder}</p>
        );
        break;
      case "education_graduation_date":
        returnField = <p className="text-sm">{value || field.placeholder}</p>;
        break;
      case "education_gpa":
        returnField = <p className="text-sm">{value || field.placeholder}</p>;
        break;
      case "education_minor":
        returnField = <p className="text-sm">{value || field.placeholder}</p>;
        break;
      case "email":
        returnField = <p className="text-sm">{value || field.placeholder}</p>;
        break;
      case "intro_mission":
        returnField = (
          <p className="text-base font-semibold">
            {value || field.placeholder}
          </p>
        );
        break;
      case "intro_long":
        returnField = <p className="text-sm"> {value || field.placeholder}</p>;
        break;
      case "experience_description":
        returnField = <p className="text-sm">{value || field.placeholder}</p>;
        break;
      case "experience_responsibility":
        returnField = <li className="text-sm">{value || field.placeholder}</li>;
        break;
      default:
        returnField = <p>Field Not Found</p>;
        break;
    }
  }

  return returnField;
};

export default EditHelper;
