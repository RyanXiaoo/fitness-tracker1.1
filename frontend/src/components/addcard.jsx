import { useState } from "react";

const AddCard = (props) => {
    const [cardTitle, setCardTitle] = useState("");
    const [cardAmount, setCardAmount] = useState();
    const [status, setStatus] = useState(false);
    const [check, setCheck] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        props.addcard(
            props.pageIndex,
            cardTitle.toUpperCase(),
            Number(cardAmount) // Ensure it's a number
        );

        setCardTitle("");
        setCardAmount();
    };

    return (
        <div className="addcard">
            <form onSubmit={handleSubmit}>
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
                            id="title"
                            name="title"
                            value={cardTitle}
                            onChange={(event) =>
                                setCardTitle(event.target.value)
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
                            value={cardAmount || ""}
                            onChange={(event) =>
                                setCardAmount(+event.target.value)
                            }
                            required
                            min="0"
                        />
                        <div className="submit-container">
                            <button
                                className="submit"
                                onClick={() => {
                                    if (
                                        cardTitle === "" ||
                                        cardAmount === "" ||
                                        cardAmount === empty
                                    ) {
                                        alert(
                                            "At least one of the following fields are incomplete"
                                        );
                                    } else {
                                        setStatus(true);
                                        setTimeout(() => {
                                            setCheck(true);
                                            setTimeout(() => {
                                                setCheck(false);
                                                setStatus(false);
                                                props.setAmount(
                                                    Number(inputValue)
                                                );
                                                setInputValue("");
                                            }, 2000);
                                        }, 3000);
                                    }
                                }}
                            >
                                {" "}
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default AddCard;
