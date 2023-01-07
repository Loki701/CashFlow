import './Main.css';
import logo from '../img/CashFlowLogo.png'
import {useNavigate} from 'react-router-dom';

export default function Main() {
    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
    }
    const handleSignup = () => {
        navigate('/signup')
    }
    

    return(
        <div className="main">
            <div className="main-background">
            <div className="main-header-container">
                <div className="main-header-logo-container">
                    <img className="logo" src={logo} alt="logo"/>

                </div>
                <div className="main-header-action-container">
                    <button className='signin' onClick={handleLogin}>Login</button>
                    <button className='signup'onClick={handleSignup}>Sign up</button>
                </div>
            </div>
            <div className="main-body-container">
                <h1>&emsp;Welcome to CashFlow, the budgeting app that helps you save for your dream vacation!</h1>
                <br/><br/>
                <p>&emsp;Our app is designed to make it easy for you to track your expenses and stay on top of your finances, so you can reach your vacation saving goals faster.</p>
                <br/>
                <p>With CashFlow, you can:<br/><br/></p>
                <p>
                    • Set a vacation saving goal and track your progress<br/><br/>
                    • Create a budget and stick to it<br/><br/>
                    • Easily track your income and expenses<br/><br/>
                    • Get personalized recommendations to help you save money<br/><br/>
                    • Connect to your bank accounts to automatically track your spending
                </p>
                <br/><br/>
                <p>&emsp;Start using CashFlow today and take the first step towards your dream vacation!</p>
                <br/><br/>
            </div>
            </div>
            <div className="main-footer-container">
            <small> Copyright &copy; 2023, CashFlow. All rights reserved.</small>
            </div>
        </div>
    );
}
