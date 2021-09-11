const MODULE_NAME = 'react-environment/dist/components';

const removeElement = (path) => {
  if (path === null) return null;
  if (['JSXElement'].includes(path.type)) {
    return path.remove();
  }

  removeElement(path.parentPath);
};

const EliminateReactEnvironment = () => {
  return {
    visitor: {
      ImportDeclaration(path) {
        const module = path.get('source').node.value;
        if (module !== MODULE_NAME) return null;
        path.get('specifiers').forEach((specifier) => {
          const { referencePaths } = path.scope.getBinding(specifier.node.local.name);

          referencePaths.forEach((referencePath) => {
            removeElement(referencePath);
          });

        });
        path.remove();
      }
    }
  };
};

export default EliminateReactEnvironment;
