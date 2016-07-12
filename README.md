# rhengine Real-time Rendering Engine

rhengine is a RESTful API for creating real-time interactive renderings.

**1. getInfo**
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

**2. Render with color palettes**


**3. Render with color schemes**

**4. Render with hybrid mode**


