import React from "react";
import ComicList from "./ComicList";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const AllComicProducts = () => {

    const [comics, showComics] = useState([]);
    const [formState, setFormState] = useState({
        name: '',
        img: '',
        price: ''
    })
    
    let { id } = useParams();
    let navigate = useNavigate();

    useEffect(() => {
        const apiCall = async () => {
            let response = await axios.get('http://localhost:5001/api/comics')
            showComics(response.data.allComics)
        }
        apiCall();
    }, [])


    const handleChange = (event) => {
        setFormState({...formState, [event.target.id]: event.target.value})
    }

    const handleSubmit = async (event) => {

        let newComic = await axios.post(`http://localhost:5001/api/comics`, formState)
        .then((response) => {
            return response
        })
        .catch((error) => {
            console.log(error)
        })

        showComics([...comics, newComic.data.newComic])
        setFormState({
            name: '',
            img: '',
            price: ''
        })
    }


    const deleteComic = async (event) => {
        event.preventDefault()
        const response = await axios.delete(`http://localhost:5001/comics/`, formState)
        navigate(`/comics`)
    }


    return (
        <div>
            <Navbar />
            <div className="sale-header">
                <h1>Comics on Sale</h1>
            </div>
            <div className="comics-product-page" key={comics._id}>
                {comics.map((comic) => (
                    <div className="comics-product">
                        <img className="comics-image" src={comic.img} alt="alt-comic-picture" />
                        <div className="comic-info">
                        <h2>{comic.name}</h2>
                        <h3>{comic.price}</h3>
                        <button className="comic-button">Add to Cart</button>
                        <br></br>
                        <button className="comic-button" onClick={deleteComic}>Delete Comic</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="comic-view">
                <div className="add-comic">
                    <h1>Add your Comic Here:</h1>
                    <form className="comic-form" onSubmit={handleSubmit}>
                        <label htmlFor="name">Comic Name:</label>
                        <input
                        id="name"
                        placeholder="Type Here..."
                        value={formState.name}
                        onChange={handleChange}
                        />
                        <label htmlFor="img">Comic Cover:</label>
                        <input
                        id="img"
                        placeholder="Cover URL Here..."
                        value={formState.img}
                        onChange={handleChange}
                        />
                        <label htmlFor="price">Comic Price:</label>
                        <input
                        id="price"
                        placeholder="Type Here..."
                        value={formState.price}
                        onChange={handleChange}
                        />
                        <br></br>
                        <button className="category-button" type="submit">Add Comic</button>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default AllComicProducts