import React from "react";
import classes from "./pages-css/Landing.module.css"
import ContentCard from "../components/UI/ContentCard";


const Landing = () => {
  return <React.Fragment>
    <main className={classes.landing}>
        <header>
          <button className="btn-dark-blue">I am Human</button>
        </header>
        <section>
          <ContentCard src="" title="title" content="Here is my short description"/>
          <ContentCard src="" title="title" content="Here is my short description"/>
          <ContentCard src="" title="title" content="Here is my short description"/>
        </section>
      </main>
  </React.Fragment>
}

export default Landing;