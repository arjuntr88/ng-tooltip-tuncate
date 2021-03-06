# ng-tooltip-tuncate

This is a simple directive that adds tooltip to an element only when its contents are truncated

Basic useful feature list:

 * Adds CSS to handle the truncation of content
 * Adds event listeners on the element, the triggers are configurable similar to tooltip trigger configuration
 * All the other bootstrap tooltip options are supported

Requires angular (>=1.0), ng-bootstrap(>=0.14), bootstrap CSS

Usage:
```html
<div truncate-tooltip>Some text which will overflow eventu...</div>
```

Install this using bower:
```
bower install ng-truncate-tooltip
```
and include in the html
```html
<script type="text/javascript", scr="bower_components/ng-truncate-tooltip/dist/truncate-tooltip.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```

Or directly download and add it to your html:
```html
<script type="text/javascript" src="dist/truncate-tooltip.js"></script>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
```

Add the specific module to your dependencies:
```javascript
angular.module("myApp", ["ngTruncateTooltip"] ...
```

To add custom triggers for the tooltip you can use `$truncateTooltipConfigProvider`
```
angular.module('myModule', [ngTruncateTooltip'])
	.config(['$truncateTooltipConfigProvider', function($truncateTooltipConfigProvider){
        $truncateTooltipConfigProvider.setTriggers({
            'show': 'hide',
        });
    }])
```
