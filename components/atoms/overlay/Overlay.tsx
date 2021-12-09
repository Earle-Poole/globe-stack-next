import styled from 'styled-components'

interface OverlayProps {
  children: React.ReactNode
}
const Overlay = ({ children }: OverlayProps) => {
  return <OverlayWrapper>{children}</OverlayWrapper>
}

const OverlayWrapper = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: hsla(0, 0%, 0%, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Overlay
