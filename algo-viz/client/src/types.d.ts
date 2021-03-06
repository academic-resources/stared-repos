declare namespace Viz {
  type language = "javascript" | "python";

  type valType =
    | "null"
    | "boolean"
    | "string"
    | "special"
    | "func"
    | "object"
    | "native"
    | "number"
    | "other";
  type scope = null | [null | number, number];
  type name = [number, number];
  type pointers = Map<string, (string | number)[]>;
  type objectPointer = {
    key: string | number;
    affinity: number;
    index: number;
    id: string;
  };
  type StructProp = {
    get: boolean;
    set: boolean;
    value: any;
  };
  type RenderMap = { [childId: string]: string };

  type Structure = Map<any, StructProp>;

  type speeds = {
    [key in Viz.configurable]: number;
  };

  type order = {
    pos: number;
    isMultiple: boolean;
  };
  type structSettings = {
    [key: string]: {
      order: {
        [child: string]: order;
      };
      main: string;
      numChildren: null | number;
      pointers: { [key: string]: boolean };
      textColor: string;
      color: string;
    };
  };
  type valueColor =
    | "special"
    | "number"
    | "string"
    | "boolean"
    | "other"
    | "native"
    | "func";
  type valueColors = {
    [key in valueColor]: string;
  };
  type configTypes =
    | "Callstack"
    | "Code Display"
    | "Objects"
    | "Identifiers"
    | "Step View"
    | "tooltips"
    | "Active Pointer on GET"
    | "Scroll Objects Into View"
    | "Find Object Parents";
  type configSettings = {
    [key in configTypes]: boolean;
  };
  type configColor =
    | "Primary Background"
    | "Secondary Background"
    | "Call Stack"
    | "Code"
    | "Code Highlight"
    | "Step Slider Track"
    | "Step Slider Rail"
    | "Step Slider Handle"
    | "Step Type"
    | "Text"
    | "Line Pointer"
    | "Arc Pointer"
    | "Line Pointer: GET"
    | "Line Pointer: SET"
    | "Arc Pointer: GET"
    | "Arc Pointer: SET";
  type configColors = {
    [key in configColor]: string;
  };

  interface AllSettings {
    valueColors: valueColors;
    configColors: configColors;
    speeds: speeds;
    structSettings?: structSettings;
    config: configSettings;
  }
  interface StoredSettings extends AllSettings {
    jsStructSettings?: structSettings;
    pyStructSettings?: structSettings;
  }

  type anim = [boolean, boolean];
  type ojectPositions = {
    [id: string]: { x: number; y: number; radius: number; renderId: string };
  };
  type displayOrientation = "row" | "column";

  type configurable =
    | "DECLARATION"
    | "ASSIGNMENT"
    | "EXPRESSION"
    | "CALL"
    | "DELETE"
    | "GET"
    | "SET"
    | "CLEAR";

  declare namespace Step {
    interface Generic {
      name?: name;
      scope?: scope;
      value?: any;
      batch?: (FUNC | METHOD | RETURN | BLOCK)[];
      prev?: any;
      prevPointerIdx?: number;
      prevScopeStack?: number[];
      [key: string]: any;
    }
    interface ObjectType extends Generic {
      object: string;
      access: number | string;
    }
    interface FuncType extends Generic {
      funcName: string;
      funcID: string;
    }
    interface VarType extends Generic {
      varName: string;
    }

    interface PROGRAM extends Generic {
      type: "PROGRAM";
    }
    interface BLOCK extends Generic {
      type: "BLOCK";
    }
    interface EXPRESSION extends Generic {
      type: "EXPRESSION";
    }
    interface CALL extends Generic {
      type: "CALL";
    }

    interface DECLARATION extends VarType {
      type: "DECLARATION";
      block: boolean;
    }
    interface ASSIGNMENT extends VarType {
      type: "ASSIGNMENT";
      update?: number;
    }
    interface DELETE_VARIABLE extends VarType {
      type: "DELETE_VARIABLE";
      update?: number;
    }

    interface FUNC extends FuncType {
      type: "FUNC";
    }
    interface METHOD extends FuncType {
      type: "METHOD";
      kind: string;
    }
    interface RETURN extends FuncType {
      type: "RETURN";
      callIdx?: number;
    }

    interface GET extends ObjectType {
      type: "GET";
    }
    interface SET extends ObjectType {
      type: "SET";
    }
    interface DELETE extends ObjectType {
      type: "DELETE";
    }
    interface CLEAR extends ObjectType {
      type: "CLEAR";
    }
    interface ERROR extends Generic {
      type: "ERROR";
      error: string;
    }
    type Any =
      | PROGRAM
      | BLOCK
      | EXPRESSION
      | CALL
      | DECLARATION
      | ASSIGNMENT
      | FUNC
      | METHOD
      | RETURN
      | GET
      | SET
      | DELETE
      | CLEAR
      | ERROR
      | DELETE_VARIABLE;
  }

  type ScopeChainEl = {
    parent: null | number;
    children: number[];
  };
  type ScopeIdentifiers = {
    [key: string]: any[];
  };
  type Data = {
    steps: Step.Any[];
    objects: { [objectId: string]: any };
    types: { [objectId: string]: any };
    objectIndex: { [index: string]: string[] };
    version: number;
    code: string;
    runtime: number;
  };
  type DisplayProps = {
    color: string;
    size: number;
    anim: Viz.anim;
    objectId: string;
    textDisplay: string;
    textColor?: string;
    highlight?: boolean;
    component?: ReactNode;
    isDataDisplay?: boolean;
  };
}
declare module "ansi-to-html" {
  interface ConverterOptions {
    fg?: string;
    bg?: string;
    newline?: boolean;
    escapeXML?: boolean;
    stream?: boolean;
    colors?: string[] | { [code: number]: string };
  }

  class Convert {
    constructor(options?: ConverterOptions);
    toHtml(data: string): string;
  }

  export = Convert;
}
