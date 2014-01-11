
var spawn = require('child_process').spawn
var fs = require('fs')
var glob = require('glob');

var dir = 'views/partials/';
var ext = 'jade';

function stop(n){
  n.kill('SIGHUP')
}

function watch(n){
  fs.watch(dir, function (e,f) {
    
    
    if (e == 'change') {
      return stop(n)
    }
    
    
    //vim compatibility
    if (e == 'rename') {
      glob(dir'*.'+ext, function (er, fs){
        
        if (er) throw er;
        
        for (var i=0; fs[i]; i++)
          if (f == fs[i].split('.')[1]) {
            return stop(n)
          }
      
      })
    }
    
  })
}

function start(){
  var s = spawn('node', ['app'])
  
  s.stdout.on('data', function (data) {
    var buf = new Buffer(data)
    console.info(buf.toString())
  }).on('close', function (code) {
    return setImmediate(start())
  })
  
  watch(s)
}

start()
