import { Runner } from ".";

export default function instantiateSLL(runner: Runner) {
  return class SLL {
    next: SLL | null;
    value: any;
    constructor(val: any) {
      this.value = val;
      this.next = null;
    }
    static create(elems: any[]): SLL {
      if (!Array.isArray(elems))
        throw new Error(
          "Viz.SLL.create: SLL elements must be given in array form"
        );
      if (!elems.length)
        throw new Error(
          "Viz.SLL.create: Elements must have a length of at least 1"
        );
      runner.ignore(true);
      const list = new SLL(elems[0]);
      let current = list;
      for (let i = 1; i < elems.length; i++) {
        current = current.next = new SLL(elems[i]);
      }
      runner.ignore(false);
      return list;
    }
    static reverse(list: SLL): SLL {
      this.assert(list);
      let current: SLL | null = list;
      let prev = null;
      const seen: Set<SLL> = new Set();
      while (current) {
        if (seen.has(current))
          throw new Error("Viz.SLL.reverse: Cannot reverse cyclic list");
        const next: SLL | null = current.next;
        current.next = prev;
        prev = current;
        seen.add(current);
        current = next;
      }
      return prev;
    }
    static toArray(list: SLL): any[] {
      const elems: any[] = [];
      this.forEach(list, (val) => elems.push(val));
      return elems;
    }
    static forEach(list: SLL, callback: (val: any) => any): void {
      this.assert(list);
      const seen: Set<SLL> = new Set();
      for (let current: SLL | null = list; !!current; current = current.next) {
        if (seen.has(current))
          throw new Error("Viz.SLL.forEach: Cannot traverse a cyclic list");
        callback(current.value);
        seen.add(current);
      }
    }
    private static assert(list: SLL) {
      if (!("next" in list) || !("value" in list))
        throw new Error(
          'Viz.SLL: List must have properties "next" and "value"'
        );
    }
  };
}
