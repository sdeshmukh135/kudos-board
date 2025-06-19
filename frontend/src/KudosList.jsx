import "./KudosList.css";
import KudosCard from "./KudosCard.jsx";
import CommentModal from "./CommentModal.jsx";
import PopUpModal from "./PopUpModal.jsx";

const KudosList = (props) => {
  return (
    <main>
      {props.commentId != 0 && (
        <CommentModal
          setCommentId={props.setCommentId}
          cardId={props.commentId}
        />
      )}
      {props.popModalData && (
        <PopUpModal
          cardData={props.popModalData}
          setPopModalData={props.setPopModalData}
        />
      )}
      {props.cardData.map((object) => {
        return (
          <>
            <KudosCard
              id={object.id}
              title={object.title}
              description={object.description}
              author={object.author}
              gifURL={object.gifURL}
              upvotes={object.upvotes}
              setCardData={props.setCardData}
              setCommentId={props.setCommentId}
              setPopModalData={props.setPopModalData}
            />
          </>
        );
      })}
    </main>
  );
};

export default KudosList;
