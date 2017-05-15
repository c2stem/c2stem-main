# c2stem-main

* Git submodule [primer](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
* Installation: <code>npm install</code>
* Running the server: <code>./server.js -v</code>

## pm2 example
[pm2](http://pm2.keymetrics.io/) is nice for easily daemonizing node apps. An example of using pm2 to run a node app is given below:

```
pm2 start --name "c2stem-main" npm start --interpreter $(which node)
```

