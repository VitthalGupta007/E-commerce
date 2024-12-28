CSS Libraries 
antd - building the component
tailwind css - CSS for normal styling

in terminal
for antd installation
```
npm i antd
```

for tailwind installation

```
npm install -D tailwindcss
npx tailwindcss init

```

In tailwind.config.js
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#91caff',
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  },
}

```

in index.css
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
install module as required : redux, react-router-dom, react-redux, @reactJs/toolkit

in index.html

add cdn for icon
```html
<link href="https://cdn.jsdelivr.net/npm/remixicon@3.2.0/fonts/remixicon.css" rel="stylesheet">
```

import external google font in index.css


```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');
```
```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif !important;
}
```
When you apply !important to a CSS property, it tells the browser to prioritize that specific rule over any other rule that might be applied to the same  element.