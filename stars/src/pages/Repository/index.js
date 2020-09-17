import React, { Component } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    Header,
    Avatar,
    Name,
    Form,
    Input,
    FilterButton,
    Container,
    Repositories,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Description,
    Tags,
    Tag,
    EditTagForm,
    EditTagButton,
    AddTagForm,
    AddTagButton,
} from './styles';
import api from '../../services/api';

export default class Repository extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Repositories',
    });

    static propTypes = {
        navigation: PropTypes.shape({
            getParam: PropTypes.func,
        }).isRequired,
    }

    state = {
        userAvatar: '',
        loading: 1,
        addTag: [],
        showTag: '',
        editTag: '',
        repositories: [],
        errorMessage: null,
        isInEditMode: false,
        editedFormId: '',
        editedTag: '',
        token: '',
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const user = navigation.getParam('user');

        const [userAvatar, repositories] = await Promise.all([
            axios.get(`https://api.github.com/users/${user.githubId}`),
            api.get('/repositories', { headers: {
                'Authorization': `Bearer ${user.token}`
            }}),
        ]);

        this.setState({
            userAvatar: userAvatar.data.avatar_url,
            repositories: repositories.data.starredRepositories,
            loading: 0,
            token: user.token,
        })
    }

    handleTagAdd = async (event, id) => {
        // event.preventDefault();
        // const { token } = this.props.user;
        // const { addTag } = this.state;

        // await api.post(`/tags/${id}`, { newTag: addTag }, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     },
        // }).then(() => {
        //     this.setState({
        //         addTag: [],
        //     });
        //     this.getRepositories()
        // }).catch(response => {
        //     this.setState({
        //         errorMessage: response.message
        //     });
        // })
    }

    handleTagShow = async () => {
        const { showTag, token } = this.state;

        await api.get(`/tags/${showTag}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        }).then(res => {
            this.setState({
                showTag: '',
                repositories: res.data,
            });
        }).catch(() => {
            this.getRepositories();
        })
    }

    handleTagEdit = async (event, id, tag) => {
        // event.preventDefault();
        // const { token } = this.props.user;
        // const { editTag } = this.state;

        // await api.put(`/tags/${id}/${tag}`, { updatedTag: editTag }, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     },
        // }).then(() => {
        //     this.setState({ isInEditMode: false })
        //     this.getRepositories()
        // }).catch(response => {
        //     this.setState({
        //         errorMessage: response.message
        //     });
        // })
    }

    handleTagDelete = async (event, id, tag) => {
        // const { token } = this.props.user;

        // await api.delete(`/tags/${id}/${tag}`, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     },
        // }).then(() => {
        //     this.getRepositories()
        // }).catch(response => {
        //     this.setState({
        //         errorMessage: response.message
        //     });
        // })
    }

    getRepositories = async () => {
        const { token } = this.state;

        await api.get('/repositories', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(res => {
            this.setState({
                repositories: res.data.starredRepositories,
            })
        })
    }

    editModeToggle = (event, id, tag) => {
        // this.setState({
        //     isInEditMode: !this.state.isInEditMode,
        //     editedFormId: id,
        //     editedTag: tag,
        // });
    }

    render() {
        const { navigation } = this.props;
        const {
            userAvatar,
            repositories,
            loading,
            addTag,
            showTag,
            editTag,
            errorMessage,
            isInEditMode,
            editedFormId,
            editedTag
         } = this.state;
        const user = navigation.getParam('user');

        return (
            <KeyboardAwareScrollView
                style={{
                    flex: 1,
                    padding: 15,
                    backgroundColor: '#24292E'
                }}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <Header>
                    <Avatar source={{ uri: userAvatar }} />
                    <Name>{user.name}</Name>
                </Header>

                <Form>
                    <Input
                        placeholder="Filter by Tag"
                        value={showTag}
                        onChangeText={text => this.setState({ showTag: text })}
                        returnKeyType="send"
                        onSubmitEditing={this.handleTagShow}
                    />
                    <FilterButton onPress={this.handleTagShow}>
                        <Icon
                            name="filter-alt"
                            size={20}
                            color="#FFF"
                        />
                    </FilterButton>
                </Form>

                <Repositories
                    data={repositories}
                    keyExtractor={repository => String(repository.id)}
                    renderItem={({ item: repository }) => (
                        <Container>
                            <Starred>
                                <OwnerAvatar source={{ uri: repository.owner_avatar }} />
                                <Info>
                                    <Title>{repository.name}</Title>
                                    <Description>{repository.description}</Description>
                                </Info>
                            </Starred>

                            <Tags
                                data={repository.tags}
                                keyExtractor={tag => String(`${tag}-${repository.id}`)}
                                renderItem={({ item: tag }) => (
                                    <Tag>
                                        {tag}
                                        <Icon
                                            name="edit"
                                            size={10}
                                            color="#FFF"
                                        />
                                        <Icon
                                            name="delete"
                                            size={10}
                                            color="#FFF"
                                        />
                                    </Tag>
                                )}
                            />

                            <AddTagForm>
                                <Input
                                    placeholder="Add a new Tag"
                                    value={addTag}
                                    onChangeText={text => this.setState({ addTag: text })}
                                    returnKeyType="send"
                                    onSubmitEditing={this.handleTagAdd(repository.id)}
                                />
                                <AddTagButton onPress={this.handleTagAdd(repository.id)}>
                                    <Icon
                                        name="add"
                                        size={20}
                                        color="#FFF"
                                    />
                                </AddTagButton>
                            </AddTagForm>
                        </Container>
                    )}
                />
            </KeyboardAwareScrollView>
        )
    }
};
