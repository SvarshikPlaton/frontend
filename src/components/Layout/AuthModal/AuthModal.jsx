import React, { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

import s from "./AuthModal.module.scss";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";

export function AuthModal() {
	const location = useLocation();
	const navigate = useNavigate();

	const [isOpen, setIsOpen] = useState(false);
	const windowRef = useRef();
	const [showLoginForm, setShowLoginForm] = useState(true);

	const showModal = useCallback(() => {
		setIsOpen(true);
		document.body.style.overflowY = "hidden";
	}, []);
	const hideModal = useCallback(() => {
		setIsOpen(false);
		document.body.style.overflowY = "auto";
	}, []);

	useEffect(() => {
		if (location.hash.includes("auth")) {
			// console.log(location.state?.from?.pathname);
			showModal();
		} else {
			hideModal();
		}
	}, [hideModal, location.hash, location.state?.from?.pathname, showModal]);

	useEffect(() => {
		const handleClickOutside = (e) => {
			if (!windowRef.current.contains(e.target)) {
				navigate(location.pathname, { replace: true });
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [hideModal, location.pathname, navigate]);

	return (
		<div className={`${s.modal} ${isOpen ? s.show : s.hide}`}>
			<div
				className={`${s.window} ${isOpen ? s.show : s.hide}`}
				ref={windowRef}>
				<div className={s.content}>
					<div className={s.header}>
						<div className={s.header_btns}>
							<button
								className={`${s.header_btn} ${showLoginForm ? s.active : ""}`}
								onClick={() => setShowLoginForm(true)}>
								Login
							</button>
							<button
								className={`${s.header_btn} ${!showLoginForm ? s.active : ""} `}
								onClick={() => setShowLoginForm(false)}>
								Register
							</button>
						</div>
						<button
							className={s.close}
							onClick={() => navigate(location.pathname, { replace: true })}>
							&#215;
						</button>
					</div>
					<div className={s.body}>{showLoginForm ? <Login /> : <Register />}</div>
				</div>
			</div>
		</div>
	);
}
