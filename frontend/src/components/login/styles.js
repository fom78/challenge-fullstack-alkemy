import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  max-width: 300px;
  margin: auto;
  background-color: var(--white);
  & >h1 { font-size: 1.3rem; }
  & > form {
    padding: 8px;
    margin-bottom: 6px;
    & .row {
        display: flex;
        flex-direction: column;
        @media (min-width: 576px) {
            flex-direction: column;
            gap:10px;
        }
        width: 100%;
            box-sizing: border-box;
            & > label {
                display: block;
                width: 100%;
                margin-bottom: 0.5rem;
                font-weight: 600;
                text-align: left;
            }
            & > input {
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 1.5rem;
                height: 38px;
                padding: 6px 10px;
                background-color: #fff;
                border: 1px solid #D1D1D1;
                border-radius: 4px;
                box-shadow: none;
                box-sizing: border-box;
            }
        }
        & .actions {
            display: block;
            align-items: center;
            & > a {
                display: inline-block;
                align-items: baseline;
                font-size: 12px;
                font-weight: 700;
                color: var(--blue);
                &:hover {
                text-decoration:none;
                color: #007affb0;
                }
            }
        }
    }
  }
  & .btn-google {
    display: flex;
    flex-direction: row;
    height: 40px;
    padding: 0px 0px 0px 0px;
    border: 1px solid rgb(66, 133, 244);
    border-radius: 2px;
    width: 296px;
    box-sizing: content-box;
    cursor: pointer;
    & > svg {filter: brightness(0.95);}
    & > div {
      -webkit-box-flex: 1;
      flex-grow: 1;
      height: 40px;
      background-color: rgb(66, 133, 244);
      & > div {
        color: rgb(255, 255, 255);
        font-size: 14px;
        font-weight: bold;
        /* font-family: Akzidenz; */
        line-height: 40px;
        height: 40px;
      }
    }
  }
`

export const Register = styled.p`
  display: flex;
  justify-content: space-between;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 4px;
  & > a {
    color: blue;
    font-weight: 700;
  }
  & > a:hover {
    font-weight: 900;
  }

`

export const Button = styled.button`
    display: inline-block;
    width: 100%;
    height: 38px;
    padding: 0 30px;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
    text-align: center;
    font-size: 11px;
    font-weight: 600;
    color: #fff;
    line-height: 38px;
    letter-spacing: .1rem;
    text-transform: uppercase;
    text-decoration: none;
    white-space: nowrap;
    background-color: transparent;
    border-radius: 4px;
    border: 1px solid #bbb;
    background-color: #33c3f0;
    border-color: #33c3f0;
    ${(props) => props.blue && 'border-color: var(--blue); background-color: var(--blue);'}
    ${(props) => props.green && 'border-color: var(--green); background-color: var(--green);'}    
    ${(props) => props.red && 'border-color: var(--red); background-color: var(--red);'}    
    cursor: pointer;
    &:hover {
      background-color: #007affb0;
    }
    &:focus {
      outline: 2px solid transparent;
      box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    }
`
export const Login = styled.p`
  display: flex;
  justify-content: space-between;
  padding-left: 3px;
  padding-right: 3px;
  font-size: 14px;
  margin-top: 4px;
  margin-bottom: 4px;
  & > a {
    color: blue;
    font-weight: 700;
  }
  & > a:hover {
    font-weight: 900;
  }

`
