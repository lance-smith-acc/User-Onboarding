import React, {useState, useEffect} from 'react';
import {Card, CardBody, ListGroup, ListGroupItem} from 'reactstrap';
import * as Yup from 'yup';
import axios from 'axios';
import { withFormik, Form, Field } from 'formik';
import UserCard from './UserCard'

function UserForm({values, handleChange, errors, touched, status}) {
    
    const [users, newUser] = useState([]);
    useEffect(()=> {
        console.log('Status change', status);
        status && newUser( user => [...user, status])
    }, [status])


    return (
        <Card>
            <Form>
                <ListGroup>
                    <ListGroupItem>
                        <label htmlFor="name">Name</label>
                        <Field id="name" type="text" name="name" value={values.name} onChange={handleChange}/>
                        {touched.name && errors.name && (<p className="errors">{errors.name}</p>)}
                    </ListGroupItem>

                    <ListGroupItem>
                        <label htmlFor="email">Email</label>
                        <Field id="email" type="text" email="email" value={values.email} onChange={handleChange}/>
                        {touched.email && errors.email && (<p className="errors">{errors.email}</p>)}
                    </ListGroupItem>

                    <ListGroupItem>
                        <label htmlFor="password">Password</label>
                        <Field id="password" type="text" password="password" value={values.password} onChange={handleChange}/>
                        {touched.password && errors.password && (<p className="errors">{errors.password}</p>)}
                    </ListGroupItem>
                    <ListGroupItem>
                        <CardBody>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Magna sit amet purus gravida. Tortor id aliquet lectus proin nibh nisl. Morbi tristique senectus et netus et malesuada fames ac.</CardBody>
                    </ListGroupItem>
                    <ListGroupItem><label>Do you agree to the terms? <Field type="checkbox" name="tos" check={values.tos} /></label>
                    {touched.tos && errors.tos && (<p className="errors">{errors.tos}</p>)}
                    </ListGroupItem>
                    <button type="submit">Add New User</button>
                </ListGroup>
            </Form>

            <div className="w-50 m-auto">
                {users.map(e => ( 
                    <UserCard id={users.length+1} name={e.name} email={e.email} password={e.password} tos={e.tos}/>
                ))}  
            </div>
            
        </Card>
    )
};

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, tos}){
        return {
            name:name || "",
            email:email || "",
            password:password || "",
            tos: tos || false
        };
    },
    validationSchema:Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().required(),
        password: Yup.string().required(),
        tos: Yup.boolean().oneOf([true], "Must accept terms and conditions"),
    }),
    handleSubmit(values, {setStatus}) {
        console.log("Submitting...", values)
        axios.post("https://reqres.in/api/users/", values)
        .then(response => {
            console.log(response.data)
            setStatus(response.data)
        })
        .catch(error => console.log(error.response))
    }
})(UserForm);

export default FormikUserForm;