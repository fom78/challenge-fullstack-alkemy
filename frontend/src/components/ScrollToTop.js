import { useRef } from 'react'
// Components
import ButtonScrollTop from 'components/icons/ButtonScrollTop'
// Hooks
import useIntersectionObserver from 'hooks/useIntersectionObserver'
// Styles
import styled from 'styled-components'

export default function ScrollToTop ({ showButtonAt }) {
  const chivatoRef = useRef()
  const [isIntersecting] = useIntersectionObserver({ elementRef: chivatoRef })

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <Chivato ref={chivatoRef} showButtonAt={showButtonAt} />
      <ButtonScrollTop
        fill='#2c7cdc'
        height={45}
        onClick={handleClick}
        show={!isIntersecting}
        width={45}
      />
    </>
  )
}

const Chivato = styled.div`
  position: absolute;
  top: ${(props) => props.showButtonAt}px;
  left: 1px;
  height: 1px;
  width: 1px;
  opacity: 0;
`
