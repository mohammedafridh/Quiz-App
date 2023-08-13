import { createContext, useReducer,useContext } from "react";

const TaskContext = createContext()

export const TaskContextProvider = ({children})=>{

    const workoutsReducer = (state, action) => {
        switch (action.type) {
            case 'setWorkouts':
                return {
                    tasks: action.payload
                };
            case 'createWorkouts':
                return {
                    tasks: state.tasks ? [action.payload, ...state.tasks] : [action.payload]
                };
            default:
                return state;
        }
    };

    const[state,dispatch] = useReducer(workoutsReducer, {
        tasks:null
    })

    return(
        <TaskContext.Provider value = {{...state,dispatch}}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext(){
    return useContext(TaskContext)
}