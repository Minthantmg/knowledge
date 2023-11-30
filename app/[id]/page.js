'use client'
import React from 'react';
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

const getTodoById = async (id) =>{
    const res = await axios.get(`http://localhost:3000/todos/${id}`)
    return res.data
}
const TodoById = () => {
    const {id} = useParams();

    const {data: todo,isSuccess,isLoading,isError}=useQuery({
        queryKey :['get','todos',id],
        queryFn: () =>getTodoById(id),
        enabled :!!id,//similar to id ? true : false
    })

    console.log(todo)


    return (
        <div>
            {isLoading && 'Loading...'}
            {isError && 'error...'}
            {isSuccess && <div>{todo.id} - {todo.taskName}</div>}
        </div>
    );
};

export default TodoById;