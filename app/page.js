'use client'
import React, {useState} from 'react';
import axios from "axios";
import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'

const Page = () => {

    const queryClient = useQueryClient()
    const [taskValue, setTaskValue] = useState('')
    //apply url to get data with axios
    const getAllTodos = async () => {
        const res = await axios.get('http://localhost:3000/todos')
        return res.data
    }

    //data fetch from api
    const {data: todos, isLoading, isSuccess, isError} = useQuery({
        queryKey: ['get', 'todos'],
        queryFn: getAllTodos
    })

    //create new task
    const createNewTodo = async ({
                                     //need to add parameter here when it doesn't data will not pass
                                     taskName,
                                     isFinished
                                 }) => {
        const res = await axios.post('http://localhost:3000/todos', {
            taskName,
            isFinished
        })
        return res.data
    }

    //create new data with mutation
    const {mutate} = useMutation({
        mutationKey: ['post', 'todos'],
        mutationFn: createNewTodo,
    })

    //fun for invalidate with useQueryKey
    const onCreateNewTodo = () => {
        mutate({
            //data to pass api from ui
            taskName: taskValue,
            isFinished: false
        }, {
            onSuccess: async () => {
                //similar to refetch
                await queryClient.invalidateQueries({
                    queryKey: ['get', 'todos']
                })
            }
        })
    }

    return (
        <div>
            <input className="mb-6 px-2 py-2 border" type="text" onChange={e => setTaskValue(e.target.value)}/>
            <button className="bg-red-500 text-white px-2 py-2" onClick={onCreateNewTodo}>Add new todo</button>
            {isLoading && 'Loading...'}

            {/*data will display when fetch is success*/}
            {isSuccess && todos.map(todo => {
                return <li key={todo.id}>{todo.id} - {todo.taskName}</li>
            })}
        </div>
    );
};

export default Page;