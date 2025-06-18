import "./BoardList.css";
import BoardCard from "./BoardCard.jsx";

const BoardList = (props) => {
  return (
    <main>
      {props.boardData.map((object) => {
        return (
          <>
            <BoardCard
              id={object.id}
              title={object.title}
              category={object.category}
            />
          </>
        );
      })}
    </main>
  );
};

export default BoardList;
