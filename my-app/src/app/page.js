import Image from "next/image";
import styles from "./page.module.css";
import Header from "./components/header";
import HomeScreen from "./(screens)/Home/page";
// import Entry from "./(screens)/Create/page";
import View from "./(screens)/View/page";
export default function Home() {
  return (
    <>
    <HomeScreen />
      {/* <Entry /> */}
    </>
  );
}
