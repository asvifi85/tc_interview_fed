import React, {useState,useEffect,useRef} from "react"; 
import { Switch, Route, Link, useRouteMatch,useHistory, useParams ,useLocation} from "react-router-dom";

import { Formik, Field, Form, useFormik} from "formik";
import {gql,useQuery,useMutation} from '@apollo/client';

const CREATE_SUBGENRE = gql`
  mutation addSubgenre($name:String!,$genreId:ID!){
    addSubgenre(name:$name,genreId:$genreId){
        id,
      name,
    }
  }
`
function useLocationQuery() {
    return new URLSearchParams(useLocation().search);
  }
export function AddSubgenre({subgenreSubmit}) {	
    let query = useLocationQuery();
    const [searchParam, setSearchParam] = useState(query.get("submitForm"))
    const {genre_id} = useParams();
    const [addSubgenre,  {called,error}] = useMutation(CREATE_SUBGENRE);
  // Attach this to your <Formik>

  const formik = useFormik({
    initialValues: {
        name : ""
      },
      onSubmit: async(values) => {
          /* ---> Call useMutation mutate function here to create new session */
            const {name} = values;
           await addSubgenre({variables:{name,genreId:genre_id}})
           history.push('/addbook/addsubgenre')
        },
  });

    const history = useHistory();
  
    useEffect(() => {
       if(query.get("submitForm") && query.get("submitForm").toString() == "true"){
          formik.handleSubmit()
       }
    },[query.get("submitForm")])
  
 
      return (
        <form onSubmit={formik.handleSubmit}>
            <div>
           <label htmlFor="name">Enter Subgenre</label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.firstName}
          />
          </div>
          <div>
          <label>
            <input type="checkbox" name="desc" />
            Description is required for this subgenre.
          </label>
          </div>
        </form>
      );
}