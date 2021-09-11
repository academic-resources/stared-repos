### 3 finger trackpad actions

```edn
{:des "hold three fingers on trackpad & press keys" :rules [
   [:condi ["multitouch_extension_finger_count_total" 3]]
   [:f :button2] ;
   :v [:button1 :!Cv]]
;]}
```
