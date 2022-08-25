This is a library for creating abstract pixel art, that I made for illustrating [my novel](https://boris-marinov.github.io/x-notes/)

Allows you to draw abstract pixel art with code

For demos, see [the illustrations I made for it])https://boris-marinov.github.io/x-notes/gallery/)

This is not intended for public use, mainly publishing it in case someone is interested in looking at the code and making their own version of this.

Syntax
===
The basic syntax for creating a picture is creating a canvas element with class `art` and filling it with `splasher` elements, each element representing a layer.


```
<canvas 
  class="art" 
  width=800
  height=600
  data-pixel="4" 
  data-repeat="2000" 
  data-colors="black,pink,grey"
  >
    <splasher 
      data-size="intensoReversed" 
      data-size-params="50" 
      data-map="diagonals" 
      data-params="1000"
    >
    </splasher>
</canvas>

```



Global parameters
===

```
<canvas 
  class="art" 
  width=800
  height=600
  data-pixel="4" 
  data-repeat="2000" 
  data-colors="black,pink,grey"
  >
  <!-- insert layers here -->
</canvas>

```
Parameters that are valid for the whole picture, specified as a data attributes to the canvas object:

`pixel`
---
Specify anything more than 1 for scalling the the size of the pixel in the picture.

`repeat`
---
If you want for the picture to be rerendered, specify the number of milliseconds you want this to happen.

`colors`
---
A comma-separated list of colors that you want to use in the picture, can be overwritten on layer level.


Splasher parameters
===

A splasher is a layer that "splashes" pixels around the screen, according to a set of rules, specified by the parameters.

```
    <splasher 
      data-map="diagonals" 
      data-params="1000"

      data-size="intensoReversed" 
      data-size-params="50" 
    >
    </splasher>
```

`map`
---

The type of the `map` function to use. The map function determines where to place squares on the screen usually in a non-deterministic fashion.

`params`
---
Params that go to the `map` function. Most map functions accept a single number as a parameter.

`size`
---

The type of the `size` function to use. The size functoon determines how big should each square be. 


`size-params`
---
Params that go to the `size` function. Most `size` functions accept a single number as a parameter.


Maps
===

The map function determines where to place squares on the screen usually in a non-deterministic fashion.

Here are some map functions:

`constant`
---
Splashes squares in a constant i.e. completely random fashion.

`symmetry`
---
Same as constant, but the output is symmetric

`diagonals`
---
Places more squares in the diagonals of the picture.

For more info, see `maps.ts`.

Sizers
===

The size functoon determines how big should each square be.  Here are some `size` functions.

constant
---

Each square is the same size - the size is given as a parameter.

random
---
Squares are random size.

intenso
---
Squares are rendered, based on the intensity of the pixel, that is determined by the map.

For more info, see `sizers.ts`.

Plasher parameters
===

A plasher is a layer type that is like "splasher", the only difference is that the pixels aren't overlapping.
