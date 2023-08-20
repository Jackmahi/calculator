import React, { useReducer } from 'react'
import Dbutton from './digitbutton'
import Obutton from './operationbutton'

export const ACTIONS = {
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate'
}
function reducer(state,{type,payload}){
  switch(type){

    case ACTIONS.ADD_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperend:payload.digit,
          overwrite:false
        }
      }
      if(payload.digit==="0" && state.currentOperend==="0") return state;
      if (payload.digit === "." && state.currentOperend.includes(".")) return state;

      return {
        ...state,currentOperend:`${state.currentOperend || ""}${payload.digit}`
      }

    case ACTIONS.CHOOSE_OPERATION:
      if(state.currentOperend==null && state.previousOperend==null)return state;

      if(state.currentOperend==null){
        return{
          ...state,
          operation: payload.operation
        }
      }

      if(state.previousOperend==null){
        return {
          ...state,operation:payload.operation,
          previousOperend:state.currentOperend,
          currentOperend:null
        }
      }
      return {
        ...state,
        previousOperend:evaluate(state.currentOperend, state.previousOperend, state.operation),
        operation:payload.operation,
        currentOperend:null
      }

    case ACTIONS.CLEAR:return {};

    case ACTIONS.DELETE_DIGIT:
      if(state.overwrite){
        return {
          ...state,
          currentOperend:null,
          overwrite:false
        }}
        if(state.currentOperend==null) return state;
        if(state.currentOperend.length===1){
          return {
            ...state,
          currentOperend:null
          }
        }
        return {
          ...state,
          currentOperend:state.currentOperend.slice(0,-1)
        }

  

      case ACTIONS.EVALUATE:
        if (state.operation == null || state.currentOperend == null || state.operation == null) {
          return state;
        }
        return {
          ...state,
          overwrite:true,
          previousOperend: null,
          operation: null,
          currentOperend: evaluate(state.currentOperend, state.previousOperend, state.operation) 
        };
      
  }

}

function evaluate(currentOperend, previousOperend, operation) {
  // console.log('evaluate function called'); // Add this line
  const prev = parseFloat(previousOperend);
  const current = parseFloat(currentOperend);

  if (isNaN(prev) || isNaN(current)) {
    return '';
  }

  let computation = '';
  switch (operation) {
    case '+':
      computation = prev + current;
      break;
    case '-':
      computation = prev - current;
      break;
    case '*':
      computation = prev * current;
      break;
    case '/':
      computation = prev / current;
      break;
    default:
      return '';
  }
  // console.log('computation result:', computation); // Add this line
  return computation.toString();
}


const App= ()=>{

  const[{currentOperend,previousOperend,operation},dispatch]=useReducer(reducer,{})
  // console.log(previousOperend,currentOperend,operation)
  
 
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operend">{previousOperend} {operation}</div>

        <div className="current-operend">{currentOperend}</div>
      </div>
      <button className="span-two" onClick={()=>dispatch({type:ACTIONS.CLEAR})}>AC</button>
      <button onClick={()=>dispatch({type:ACTIONS.DELETE_DIGIT})}>DEL</button>
      <Obutton operation="/" dispatch={dispatch}/>
      <Dbutton digit="1" dispatch={dispatch}/>
      <Dbutton digit="2" dispatch={dispatch}/>
      <Dbutton digit="3" dispatch={dispatch}/>
      <Obutton operation="*" dispatch={dispatch}/>
      <Dbutton digit="4" dispatch={dispatch}/>
      <Dbutton digit="5" dispatch={dispatch}/>
      <Dbutton digit="6" dispatch={dispatch}/>
      <Obutton operation="+" dispatch={dispatch}/>
      <Dbutton digit="7" dispatch={dispatch}/>
      <Dbutton digit="8" dispatch={dispatch}/>
      <Dbutton digit="9" dispatch={dispatch}/>
      <Obutton operation="-" dispatch={dispatch}/>
      <Dbutton digit="." dispatch={dispatch}/>
      <Dbutton digit="0" dispatch={dispatch}/>
      <button className='span-two' onClick={()=>dispatch({type:ACTIONS.EVALUATE})}>=</button>
    </div>
  )
}

export default App

