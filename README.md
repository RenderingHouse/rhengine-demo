# rhengine Real-time Rendering Engine

rhengine is a RESTful API for creating real-time interactive renderings. We support architectural renderings of exteriors, floorplans, and interiors.

**1. Get Rendering Info**
```
Input: clientName, communityName, planName, elevationName
Output: JSON object
base URL: http://rendering.house/api/v1/info
```

This API call retrieves information on renderable elements for an exterior rendering.
To render an exterior, you will need information on what `elements` of your rendering are customizable, and what options are available for each customizable element. Customization of elements per rendering are pre-configured and will need to be setup with our content creation team. Options for each custom element can be managed with the dashboard app provided to you.

To use this API,  you will be required to provide 4 inputs, namely the clientName, communityName, planName, and elevationName. The complete URL path should have the following pattern.
```
http://rendering.house/api/v1/info/:clientName/nbr/:communityName/plan/:planName/elev/:elevationName
```

For example:

```
With the following input:
clientName = demo,
communityName = Hamptons at Umstead,
planName = Oakwoood,
elevationName = B,
```

The API call is:
`
http://rendering.house/api/v1/info/demo/nbr/Hamptons%20at%20Umstead/plan/Oakwood/elev/B
`

**2. Exterior Rendering with color palettes**
```
Input: clientName, communityName, planName, elevationName, palette IDs, selection IDs
Output: image data
Optional parameters:
  o - specifies the image output format (jpeg, png, uri)
  w - specifies the width of the output image, e.g. w=700 for an image is 700px wide. The height of the image will be auto-scaled.
  s - specifies the scale of output image, e.g. s=0.5 for an image that is 50% of the natural size of the image
base URL: http://rendering.house/api/v1/ext
```
Our rendering engine provide you with the capability of customizing renderable elements with palettes of colors. For textured elements such stones and bricks, you can also add palettes to provide your end users with different selections of stones and bricks. Palettes are pre-configured with our dashboard app.

For example:
```
With the following input:
clientName = demo,
communityName = Hamptons at Umstead,
planName = Oakwoood,
elevationName = B,
palettes with IDs: 9,18,564,565,566,568,569,570,571,572,
and their corresponding selections with IDs: 211,254,21151,21265,21308,21332,21334,21343,21358,21365
```
The API call to output a PNG image with a width of 700 will be as follows:
`http://rendering.house/api/v1/ext/demo/nbr/Hamptons%20at%20Umstead/plan/Oakwood/elev/B/palette?pal=9,18,564,565,566,568,569,570,571,572&sel=211,254,21151,21265,21308,21332,21334,21343,21358,21365&o=png&w=762`


**3. Exterior Rendering with color schemes**

In some applications, color designers can preselect a combination of colors for all the customizable architectural elements and offer the entire set of selection as a color scheme. Our API also supports rendering exteriors with color schemes.

```
Input: clientName, communityName, planName, elevationName, schemeName
Output: image data
Optional parameters:
  o - specifies the image output format (jpeg, png, uri)
  w - specifies the width of the output image, e.g. w=700 for an image is 700px wide. The height of the image will be auto-scaled.
  s - specifies the scale of output image, e.g. s=0.5 for an image that is 50% of the natural size of the image
base URL: http://rendering.house/api/v1/ext
```

For example:
```
With the following input:
clientName = demo,
communityName = Briar Chapel,
planName = Oakwoood,
elevationName = B,
schemeName= Crossroads
```
The API call is as follows:

`http://rendering.house/api/v1/ext/demo/nbr/Briar Chapel/plan/Oakwood/elev/B/scheme/Crossroads`

**4. Exterior Rendering with hybrid mode**

Color schemes gives potential home buyers a set of color schemes that are preselected by professional designers. Hybrid mode is a rendering mode which offers the best of what color schemes have to offer enhanced with the flexibility of customizing indvidual architectural color elements.

```
Input: clientName, communityName, planName, elevationName, schemeName, paletteIDs, selectionIDs
Output: image data
Optional parameters:
  o - specifies the image output format (jpeg, png, uri)
  w - specifies the width of the output image, e.g. w=700 for an image is 700px wide. The height of the image will be auto-scaled.
  s - specifies the scale of output image, e.g. s=0.5 for an image that is 50% of the natural size of the image
base URL: http://rendering.house/api/v1/ext
```

For example:
```
With the following input:
clientName = demo,
communityName = Carries Reach,
planName = Oakwoood,
elevationName = B,
schemeName= Crossroads,
and a request to customize the siding element (paletteID=564) with the color Clary Sage (ID=21200)
```
The API call is as follows:

`http://rendering.house/api/v1/ext/demo/nbr/Carries Reach/plan/Oakwood/elev/B/hybrid/scheme/Crossroads/?pal=564&sel=21200`

**5. Floorplan Rendering**

Our rendering engine also supports rendering floorplans with customizable options.

`More documentation on this coming soon.`


**6. Interior Rendering**

With interiors, the API will require you to specify all selections for all customizable elements in the rendered image.

```
Optional parameters:
  o - specifies the image output format (jpeg, png, uri)
  w - specifies the width of the output image, e.g. w=700 for an image is 700px wide. The height of the image will be auto-scaled.
  s - specifies the scale of output image, e.g. s=0.5 for an image that is 50% of the natural size of the image
```

For example:

Lets says we want an image of a kitchen interior as a data URI with a width of 940px. Suppose the kitchen has the following customizable elements; Appliances, Cabinets, Counters, Floors, Furniture, Lighting, and Wall Color.

```
Given the following selection for each of the customizable element,
Appliances (ID:7), Selected option: White (ID:36)
Cabinets (ID:1), Selected option: Mahogany (ID:1)
Counters (ID:2), Selected option: Granite (ID:4)
Floors (ID:3), Selected option: Tile (ID:9)
Furniture (ID:4), Selected option: Ash (ID:13)
Lighting (ID:5), Selected option: Standard (ID:18)
Wall Color (ID: 6), Selected option: Beige (ID:23)
```

The API call to render the kitchen is:

`//rendering.house/api/v1/itr/demo/room/Kitchen?id=1&o=uri&w=940&opts=7,1,2,3,4,5,6&sel=36,1,4,9,13,18,23`

