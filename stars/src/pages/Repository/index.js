import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
    Container,
    Header,
    Avatar,
    Name,
    Bio,
    Character,
    Starred,
    OwnerAvatar,
    Info,
    Title,
    Author,
} from './styles';
import api from '../../services/api';

export default class Repository extends Component {
    static navigationOptions = ({ navigation }) => ({
        // title: navigation.getParam('user').name,
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
        editTag: [],
        repositories: [],
        errorMessage: null,
        isInEditMode: false,
        editedFormId: '',
        editedTag: '',
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

        console.tron.log(userAvatar)
        console.tron.log(repositories)

        this.setState({
            userAvatar: userAvatar.data.avatar_url,
            repositories: repositories.data.starredRepositories,
            loading: 0,
        })
    }

    handleInputChange = (event, fieldName) => {
        // const { value } = event.target;
        // this.setState({ [fieldName]: value })
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

    handleTagShow = async event => {
        // event.preventDefault();
        // const { token } = this.props.user;
        // const { showTag } = this.state;

        // await api.get(`/tags/${showTag}`, {
        //     headers: {
        //         'Authorization': `Bearer ${token}`
        //     },
        // }).then(response => {
        //     this.setState({
        //         showTag: '',
        //         repositories: response.data,
        //     });
        // }).catch(() => {
        //     this.getRepositories();
        // })
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
        // const { user } = this.props;

        // const repositories = await api.get('/repositories', {
        //     headers: {
        //         'Authorization': `Bearer ${user.token}`
        //     }
        // })

        // this.setState({
        //     repositories: repositories.data.starredRepositories,
        // })
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
            <Container>
                <Header>
                    <Avatar source={{ uri: userAvatar }} />
                    {/* <Name>{user.name}</Name>
                    <Bio>{user.biography}</Bio> */}
                </Header>

                <Character
                    data={repositories}
                    keyExtractor={repository => String(repository.id)}
                    renderItem={({ item: repository }) => (
                        <Starred>
                            <OwnerAvatar source={{ uri: repository.url }} />
                            <Info>
                                <Title>{repository.name}</Title>
                                <Author>{repository.description}</Author>
                            </Info>
                        </Starred>
                    )}
                    />

                {/*
                */}
                {/*


                <Owner>
                    <img src={userAvatar} alt="User avatar" />
                    <h1>{user.name}</h1>
                </Owner>

                <ShowForm onSubmit={this.handleTagShow}>
                    <input
                        type="text"
                        placeholder="Filter by Tag"
                        value={showTag}
                        onChange={(event) => this.handleInputChange(event, 'showTag')}
                    />
                    <SubmitButton>
                       <FaSearch />
                    </SubmitButton>
                </ShowForm>

                {errorMessage && <h3 className="error"> {errorMessage} </h3>}

                <Repositories>
                    {repositories.map(repository => (
                        <li>
                            <img src={repository.owner_avatar} alt={user.name} />

                            <div>
                                <strong>
                                    <a
                                        href={repository.url}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                    >
                                        {repository.name}
                                    </a>
                                </strong>

                                <h5>{repository.description}</h5>

                                {repository.tags.map(tag => (
                                    <span key={String(`${repository.id}-${tag}`)}>
                                        {(isInEditMode && repository.id === editedFormId && tag === editedTag) ?
                                            <form
                                                key={String(`${repository.id}-${tag}`)}
                                                onSubmit={(event) => this.handleTagEdit(event, repository.id, tag)}
                                            >
                                                <input
                                                    key={String(`edit-${repository.id}-${tag}`)}
                                                    type="text"
                                                    placeholder={tag}
                                                    value={editTag[repository.id]}
                                                    onChange={(event) => this.handleInputChange(event, 'editTag')}
                                                />
                                                <button
                                                    key={String(`edit-${repository.id}-${tag}`)}
                                                    type="submit"
                                                >
                                                    <FaCheck />
                                                </button>

                                                <button
                                                    key={String(`editToggle-${repository.id}-${tag}`)}
                                                    type="submit"
                                                    onClick={(event) => this.editModeToggle(event, repository.id, tag)}
                                                >
                                                    <FaTimes />
                                                </button>
                                            </form>
                                            : tag }

                                        <FaPen
                                            onClick={(event) => this.editModeToggle(event, repository.id, tag)}
                                            key={String(`edit-${repository.id}-${tag}`)}
                                        />

                                        <FaTrashAlt
                                            onClick={(event) => this.handleTagDelete(event, repository.id, tag)}
                                            key={String(`delete-${repository.id}-${tag}`)}
                                        />
                                    </span>
                                ))}

                                <AddForm
                                    key={String(`AddForm-${repository.id}`)}
                                    onSubmit={(event) => this.handleTagAdd(event, repository.id)}
                                >
                                    <input
                                        type="text"
                                        placeholder="Add a new Tag"
                                        value={addTag[repository.id]}
                                        onChange={(event) => this.handleInputChange(event, 'addTag')}
                                    />
                                    <SubmitButton key={String(`SubmitButton-${repository.id}`)}>
                                        <FaPlus />
                                    </SubmitButton>

                                    <p>id: {repository.id}</p>
                                </AddForm>
                            </div>
                        </li>
                    ))};
                </Repositories>

                */}

            </Container>
        )
    }
};
