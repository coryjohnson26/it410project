/**
 * Author: Cory Johnson
 * Date: 25 January 2016
 * Class: IT 410
 */

const fs = require('fs');
const Promise = require('bluebird');

/**Promise : getPathType ( path : String )
Determine if the path points to a file, a directory, nothing, or other. This is done using fs.stat.*/

exports.getPathType = function(path){
  return new Promise(function(resolve, reject){
    if(typeof path !== 'string') return reject('Path provided not a string');
    fs.stat(path, function(err, stats){
      if(err || !stats) return resolve('nothing');
      if(stats.isDirectory()) return resolve('directory');
      if(stats.isFile()) return resolve('file');
      return resolve('other');
    });
  });
};

/**Promise : getDirectoryTypes ( path : String [, depth : Number = -1 ] [, filter : Function = function(path, type) { return true; } )
Read a directory and get the path types, using fs.readdir and getPathType, for each file path in the directory.*/

exports.getDirectoryTypes = function(path, depth, filter){
  return new Promise(function(resolve, reject){
    depth = (typeof depth !== 'undefined') ? depth : -1;
    if(typeof depth !== 'number')reject('Depth is NaN');
    filter = (typeof filter !== 'undefined') ? filter : function(path, type){return true;};
    if(typeof filter !== 'function')reject('Filter is not a function');

    exports.getPathType(path).then(function(value){
      if(value === 'directory'){
        fs.readdir(path, function(err, files){
          if(err) reject(err.message);
          var obj = {};
          return Promise.map(files, function(file){
            return exports.getPathType(path + '/' + file).then(function(value){
              if(filter(path + '/' + file, value)){
                obj[path + '/' + file] = value;
              }
              if(value === 'directory' && depth){
                return exports.getDirectoryTypes(path + '/' + file, (depth === -1 ? depth : --depth), filter)
                  .then(function(value){
                    for (var item in value) { 
                        obj[item] = value[item]; 
                    }
                });
              }
            });
          }).then(function(){
            resolve(obj);
          }).catch(function(err){
            reject(err);
          });
        });
      }else{
        reject('Path is not a directory');
      }
    })
      .catch(function(err){
        reject('Path is not a string')
    });
  });
};

/**Promise : exists ( path : String )
Check to see if something exists at the specified path by using getPathType.*/

exports.exists = function(path){
  return new Promise(function(resolve, reject){
    exports.getPathType(path)
      .then(function(val){
      return val === 'nothing' ? resolve(false) : resolve(true);
    })
      .catch(function(val){
      reject(val);
    });
  });
};

/**Promise : getFilePaths ( path: String [, depth : Number = -1 ] )
Read a directory (and possibly sub-directories) to get an array of all paths to files, using getDirectoryTypes.*/

exports.getFilePaths = function(path, depth){
  return new Promise(function(resolve, reject){
    exports.getDirectoryTypes(path, depth, function(path, val){
        return val === 'file';
        })
      .then(function(val){
        return resolve(Object.keys(val));
        })
      .catch(function(val){
        return reject(val);
    });
  });
};

/**Promise : readFile ( path: String )
Get the contents of a file.*/

exports.readFile = function(path){
  return new Promise(function(resolve, reject){
    exports.getPathType(path)
      .then(function(val){
      if(val !== 'file') return reject('Path points to non-file');
      fs.readFile(path, 'utf8', function(err, data){
        return (err ? reject(err) : resolve(data));
      });
    })
      .catch(function(err){
      return reject(err);
    });
  });
};

/**Promise : readFiles ( paths: String[] )
Get the contents of multiple files using readFile.*/

exports.readFiles = function(paths){
  return new Promise(function(resolve, reject){
    var obj = {};
    return Promise.map(paths, function(path){
      return exports.readFile(path)
        .then(function(val){
        obj[path] = val;
      });
    }).then(function(val){
      resolve(obj);
    }).catch(function(err){
      reject(err);
    });
  });
};