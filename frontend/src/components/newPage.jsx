import { useState } from "react";
import { usePageStore } from "../store/page";

const NewPage = (props) => {
    const [newPage, setNewPage] = useState({
        title: "",
        cards: [{ exercise: "", amount: 0 }],
    });

    const { createPage } = usePageStore();
    const handleAddPage = async (event) => {
        event.preventDefault();
        const { success, message } = await createPage(newPage);
        console.log("Success:", success);
        console.log("Message:", message);
    };

    return (
        <div className="centerForm">
            <form onSubmit={handleAddPage} className="form">
                <label className="label_form" htmlFor="title">
                    What is the title of your new page?
                </label>
                <input
                    className="inputBox"
                    type="text"
                    name="title"
                    value={newPage.title}
                    onChange={(event) => {
                        setNewPage({
                            ...newPage,
                            title: event.target.value,
                        });
                    }}
                />
                <label className="label_form" htmlFor="exercise1">
                    What exercise would you like to store
                </label>
                <input
                    className="inputBox"
                    type="text"
                    name="exercise"
                    value={newPage.exercise}
                    onChange={(event) => {
                        setNewPage({
                            ...newPage,
                            cards: [
                                {
                                    exercise: event.target.value,
                                    amount: newPage.cards[0].amount,
                                },
                            ],
                        });
                    }}
                />
                <label className="label_form" htmlFor="amount1">
                    How much weight is lifted?
                </label>
                <input
                    className="inputBox"
                    type="number"
                    name="amount"
                    value={newPage.amount}
                    onChange={(event) => {
                        setNewPage({
                            ...newPage,
                            cards: [
                                {
                                    exercise: newPage.cards[0].exercise,
                                    amount: event.target.value,
                                },
                            ],
                        });
                    }}
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default NewPage;
