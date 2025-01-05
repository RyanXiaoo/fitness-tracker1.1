import { useState } from "react";

const Card = (props) => {
    const [inputValue, setInputValue] = useState("");

    const [status, setStatus] = useState(false);
    const [check, setCheck] = useState(false);

    return (
        <div className="card">
            <button className="delete">Delete</button>
            <div className="title">{props.title}</div>
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
                                    props.setAmount(Number(inputValue));
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
