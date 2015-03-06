'use strict';
var fs = require('fs'),
  path = require('path'),
  transcoder = require('threejs-geometry-transcode-format-to-custom-binary');

function getFileList(assetPath, callback) {
  assetPath = path.resolve(assetPath);

  fs.readdir(assetPath, function(err, files) {
    var fileList = [];
    if(err) throw err;
    files.forEach(function(file) {
      if(file.indexOf('.json') !== -1) {
        fileList.push(path.resolve(assetPath + '/' + file));
      }
    })
    callback(fileList);
  });
}

module.exports = function(grunt) {

  grunt.registerMultiTask('threejs-geometry-transcode-format-to-custom-binary', 'A grunt plugin to transcode threejs json geometry into custom binary files.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });
    var done = this.async();
    var transcoding = 0;
    function callback() {
      transcoding--;
      if(transcoding === 0) done();
    }
    options.paths.forEach(function(geomPath) {
      transcoding++;
      getFileList(geomPath, function(fileList) {
        transcoder(fileList, true, callback);
      });
    })
  });
};
