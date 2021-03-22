import React,{useState,useEffect} from "react";
import { Switch, Route, Link, useRouteMatch,useHistory ,useLocation} from "react-router-dom";
import {Genres} from '../Genere/Genere';
import {Subgenres} from '../Subgenere/Subgenere';
import {AddSubgenre} from '../Subgenere/addsubgenre';
import {Addbook} from "../Addbook/Addbook";
import classes from "./style-home.module.css";



export function Home() {
    const { path, url } = useRouteMatch();
    const [selectedGenre, setSeletedGenre] = useState(null);
    const [subgenreSubmit,setSubgenreSubmit] = useState(false);
    const history = useHistory();
    const location = useLocation();
    const pathName = location.pathname;
    const next_path = () => {
      let path = '';
      if(pathName  === '/'){
        path = "/genre";
      }
      else if(pathName.indexOf("/genre") > -1){
        path =  `/subgenre/${selectedGenre}`;
      }
      else if(pathName.indexOf("/subgenre") > -1){
        if(selectedGenre.indexOf('add') < 0){
        
          path = "/addbook";
        }
        else{
          const selGenre = selectedGenre.split('_')[1];
          setSeletedGenre(selGenre)
          path = `/addsubgenre/${selGenre}`;
        }
        
      }
     else if(pathName.indexOf("/addsubgenre") > -1 && pathName.indexOf("/addbook") < 0){
         path = `/addsubgenre/${selectedGenre}?submitForm=true`;
      }
       // else if(pathName.indexOf("/addbook/addsubgenre") > -1){
       //   setSubgenreSubmit(true)
       //  path = '/';
       //  path = `/addsubgenre`;
       //   }
      return path;
    }
  //  useEffect(() => {
   //   setSeletedGenre(null);
  //  }, [])
    return (
      <>
<section className={classes.container}>
       <div>Add book - New book</div>
       
       <span className={ `${pathName === '/genre' ?[classes.circle, classes.activeCircle].join(' ') : classes.circle}`}> 1 <br/><sub className={classes.subtxt}>Genre</sub></span>
       <span className={classes.line}></span>
       <span className={ `${pathName.indexOf('/subgenre') > -1 ?[classes.circle, classes.activeCircle].join(' ') : classes.circle}`}> 2 <br/><sub className={classes.subtxt}>Subgenre</sub> </span>
       <span className={classes.line}></span>
       {pathName.indexOf("addsubgenre") > -1 ? <><span className={ `${pathName.indexOf('/addbook') < 0 ?[classes.circle, classes.activeCircle].join(' ') : classes.circle}`}> 3 <br/><sub className={classes.subtxt}>Add Subgenre</sub></span>
       <span className={classes.line}></span> <span className={ `${pathName.indexOf('/addbook') > -1 ?[classes.circle, classes.activeCircle].join(' ') : classes.circle}`}> 4 <br/><sub className={classes.subtxt}>Information</sub></span>
       </>
       :
       <span className={ `${pathName.indexOf('/addbook') > -1 ?[classes.circle, classes.activeCircle].join(' ') : classes.circle}`}> ... </span>}

       <div style={{textAlign:"center"}}>
         {pathName  === '/' && <button onClick={()=>history.push(next_path())}> Start </button>}
       </div>
        <Switch>
          <Route path={`${path}genre`}>	
            <Genres selectedGenre = {setSeletedGenre} />	
          </Route>
          <Route path={`${path}subgenre/:genre_id`}>	
            <Subgenres selectedGenre = {setSeletedGenre} />	
          </Route>
          <Route path={`${path}addsubgenre/:genre_id`}>	
            <AddSubgenre  subgenreSubmit={subgenreSubmit}/>	
          </Route>
          <Route path={`${path}addbook`}>	
            <Addbook  />	
          </Route>
        </Switch>
        <div className={classes.footer}>
            <button 
                onClick={() => {
                  setSeletedGenre(null)
                    history.goBack();
                }}
                >Back</button>   <button onClick={()=>history.push(next_path())} disabled={!selectedGenre && pathName.indexOf("addsubgenre")< 0}>Next</button>
        </div>
        </section>
      </>
    );
  }