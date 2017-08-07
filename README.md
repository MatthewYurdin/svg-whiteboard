# SVG Whiteboard Illustration Helper

Nothing fancy here. Just a few functions for generating SVG elements that appear to be *drawn by hand* in marker, including lines, circles, polygons, and text (in my handwriting). The colors and other styling are meant to imitate the look of dry-erase markers on a whiteboard.

## Installation
Download `whiteboard.js` and reference it in an HTML file:

```html
<html>
  <head>
    <script type="text/javascript" src="whiteboard.js"></script>
  </head>
  <body>
    Open your console and try out functions from whiteboard.js. Copy and paste the output into your text editor and you've got an SVG.
  </body>
</html>
```

### Wrapper Functions
There are two functions for generating either a SVG or HTML wrapper for whatever SVG elements you make with the **Element Functions**.

`whiteboard.svg_wrapper(width = 1000, height = 700, color = "Blue", title = "A Whiteboard SVG Illustration")`

`whiteboard.html_wrapper(width = 1000, height = 700, color = "Blue", title = "A Whiteboard SVG Illustration")`

`width` and `height` are the dimensions (in pixels) of the SVG image. The default dimensions are 1,000px by 700px.

The `color` options are `"Black", "Blue", "Red", "Green", "Orange", and "Purple"`.

The `title` parameter is used in the SVG (and HTML)`<title>` element. It is not, however, drawn on the image. For that, you must use the `draw_text` function described below.

### Element Functions

**LINES**

`whiteboard.draw_line(startX, startY, endX, endY)`

**POLYGONS**

`whiteboard.draw_polygon(coordinates)`

`coordinates` is an array of arrays where the inner arrays are `[x, y]`. For example, you could make a square with:

`whiteboard.draw_polygon([0, 0], [100, 0], [100, 100], [0, 100])`

**CIRCLES**

`whiteboard.draw_circle(cx, cy, r)`

`cx` and `cy` are the coordinates of the center of the circle and `r` is the radius.

**TEXT**

`whiteboard.draw_text(x, y, text)`

`x` and `y` indicate the position of the text, which is left-aligned.

So far, the characters that can be used in `text` are: ABCDEFGHIJKLMNOPQRSTUVWXZabcdefghijklmnopqrstuv1234567890',-&.:"()+$?!/

![text function ref](text-ref.svg)
Format: ![Alt Text](url)

## TODOs

- Add text-size attribute
- Add text-align attribute
- Add fill option for circles and polygons
- Add helper functions for drawing arrows and axes
