import Card from "./card";
import AddCard from "./addcard";

const Page = (props) => {
    return (
        <div className="container1">
            <div className="container2">
                {props.cardsinfo.map((card, cardIndex) => (
                    <Card
                        key={cardIndex}
                        exercise={card.exercise}
                        amount={card.amount}
                        pageIndex={props.pageIndex}
                        cardIndex={props.cardIndex}
                        link={props.link}
                        pages={props.pages}
                    />
                ))}
                <AddCard
                    addcard={props.addCard}
                    pageIndex={props.pageIndex}
                    cardIndex={props.cardsinfo.length}
                    link={props.link}
                    pages={props.pages}
                />
            </div>
        </div>
    );
};

export default Page;
