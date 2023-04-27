import React, { useEffect, useRef, useCallback } from "react";
import s from "./DeletingProofModal.module.scss";

import { Button } from "../../../../../../../../shared/components";
import { TalentsService } from "../../../../../../../../services/api-services";

export function DeletingProofModal({
	id,
	userID,
    token,
    modalIsOpen,
    setModalIsOpen,
	talentsProofs,
	setTalentsProofs
}) {
    const window = useRef();
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!window.current.contains(e.target)) {
                setModalIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [setModalIsOpen]);

    const showModal = useCallback(() => {
        setModalIsOpen(true);
        document.body.style.overflowY = "hidden";
    }, [setModalIsOpen]);

    const hideModal = useCallback(() => {
        setModalIsOpen(false);
        document.body.style.overflowY = "auto";

    }, [setModalIsOpen]);

    useEffect(() => {
        if (modalIsOpen) {
            showModal();
        } else {
            hideModal();
        }
    }, [modalIsOpen, showModal, hideModal]);

    const deleteProof = () => {
        try {
            TalentsService.deleteProof(userID, id, token)
                .then(() => {
                    setTalentsProofs(talentsProofs.filter((el) => el.id !== id));
                })
                .catch((error) => {
                    console.error(error);
                });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`${s.modal} ${modalIsOpen ? s.show : s.hide}`}>
            <div
                ref={window}
                className={`${s.block_modal} ${modalIsOpen ? s.show : s.hide}`}
            >
                <div className={s.header}>
                    <span>Deleting</span>
                    <button
                        className={s.close}
                        onClick={() => setModalIsOpen(false)}
                    >
                        &#215;
                    </button>
                </div>
                <div className={s.body}>
                    <p>
                        Are you sure you want to delete this proof
                        permanently?
                    </p>
                </div>
                <div className={s.btns}>
                    <Button
                        className={s.btn}
                        onClick={() => {
                            deleteProof();
                        }}
                    >
                        Yes, I want
                    </Button>
                    <Button className={s.btn} onClick={() => setModalIsOpen(false)}>
                        No, I don't
                    </Button>
                </div>
            </div>
        </div>
    );
}
