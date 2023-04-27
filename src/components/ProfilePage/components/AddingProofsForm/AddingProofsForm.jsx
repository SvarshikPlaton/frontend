import { useContext, useState } from "react";
import { Button, Input, Textarea } from "../../../../shared/components";
import { TalentsService } from "../../../../services/api-services";
import { UserContext } from "../../../../context/UserContext";
import s from "./AddingProofsForm.module.scss";
import plus from "../../../../shared/images/plus.svg";

export function AddingProofsForm({ id, token, edit = null, editProof = null, setEditProof = null, proof = null }) {
    const [activeProofs, setActiveProofs] = useState(edit !== null);
    const [link, setLink] = useState(edit === null ? "" : proof.link);
    const [text, setText] = useState(edit === null ? "" : proof.text);
    const [addProofError, setAddProofError] = useState("");
    const { talentsProofs, setTalentsProofs } = useContext(UserContext);

    function handle(e) {
        e.preventDefault();
        const proof = { link, text };

        TalentsService.addProof(proof, id, token)
            .then(() => {
                setTalentsProofs((prev) => [
                    ...prev,
                    { id: NaN, link: "string", text: "string", created: "date", status: "DRAFT" },
                ]);
                setActiveProofs(false);
                setLink("");
                setText("");
                setAddProofError("");
            })
            .catch((error) => {
                if (error.response.status === 400 || error.response.status === 500) {
                    setAddProofError("Incorrect link or description entered");
                } else {
                    setAddProofError("Something goes wrong");
                }
            });
    }

    function save(e) {
        e.preventDefault();

        const newProof = { link: link, text: text, status: proof.status, created: proof.created};
        TalentsService.editProof(id, proof.id, newProof, token)
            .then(() => {
                setTalentsProofs(
                    talentsProofs.map((obj) => {
                        if (obj.id === proof.id) {
                            return {id:proof.id , ...newProof};
                        }
                        return obj;
                    })
                );
                setEditProof(
                    editProof.map((obj) => {
                        if (obj.id === proof.id) {
                            return { ...obj, edit: false };
                        }
                        return obj;
                    })
                );
                setLink("");
                setText("");
                setAddProofError("");
            })
            .catch((error) => {
                if (error.response.status === 400 || error.response.status === 500) {
                    setAddProofError("Incorrect link or description entered");
                } else {
                    setAddProofError("Something goes wrong");
                }
            });
    }

    return (
        <>
            {edit === null ? (
                <div className={s.updating_proofs}>
                    <img
                        className={`${s.add} ${activeProofs ? s.rotated : ""}`}
                        onClick={() => {
                            setActiveProofs((prev) => !prev);
                            setAddProofError("");
                        }}
                        src={plus}
                    ></img>
                </div>
            ) : (
                ""
            )}

            {activeProofs && (
                <form action="" className={s.add_proff_form}>
                    <div className={s.description}>
                        <Input
                            onChange={(e) => setLink(e.target.value)}
                            value={link}
                            className={s.pr_link}
                            type="text"
                            placeholder="Paste only one link"
                            autoComplete="off"
                        />

                        <Textarea
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            className={s.pr_description}
                            placeholder="Write the description"
                        />

                        <div className={s.btns}>
                            <span className={s.error}>{addProofError}</span>
                            {edit === null ? (
                                <Button className={s.btn} onClick={handle}>
                                    Publish
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        className={s.btn}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setEditProof(
                                                editProof.map((obj) => {
                                                    if (obj.id === proof.id) {
                                                        return { ...obj, edit: false };
                                                    }
                                                    return obj;
                                                })
                                            );
                                        }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className={s.btn}
                                        onClick={save}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </form>
            )}
        </>
    );
}
