# Phaser Signal library that decouples the signal object from needing to be added to another object.

# Register any listener to a signal. Send the signal from anywhere.

## Old Way
    this.sig = new Phaser.Signal();
    this.sig.add(listener, listenerContext);
    this.sig.dispatch();
- You have to have access to this in order to dispatch the signal

## Better Way
    Signals.registerSignal(PlayCommand.SUCCESS, this.onPlayCommandSuccess, this);
    Signals.removeSignal(PlayCommand.SUCCESS, this.onPlayCommandSuccess, this);
    Signals.sendSignal(PlayCommand.SUCCESS);
    
explain singleton stuff
