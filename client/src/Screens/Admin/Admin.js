import React, { Component } from 'react';
import Swal from 'sweetalert2'
import ButtonMU from '@material-ui/core/Button';
import { Link } from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import '../../css/Main.css'

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            password:'',
            email:'',
            username: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).username : '', // username
            token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).token : '', // user access token
        }
        if (config.__DEGUGGING__) {
            console.log('this username', this.state.username)
        }
    }

    handleInputChange = (e) => {

        const target = e.target;
        const value = target.value; // if this is checkbox the value is thr checked attr , else the value is the value attr
        const name = target.name;

        // updating the state with the target name as key and the value var as value
        this.setState({
          [name]: value
        });
    }

    // removing isHaveAccount flag to show the signup
    moveToSignup = (e) => {
        this.setState({isHaveAccount:!this.state.isHaveAccount})
    }


    // simple signup
    Signup = (e) => {
        e.preventDefault()
        if (!this.state.email) {Swal('oops', 'please add email', 'error')}
        else if (!this.state.password) {Swal('oops', 'please add password', 'error')}
        else {
            axios.post(`${config.backEndServer}/signup`, {
                email:this.state.email,
                password:this.state.password,
                dateOfRegistration: new Date()
            })
            .then((res) => {
                console.log('this res on signup', res.data)
                if (res.data.errors) { // check for errors
                    if (res.data.errors.email) { // check for email exist error
                        Swal('oops', 'this email already axist', 'error')
                    }
                } else if (res.data.name == 'UserExistsError') { // check if email exist from Passport 
                    Swal('oops', 'this email already axist', 'error')
                }  
                else {
                    this.setState({isHaveAccount:true}, () => {
                        Swal('hey!', 'thank you! please check your email for activating your account', 'success')
                    })
                }
            })
            .catch(e => console.log('couldnt signup', e))
        }
    }

    // simple login
    Login = (e) => {
        e.preventDefault()
        if (!this.state.email) {Swal('oops', 'please add email', 'error')}
        else if (!this.state.password) {Swal('oops', 'please add password', 'error')}
        else {
            axios.post(`${config.backEndServer}/login`, {
                username:this.state.email,
                password:this.state.password,
            })
            .then((res) => {
                if (config.__DEGUGGING__) {
                    console.log('this user res on login ', res.data)
                }
                if (res.data.user) {
                    const user = res.data.user
                        this.setState({
                            username:user.username,
                            token:res.data.token
                        } , () => {
                            localStorage.setItem('user', JSON.stringify({
                                username:user.username,
                                token:res.data.token 
                            }));
                        })
                    }
                })
            .catch(e => {
                console.log('couldnt login', e)
                if (e == 'Error: Request failed with status code 401') {
                    Swal('oops','username or passworg is wrong', 'error')
                }
            })
        }
    }

    // simple logout call
    Logout = (e) => {
        e.preventDefault()
        axios.post(`${config.backEndServer}/logout`, {
            username:JSON.parse(localStorage.getItem('user')).username,
        })
        .then((res) => {
            this.setState({username:''}, () => {
                localStorage.clear(); // clearing the local storage
                window.location.reload(); // refreshing the page with the new local storage
            })
            
        })
        .catch(e => console.log('logout', e))
    }

    protectedRoute = () => {
        axios.post(`${config.backEndServer}/protected`, {
            token:this.state.token // passing the token to access the route
        })
        .then(() => {
            Swal('yey', 'awesome! I see you signed in(:', 'success') // show if the token is right
        })
        .catch((e) => {
            if (e) {
                Swal('oops' , 'login to see it(:' , 'error') // show if token is wrong or there is no token passed
            }
        })
    }


  render() {
      const username = this.state.username
      const token = this.state.token

    return (
        <div className=''>
            {
                token ? // checking if there is a token

                <div className='admin-signup-section container-signup container'>
                    <h1>Admin</h1> 
                    <ButtonMU className='btn-signup' variant="contained" color="primary" onClick={this.Logout}>Logout</ButtonMU>
                    <br/>
                    <ButtonMU className='btn-signup' variant="contained" color="primary" onClick={this.protectedRoute}>Protected route (:</ButtonMU>
                </div>

                :
                <div className='admin-signup-section container-signup container'>
                {
                    this.state.isHaveAccount ? // checking if the user have account and render the login or signup based on that
                    <div>
                        <h3>Login</h3>
                        <div>
                            <input className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.email} name="email"  type="text" placeholder="email"/>
                            <input className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.password} name="password"  type="password"  placeholder="password" />
                                <br/>
                            <ButtonMU className='btn-signup' variant="contained" color="primary" onClick={this.Login}>Login</ButtonMU>
                            <ButtonMU className='btn-signup' variant="contained" color="primary" onClick={(e) => this.moveToSignup(e)}>I dont have account</ButtonMU>
                                <br/>
                            <Link style={{textDecoration: 'none'}} to={{pathname:'/resetpassword'}}>
                                <ButtonMU className='btn-signup' variant="outlined" color="primary" >forgot password?</ButtonMU>
                            </Link>
                            <ButtonMU className='btn-signup' variant="contained" color="primary" onClick={this.protectedRoute}>Protected route (:</ButtonMU>
                        </div> 
                    </div>              
                    :   
                    <div>
                        <h3>Signup</h3>
                        <div>
                            <input className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.email} name="email"  type="text" placeholder="email" />
                            <input className='admin-form' onChange={e => this.handleInputChange(e)} value={this.state.password} name="password"  type="password"  placeholder="password" />
                            <br/>
                                <ButtonMU className='btn-signup' variant="contained" color="primary" onClick={this.Signup}>Signup</ButtonMU>
                                <ButtonMU className='btn-signup' variant="contained" color="primary" onClick={() => this.moveToSignup()}>I have account</ButtonMU>
                            <br/>
                            <Link style={{textDecoration: 'none'}} to={{pathname:'/'}}>
                                <ButtonMU className='btn-signup' variant="outlined" color="primary">Home</ButtonMU>
                            </Link>
                            <ButtonMU className='btn-signup' variant="contained" color="primary" onClick={this.protectedRoute}>Protected route (:</ButtonMU>
                        </div>  
                    </div>
                }                  
            </div>
            }
        </div> 
    );
  }
}

export default Admin;
