
import EventEmitter from 'events';
import { error } from './logger';


EventEmitter.captureRejections = true;

export default function Events( _options ) {

  const emitter = new EventEmitter();
  emitter.setMaxListeners( 2048 );
  emitter.on( 'error', error );

  return {

    addListener( eventName, listener ) {
      emitter.addListener( eventName, listener );
      return this;
    },

    prependListener( eventName, listener ) {
      emitter.prependListener( eventName, listener );
      return this;
    },

    once( eventName, listener ) {
      emitter.once( eventName, listener );
      return this;
    },

    prependOnceListener( eventName, listener ) {
      emitter.prependOnceListener( eventName, listener );
      return this;
    },

    removeListener( eventName, listener ) {
      emitter.removeListener( eventName, listener );
      return this;
    },

    emit( ...args ) {
      emitter.emit( ...args );
      return this;
    }
  };
}
