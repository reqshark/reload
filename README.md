reload
======

spawn child node process that restarts itself if any of the files in a given directory change (i.e., save/rename)

I like doing stuff like this for preprocessing server templates. Ensures our page load times are up to snuff during development when a file might be saved multiple times.


## another problem: viewing console or printed output from a child process often has too many line breaks and its not as clean as regular console.log()
