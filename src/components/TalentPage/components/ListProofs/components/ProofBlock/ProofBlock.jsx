import s from "./ProofBlock.module.scss";

export function ProofBlock({ link, text, created }) {
    return (
        <div className={s.out}>
            <div className={s.proofs}>
                <div className={s.info}>
                    <h1>Proof:</h1>
                    <a className={s.link} href={link}>
                        Click to know me more
                    </a>
                    <div className={s.proof_description}>
                        <div className={s.title}>Description:</div>
                        {text}
                    </div>
                </div>
                <div className={s.date}>
                    <b className={s.created}>
                        Created: {created.split(" ")[0]}
                    </b>
                </div>
            </div>
        </div>
    );
}
