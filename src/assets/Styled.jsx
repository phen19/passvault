import styled from "styled-components";
const Logo = styled.div`
  display: flex;
  // background-color: #e7dbc3;
  align-items: center;
  justify-content: center;
  padding-top: 50px;
  margin-bottom: 50px;
  img {
    height: auto;
  }
  h1 {
    font-size: 50px;
    font-weight: 700;
    font-family: "Josefin Sans", sans-serif;
    color: #605e5a;
  }
`;

const Container = styled.div `
  background-color: #e7dbc3;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const Form = styled.form `
  display: flex;
  flex-direction: column;
  margin: 0 2vw 0 2vw;
  align-items: center;

  input{
    width: 350px;
    // margin: 0 2vw 0 2vw;
    }

  .campo{
    display:flex;
    flex-wrap: wrap;
  }
  
  button{
    margin-top: 10px;
    width: 350px;
  }

  select{
    width: 350px;
  }

  .input-error{
    outline: 1px solid rgb(255, 72, 72);
  }
  
  .error-message{
    color: rgb(255, 72, 72)
  }
  margin-bottom: 16px;
`
const Buttons = styled.div `
    &:hover{
        cursor: pointer;
    }
`
const CategoryName = styled.div`
    display: flex;
    margin-bottom: 16px; 
    font-size: 20px; 
    font-weight: 700; 
    font-Family: 'Josefin Sans' , sans-serif; 
    color: #605e5a
`
export {
    Logo,
    Container,
    Form,
    Buttons,
    CategoryName
}