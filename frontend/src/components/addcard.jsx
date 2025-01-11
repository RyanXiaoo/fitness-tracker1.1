import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePageStore } from "../store/page";
import { base } from "../config/baseurl";

const AddCard = (props) => {
    const { pages, fetchAndMergePages, setPages } = usePageStore();
    const pageTitle = props.link.toUpperCase();

    const [newCard, setNewCard] = useState({
        exercise: "",
        amount: 0,
        pageTitle: pageTitle,
    });

    const [status, setStatus] = useState(false);
    const [check, setCheck] = useState(false);

    const handleNewCard = async (event) => {
        event.preventDefault(); // Ensure the form doesn't reload the page

        if (!newCard.exercise || newCard.amount <= 0) {
            alert("Please fill out all fields correctly");
            return;
        }

        try {
            // First update the database
            const requestData = { ...newCard, pageTitle };
            const res = await fetch(`${base}/cards`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (!res.ok) {
                const data = await res.json();
                alert(data.message || "Failed to add card to the database.");
                return;
            }

            const data = await res.json();

            // Update the local state only if the database update succeeds
            props.addcard(
                props.pageIndex,
                data.data.exercise,
                data.data.amount
            );

            alert("Card added successfully!");
            setNewCard({ exercise: "", amount: 0, pageTitle }); // Reset form
        } catch (error) {
            console.error("Error adding card:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="addcard">
            <form onSubmit={handleNewCard}>
                <div className="flip-card-inner">
                    <div className="flip-front-card">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1}
                            stroke="white"
                            className="plus-sign"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </div>

                    <div className="flip-back-card">
                        <label className="addCardTitle" htmlFor="title">
                            Enter exercise name:
                        </label>
                        <input
                            className="inputField"
                            type="text"
                            id="exercise"
                            name="exercise"
                            value={newCard.exercise}
                            onChange={(event) =>
                                setNewCard({
                                    ...newCard,
                                    exercise: event.target.value.toUpperCase(),
                                })
                            }
                            required
                        />
                        <label className="addCardTitle" htmlFor="amount">
                            Enter amount lifted
                        </label>
                        <input
                            className="inputField"
                            type="number"
                            id="amount"
                            name="amount"
                            value={newCard.amount}
                            onChange={(event) =>
                                setNewCard({
                                    ...newCard,
                                    amount: event.target.value,
                                })
                            }
                            required
                            min="0"
                        />
                        <div className="submit-container">
                            <button className="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddCard;
