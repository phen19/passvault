import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDataProvider } from "./UserContext"
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import HomePage from "./HomePage";
import Passwords from "./Passwords";
import Password from "./Password";
import AddNewPassword from "./AddNewPassword";
import "./assets/reset.css";

function App() {

  return (
      <BrowserRouter>
        <UserDataProvider>
          <Routes>
            <Route path="/" element={<SignIn/>}/>
            <Route path= "/signUp" element={<SignUp/>}/>
            <Route path= "/signIn" element={<SignIn/>}/>
            <Route path= "/homePage" element={<HomePage/>}/>
            <Route path= "/passwords" element={<Passwords/>}/>
            <Route path= "/password/:category/:passwordId" element={<Password/>}/>
            <Route path= "/addNewPassword" element={<AddNewPassword/>}/>
          </Routes>
        </UserDataProvider>
      </BrowserRouter>
  )
}

export default App
