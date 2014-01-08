var spawn = require('child_process').spawn
 , fs = require('fs')


function stop(n){
  n.kill('SIGHUP')
}

function watch(n){
  fs.watch('views/partials', function (e,f) {
    if (f && e == 'change') {
      return stop(n)
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
