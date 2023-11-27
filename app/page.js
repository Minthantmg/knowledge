'use client'
import React from 'react';
import axios from "axios";
import { useQuery } from '@tanstack/react-query'

const Page = () => {

    //data fatch from api
    const getAllTodos = async () => {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos')
        return res.data
    }

    const {data : todos, isLoading, isSuccess, isError} = useQuery({
        queryKey: ['get','todos'],
        queryFn: getAllTodos
    })

    return (
        <div>
            {isLoading && 'Loading...'}
            {/*data will display when fetch is success*/}
            {isSuccess && todos.map(todo =>{
                return <li key={todo.id}>{todo.id} - {todo.title}</li>
            })}
        </div>
    );
};

export default Page;