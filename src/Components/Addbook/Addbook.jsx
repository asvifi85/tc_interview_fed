import React, {useState} from "react";  
import { Link } from "react-router-dom"
import { Formik, Field, Form } from "formik";
import {gql,useQuery,useMutation} from '@apollo/client';
import classes from './Addbook.module.css';
const CREATE_BOOK = gql`
  mutation addBook($name:String!, $genre:String!,$authorId:ID!){
    addBook(name:$name,genre:$genre,authorId:$authorId){
        id,
      name,

    }
  }
`
const GET_DATA = gql`
    query get_data {
        authors{
            id,
            name,
        },
        genres{
            id,
            name
        }
    },
    
`;
export function Addbook() {	
/* ---> Define queries, mutations and fragments here */

    /* ---> Call useMutation hook here to create new session and update cache */
  const [addBook,  {data:createdBook,called,error}] = useMutation(CREATE_BOOK);
  const {loading,error:authorError,data={authors:[],genres:[]}} = useQuery(GET_DATA);
  
  if(error){
    return <p>Book Submitted Failed</p>
  }
  if(called){
      return <p>{createdBook && createdBook.addBook.name} Book Submitted </p>
  }
    return (	
      <div	
        style={{	
          width: "100%",	
          display: "flex",	
          alignContent: "center",	
          justifyContent: "center",	
          padding: 10,	
        }}	
      >	
        <Formik	
          initialValues={{	
            title: "",	
            author:"",
            isbn:"",
            genre:"",
            edition:"",
            description: "",	
            dop: "",	
            nop: "",	
          }}	
          onSubmit={async(values) => {
            /* ---> Call useMutation mutate function here to create new session */
              const {title:name,genre,author:authorId} = values;
              await addBook({variables:{name,genre,authorId}})
          }}	
        >	
          {() => (	
            <Form style={{ width: "100%", maxWidth: 500 }}>	
                <div className={classes.formEle} style={{ paddingBottom: 5 }}>	
                <label htmlFor="inputTitle">Book Title</label>	
                <Field	
                  id="inputTitle"	
                  className={classes.formFld}
                  required	
                  autoFocus	
                  name="title"	
                />	
              </div>	
              <div  className={classes.formEle} style={{ paddingBottom: 5 }}>	
                <label htmlFor="inputauthor">Author</label>	
                <Field name="author" id="inputauthor"	className={classes.formFld}  as="select">
                <option value="" label="Select" />
        {data.authors.map(({id,name})=><option key={id} value={id} label={name} />)}
      </Field>
              </div>	
              <div  className={classes.formEle} style={{ paddingBottom: 5 }}>	
                <label htmlFor="isbn">ISBN</label>	
                <Field	
                  name="isbn"	
                  id="isbn"	
                  className={classes.formFld}
                  required	
                />	
              </div>	
              <div  className={classes.formEle} style={{ paddingBottom: 5 }}>	
                <label htmlFor="inputgenre">Genre</label>	
                <Field name="genre"  className={classes.formFld} id="inputgenre"	 as="select">   
         <option value="" label="Select" />
        {data.genres.map(({id,name})=><option key={id} value={name} label={name} />)}
    
      </Field>	
              </div>	
              <div  className={classes.formEle} style={{ paddingBottom: 5 }}>	
                <label htmlFor="dop">date published</label>	
                <Field	
                  name="dop"	
                  id="dop"	
                  className={classes.formFld}	
                  required	
                />	
              </div>
              <div  className={classes.formEle} style={{ paddingBottom: 5 }}>	
                <label htmlFor="nop">Number of pages</label>	
                <Field	
                  name="nop"	
                  id="nop"	
                  className={classes.formFld}
                  required	
                />	
              </div>
              <div  className={classes.formEle} style={{ paddingBottom: 5 }}>	
                <label htmlFor="edition">Edition</label>	
                <Field	
                  name="edition"	
                  id="edition"	
                  className={classes.formFld}
                  required	
                />	
              </div>
              <div  className={classes.formEle} style={{ paddingBottom: 5 }}>	
              <label htmlFor="inputDescription">Description</label>	
              <Field	
                type="textarea"	
                id="inputDescription"	
                className={classes.formFld}
                required	
                name="description"	
              />	
            </div>	
              <div style={{ justifyContent: "center",textAlign:"center", alignContent: "center" }}>
                <button className="btn btn-primary">Submit</button>	
              </div>
            </Form>	
          )}	
        </Formik>	
      </div>	
    );	
  }
  