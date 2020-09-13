import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Form = styled.View`
    border-color: #EEE;
    flex-direction: column;
    padding-bottom: 20px;
`;

export const FormText = styled.Text`
    color: #FFF;
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 20px;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
    height: 40px;
    background: #EEE;
    border-radius: 4px;
    padding: 0 15px;
    border: 1px solid #EEE;
    margin-top: 12px;
`;

export const SubmitButton = styled(RectButton)`
    background: #7159c1;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin-top: 17px;
    padding: 0 12px;
    height: 40px;
    opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const ButtonText= styled.Text`
    color: #FFF;
    font-size: 14px;
    font-weight: bold;
`;
