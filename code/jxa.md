```javascript
// Get URL of front most tab
Application("Google Chrome Canary").windows[0].activeTab.url();
```

```javascript
// Activate app
it = Application("Safari");
it.activate();
```

```javascript
// Minimize all Safari windows but the currently focused one
safari = Application("Safari");

// Front most window has index 0
for (var i = 1; i < safari.windows.length; i++) {
  var win = safari.windows[i];
  if (win.miniaturized() === false) win.miniaturized = true;
}
```

```javascript
// Get selected text in Chrome Canary
Application("Google Chrome Canary").windows[0].activeTab.execute({
  javascript: "window.getSelection().toString()",
});
```

```javascript
// Return current active line in TaskPaper.
(() => {
  "use strict";

  const main = () => {
    const tp3Context = (editor, options) => {
      const main = () =>
        unlines(
          concatMap((x) => {
            const txt = x[options.textProperty];
            return options.skipBlankLines && 0 === txt.length ? [] : [txt];
          }, editor.selection.selectedItems)
        );

      // GENERIC FUNCTIONS FOR TP3 CONTEXT ----------
      // https://github.com/RobTrew/prelude-jxa

      // concatMap :: (a -> [b]) -> [a] -> [b]
      const concatMap = (f, xs) => xs.reduce((a, x) => a.concat(f(x)), []);

      // unlines :: [String] -> String
      const unlines = (xs) => xs.join("\n");

      // TP3 MAIN ---
      return main();
    };

    const ds = Application("TaskPaper").documents,
      lrResult = bindLR(
        ds.length > 0 ? Right(ds.at(0)) : Left("No TaskPaper documents open"),
        (d) =>
          Right(
            d.evaluate({
              script: tp3Context.toString(),
              withOptions: {
                skipBlankLines: true,
                textProperty: "bodyContentString", // or 'bodyContentString'
              },
            })
          )
      );
    return lrResult.Left || lrResult.Right;
  };

  // GENERIC FUNCTIONS FOR JXA CONTEXT ------------------
  // https://github.com/RobTrew/prelude-jxa

  // Left :: a -> Either a b
  const Left = (x) => ({
    type: "Either",
    Left: x,
  });

  // Right :: b -> Either a b
  const Right = (x) => ({
    type: "Either",
    Right: x,
  });

  // bindLR (>>=) :: Either a -> (a -> Either b) -> Either b
  const bindLR = (m, mf) => (undefined !== m.Left ? m : mf(m.Right));

  // MAIN ----
  return main();
})();
```
