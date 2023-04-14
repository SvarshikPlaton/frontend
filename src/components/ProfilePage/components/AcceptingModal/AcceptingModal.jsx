import React, { useEffect, useRef, useCallback } from "react";
import s from "./AcceptingModal.module.scss";
import { Button } from "../../../../shared/components";
import { useNavigate } from "react-router-dom";
import { TalentsService } from "../../../../services/api-services";

export function AcceptingModal({
    isOpen,
    setIsOpen,
    removeCookie,
    user,
    token,
}) {
    const navigate = useNavigate();
    const window = useRef();
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!window.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [setIsOpen]);

    const showModal = useCallback(() => {
		setIsOpen(true);
		document.body.style.overflowY = "hidden";
	}, []);

    const hideModal = useCallback(() => {
		setIsOpen(false);
		document.body.style.overflowY = "auto";
	}, []);

    useEffect(()=>{
        if(isOpen){
            showModal();
        }else{
            hideModal();
        }
    },[isOpen]);

    const deleteTalent = (id) => {
        try {
            TalentsService.deleteTalent(id, token)
                .then(() => {
                    removeCookie("token");
                    removeCookie("user");
                    navigate("/", { replace: true });
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`${s.modal} ${isOpen ? s.show : s.hide}`}>
            <div
                ref={window}
                className={`${s.block_modal} ${isOpen ? s.show : s.hide}`}
            >
                <div className={s.header}>
                    <span>Deleting</span>
                    <button
                        className={s.close}
                        onClick={() => setIsOpen(false)}
                    >
                        &#215;
                    </button>
                </div>
                <div className={s.body}>
                    <p>Are you sure you want to delete your account permanently?</p>
                </div>
                <div className={s.btns}>
                    <Button
                        className={s.btn}
                        onClick={() => {
                            deleteTalent(user.id);
                        }}
                    >
                        Yes, I want
                    </Button>
                    <Button className={s.btn} onClick={() => setIsOpen(false)}>
                        No, I don't
                    </Button>
                </div>
            </div>
        </div>
    );
}
