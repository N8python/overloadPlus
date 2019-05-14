# Import
```js
import o from "./overloadPlus.js";
```
# Setup 
```js
class myClass {
  valueOf(){
    return o.$overload(this);
  }
  $plus(other){
    // Do stuff...
    return // The result of the addition
  }
}
```

# Use

```js
o.$p(new myClass1() + new myClass()); // $plus method is called behind the scenes.
```

# Limitations

Currently only works with objects. (No primitive addition overloading yet.)
