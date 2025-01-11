import { useState } from "react";
import { usePageStore } from "../store/page";
import { base } from "../config/baseurl";
import { updateAmount } from "../../../backend/controllers/card.controller";

const Card = (props) => {
    const { pages, setPages, removeCardFromPage, updateCardFromPage } =
        usePageStore();
    const [inputValue, setInputValue] = useState("");
    const [status, setStatus] = useState(false);
    const [check, setCheck] = useState(false);
    const pageTitle = props.link.toUpperCase();
    const exercise = props.exercise;

    const deleteCard = async () => {
        try {
            const requestData = { exercise, pageTitle };
            const res = await fetch(`${base}/cards`, {
                method: "DELETE",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(requestData),
            });
            if (!res.ok) {
                const data = await res.json();
                alert(data.message || "Failed to add card to the database.");
                return;
            }
            removeCardFromPage(props.pageIndex, exercise);
        } catch (error) {
            console.error("Error adding card:", error);
            alert("An error occurred. Please try again.");
        }
    };

    const updateCard = async () => {
        try {
            const requestData = {
                amount: Number(inputValue),
                exercise,
                pageTitle,
            };
            const res = await fetch(`${base}/cards`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(requestData),
            });
            if (!res.ok) {
                const data = await res.json();
                alert(data.message || "Failed to add card to the database.");
                return;
            }
            updateCardFromPage(props.pageIndex, exercise, inputValue);
        } catch (error) {
            console.error("Error updating card:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="card">
            <button className="delete" onClick={deleteCard}>
                Delete
            </button>
            <div className="title">{props.exercise}</div>
            <div className="exercise">Amount lifted: {props.amount} lbs</div>
            <input
                type="number"
                className="change-amount"
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            <div className="submit-container">
                <button
                    className="submit"
                    onClick={() => {
                        if (inputValue === "") {
                            alert("Please enter a value before submitting.");
                        } else {
                            setStatus(true);
                            setTimeout(() => {
                                setCheck(true);
                                setTimeout(() => {
                                    setCheck(false);
                                    setStatus(false);
                                    updateCard();
                                    setInputValue("");
                                }, 2000);
                            }, 3000);
                        }
                    }}
                >
                    SUBMIT
                </button>

                <div
                    className={
                        "loader " + (status ? "loader-active" : "loader-hide")
                    }
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="#1c89ff"
                        className={
                            "checkmark " +
                            (check ? "checkmark" : "checkmark-hide")
                        }
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m4.5 12.75 6 6 9-13.5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Card;
