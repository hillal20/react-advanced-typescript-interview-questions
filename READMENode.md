# React Interview questions && Javascript

## 1 \*\* Unidirectional Data flow:

the dom in react doest not update the state, this means if you have an input and you bind the value of it to a state, if the changeHandler is empty and not updating the state , nothing will be typed on the screen BECAUSE the DOM does not update the state. In other words the state is controlling what we see in the screen and not the vice versa, the screen (dom) is not able to update the state

## 2 \*\* Difference between props and state

the data is belonging to that component only, and the component itself can manipulate that data, while the props is the data passed to other component

## 3 \*\* lift state up

the children consume the same data that is coming form the parent. the parent provides the data to children (the parent state is higher )

## 4 \*\* controlled component vs uncontrolled component

- the uncontrolled component is where value of the input is not bound to the state, but it is bound to the ref ex: `<input value={inputRef}>` and inputRef = useRef(); to access the data
  we simply ask on in the ref ex: ref.current.value

- the controlled component is where the value of the input is bound to the state of the component

## 5 \*\* Keys

React doest like to use the index of the array as keys, but need something unique to make the react processing internally easier

## 6 \*\* Context

the mechanism in react which allows to pass the data from a component to another deeper component in the tree without passing thru the props

## 7 \*\* High order component

The wrapper component receiving a component as a param, and the wrapper component could supply the passed component with extra functionalities or properties

## 8 \*\* React.Memo

makes the component only rendered only if the props of it is changing regardless what happening to the parent

## 9 \*\* useCallback

regenerate new function only if its array dependencies changes

## 10 \*\* useMemo

regenerate new value if only if its array dependencies changes

## 11 \*\* var

var in javascript is a block scoped type

## 12 \*\* derived state in react

1- let say we have 2 inputs one has an add button next to it to add tasks,
2- and one it made for searching (filtering the tasks).

3- the naive approach is that the user types something in the search input, and the onChangeHandler will take the tasks form the state and filter them and react will the show them on the screen.

4- this approach is working fine, but it will have small problem when we try to delete a letter or more from the search input,
the filtering will stop working BECAUSE every time we delete a letter, the filter will delete some thing form the list which not matching the search query.

there is a solution for it but it is not recommended because we need to store the filtered tasks in a new state and we make react displaying only the filtered tasks.

this approach is not good because we are storing the data in two places in the state, we call the second state "the derived state"
because it is relaying on the data coming from the first state

5- the bast solution is we store the value of the search input in the state and we use that value to do the filtering and then react we display the filtered task. We end up having two states, one is the tasks added , and the second one is the string typed in the search input. we could store the filter function in useMemo and we provide the params searchKey and tasks.

## 13 \*\* React Strict mode

it is made only in the development, not in the production. It is made to discover bugs react thinks it is existing during the development env. there are 6 things to cover:

1- unintended side effects: React first render phase is too slow, unlike the update phase where react compare the html changed to the previous one and update only the places changed.

sometimes we observe that react is updating 2 times and the console.log is showing 2 times. this means there is a problem and react is complaining about it and react strict is the one who is doing this warning

## 13 \*\* Tools used in react

Webpack, React Router , Typescript , stroyBook

## 14 \*\* Testing Strategy

TDD for logic , Automated for the rest

## 15 \*\* Handle component reuse

refactoring duplicated code or creating Generic Component

## 16 \*\* Tasks we do run

task runner and webpack bundling

## 17 \*\* Use of component based testing

Enzyme for Generic component and UI testing mostly

## 18 \*\* TDD

used to test the logic

## 19 \*\* State we use

Private for the component (useState), and the store or concept for the shared one

## 20 \*\* How to handle bundling performance

the loaders will do the job

## 21 \*\* handling Component Variants

inform the company and most likely creating generic component

## 22 \*\* avoiding component duplication

using a good name strategy

## 23 \*\* handling branding/themes

i use variant prop in the component

## 24 \*\* handle translations

we get them from a external tool

## 25 \*\* dns in node js

dns is for looking the api address of a website or the revers

```const dns = require("dns");

dns.lookup("pluralsight.com", (err, address) => {
  console.log("pluralsight address ===> ", address);
});

dns.reverse("54.201.247.181", (err, hostNames) => {
  console.log(hostNames);
});
```

## 26 \*\* global modules in node

console , setTimeout , setInterval , setImmediate ...

## 27 \*\* udp in node js

it is to create server with sockets to send and receive strings or buffers

```
const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const port = 3333;
const host = "localhost";

/////////////////// server

server.on("message", (msg, remoteInfo) => {
  console.log("msg ===>", msg);
  console.log("rinfo ===>", remoteInfo);
});

server.on("listening", () => {
  console.log("===> udp  server listening ===");
});

server.bind(port, host);

////////// client
const client = dgram.createSocket("udp4");

client.send("pluralsight rocks", port, host, err => {
  if (err) throw err;
  console.log("==> udp message sent === ");
  client.close();
});

/////  we can send buffer
const bufferMsg = Buffer.from("hilal aissani");
client.send(bufferMsg, 0, bufferMsg.length, port, host, err => {
  if (err) throw err;
  console.log("==> udp bufferMessage sent === ");
  client.close();
});
```

## 28 \*\* net in node js

it is to create sockets to listen to messages sent

## 29 \*\* cluster in node js

to let the server use the local cpus , there is a master process and child process to be forked

```
const cluster = require("cluster");
const os = require("os");

// os module help us to read how many  the cpu cores
// cluster module tell us if th current module (cluster.js file )
// is the master process or not

const masterPrecessFn = () => {
  return " # of users in Db is 10 ";
};
const numberOfUsers = masterPrecessFn();

if (cluster.isMaster) {
  const cpus = os.cpus().length;
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
  }
  console.log(`==== MASTER PROCESS  ==> ${process.pid}`);
  const workers = Object.values(cluster.workers);

  workers.forEach(worker => {
    worker.send(`I am a worker  ${worker.id} ===> ${numberOfUsers}    `);
  });

  cluster.on("exit", (worker, code, signal) => {
    // if a process exit , new one will automatically start
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      // this if statement is to avoid worker.disconnect &&
      // worker.kill(); hence the case is an sudden crash for
      // the server
      console.log(`worker  ${worker.id} crashed ... starting new one `);
      cluster.fork();
    }

    process.on("SIGUSR2", () => {
      const workers2 = Object.values(cluster.workers);
      const restartAWorker = workerIndex => {
        const currentWorker = workers2[workerIndex];
        if (!currentWorker) {
          // if there is no more worker to restart the function
          // stops.
          return;
        }
        currentWorker.on("exit", () => {
          if (!currentWorker.exitedAfterDisconnect) {
            return;
          }
          console.log(`exited process  ==> ${worker.process.pid}`);
          const newWorker = cluster.fork();

          newWorker.on("listening", () => {
            restartAWorker(workerIndex + 1);
          });
        });
        currentWorker.disconnect();
      };
      restartAWorker(0); // just to start with first worker
    });
  });
} else {
  require("./server.js");

  or
  const { fork } = require("child_process");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const server = express();

server.use(cors());
server.use(bodyParser.json());

process.on("message", (msg) => {
  console.log("msg ==> ", msg);
});

// this code will exit one of the processes automatically
// setTimeout(() => {
//   process.exit(1);
// }, Math.random() * 10000);

server.get("/", (req, res) => {
  res.json({ msg: "api is running ", pid: process.pid });
});

server.get("/data", (req, res) => {
  const child = fork("fetchingData.js");
  child.send("start Fetching");
  child.on("message", (msg) => {
    res.send(msg.fetchedData);
  });
});
}
```

## 30 \*\* streams in node js

there is 2 readStream ( the file we need to read ex: data.txt ), and the writeStream ( the file we need to create the data inside it ex: data.txt)

```
const http = require("http");
const server = http.createServer();
const fs = require("fs");

server.on("request", (req, res) => {

const file = fs.createWriteStream("./BigFile.file");
for (let i = 0; i <= 1e6; i++) {
  file.write(" hello students  this is a life streaming ...........");
}
file.end();

  // fs.readFile("./bigFile.file", "utf8", (err, data) => {
  //   if (err) throw err;
  //   //console.log(data);
  //   res.end(data);
  // });

  const file = fs.createReadStream("./bigFile.file");
  file.pipe(res);
});

server.listen(4444, () => {
  console.log("== server is running on port 4444 ==");
});
```

## 31 \*\* read files in javascript

1- we need an input of type=file and a div of id=preview
2- fileInput = document.querySelector('input')
3- preview = document.getElementById('preview')

```
 fileInput.addEventListener("change", ()=> {
    const fr = new FileReader()
    fr.readAsText(fileInput.files[0])
    fr.addEventListener("load", () => {
        preview.textContent = fr.result;
    })
})

```

## 32 \*\* read files in node

we use fs module , we use the result = fs.readFileSync("./file.txt")
the result will be a buffer , to solve that we need to add 'utf8' as second

argument : result = fs.readFileSync("./file.txt". 'utf8')

but to avoid error we need to wrap it in the try catch

```
try {
  fs.readFileSync("./file.txt". 'utf8')
  }
  catch(err){
    console.log(err)
  }
```

we could use the non sync way:

result = fs.readFile("./file.txt", "utf8", (err, data)=> {})

## 33 \*\* promisify utility in node

const { promisify } from "util"

if convert only the callbacks starting with the err as a first param

let say we need to make a blocking code to promise
ex :

readFilePromise = promisify(fs.readFile)

then we could skip the cb and we use then and catch

readFilePromise("file.txt", 'utf8').then(data).catch(err)

## 34 \*\* stdin and stdout in node

process.stdout.write("Please enter your name \n");
process.stdin.on("data", (data) => {
// data is a buffer
console.log("data ===> ", data.toString());
});

## 35 \*\* pipes in node

pipes are mechanisms in node in which you can read data from
a source and write it to a destination

```
import fs from 'fs'
const readableStream = fs.createReadStream('./source.txt')
const writableStream = fs.createWriteStream('./destination.txt')

readableStream.pipe(writableStream)
```

## 36 \*\* Module wrapper in node

every module contains an IIFI ( function expression)

```
(function(exports , require, module , __filename, __dirname ){
  const x = "hello word"
  console.log(x)
})()
```

the 5 params are local variables for the module injected by node js inside the module during the execution

## 37 \*\* module caching in node

if in in a module we have a class, we should avoid exporting an instance of that class , we should export the class
because if we export the instance of the class, node will cache it and
if we modify that instance in one place and we want to import an other instance we will find the new imported instance is modified as well
because node will try to save time and gives the cached one which it is already modified

## 38 \*\* API functions

there 2 types sync APIs for non-blocking functions and async APIS for blocking functions

## 39 \*\* control flow code

it is used if there is async calls/code happened, to evaluate the order of the calls/code

## 40 \*\* event loop

It is the mechanism of handling the callbacks, to support the non-blocking code, via event-listeners. Node assign a listener to every event and call the callback assigned to it.

## 41 \*\* security implementation in node

error handling protocols and authentication pipelines

## 42 \*\* test pyramid

methodology : unit testing , integration testing , combined testing

## 43 \*\* Events

```
const events = require('events');
const {EventEmitter} = events

const eventEmitterObj = new EventEmitter();

//types of events : error , warn, info , message ...

eventEmitterObj.emit("error", "this is an error")
entEmitterObj.on("error", (error) => {})

eventEmitterObj.emit("warn", "this is an warning ")
eventEmitterObj.on("warn", (error) => {})

eventEmitterObj.emit("info", "this is an info")
eventEmitterObj.on("info", (error) => {})

```

## 44 \*\* streams for big data

channels of data , readable and writable, we read data form the readable and we write data to the writable ex : req,res

- the readable stream is inherited from the EventEmitter ("emit", "readable", "end")

```

http.createServer((req, res)=> {
       res.writeHead(200);

       req.on("readable", ()=> {
            let chunk = null;
            while(null ! === (chunk = req.read())){

              console.log(chunk.toString());
              res.write(chunk);

            }
       })

      req.on("end" , ()=> {
        res.end("finished !!!")
      })

}).listen(8000)

or

const fs = require('fs')

const file = fs.createReadStream('file.txt')
cont newFile = fs.createWriteStream('newFile.txt)

file.pipe(newFile)

```

## 45 \*\* file upload via stream and progress %

```
const fs = require('fs')
const http = require('http')

http.createServer((req,res)=> {

 // we need to store the req data in a file
 const newFile =  fs.createWriteStream('newFile.md')

// we need to know the coming data length
const dataLength = req.headers['content-length']

// the amountReceived
cont dataReceived = 0


/// the readable event is the tool to monitor the data circulation
    req.on('readable', ()=> {

       const chunk = null;

       while(null !== (chunk = req.read())){

          dataReceived += chunk.length
          const progress = dataReceived/dataLength * 100
          res.write(` progress ===> % ${parseInt(progress, 10)}` )
       }
    })





// sending the upcoming data to the new file
req.pipe(newFile)


  req.on('end', () => {
       response.end('file received!')
  })



}).listen(5000)
```

## 46 \*\* Socket.io and redis in node

sending the data from the client to server in both ways in real time.
npm i --save socket.io

```
const express = require('express')
const http = require('http')
const socket = require('socket.io');

cost app = express()
const server = http.createServer(app)
const io = socket(server)

io.on('connection', (connection)=> {
  console.log("client is connected")

  connection.emit("myMessage", {data: 'hello world'})
})


app.get('/', (req, res )=> {
    res.sendFile(__dirname + './index.html');
})
server.listen(8000)


// in the front end we  need to add the file
<script scr="/socket/socket.js />

// in the file socket.js we add the following

 const socket  = io.connect("http://localhost:8000')

socket.on("myMessage", (msg)=> {

  console.log(" msg ===> ", msg.data )
})
```

## 47 use \*\* strict in javascript

to catch the reference errors made by the developer while coding

## 48 \*\* hoisting

```
 console.log(x) : will return undefined,  because var allows hoisting
                  and this because js make the assignment of the var x in the top of the file
var x;

console.log(y) : will  throw error , because let not allow hoisting and
                 and because js makes the assignment at the same line of the
                 declaration
let y;

fn() : allow the hoisting like var
function fn(){console.log("hello")} // function decoration


myFn() : will throw an error myFn is not function , js wont do
       the hoisting since myFn is undefined
var  myFn = () => {console.log("hello")} / function expression

myFn2() : will throw an error myFn2 is not defined , because in let js will
         make the assignment at the line of the declaration
let  myFn2 = () => {console.log}

if the variable is not preceded with let, const or var , it means it is a global scope variable


```

## 49 \*\* function currying

means you can pass function into a function and you can return a function from it as well. every function has params and the params are passed after calling each one
const fn = (param1 ) => (parma2) => (param3 ) => console.log(parma1,param2,param3)

    const x = fn('hello')
    const y =   x("Mister")
         y("Aissani") // this will console Hello Mister Aissani

## 50 \*\* namespacing in javascript

let say u are using 2 script tags in the html in app ,
every script is sourcing a js file , DO NOT Name the variables the same even they are located in different files , because the collision will happen in the html

## 51 \*\* 2 threads running in parallel in the browser

- the application thread (the screen ) and the service worker thread in the background (SW.js)
- the screen thread get updated every time the html is loaded (index.html)
- the oncontrollerchange handler can pass data from the service worker to the screen

## 52 \*\* we can not access the dom from the service worker

## 53 \*\* iterator and enumerator and generator in javascript

1 - generator :

```
const myFun*(){
  yield "hello word"
};
const result = myFn();  // result is the generator

result.next(); // this will give us : {value: "hello world", done: false}
result.next(); // this will give us : { value : undefined, done: true} ===> the function without the return by default return undefined

```

2 - enumerable : both array or obj are enumerable:

```
const arr = [ 'steve', 'john']
arr.bill = 'hello word
Object.defineProperty(arr, 'fill', {age : 30, enumerable : false })

for(let key in arr){
  console.log(key) // all the array indexes  will be there  because an array in js is an object , plus the key bill. the key fill will never be there because it enumerable is
                     false
}

the same logic will apply for the object

3 - for in loop works for both array and objects, but in the object it will cover the normal fields and the one added by Object.defineProperty with enumerable true
4 - but in the array it will cover all element with different assigning way but we still have Object.defineProperty with enumerable true
5 - for of loop covers only the element mentioned inside the brackets, the other assignment will never appear
6 - for of loop will never work with objects unless if we build a custom iterable for them
7 - the difference between iterable and enumerable is that  iterable is given to us as a  ready feature with an iterator : array, map , set ,string ...
but not objects. while enumerable is the field that tells the iterator to pass thru for not , it takes a boolean value

```

## 54 \*\* maps and sets

maps are like objects and sets are like arrays

- maps are unlike objects are iterable , the keys must to be unique
- sets are iterable and the values must to be unique, the easiest way to avoid duplicated values in the array : const arr = [...set]

## 55 \*\* call, apply, bind

1 - call is method associated with every function , it is use to call every function and it takes the context of this key word as a first param and the rest of the
argument to call the function after

2 - apply : it is the same as call but the arguments are grouped inside an array, except the first argument which is the this key word context

3 - bind is the same but it is returning a copy for the function to be called later

```
const  myFn = function(name, age, city ){
  console.log(`this: ${JSON.stringify(this)} - name: ${name} - age: ${age} - city : ${city}`);
  return `this: ${JSON.stringify(this)} - name: ${name} - age: ${age} - city : ${city}`
}

myFn.call(this, 'hilal', 30, 'jijel'); // this key word is the global window context
myFn.call({x: 'aissani'}, 'hilal', 30, 'jijel'); // this key word is the the object {x: 'aissani'}

myFn.apply(this, ['hilal', 30, 'jijel']); // this key word is the global window context

const result = myFn.bind({x: 'aissani'}, 'hilal', 30); // will give the copy of the function
result('jijel');

the cool thing about bind , let we could add more params to pass them later

```

## 56 \*\* AbortController

it stops the call in inside get(url, {signal : controller.signal })

