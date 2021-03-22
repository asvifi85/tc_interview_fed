import React,{useState} from "react";
import {gql,useQuery} from '@apollo/client';
import classes from './style-genere.module.css'
import { Link } from "react-router-dom";

const GENRES = gql`
query genres {
    genres{
     id,
     name
  }
}
`


export function Genres(props) {
    const {loading,error,data} = useQuery(GENRES);
    const [selectedId, setSelectedId] = useState('')
    const selectedGenre = (id,name)=>{
        setSelectedId(id)
        props.selectedGenre(id)}
    if(loading) return <div>Loading</div>;
    if(error) return <div>Error</div>;
    return (
      <>
      <div>
          {data.genres.map(({id,name})=> <div key={id} className={selectedId == id?[classes.genereBox,classes.activeBox].join(' '):classes.genereBox} onClick={()=>selectedGenre(id,name)}>
                    {name}
            </div>)}
           
            </div>

      </>
    );
  }