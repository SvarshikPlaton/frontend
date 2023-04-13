import React, { useState, useCallback, useEffect } from "react";
import s from "./AcceptingModal.module.scss";
import { Button } from "../../../../shared/components";

export function AcceptingModal() {
    const [isClosed, setIsClose] = useState(true);

    return (
        <div className={`${s.modal} ${isClosed ? s.hide : s.show}`}>
            <div className={s.block_modal}>
                <button className={s.close}>x</button>
                <div className={s.body}>
                    <p>Are you sure to delete account forever? </p>
                </div>
                <div className={s.btns}>
                    <Button className={s.btn}>Yes, I want</Button>
                    <Button className={s.btn}>No, I don't</Button>
                </div>
            </div>
        </div>
    );
}
