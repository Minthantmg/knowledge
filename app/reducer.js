import React, {useReducer} from 'react';


const reducer = (prevState, action) => {
    console.log(action)
    switch (action.type) {
        case 'increment' :
            return {
                ...prevState,
                count: prevState.count + 1
            }
        case 'decrement' :
            return {
                ...prevState,
                count: prevState.count - 1
            }
        default :
            new Error('action did not exist')
    }
}
const Reducer = () => {
    const [state, dispatch] = useReducer(reducer , {count: 0})

    function onIncreaseCount(){
        dispatch({
            type: 'increment',
            payload:{
                hello : 'hello world'
            }
        })
    }
    function onDecreaseCount(){
        dispatch({
            type: 'decrement'
        })
    }
    return (
        <div>
            <div>Count - {state.count}</div>
            <button onClick={onIncreaseCount}>Add</button>
            <button onClick={onDecreaseCount}>Remove</button>
        </div>
    );
};

export default Reducer;