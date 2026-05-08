import React from "react";
import Sidebar from "@cyopo/App/nav/sidebar/Sidebar";
import TopBar from "@cyopo/App/nav/top/TopBar";
import MobileBottomNav from "@cyopo/App/nav/bottom/MobileBottomNav";
import styles from "./AppLayout.module.css";

interface Props {
  children: React.ReactNode;
}

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={styles.root}>
      <Sidebar />
      <TopBar />
      <main className={styles.main}>
        <div className={styles.content}>{children}</div>
      </main>
      <MobileBottomNav />
    </div>
  );
};

export default AppLayout;
