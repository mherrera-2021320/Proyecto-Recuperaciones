import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/PokemonCard";

import "../components/style.css"


const ListaPage = () => {

    const [pokeData, setPokeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon/");
    const [nextUrl, setNextUrl] = useState();
    const [prevUrl, setPrevUrl] = useState();
    const [disable, setDisable] = React.useState(true);

    const pokeFunc = async () => {
        const res = await axios.get(url);

        setNextUrl(res.data.next);
        setPrevUrl(res.data.previous);
        getPokemonData(res.data.results);
        setLoading(false)

        console.log("PREV", res.data.previous);
        console.log("NEXT", res.data.next);

        if (res.data.previous != null) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }


    const getPokemonData = async (res) => {
        res.map(async (item) => {
            const result = await axios.get(item.url);
            setPokeData(state => {
                state = [...state, result.data]
                state.sort((a, b) => a.id > b.id ? 1 : -1)
                return state;
            })
        })
    }

    useEffect(() => {
        pokeFunc()
    }, [url])

    return (
        <>
            <div className="container">
                <Card pokemon={pokeData} loading={loading}></Card>
                <div className="btn-div">
                    <button type="button" disabled={disable} className="btn btn-func" onClick={() => {
                        setPokeData([])
                        setUrl(prevUrl)
                    }}>Anterior</button>&nbsp;&nbsp;
                    <button type="button" className="btn btn-func" onClick={() => {
                        setPokeData([])
                        setUrl(nextUrl)
                    }}>Siguiente</button>
                </div>

            </div>
        </>
    )
}

export default ListaPage
