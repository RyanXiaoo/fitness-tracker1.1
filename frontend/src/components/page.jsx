import Card from "./card";
import AddCard from "./addcard";

const Page = (props) => {
    return (
        <div className="container1">
            <div className="container2">
                {props.cardsinfo.map((card, cardIndex) => (
                    <Card
                        key={cardIndex}
                        title={card.title}
                        amount={card.amount}
                        setAmount={(newAmount) =>
                            props.changeAmount(
                                props.pageIndex,
                                cardIndex,
                                newAmount
                            )
                        }
                    />
                ))}
                <AddCard addcard={props.addCard} pageIndex={props.pageIndex} />
            </div>
        </div>
    );
};

export default Page;
