import s from "./ProofBlock.module.scss";

export function ProofBlock({ link, text, created }) {
    return (
        <div className={s.out}>
            <div className={s.proofs}>
                <div className={s.info}>
                    <h3>Proof:</h3>
                    <div>{link}</div>
                    <div className={s.proof_description}>
                        <div className={s.title}>Description:</div>
                        {text}
                    </div>
                </div>
                <div className={s.date}>
                    <div className={s.created}>
                        Published: {created.split(" ")[0]}
                    </div>
                </div>
            </div>
        </div>
    );
}
