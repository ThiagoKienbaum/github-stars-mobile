import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Header = styled.View`
    align-items: center;
    padding-bottom: 20px;
    border-bottom-width: 1px;
    border-color: #EEE;
`;

export const Avatar = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    border: 2px;
    border-color: #7159c1;
    background: #EEE;
`;

export const Name = styled.Text`
    font-size: 20px;
    color: #EEE;
    font-weight: bold;
    margin-top: 10px;
    text-align: center;
`;

export const Form = styled.View`
    flex-direction: row;
    border-color: #EEE;
    padding-bottom: 12px;
    margin-top: 12px;
`;

export const Input = styled.TextInput.attrs({
    placeholderTextColor: '#999',
})`
    flex: 1;
    height: 40px;
    background: #EEE;
    border-radius: 4px;
    padding: 0 15px;
    border: 1px solid #EEE;
`;

export const FilterButton = styled(RectButton)`
    background: #7159c1;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 0 12px;
    height: 40px;
    opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const Repositories = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    margin-top: 20px;
`;

export const Container = styled.View`
    background: #FFF;
    border-radius: 4px;
    padding: 10px 15px;
    margin-bottom: 20px;
    flex-direction: column;
    align-items: center;
`;

export const Starred = styled.View`
    flex-direction: row;
`;

export const OwnerAvatar = styled.Image`
    height: 42px;
    width: 42px;
    border-radius: 21px;
    background: #FFF;
`;

export const Info = styled.View`
    margin-left: 10px;
    flex: 1;
`;

export const Title = styled.Text.attrs({
    numberOfLines: 1,
})`
    font-size: 15px;
    font-weight: bold;
    color: #000;
`;

export const Description = styled.Text.attrs({
    numberOfLines: 2,
})`
    font-size: 13px;
    color: #000;
    margin-top: 2px;
`;

export const Tags = styled.FlatList.attrs({
    showsVerticalScrollIndicator: false,
})`
    flex-direction: row;
    margin-top: 15px;
`;

export const Tag = styled.Text`
    margin-right: 5px;
    background: #7159c1;
    color: #FFF;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 600;
    padding: 2px 13px;
`;

export const EditTagForm = styled.View`
    flex-direction: row;
    border-color: #000;
    padding-bottom: 12px;
    margin-top: 15px;
`;

export const EditTagButton = styled(RectButton)`

    background: #7159c1;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 0 12px;
    height: 40px;
    opacity: ${props => (props.loading ? 0.7 : 1)};
`;

export const AddTagForm = styled.View`
    flex-direction: row;
    border-color: #000;
    padding-bottom: 12px;
    margin-top: 15px;
`;

export const AddTagButton = styled(RectButton)`

    background: #7159c1;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    padding: 0 12px;
    height: 40px;
    opacity: ${props => (props.loading ? 0.7 : 1)};
`;
