# Phaser Signals Library - Add **_any_** listener to **_any_** signal. Dispatch **_any_** signal **_anywhere/anytime_**.

## CURRENT WAY
### Example
Here is a scenerio of how signals work in Phaser currently: 

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
- You have to have access to the object that the signal instance lives on in order to dispatch the signal.
- One to one ratio. 

## BETTER WAY
The Signals library is meant to be used as a singleton that can be accessed from anywhere in the code base at any time.
The Signals library is basically a house where all your signal instances live.
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
- You can register any number of listeners to the same signal.

### Ways to use the Signals library
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

## THE MIN.JS
There are two library versions you can choose from.

### Simple

### Full

### Getting it into your game
    index.html
    <script></script>

## UNIT TESTS

## JSDOCS

## CREDITS