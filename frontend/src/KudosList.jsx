import "./KudosList.css";
import KudosCard from "./KudosCard.jsx";

const KudosList = (props) => {
  return (
    <main>
      {props.cardData.map((object) => {
        return (
          <>
            <KudosCard
              id={object.id}
              title={object.title}
              description={object.description}
              gifURL={object.gifURL}
              upvotes={object.upvotes}
              setCardData={props.setCardData}
            />
          </>
        );
      })}
    </main>
  );
};

export default KudosList;
