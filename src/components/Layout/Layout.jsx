import React from "react";
import styles from "./Layout.module.scss";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { AuthModal } from "./AuthModal";

export function Layout({ children }) {
    return (
        <div className={styles.wrapper}>
            <Header />
            <AuthModal />
            <Main>{children}</Main>
            <Footer />
        </div>
    );
}
