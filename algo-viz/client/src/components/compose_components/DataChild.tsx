import React from "react";
import store from "../../store";
import DataStruct from "./DataStruct";
import ArrayStruct from "./ArrayStruct";
import HashStruct from "./HashStruct";
import { observer } from "mobx-react";
import LinePointer from "./LinePointer";
import genId from "../../utils/genId";
import ArcPointer from "./ArcPointer";

type Props = {
  objectId: string;
  ratio: number;
  prop: string | number;
  parent: Viz.Structure;
  parentId: string;
  isList?: boolean;
  idx?: number;
  depth: number;
  setDepth: (d: number, val: number) => void;
  depthMultiplier: number;
};

@observer
class DataChild extends React.Component<Props> {
  renderId: string = genId(5);
  componentDidMount() {
    this.props.setDepth(this.props.depth, 1);
  }

  componentWillUnmount() {
    const pos = store.structs.positions[this.props.objectId];
    if (pos) {
      if (pos.renderId === this.renderId) {
        delete store.structs.positions[this.props.objectId];
      }
    }
    this.props.setDepth(this.props.depth, -1);
  }
  render() {
    const {
      objectId,
      ratio,
      prop,
      parent,
      parentId,
      isList,
      idx,
      depth,
      setDepth,
      depthMultiplier,
    } = this.props;
    const pos = store.structs.positions[objectId];

    const info = parent.get(prop);
    const type = store.viz.types[objectId];
    const arc = pos ? this.renderId !== pos.renderId : false;

    const pointerProps = {
      arc,
      get: info.get,
      set: info.set,
      from: parentId,
      to: objectId,
      prop,
    };
    let element;
    if (!store.settings.unconfigurables.has(type)) {
      element = (
        <DataStruct
          depthMultiplier={depthMultiplier}
          setDepth={setDepth}
          depth={depth}
          idx={idx}
          isList={isList}
          renderId={this.renderId}
          objectId={objectId}
          ratio={ratio}
          structure={store.structs.objects[objectId]}
        />
      );
    } else if (store.settings.arrayTypes.has(type)) {
      element = (
        <ArrayStruct
          renderId={this.renderId}
          objectId={objectId}
          ratio={ratio}
          pointed={false}
          structure={store.structs.objects[objectId]}
        />
      );
    } else if (store.settings.hashTypes.has(type)) {
      element = (
        <HashStruct
          renderId={this.renderId}
          objectId={objectId}
          ratio={ratio}
          pointed={false}
          structure={store.structs.objects[objectId]}
        />
      );
    } else {
      element = null;
    }
    return !arc ? (
      <LinePointer {...pointerProps}>{element}</LinePointer>
    ) : (
      <ArcPointer {...pointerProps}>{element}</ArcPointer>
    );
  }
}

export default DataChild;
