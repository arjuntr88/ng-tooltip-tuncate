"use strict";

angular.module("ngTruncateTooltip", ["ui.bootstrap"])
    .config(["$uibTooltipProvider", function($uibTooltipProvider){
              var triggers = {
                "show": "hide"
              };
              $uibTooltipProvider.setTriggers(triggers);
            }])
    .provider("truncateTooltipConfig", function(){
        this.triggers = {
            "mouseenter" : "mouseleave",
            "click"    : "click",
            "focus"    : "blur"
        };
        this.$get = function(){
            var triggers = this.triggers;
            return {
                config : function(startTriggger){
                    return triggers[startTriggger] || startTriggger;
                }
            };
        };
        this.setTriggers = function(triggers){
            angular.merge(this.triggers, this.triggers, triggers);
        };
    })
    .directive("truncateTooltip", ["$compile", "$timeout", "truncateTooltipConfig",  function($compile, $timeout, truncateTooltipConfig){
        return {
            restrict: "A",
            link: function(scope, elem, attrs) {
                elem.css("overflow", "hidden");
                elem.css("text-overflow", "ellipsis");
                elem.css("white-space", "nowrap");
                
                elem.attr("uib-tooltip", elem.text());

                elem.attr("tooltip-trigger", "'show'");
                elem.removeAttr("truncate-tooltip");
                var elemToCompile = elem.outerHTML;
                elem.replaceWith(elemToCompile);
                $compile(elem)(scope);
                scope.tooltipOn = false;
                var trigger = elem.attr("truncate-tooltip-trigger") ? elem.attr("truncate-tooltip-trigger") : "mouseenter";
                elem.on(trigger, function(){
                    if(this.offsetWidth < this.scrollWidth && !scope.tooltipOn){
                        $timeout(function(){
                            elem.triggerHandler("show");
                            scope.tooltipOn = true;
                        });
                    }
                });
                var endTrigger = truncateTooltipConfig.config(trigger);
                if(endTrigger){
                    elem.on(endTrigger, function(){
                        if(scope.tooltipOn){
                            $timeout(function(){
                                elem.triggerHandler("hide");
                                scope.tooltipOn = false;
                            });
                        }
                    });
                }
            }
        };
    }]);