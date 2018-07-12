# 0.1.0

Updated to `sqip@0.3.2`, which comes with its Go dependencies as binaries, so Go and Primitive are no longer requirements for 64bit operating systems.  
Added the ability to configure `mode` and `blur` through the loader options.

# 0.2.0

Added the `dimensions` export which contains the width, height and the type of the imported image.

```js
import { src, preview, dimensions } from './image.png';
```
