import { useSelector } from "react-redux"
import WelcomeComponent from "../components/HomeComponents/WelcomeComponent"
import { RootState } from "../store"
import RegisterComponent from "../components/AuthComponents/RegisterComponent"

const HomePage = () => {
    const { user } = useSelector((state: RootState) => state.auth)

    if (!user) return <RegisterComponent />

    return (
        <div className="home-page">
            <WelcomeComponent />
        </div>
    )
}

export default HomePage