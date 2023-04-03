import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../../context/UserContext/UserContext";
import { Button, Input } from "../../../../../shared/components";
import s from "./Login.module.scss";

const advices = [
    {
        title: "Searching and connecting",
        text: "You can search for the talents all around the globe and connect with them easily",
    },
    {
        title: "Upload any quantity of proofs",
        text: "It is allowed for you to upload any quantity of proofs you want.",
    },
    {
        title: "Job alerts",
        text: " You will be immediately recognised, when employers will want to make connection.",
    },
    {
        title: "Free CV review",
        text: "It is allowed to have the CV review for free!",
    },
];

export function Login() {
    const { setAuth } = useContext(UserContext);
    const location = useLocation();
    const navigate = useNavigate();

	const [email, setEmail] = useState({mail:"", error:"", state:true});
	const [password, setPassword] = useState({pswd:"", error:"", state:true});

	function validateEmail() {
		const EMAIL_REGEXP  = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (EMAIL_REGEXP.test(String(email.mail).toLowerCase())){
            setEmail(prev=>({...prev, state: true}));
        }
        else{
            if(email.mail.trim() === ""){
                setEmail(prev=>({...prev, error: "*empty field"}));
            }
            else if(!email.mail.includes("@")){
                setEmail(prev=>({...prev, error: "*email doesn't have \"@\""}));
            }
            else if(!email.mail.split("@")[1].includes(".")){
                setEmail(prev=>({...prev, error: "*domain name doesn't have \".\""}));
            }
            else{
                setEmail(prev=>({...prev, error: "*not valid email"}));
            }
            setEmail(prev=>({...prev, state: false}));
        }
	}

	function validatePassword() {
		const PASSWORD_REGEXP  = /^[a-zA-Z0-9]{8,}$/;
		if(PASSWORD_REGEXP.test(String(password.pswd).toLowerCase())){
            setPassword(prev=>({...prev, state:true}));
        }
        else{
            if(password.pswd.trim() === ""){
                setPassword(prev=>({...prev, error:"*empty field"}));
            }
            else if(password.pswd.length < 8){
                setPassword(prev=>({...prev, error:"*password should be more than or equal 8 symbols"}));
            }
            else if(!/^[a-zA-Z0-9]$/.test(password.pswd)){
                setPassword(prev=>({...prev, error:"*you can use only latins letters and numbers"}));
            }
            else{
                setPassword(prev=>({...prev, error:"*not valid password"}));
            }
            setPassword(prev=>({...prev, state:false}));
        }
	}

	function validateForm(){
        validatePassword();
        validateEmail();
		
		// return validateEmail() && validatePassword();
	}
	
	function handler(event){
		event.preventDefault()
	}
    return (
        <>
            <form action="#" onSubmit={handler} className={s.form}>
                <span>the mark * indicating that the field is required</span>
                <div className={s.input_block}>
                    <label htmlFor="login">Login*</label>
                    <Input name="login" type="text" required placeholder="example@gmail.com" autoComplete="off" className={`${s.input} ${email.state ? "" : s.error}`} onChange={event => setEmail(prev => ({...prev, mail:event.target.value}))}></Input>
                    <span>{email.state ? "" : email.error}</span>
                </div>
                <div className={s.input_block}>
                    <label htmlFor="password">Password*</label>
                    <Input name="password" type="password" required placeholder="your password" autoComplete="off" className={`${s.input} ${password.state ? "" : s.error}`} onChange={event => setPassword(prev => ({...prev, pswd:event.target.value}))}></Input>
					<span>{password.state ? "" : password.error}</span>
                </div>
                <Button type="submit" className={s.btn} onClick={()=>validateForm()}>
                    Login
                </Button>
            </form>
            <div className={s.info}>
                <div className={s.title}>Not Registered?</div>
                <ul className={s.advices}>
                    {advices.map(({ title, text }) => (
                        <li key={title}>
                            <h4>{title}</h4>
                            <p>{text}</p>
                        </li>
                    ))}
                </ul>
                <Button
                    className={s.btn}
                    onClick={() =>
                        navigate(location.state.redirect, { replace: true })
                    }
                >
                    Register
                </Button>
            </div>
        </>
    );
}
