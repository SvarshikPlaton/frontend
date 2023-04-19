import { TalentsService } from "../../services/api-services";
import { useState } from "react";
import { useEffect } from "react";
import { ProofBlock } from "../TalentPage/components/ListProofs/components/ProofBlock";
import { Button } from "../../shared/components";
import s from "./ListProofsPage.module.scss";

export function ListProofsPage() {
    const [proofs, setProofs] = useState({});

    useEffect(() => {
        TalentsService.getAllProofs().then((res) => setProofs(res));
    }, []);

    const filterByDateAsc = () => {
        const data = [...proofs].sort(
            (a, b) => new Date(b.created) - new Date(a.created)
        );
        setProofs(data);
    };

    const filterByDateDesc = () => {
        const data = [...proofs].sort(
            (a, b) => new Date(b.created) - new Date(a.created)
        );
        setProofs(data.reverse());
    };

    return (
        <div>
            <div className={s.buttons}>
                <Button className={s.button} onClick={filterByDateDesc}>
                    Sort by date: ascending
                </Button>
                <Button className={s.button} onClick={filterByDateAsc}>
                    Sort by date: descending
                </Button>
            </div>

            {proofs.length > 0 ? (
                proofs.map((el) => {
                    return (
                        <ProofBlock
                            key={el.id}
                            link={el.link}
                            text={el.text}
                            created={el.created}
                        />
                    );
                })
            ) : (
                <div></div>
            )}
        </div>
    );
}
