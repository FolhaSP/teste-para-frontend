/**
 * An image srcset polyfill that provides fallback behaviour for browsers
 * that do not support the srcset attribute.
 *
 * Copyright (c) James South
 *
 * Twitter:  http://twitter.com/James_M_South
 * Github: https://github.com/JimBobSquarePants/srcset-polyfill
 * Licensed under the Apache License v2.0.
 * http://www.apache.org/licenses/LICENSE-2.0.html
 *
 * Supports the current syntax as defined below.   
 *
 * http://www.whatwg.org/specs/web-apps/current-work/multipage/embedded-content-1.html#attr-img-srcset
 * http://lists.whatwg.org/pipermail/whatwg-whatwg.org/2012-May/035746.html
 */

(function (w, d) {

    "use strict";

    // A little feature detection first
    var srcsetSupported = "srcset" in document.createElement("img");

    // Used for housing viewport information.
    var Viewport = function () {
        /// <summary>Provides the height, width, and pixel ratio of the current viewport.</summary>

        this.width = w.innerWidth || d.documentElement.clientWidth;
        this.height = w.innerHeight || d.documentElement.clientHeight;

        // Detect retina display
        // http: //www.quirksmode.org/blog/archives/2012/06/devicepixelrati.html
        this.pixelRatio = w.devicePixelRatio || 1.0;
    };

    var SrcSet = function (viewport) {
        /// <summary>
        /// Provides methods to parse an image srcset attribute to return the correct
        /// src for the given viewport.
        /// </summary>
        /// <param name="viewport" type="Viewport">
        /// The object containing information about the current viewpoint.
        /// </param>
        this.viewport = viewport;
        this.maxWidth = Infinity;
        this.maxHeight = Infinity;
        this.maxPixelRatio = 1.0;
        this.candidates = [];
    };

    SrcSet.prototype = {
        constructor: SrcSet,
        parseImage: function (img) {
            /// <summary>Parses the image to produce a list of source candidates.</summary>
            /// <param name="img" type="HTML">The element to produce the list of source candidates for.</param>
            /// <returns type="SrcSet">The object for chaining.</returns>

            // Regexes for matching queries.
            var rSrc = /[^\s]+/,
                rHeight = /\s(\d+)h/,
                rWidth = /\s(\d+)w/,
                rRatio = /\s(\d+((\.\d+)?))x/;

            // Parse the srcset from the image element.
            var srcset = img.getAttribute("srcset"),
                candidates = this.candidates;

            if (srcset) {

                var i,
                    sources = srcset.split(","),
                    length = sources.length;

                // Loop through the srcset attributes and build a candidate.
                for (i = 0; i < length; i += 1) {

                    var src = sources[i].match(rSrc)[0],
                        height = rHeight.test(sources[i]) ? parseInt(sources[i].match(rHeight)[1], 10) : Infinity,
                        width = rWidth.test(sources[i]) ? parseInt(sources[i].match(rWidth)[1], 10) : Infinity,
                        pixelRatio = rRatio.test(sources[i]) ? parseFloat(sources[i].match(rRatio)[1]) : 1.0;

                    candidates.push({ src: src, height: height, width: width, pixelRatio: pixelRatio });
                }
            }

            // Return for chaining.
            return this;
        },
        getBestCandidate: function (viewport) {
            /// <summary>
            /// Get the best src candidate as per the steps outlined here.
            /// http://www.whatwg.org/specs/web-apps/current-work/multipage/embedded-content-1.html#processing-the-image-candidates
            /// </summary>
            /// <param name="viewport" type="Viewport">Provides the height, width, and pixel ratio of the current viewport.</param>
            var images = this.candidates,
                width = viewport.width,
                height = viewport.height,
                pixelRatio = viewport.pixelRatio,
                getBestCandidate = function (criteria) {
                    var i,
                        length = images.length,
                        best = images[0];

                    // Loop through and replace the best candidate who matches
                    // the given criteria.
                    for (i = 0; i < length; i += 1) {

                        if (criteria(images[i], best)) {

                            best = images[i];
                        }
                    }

                    return best;
                },
                removeCandidate = function (criteria) {

                    var i,
                        length = images.length;

                    // Loop through and remove any candidates who match the given criteria.
                    // Loop in reverse.
                    for (i = length - 1; i >= 0; i -= 1) {

                        if (criteria(images[i])) {

                            images.splice(i, 1);
                        }
                    }
                };

            if (images.length === 0) {
                return null;
            }

            // If there are any entries in candidates that have an associated width that is less than max width, 
            // then remove them, unless that would remove all the entries, in which case remove only the entries 
            // whose associated width is less than the greatest such width.
            var largestWidth = getBestCandidate(function (a, b) { return a.width > b.width; });
            removeCandidate(function (a) { return a.width < width; });

            if (images.length === 0) {
                images = [largestWidth];
            }

            // If there are any entries in candidates that have an associated height that is less than max height, 
            // then remove them, unless that would remove all the entries, in which case remove only the entries 
            // whose associated height is less than the greatest such height.
            var largestHeight = getBestCandidate(function (a, b) { return a.height > b.height; });
            removeCandidate(function (a) { return a.height < height; });

            if (images.length === 0) {
                images = [largestHeight];
            }

            // If there are any entries in candidates that have an associated pixel density that is less than a user-agent-defined
            // value giving the nominal pixel density of the display, then remove them, unless that would remove all the entries, 
            // in which case remove only the entries whose associated pixel density is less than the greatest such pixel density.
            var largestPixelRatio = getBestCandidate(function (a, b) { return a.pixelRatio > b.pixelRatio; });
            removeCandidate(function (a) { return a.pixelRatio < pixelRatio; });

            if (images.length === 0) {
                images = [largestPixelRatio];
            }

            // Remove all the entries in candidates that have an associated width 
            // that is greater than the smallest such width.
            var smallestWidth = getBestCandidate(function (a, b) { return a.width < b.width; });
            removeCandidate(function (a) { return a.width > smallestWidth.width; });

            // Remove all the entries in candidates that have an associated height
            // that is greater than the smallest such height.
            var smallestHeight = getBestCandidate(function (a, b) { return a.height < b.height; });
            removeCandidate(function (a) { return a.height > smallestHeight.height; });

            // Remove all the entries in candidates that have an associated pixel density 
            // that is greater than the smallest such pixel density.
            var smallestPixelRatio = getBestCandidate(function (a, b) { return a.pixelRatio < b.pixelRatio; });
            removeCandidate(function (a) { return a.pixelRatio > smallestPixelRatio.pixelRatio; });

            // Return the best image.
            return images[0];
        }
    };

    var setSources = function () {
        /// <summary>Loops through the images in the current page and sets the correct source.</summary>

        if (srcsetSupported) {
            // No need to process anything further.
            return;
        }

        // Get the current viewport information.
        var viewport = new Viewport();

        // Fetch all images on the page.
        var i,
            images = document.querySelectorAll("img"),
            length = images.length;

        // Loop through, calculate and set the correct source.
        for (i = 0; i < length; i += 1) {

            var srcSet = new SrcSet(),
                image = images[i],
                candidate = srcSet.parseImage(image).getBestCandidate(viewport);

            if (candidate) {

                image.src = candidate.src;
            }
        }
    };

    var resizeTimer,

        addEventHandler = function (eventType, handler) {
            /// <summary>Cross browser event handling.</summary>
            /// <param name="eventType" type="String">The name of the event to bind.</param>
            /// <param name="handler" type="Function">The event handler to call.</param>

            if (w.addEventListener) {

                w.addEventListener(eventType, handler, false);

            } else if (w.attachEvent && eventType !== "DOMContentLoaded") {
                w.attachEvent("on" + eventType, handler);
            }
        };

    // Run on resize and domready (w.load as a fallback)
    addEventHandler("DOMContentLoaded", function () {

        setSources();

        // Run once only
        w.removeEventListener("load", setSources, false);
    });

    addEventHandler("load", setSources);

    addEventHandler("resize", function () {

        // Throttle the method.
        if (resizeTimer) {
            w.clearTimeout(resizeTimer);
        }

        resizeTimer = w.setTimeout(setSources, 50);
    });

    // Assign back to the window to allow hooking in
    // for ajax events.
    w.srcset = setSources;

}(window, document));
