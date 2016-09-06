'use strict';

angular.module('ngTruncateTooltip', ['ui.bootstrap'])
	.config(['$uibTooltipProvider', function($uibTooltipProvider){
			  $uibTooltipProvider.setTriggers({
			    'show': 'hide',
			  });
			}])
	.provider('truncateTooltipConfig', function(){
		this.triggers = {
			'mouseenter' : 'mouseleave',
			'click'	: 'click',
			'focus'	: 'blur'
		};
		this.$get = function(){
			var triggers = this.triggers;
			return {
				config : function(startTriggger){
					return triggers[startTriggger] || startTriggger;
				}
			}
		};
		this.setTriggers = function(triggers){
			this.triggers.merge(triggers);
		}
	})
	.directive('truncateTooltip', ['$compile', '$timeout', 'truncateTooltipConfig',  function($compile, $timeout, truncateTooltipConfig){
		return {
			restrict: 'A',
			link: function(scope, elem, attrs) {
				elem.css('overflow', 'hidden');
				elem.css('text-overflow', 'ellipsis');
				elem.css('white-space', 'nowrap');
				
				elem.attr('uib-tooltip', elem.text());

				elem.attr('tooltip-trigger', "'show'");
				elem.removeAttr('truncate-tooltip');
				$compile(elem)(scope);
				scope.tooltipOn = false;
				var trigger = elem.attr('truncate-tooltip-trigger') ? elem.attr('truncate-tooltip-trigger') : 'mouseenter';
				elem.on(trigger, function(){
					if(this.offsetWidth < this.scrollWidth && !scope.tooltipOn){
						$timeout(function(){
							elem.triggerHandler('show');
							scope.tooltipOn = true;
						});
					}
				});
				var endTrigger = truncateTooltipConfig.config(trigger);
				if(endTrigger){
					elem.on(endTrigger, function(){
						if(scope.tooltipOn){
							$timeout(function(){
								elem.triggerHandler('hide');
								scope.tooltipOn = false;
							});
						}
					})
				}
			}
		};
	}]);
