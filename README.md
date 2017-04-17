React CSS Modules Loader
========================

<h2 align="center">Install</h2>

```bash
npm install --save-dev react-css-modules-loader
```

<h2 align="center">Usage</h2>

### Configuration

#### webpack.config.js

```js
module.exports = {
	module: {
		rules: [
			{
				test: /\.(jsx|js)$/,
				use: ['babel-loader', 'react-css-modules-loader']
			},
			{
				test: /\.(css)$/,
				use: ['css-loader']
			}
		]
	}
}
```

### Examples

#### Input

```jsx
import styles from 'index.css'

<div className="App">
	<div className="navbar" />
</div>
```

#### Output

```jsx
import styles from 'index.css'

<div className="App">
	<div className="navbar" />
</div>
```

<h2 align="center">Options</h2>

| Name | Defaults | Description |
|:----:|:--------:|-------------|
| **`styleMap`** | `styles` | Name of style export object |