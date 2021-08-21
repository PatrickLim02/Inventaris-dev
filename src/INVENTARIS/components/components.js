import styled from 'styled-components'
import ButtonDirect from './ButtonDirect'
export const Container = styled.div``

export const ButtonDirects = styled(ButtonDirect)`
    background-color: ${(props) => props.backgroundcolor};
    border-radius: 20px;
    border: unset;
    padding: 5px;
    text-decoration: none
`