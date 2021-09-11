import React from "react";
import EditHelper from "../EditHelper";

const ResumeSection = ({ section, values, form, setValues }) => {
  if (section.name.includes("header")) {
    return (
      <div className="w-full flex justify-between items-end w-full border border-b-1 border-t-0 border-r-0 border-l-0">
        {section.fields.map((field) => (
          <EditHelper
            key={field.order}
            field={field}
            form={form}
            value={values[field.order]}
            setValues={setValues}
            number={field.order}
          />
        ))}
      </div>
    );
  } else if (section.name.includes("contact")) {
    return (
      <div className="grid grid-cols-2 w-full border border-b-1 border-t-0 border-r-0 border-l-0">
        {section.fields.map((field) => (
          <EditHelper
            key={field.order}
            field={field}
            form={form}
            value={values[field.order]}
            setValues={setValues}
            number={field.order}
          />
        ))}
      </div>
    );
  } else if (section.name.includes("introSkill")) {
    return (
      <div className="grid grid-cols-2">
        {section.fields.map((field) => (
          <EditHelper
            key={field.order}
            field={field}
            form={form}
            value={values[field.order]}
            setValues={setValues}
            number={field.order}
          />
        ))}
      </div>
    );
  } else if (section.name.includes("intro")) {
    return (
      <div>
        {section.fields.map((field) => (
          <EditHelper
            key={field.order}
            field={field}
            form={form}
            value={values[field.order]}
            setValues={setValues}
            number={field.order}
          />
        ))}
      </div>
    );
  } else if (
    section.name.includes("experienceHeader") &&
    section.name.includes("1")
  ) {
    return (
      <div>
        <h2 className="text-base font-semibold w-full border border-b-1 border-t-0 border-r-0 border-l-0">
          Work Experience
        </h2>
        <div className="flex w-full justify-between items-end">
          <div className="flex justify-start space-x-1 w-full items-end">
            {section.fields
              .filter((field) => {
                return (
                  field.name.includes("company") || field.name.includes("city")
                );
              })
              .map((field) => (
                <EditHelper
                  key={field.order}
                  field={field}
                  form={form}
                  value={values[field.order]}
                  setValues={setValues}
                  number={field.order}
                />
              ))}
          </div>
          <div className="w-full">
            {section.fields
              .filter((field) => {
                return field.name.includes("date");
              })
              .map((field) => (
                <EditHelper
                  key={field.order}
                  field={field}
                  form={form}
                  value={values[field.order]}
                  setValues={setValues}
                  number={field.order}
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else if (section.name.includes("experienceHeader")) {
    return (
      <div>
        <div className="flex w-full justify-between items-end">
          <div className="flex justify-start space-x-1 w-full items-end">
            {section.fields
              .filter((field) => {
                return (
                  field.name.includes("company") || field.name.includes("city")
                );
              })
              .map((field) => (
                <EditHelper
                  key={field.order}
                  field={field}
                  form={form}
                  value={values[field.order]}
                  setValues={setValues}
                  number={field.order}
                />
              ))}
          </div>
          <div className="w-full">
            {section.fields
              .filter((field) => {
                return field.name.includes("date");
              })
              .map((field) => (
                <EditHelper
                  key={field.order}
                  field={field}
                  form={form}
                  value={values[field.order]}
                  setValues={setValues}
                  number={field.order}
                />
              ))}
          </div>
        </div>
      </div>
    );
  } else if (
    section.name.includes("experience") &&
    section.name.includes("1")
  ) {
    return (
      <div>
        {section.fields.map((field) => (
          <EditHelper
            key={field.order}
            field={field}
            form={form}
            value={values[field.order]}
            setValues={setValues}
            number={field.order}
          />
        ))}
      </div>
    );
  } else if (section.name.includes("experience")) {
    return (
      <div>
        {section.fields.map((field) => (
          <EditHelper
            key={field.order}
            field={field}
            form={form}
            value={values[field.order]}
            setValues={setValues}
            number={field.order}
          />
        ))}
      </div>
    );
  } else if (section.name.includes("education") && section.name.includes("1")) {
    return (
      <div>
        <h2 className="text-base font-semibold w-full border border-b-1 border-t-0 border-r-0 border-l-0">
          Education
        </h2>
        {section.fields.map((field) => (
          <EditHelper
            key={field.order}
            field={field}
            form={form}
            value={values[field.order]}
            setValues={setValues}
            number={field.order}
          />
        ))}
      </div>
    );
  } else if (section.name.includes("education")) {
    return (
      <div>
        {section.fields.map((field) => (
          <EditHelper
            key={field.order}
            field={field}
            form={form}
            value={values[field.order]}
            setValues={setValues}
            number={field.order}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        {section.fields.map((field) => (
          <p>{field.placeholder}</p>
        ))}
      </div>
    );
  }
};

export default ResumeSection;
