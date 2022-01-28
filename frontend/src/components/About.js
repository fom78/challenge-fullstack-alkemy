import styled from 'styled-components'

export default function About () {
  return (
    <AboutStyled>
      <h1>About author</h1>
      <span>Proyecto realizado para el Challenge de Alkemy, por que decidi hacerlo ? LLevo tiempo en el desarrollo web, todo lo que realizo es para uso propio y sinceramente ya quiero tener la oportunidad de realizar desarrollos profesionales en equipo y saber donde estoy parado.</span>
      <h2>Fernando Masino</h2>
      <p>Pueden ver mas sobre mi en mi web personal: <a className='link' href='https://www.fom78.com.ar/' target='_blank' rel='noreferrer'>Mi Web</a></p>
      <p>Hace ya bastante tiempo con los datos del estado llevo el progreso de la vacunacion en Argentina <a className='link' href='https://covid-vacuna-ar.vercel.app/' target='_blank' rel='noreferrer'>Vacunacion COVID-19</a></p>
      <p>Ademas llevo este interesante proyecto, que algun dia vera la luz, el repositorio aun no es publico, y no figura en mi Web personal, explicacion para su prueba <a className='link' href='https://github.com/fom78/profut.info' target='_blank' rel='noreferrer'>Como probarlo ? </a>, El backend tiene una minima documentacion <a className='link' href='https://profut.herokuapp.com/docs/' target='_blank' rel='noreferrer'>Documentacion de la API </a> y si leiste como probarlo, podes ir a la app: <a className='link' href='https://profut.vercel.app/' target='_blank' rel='noreferrer'>ProFut</a></p>
    </AboutStyled>
  )
}

const AboutStyled = styled.section`
  background-color: var(--white);
  & >h1 { font-size: 1.3rem }
  & .link {color: var(--red)}
`
