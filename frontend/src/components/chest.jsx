import { useState } from "react";
import Card from "./card.jsx";

function calculateChestSize(bench, clap, inclineBench) {
    return Math.min(bench + clap + inclineBench, 2500);
}

function Chest() {
    const [benchAmount, setBenchAmount] = useState(0);
    const [clapAmount, setClapAmount] = useState(0);
    const [inclineBenchAmount, setInclineBenchAmount] = useState(0);

    return (
        <div className="container1">
            <div className="leg">
                <img
                    src="/images/chest1.jpg"
                    className="chest-image"
                    alt=""
                    style={{
                        height: calculateChestSize(
                            benchAmount,
                            clapAmount,
                            inclineBenchAmount
                        ),
                    }}
                />
            </div>
            <div className="container2">
                <Card
                    title="Bench"
                    amount={benchAmount}
                    setAmount={setBenchAmount}
                />
                <Card
                    title="Clap"
                    amount={clapAmount}
                    setAmount={setClapAmount}
                />
                <Card
                    title="Incline Bench"
                    amount={inclineBenchAmount}
                    setAmount={setInclineBenchAmount}
                />
            </div>
            <div className="leg">
                <img
                    src="/images/chest2.jpg"
                    className="chest-image"
                    alt=""
                    style={{
                        left: 0,
                        height: calculateChestSize(
                            benchAmount,
                            clapAmount,
                            inclineBenchAmount
                        ),
                    }}
                />
            </div>
        </div>
    );
}

export default Chest;
