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

### Problems
- You have to have a reference to the signal instance in order to dispatch the signal.
- One to one ratio. 

## BETTER WAY
The Signals library is a...

### Example

    class MyClass {
    
        myFunc() {
            Signals.registerSignal("key", this.listener, this);
        }
        
        listener() {
            // do something when the signal is dispatched
        }
    }
    
    class AnotherClass {
    
        anotherFunc() {
            Signals.sendSignal("key");
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
The Signals library is meant to be used as a singleton that can be accessed from anywhere in the code base at any time.
The Signals library is basically a house where all your signal instances live.
If you are changing game states, you will want to create your Signals singleton on the game object. 
Usually, every class in a Phaser game has access to the this.game instance.

    class MyClass {

        myFunc() {
            this.game.signals = new Signals();
        }
    }
    
    class AnotherClass {
    
        anotherFunc() {
            this.game.signals.registerSignal("key", listener, context, addOnce);

            this.game.signals.sendSignal("key");

            this.game.signals.removeSignal("key", listener, context);

            this.game.signals.removeAllSignals();
        }   
    }

You can have more than one Signals instance in your game.

### Changing Game States
If you are using states in your game, you must remove all signals between states. 
Either right before or right after.
Because/Or else...
    
    this.game.signals.removeAllSignals();
    this.game.state.start("newState");

## THE MIN.JS
There are two library versions you can choose from.

### Simple

    let signals = new Signals();
    
### Full

    let signals = new Signals.Signals();
    
    let target = new Signals.TargetObj(...);
    signals.registerSignal(...);
    signals.sendSignal("key", target);

### Getting it into your game
Must have phaser. Compatible with these versions:

    index.html
    <script type="text/javascript" src="lib/phaser.min.js"></script>
    <script type="text/javascript" src="lib/phaser-signals-simple-0.0.1.min.js"></script>

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
Need to run npm install & grunt task then open index open the inspector


## JSDOCS

## See my other libs

## CREDITS
This project used the [webpack-library-starter](https://github.com/krasimir/webpack-library-starter) project
