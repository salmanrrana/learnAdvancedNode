// lifecycle of node application

// node myFile.js - first start up call

const pendingTimers = [];
const pendingOSTasks = [];
const pendingOperations = [];

//new timers tasks and operations are recorded from myFile running
myFile.runContents();

function shouldContinue() {
  // Check one: Any pending setTimeout, setInterval, setImmediate?
  // check two: Any pending operating system(OS) tasks(like server listening to port)
  // check three: Any pending long running operation (like a fs module that reads/writes info on our hard drive)
  return (
    pendingTimers.length || pendingOSTasks.length || pendingOperations.length
  );
}

//Entire body executes in one 'tick'
while (shouldContinue()) {
  // 1) Node looks at pendingTimers and sees if any functions are ready to be called(setTimeout and setInterval)
  // 2) Node looks at pendingOSTasks and pendingOperations and calls relevant callbacks
  // 3)Pause execution. Continiue when...
  // - a new pendingOSTasks is done
  // - a new pendingOperation is done
  // - a timer is about to be complete
  // 4) Look at pendingTimers (only looks for/calls functions with setImmediate)
  // 5) Handle any close events
}

// exit back to terminal
