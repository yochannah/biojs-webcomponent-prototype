(function() {
  var expose, imjs, merge;

  require('./shiv');

  module.exports = imjs = require('./service');

  merge = imjs.utils.merge;

  expose = function(name, thing) {
    if ('function' === typeof define && define.amd) {
      return define(name, [], thing);
    } else {
      return global[name] = thing;
    }
  };

  expose('imjs', imjs);

  if (typeof intermine === 'undefined') {
    expose('intermine', imjs);
  } else {
    expose('intermine', merge(intermine, imjs));
  }

}).call(this);
