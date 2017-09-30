# Phaser Signals Library - Add **_any_** listener to **_any_** signal. Dispatch **_any_** signal **_anywhere/anytime_**.

## CURRENT WAY
### Example
Here is a scenerio of how signals work in Phaser out of the box: 

    class MyClass {
    
        myFunc() {
            this.signal = new Phaser.Signal();
            this.signal.add(this.listener, this);
        }
        
        listener() {
            // do something when the signal is dispatched
        }
    }
    
    class AnotherClass {
    
        anotherFunc() {
            let myInstance = new MyClass();
            myInstance.signal.dispatch();
        }   
    }

[Phaser.Signal docs](http://phaser.io/docs/2.6.2/Phaser.Signal.html)

### Problems
- You have to have a reference to the signal instance in order to dispatch the signal. 
- This is a problem if you are wanting to properly encapsulate code because all your code needs to share references to the rest of the code.
- One to one ratio. In the above example, if I have another class that wants to listen to the signal, you have two ways you can do it (see below). Any way you do this, you end up with structural problems about where should a signal live (design) and what properties/methods should other classes be able to access (encapsulation).

---

    class ClassA {
        someFunc() {
            this.signal = new Phaser.Signal();
            this.signal.add(this.listener, this);
        }
    }        
    class ClassB {
        someFunc() {
            this.signal = new Phaser.Signal();
            this.signal.add(this.listener, this);
        }
    }
    class ClassC {
        someFunc() {
            let classA = new ClassA();
            classA.signal.dispatch();
            
            let classB = new ClassB();
            classB.signal.dispatch();
        }   
    }
    
---
    
    class MyClass {
        someFunc() {
            let classA = new ClassA();
            let classB = new ClassB();
            
            let signal = new Phaser.Signal();
            signal.add(classA.listener, classA);
            signal.add(classB.listener, classB);
            
            signal.dispatch();
        }   
    }

## BETTER WAY
The Signals library gives you one object that all your signals live on. 

It allows you to create a signal while mapping it to a key. Then you are able to (1) add/remove listeners, and (2) dispatch a signal using its key. 

### Example

    class ClassA {
        
        someFunc() {
            Signals.registerSignal("uniqueKey", this.listener, this);
        }
    }
        
    class ClassB {

        someFunc() {
            Signals.registerSignal("uniqueKey", this.listener, this);
        }
    }

    class ClassC {
    
        someFunc() {
            Signals.sendSignal("uniqueKey");
        }   
    }

### Why it's better
- You can add any listener to any signal. 
- You can register any number of listeners to the same signal.
- You can have listeners registered to the same signal throughout your code with out coupling.
- Dispatch any signal anywhere/anytime.
- You do not need to have a reference to the signal in order to dispatch it. 
- You can send a signal whether or not there is something listening for it.

### Methods
    /**
     * Get a signal by its key.
     * @param {string} key - The key mapped to a signal.
     */
    getSignal(key)
    
    /**
     * Register a listener to a signal key.
     * @param {string} key - The key mapped to a signal. Be sure to use unique keys. 
     * @param {function} listener - The function that will respond when this signal is dispatched.
     * @param {object} listenerContext - The context of the listener.
     * @param {boolean} [addOnce=false] - Remove signal after sent once.
     */
    registerSignal(key, listener, listenerContext, addOnce = false)
    
    /**
     * Dispatch the signal mapped to this key.
     * @param {string} key - The key mapped to a signal.
     * @param {ITargetObj|object} [targetObj=null] - An object you can pass to the listener function(s).
     */
    sendSignal(key, targetObj = null)
    
    /**
     * Remove a listener from a signal.
     * @param {string} key - The key mapped to the signal.
     * @param {function} listener - The listener mapped to the signal.
     * @param {object} context - The context of the listener mapped to the signal.
     */
    removeSignal(key, listener, context)
    
    /**
     * Remove all listeners from a signal.
     * @param {string} [key=null] - The key mapped to the signal. If null, all signals for every key will be removed.
     */
    removeAllSignals(key = null)

### Ways to use the Signals library

#### Singleton
A great way to use the Signals library is as a singleton. A singleton means there is only ever one instance of a class. The class can be accessed from anywhere in the code base at any time.

The Signals library is not exported as a singleton. You can make it a singleton by creating a wrapper for it, like so:

    Wrapper {
        constructor() {
            this = new Signals();
        }
    }
    new Wrapper();
    
    SomeClass {
        someFunc() {
            Wrapper.registerSignal(...);
        }
    }

A benefit to using a wrapper like this is that you are free to make other Signals instances elsewhere in your code base because it is the wrapper that is the singleton, not the Signals library itself.

The problem in Phaser is that singletons like this are destroyed between states. So if you are switching states, you will want to use one of the next two options.

#### Local Instance
A local instance of the Signals library looks like this:

    MyClass {
        myFunc() {
            this.signals = new Signals();
        }
    }
    
You will want to be purposeful about where you put your signals instances and how many you have.

#### On the Game object (recommended)
If you are looking for near global access to a Signals library instance, a great place to put it is on the Phaser game instance. Usually, every class in a Phaser code base has access to the _this.game_ instance.

Another benefit here is that you will not need to create a new Signals instance with every new state your game enters because this.game object persists through the entire lifetime of your application.

    class MyClass {

        myFunc() {
            
            // You will most likely want to instantiate signals early on, like in your Game.js or a Boot or Load class.
            
            this.game.signals = new Signals();
        }
    }
    
    class AnotherClass {
    
        anotherFunc() {
            this.game.signals.registerSignal("example", this.listener, this, true);
        }   
    }

### Changing Game States
If you are using states in your game, you **_must remove all signals between states_**. 
Either right before or right after starting a new state.
You will have problems if you try to dispatch a signal that has listeners registered to it from a different state than you are in currently.
    
    this.game.signals.removeAllSignals();
    this.game.state.start("newState");
    
If you have other class instances on the this.game object which have signals in them, you will want to re-register the signals on a new state start. I usually have one public function called registerSignals() where I set up all my signals in a class.

## THE MIN.JS
There are two library versions you can choose from. One is very "simple" with only the Signals class in it. The other is a "full" version that includes interfaces and a TargetObject that can be passed when dispatching a signal.

Find the min's in the [/dist](/dist) directory.

You must have Phaser in your game. The Signals library was written with Phaser version 2.6.2. But it should be compatible with all versions except maybe some of the earliest. The last change to Phaser.Signal was in 2.4. It should play nice with Phaser CE too.

To see examples of how to set up your game with Signals, please see the unit test projects under [test](/test).

### Recommendations
Please use constants for your keys.

Constants have great benefits, including but not limited to:
- They protect your code from typos. 
- They keep things organized. 
- They make changing the key easier because you only have to change it in one place.

You can add consts at the bottom of any class with Object.defineProperties(). Consts are ALL-CAPS by convention.

I often make an empty class just to use as a holder for my consts. This is called an enum.
   
    import SignalKeys from "./SignalKeys"
    
    class SomeClass {
        
        someFunc() {
            signals.registerSignal(SignalKeys.LEVELED_UP, this.onLevelUp, this);
            
            signals.sendSignal(SignalKeys.LEVELED_UP);
        }
    }
    ---
    class SignalKeys {
    }
    Object.defineProperties(SignalKeys, {
        "LEVELED_UP": {
            value: "leveledUp"
        },
        "GAME_OVER": {
            value: "playerDied"
        }
    }
    
## UNIT TESTS

In order to test the Signals library, I created a simple Phaser game for each min (simple and full). Find them [here](/test).

### How to run the tests
1. Run npm install
- From the command line, navigate to the root of the game project (test/simple or test/full)
- Type: _npm install_
- Wait while the modules download. Watch the console output for errors. Address them if any.
2. Run grunt task
- Once your node modules are downloaded, type _grunt_ into you command line
- Wait until you get a confirmation build message
3. Open index.html in the browser
4. Open the inspector or dev tools in your browser 
- You will see console output detailing which tests have run and if they passed or failed

Please open an [issue](https://github.com/genradley/PhaserSignals/issues) if you find any bugs. We will fix the issue and add a test for it.

## JSDOCS
Please download or clone the repo and open [/docs/index.html](/docs/index.html) in a web browser

## MY OTHER GITHUB PROJECTS

[Align](https://github.com/genradley/Align) - A library for aligning display objects in relation to one another.

More coming soon...

## CREDITS
This project used the [webpack-library-starter](https://github.com/krasimir/webpack-library-starter) project

## ABOUT ME
My name is Genell Radley. I am a game developer w/7yr professional experience writing games in Flash, Unity and HTML5. I believe in unit testing and documenting my code well. I am very excited to share my code here with you on GitHub. I hope you will contribute. 

Please see my [github profile](https://github.com/genradley) and [linkedin profile](https://www.linkedin.com/in/genellradley/). 

--
(ignore this line. it is for seo purposes)
Genell Radley
Genell Radley
Genell Radley
Genell Radley
Genell Radley
Genell Radley
Genell Radley
Genell Radley
