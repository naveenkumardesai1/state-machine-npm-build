import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { createMachine, StateMachine } from 'xstate';
import { useMachine } from '@xstate/react';
import { inspect } from '@xstate/inspect';

let iFrameElement: HTMLIFrameElement | null = null;

function createIFrame() {
  if (!iFrameElement) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('id', 'xstate');
    iframe.setAttribute('height', '100%');
    iframe.setAttribute('width', '100%');
    iframe.setAttribute('style', 'position: absolute; border: 0;');

    document.body.appendChild(iframe);
    iFrameElement = iframe;
  }
}

const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'inactive',
  states: {
    inactive: { on: { TOGGLE: 'active' } },
    active: { on: { TOGGLE: 'inactive' } }
  }
});


function App() {

  useMachine(toggleMachine, { devTools: true });

  useEffect(() => {
    createIFrame();

    inspect({
      url: 'https://statecharts.io/inspect',
      iframe: iFrameElement,
    });
   
  }, []);

  return(
    <div></div>
  )  
}


export default App;
