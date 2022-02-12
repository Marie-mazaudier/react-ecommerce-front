import React from "react";
import { useHistory } from "react-router";
import {useSelector, useDispatch} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'

const Search = () => {
    const dispatch = useDispatch()
    const {search} = useSelector((state) => ({...state})) // grab the search from the state
    const {text} = search

    const history = useHistory()
    const handleChange = (e) => { // quand user tape une recherche
        dispatch({ // cela sera envoyé et affiché dans le state
            type:"SEARCH_QUERY",
            payload: {text: e.target.value}
        })
    }
    const handleSubmit = (e) => { // quand le user tape entréé
       e.preventDefault()
       history.push(`/shop?${text}`) // il est envoyé au shop avec le search query {text}
    }
    return(
        <form className="form-inline m-2 m-lg-0" onSubmit={handleSubmit}>
            <input 
            onChange={handleChange}
            type="search"
            value={text}
            className="form-control mr-sm-2"
            />
            <SearchOutlined onClick={handleSubmit}
            style={{cursor:"pointer"}} />
        </form>
    )
}

export default Search