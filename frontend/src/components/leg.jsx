import { useState } from "react";
import Card from "./card.jsx";

function calculateLegSize(squat, extension, deadlift) {
    return Math.min(squat + extension + deadlift, 2500);
}

function Legs({}) {
    const [squatAmount, setSquatAmount] = useState(0);
    const [extensionsAmount, setExtensionAmount] = useState(0);
    const [deadliftAmount, setDeadliftAmount] = useState(0);

    return (
        <div className="container1">
            <div className="leg">
                <img
                    src="/images/leg1.png"
                    className="leg-image"
                    alt=""
                    style={{
                        height: calculateLegSize(
                            squatAmount,
                            extensionsAmount,
                            deadliftAmount
                        ),
                    }}
                />
            </div>
            <div className="container2">
                <Card
                    title="Squats"
                    amount={squatAmount}
                    setAmount={setSquatAmount}
                />
                <Card
                    title="Extensions"
                    amount={extensionsAmount}
                    setAmount={setExtensionAmount}
                />
                <Card
                    title="Deadlift"
                    amount={deadliftAmount}
                    setAmount={setDeadliftAmount}
                />
            </div>
            <div className="leg">
                <img
                    src="/images/leg2.png"
                    className="leg-image"
                    alt=""
                    style={{
                        left: 0,
                        height: calculateLegSize(
                            squatAmount,
                            extensionsAmount,
                            deadliftAmount
                        ),
                    }}
                />
            </div>
        </div>
    );
}

export default Legs;
