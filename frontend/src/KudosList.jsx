import './KudosList.css'
import KudosCard from './KudosCard.jsx'

const KudosList = (props) => {
    return (
        <main>
            {props.cardData.map((object) => {
        return (
          <>
            <KudosCard title={object.title} description={object.description}  gifURL={object.gifURL}/>
          </>
        );
      })}
        </main>
        
    )
}

export default KudosList