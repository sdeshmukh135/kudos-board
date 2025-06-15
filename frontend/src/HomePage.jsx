import Header from './Header.jsx'
import Footer from './Footer.jsx'
import BoardList from './BoardList.jsx'
import './App.css'

const HomePage = () => {
    return (
        <div className="HomePage">
            <Header />
            <BoardList />
            <Footer />
        </div>
    )
}

export default HomePage