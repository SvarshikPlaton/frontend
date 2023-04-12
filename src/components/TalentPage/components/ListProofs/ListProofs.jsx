import { ProofBlock } from "./components/ProofBlock/ProofBlock";
import { TalentsService } from "../../../../services/api-services";
import { useTalent } from "../../../../hooks/useTalent";
import { useEffect, useState } from "react";

export function ListProofs({ id }) {
    const [talentsProofs, setTalentsProofs] = useState([]);

    useEffect(() => {
        TalentsService.getProofs(id)
            .then((proofs) => {
                setTalentsProofs(proofs);
            })
            .catch((err) => console.log(err));
    }, []);

    return (
        <div>
            {talentsProofs.map((el) => {
                return (
                    <ProofBlock
                        key={el.id}
                        link={el.link}
                        text={el.text}
                        created={el.created}
                    />
                );
            })}
        </div>
    );
}
