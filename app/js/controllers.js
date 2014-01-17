'use strict';

/* Controllers */

angular.module('mattsite.controllers', []).
    controller('projectController', ['$scope', function($scope) {
        $scope.logTest = function() {
            console.log("ARE YOU WORKING?");
        }

        $scope.initd3 = function() {
            d3.json("data/data/test.json", function (data) {

                //dimensions
                var width = 800,
                    height =  500,
                    padding = 100;

                //scales
                var xScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                        return d.rank;
                    })])
                    .clamp(true)
                    .range([1000 - padding * 2, 0 + 50]);

                var yScale = d3.scale.linear()
                    .domain([0, d3.max(data, function(d) {
                        return d.count;
                    })])
                    .clamp(true)
                    .range([1000 - padding, 0 + padding]);

                // var rScale = d3.scale.linear()
                // 			.domain([0, 5])
                // 			.range(function(d) {
                // 				return d;
                // 			});

                //create the svg
                var svg = d3.select("#chartarea").append("svg")
                    //.append("g")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("transform", "translate(0," + (height - padding) + ")")
                    .attr("class", "chart");

                //add div for mouseover
                var div = d3.select("#chartarea").append("div")


                svg.selectAll("circle")
                    .data(data)
                    .enter()
                    .append("circle")
                    .attr("class", "circle")
                    .attr("cx", function(d) {
                        return xScale(d.rank);
                    })
                    .attr("cy", function(d) {
                        return yScale(d.count);
                    })
                    .attr('r', function(d) {
                        return d.count / 3;
                    })
                    .on("mouseover", function(d) {
                        div.transition()
                            .duration(200)
                            .style("opacity", .9)
                        div.text("Count: " + d.count)
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 28) + "px")
                    });

                svg.selectAll("text")
                    .data(data)
                    .enter()
                    .append("text")
                    .text(function(d) {
                        return d.name;
                    })
                    .attr("x", function(d) {
                        return xScale(d.rank);
                    })
                    .attr("y", function(d)	{
                        return yScale(d.count);
                    })
                    .attr("text-anchor", "middle")
                    .attr("font-size", function (d) {
                        return Math.sqrt(d.count);
                    })
                    .attr("font-family", "sans-serif");

            });

        }
    }])
    .controller('MyCtrl2', [function() {

    }]);