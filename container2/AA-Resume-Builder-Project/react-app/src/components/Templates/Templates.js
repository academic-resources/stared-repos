import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemplates, updateCurrentTemplate } from "../../store/template";
import Preview from "./Preview";

const Templates = () => {
  const dispatch = useDispatch();
  let templates = useSelector((state) => state.template.templates);
  let [loaded, setLoaded] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getTemplates()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <div className="templates-page">
      <div className="templates-page-outer">
        <div className="template-page-inner">
          <h1 className="w-full text-2xl text-center font-bold">Templates</h1>
          <div className="grid grid-cols-3 h-full space-x-1 justify-items-center">
            {loaded &&
              templates &&
              Object.keys(templates).length > 0 &&
              Object.keys(templates).map((temp_key) => {
                const the_template = templates[temp_key].field_data;

                return (
                  <Preview
                    key={temp_key}
                    template={the_template}
                    template_name={temp_key}
                    preview={false}
                    tags={templates[temp_key].default_tags}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
