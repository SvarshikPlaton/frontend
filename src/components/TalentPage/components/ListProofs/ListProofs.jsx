import { ProofBlock } from "./components/ProofBlock/ProofBlock";
import { TalentsService } from "../../../../services/api-services";
import { useTalent } from "../../../../hooks/useTalent";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../context/UserContext";

export function ListProofs({ id }) {
    const [talentsProofs, setTalentsProofs] = useState([]);
    const { token } = useContext(UserContext);

    useEffect(() => {
        TalentsService.getProofs(id, token)
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
