// Styles
import styled from 'styled-components'

export default function Spinner () {
  return <Container><span className='spinner' /></Container>
}

const Container = styled.div`
    height:200px;
    display: flex;
    align-items: center;
    justify-content: center;
    .spinner,.spinner:after {
      display: block;
      width: 32px;
      height: 32px;
      border-radius: 50%;
    }
    .spinner {
      background-color: transparent;
      border-top: 5px solid rgb(66,139,202);
      border-right: 5px solid rgb(66,139,202);
      border-bottom: 5px solid rgb(66,139,202);
      border-left: 5px solid rgba(66,139,202,.2);
      animation-iteration-count: infinite;
      animation-timing-function: linear;
      animation-duration: .8s;
      animation-name: spinner-loading;
      position: absolute;
    }
    @keyframes spinner-loading {
        0% {
            transform: rotate(0deg)
        } to {
        transform: rotate(1turn)
        }
    }
`
