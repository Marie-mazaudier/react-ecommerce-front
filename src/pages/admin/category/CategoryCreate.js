import React, {useEffect, useState} from "react";
import AdminNav from "../../../components/nav/adminNav";
import  {useSelector} from 'react-redux'
import {
    createCategory, 
    getCategories, 
    removeCategory,
} from '../../../functions/category'
import { toast } from "react-toastify";
import {Link} from 'react-router-dom'
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import CategoryForm from '../../../components/forms/CategoryForm'
import LocalSearch from "../../../components/forms/LocalSearch";

const CategoryCreate = () => {
    const {user} = useSelector(state => ({...state}))

    const [name, setName] = useState('')
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    // searching filtering
    //step 1
    const [keyword, setKeyword] = useState("")
    useEffect(()=> {
        loadCategories()
    }, [])

    const loadCategories = () => {
        getCategories()
        .then(c => setCategories(c.data))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        createCategory({name}, user.token)
        .then(res=> {
            setLoading(false)
            setName('')
            toast.success(`"${res.data.name}" is created`)
            loadCategories()
        })
        .catch(err =>{
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.err(err.res.data)
        })
    }
    const handleRemove = async (slug )=> {
     // let answer = window.confirm("Are you sure to Delete") // au clique answer = true
      if(window.confirm("Are you sure to Delete")) {
        setLoading(true)
        removeCategory(slug, user.token)
        .then((res) =>{
            setLoading(false);
            toast.error(`${res.data.name} deleted`)
            loadCategories()
        })
        .catch(err => {
            if(err.response.status === 400) {
                setLoading(false)
                toast.error(err.response.data)
            }
        })
      }
    }
     
        //step 4 (computed property => filter function)
        const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword) // on regarde si la catégorie contient le keyword
    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            <div className="col">
                {loading ? <h4 className="text-danger">Loading...</h4>: <h4>Create category</h4>}

                <CategoryForm 
                handleSubmit={handleSubmit} 
                name={name} 
                setName={setName} />
                {/*step 2 and step 3 is in component*/}
                <LocalSearch setKeyword={setKeyword} keyword={keyword}/>
              
                {/* step 5 Filter function*/}
                {categories.filter(searched(keyword)).map((c) => (
                <div className="alert alert-primary" key={c._id}>
                    {c.name} 
                    <span 
                    onClick={() => handleRemove(c.slug)} 
                    className="btn btn-small float-right">
                        <DeleteOutlined className="text-danger"/>
                    </span>
                    <Link to={`/admin/category/${c.slug}`}>
                        <span className="btn btn-small float-right">
                        <EditOutlined className="text-warning"/>
                        </span>
                    </Link>
                </div>
                ))}
            </div>
        </div>
    </div>
    )
}

export default CategoryCreate