import { ProfileProofBlock } from "./components/ProfileProofBlock";
import { TalentsService } from "../../../../services/api-services";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";
import s from "./ProfileListProofs.module.scss";
import { AddingProofsForm } from "../AddingProofsForm/AddingProofsForm";

export function ProfileListProofs({ id, token }) {
    const { talentsProofs, setTalentsProofs } = useContext(UserContext);
    const [editProof, setEditProof] = useState([]);

    useEffect(() => {
        if (id) {
            TalentsService.getProofs(id, token)
                .then((proofs) => {
                    setTalentsProofs(proofs);
                    setEditProof(proofs.map((el) => ({ id: el.id, edit: false })));
                })
                .catch((err) => console.log(err));
        }
    }, [id, token, talentsProofs.length, setTalentsProofs]);

    return (
        <>
            {talentsProofs.length > 0 ? (
                <div>
                    {talentsProofs.map((el) => {
                        if (editProof.find((obj) => obj.id === el.id)?.edit) {
                            return (
                                <AddingProofsForm
                                    key={el.id}
                                    id={id}
                                    token={token}
                                    edit={true}
                                    editProof={editProof}
                                    setEditProof={setEditProof}
                                    proof={el}
                                />
                            );
                        } else {
                            return (
                                <ProfileProofBlock
                                    key={el.id}
                                    id={el.id}
                                    userID={id}
                                    token={token}
                                    link={el.link}
                                    text={el.text}
                                    status={el.status}
                                    created={el.created}
                                    editProof={editProof}
                                    setEditProof={setEditProof}
                                    talentsProofs={talentsProofs}
                                    setTalentsProofs={setTalentsProofs}
                                />
                            );
                        }
                    })}
                </div>
            ) : (
                <span>
                    <div className={s.no_proofs}>No proofs yet!</div>
                </span>
            )}
        </>
    );
}
