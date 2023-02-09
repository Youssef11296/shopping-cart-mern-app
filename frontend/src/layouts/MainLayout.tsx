// comps
import MianHeader from './MainHeader'
import MainFooter from './MainFooter'

const MainLayout = ({ children }: any) => {
    return (
        <div className="main-layout">
            <MianHeader />
            {children}
            {/* <MainFooter /> */}
        </div>
    )
}

export default MainLayout