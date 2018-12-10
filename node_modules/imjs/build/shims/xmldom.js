(function() {
  var FakeDomParser;

  exports.DOMParser = global.DOMParser != null ? global.DOMParser : FakeDomParser = (function() {
    function FakeDomParser() {
      throw new Error("DOMParser is not available");
    }

    return FakeDomParser;

  })();

}).call(this);
