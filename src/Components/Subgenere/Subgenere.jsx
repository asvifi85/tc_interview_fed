import React,{useState,useEffect} from "react";
import {gql,useQuery} from '@apollo/client';
import classes from './style-subgenere.module.css'
import { Link , useParams} from "react-router-dom";


const GENRE_BY_ID = gql`
query genre($id:ID!) {
    genre(id:$id){
    	id,
      name,
      subgenres {
        id,
        name
      }
    }
}
`


export function Subgenres(props) {
    const {genre_id} = useParams();
    const {loading,error,data} = useQuery(GENRE_BY_ID,{
        variables:{id:genre_id}
    });
    const [selectedId, setSelectedId] = useState('')
    const selectedGenre = (id,name)=>{
        setSelectedId(id)

        props.selectedGenre(name+"_"+genre_id)
    }
    useEffect(() => {
      props.selectedGenre(null)
    }, [])
    if(loading) return <div>Loading</div>;
    if(error) return <div>Error:{JSON.stringify(error)}</div>;

    return (
      <>
      <div>
        {data.genre.subgenres.map(({id,name})=> <div key={id} className={selectedId == id?[classes.genereBox,classes.activeBox].join(' '):classes.genereBox} onClick={()=>selectedGenre(id,name)}>
                    {name}
    </div>)}
    <div className={selectedId == 'add'?[classes.genereBox,classes.activeBox].join(' '):classes.genereBox}  onClick={()=>selectedGenre('add','add')}>
                   Add new
    </div>     
            </div>

      </>
    );
  }