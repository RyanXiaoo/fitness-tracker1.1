import React, { useEffect, useState } from "react";
import "./CSS/App.css";
import "./CSS/navbar.css";
import "./CSS/home.css";
import "./CSS/card.css";
import "./CSS/newPage.css";
import "./CSS/page.css";
import "./CSS/addcard.css";
import NewPage from "./components/newPage";
import Page from "./components/page";
import { usePageStore } from "./store/page";
import { Link, Router, Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
    const { pages, updatePages, fetchAndMergePages } = usePageStore();

    useEffect(() => {
        console.log("Fetching pages...");
        fetchAndMergePages().then(() => console.log("Pages fetched:", pages));
    }, [fetchAndMergePages]);

    function addCard(pageIndex, exercise, amount) {
        const currentCards = pages[pageIndex].cards;

        // Check if any existing card matches the new exercise
        const duplicate = currentCards.some(
            (card) => card.exercise.toLowerCase() === exercise.toLowerCase()
        );
        if (duplicate) {
            alert("Duplicate exercise cannot be created");
            return;
        }

        // If no duplicate, update the pages once
        updatePages((prevPages) =>
            prevPages.map((page, index) => {
                if (index === pageIndex) {
                    return {
                        ...page,
                        cards: [...page.cards, { exercise, amount }],
                    };
                }
                return page;
            })
        );
    }

    return (
        <div className="background">
            <BrowserRouter>
                <Nav layout="not" />
                <Routes>
                    <Route index element={<Home />} />
                    {Array.isArray(pages) && pages.length > 0
                        ? pages.map((page, pageIndex) => (
                              <Route
                                  key={pageIndex}
                                  path={page.link}
                                  element={
                                      <Page
                                          cardsinfo={page.cards}
                                          pageIndex={pageIndex}
                                          pages={pages}
                                          addCard={addCard}
                                          link={page.link}
                                      />
                                  }
                              />
                          ))
                        : console.log(typeof pages)}
                    <Route path="/new_page" element={<NewPage />}></Route>
                </Routes>
                <Nav layout="fixed" />
            </BrowserRouter>
        </div>
    );
};

function Nav(props) {
    const { pages } = usePageStore();

    return (
        <div className={props.layout === "not" ? "navbar1" : "navbar"}>
            <div className="leftnav">
                <Link to="/" className="icon">
                    HOME
                </Link>
            </div>
            <div className="rightnav">
                {pages.map((page) => (
                    <Link key={page.link} to={page.link} className="icon">
                        {page.title}
                    </Link>
                ))}
                <Link to="/new_page" className="icon">
                    NEW PAGE
                </Link>
            </div>
        </div>
    );
}

function Home() {
    return (
        <div>
            <div className="body1">
                <div className="home-text">TRACK YOUR PROGRESS HERE</div>
                <img
                    src="/images/buffguy.jpg"
                    alt="Buff Guy"
                    className="animation"
                />
            </div>
        </div>
    );
}

export default App;
