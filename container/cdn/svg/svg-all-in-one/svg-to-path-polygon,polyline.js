"use strict";

/**
 *
 * @author xgqfrms
 * @license MIT
 * @copyright xgqfrms
 * @created 2020-01-07
 *
 * @description
 * @augments
 * @example
 * @link
 *
 */



Array.prototype.forEach.call(document.querySelectorAll('polygon,polyline'),function(poly){
  var path1 = convertPolyToPath1(poly);
  path1.setAttribute('class','cloned1');
  path1.setAttribute('transform','translate(0,3)');
  poly.parentNode.appendChild(path1);
  var path2 = convertPolyToPath2(poly);
  path2.setAttribute('class','cloned2');
  path2.setAttribute('transform','translate(0,6)');
  poly.parentNode.appendChild(path2);
});

function convertPolyToPath1(poly){
  var path = document.createElementNS(poly.ownerSVGElement.namespaceURI,'path');
  var points = poly.getAttribute('points').split(/\s+|,/);
  var x0=points.shift(), y0=points.shift();
  var pathdata = 'M'+x0+','+y0+'L'+points.join(' ');
  if (poly.tagName=='polygon') pathdata+='z';
  path.setAttribute('d',pathdata);
  return path;
}

function convertPolyToPath2(poly){
  var path = document.createElementNS(poly.ownerSVGElement.namespaceURI,'path');
  var segs = path.pathSegList;
  var pts  = poly.points;
  for (var i=0,len=pts.numberOfItems;i<len;++i){
    var pt = pts.getItem(i);
    var func = i==0 ? 'createSVGPathSegMovetoAbs' : 'createSVGPathSegLinetoAbs';
    segs.appendItem(path[func](pt.x,pt.y))
  }
  if (poly.tagName=='polygon') segs.appendItem(path.createSVGPathSegClosePath());
  return path;
}
