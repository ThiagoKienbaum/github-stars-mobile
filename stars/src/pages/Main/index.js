import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Keyboard } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { Form, FormText, ButtonText, Input, SubmitButton } from './styles';
import api from '../../services/api';

export default class Main extends Component {
    static navigationOptions = {
        title: 'GitHub Stars',
    };

    static propTypes = {
        navigation: PropTypes.shape({
            navigate: PropTypes.func,
        }).isRequired,
    }

    state = {
        signIn: {
            email: '',
            password: '',
        },
        signUp: {
           name: '' ,
           githubId: '',
           email: '',
           password: '',
           confirmPassword: '',
        },
        loading: 0,
        errorMessage: null,
        signUpLogin: false,
        behaviour: 'position',
    }

    signInHandleSubmit = async event => {
        this.setState({ loading: 1 });
        const { dispatch } = this.props;
        const {email, password} = this.state.signIn;
        const { signUpLogin } = this.state;

        if (!signUpLogin) event.preventDefault();

        await api.post('/sessions', {
            email,
            password
        }).then(response => {
            const data = {
                id: response.data.user.id,
                name: response.data.user.name,
                githubId: response.data.user.github_id,
                email: response.data.user.email,
                token: response.data.token,
            }

            this.setState({
                loading: 0,
            });

            dispatch({
                type: 'USER_LOGIN',
                data,
            })

            this.props.history.push('/repository');
        }).catch(response => {
            this.setState({
                errorMessage: response.message,
                loading: 0,
            });
        })

        Keyboard.dismiss();
    }

    signUpHandleSubmit = async event => {
        event.preventDefault();
        this.setState({ loading: 1 });

        const { name, githubId, email, password, confirmPassword } = this.state.signUp;

        await api.post('/users', {
            name,
            github_id: githubId,
            email,
            password,
            confirmPassword
        }).then(() => {
            this.setState({
                loading: 0,
                signUpLogin: true,
                signIn: {
                    email,
                    password,
                }
            });
            this.signInHandleSubmit();
        }).catch(response => {
            this.setState({
                errorMessage: response.message,
                loading: 0,
            });
        })

        Keyboard.dismiss();
    }

    handleNavigate = user => {
        const { navigation } = this.props;

        navigation.navigate('Repository', { user });
    };

    render() {
        const { signIn, signUp, loading, errorMessage, behaviour } = this.state;

        return (
            <KeyboardAwareScrollView
                style={{
                    flex: 1,
                    padding: 15,
                    backgroundColor: '#24292E'
                }}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <Form>
                    <FormText>Sign In</FormText>
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        type="email"
                        placeholder="Email"
                        value={signIn.email}
                        onChangeText={text => this.setState({ signIn: { email: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signInHandleSubmit}
                    />
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        type="password"
                        placeholder="Password"
                        value={signIn.password}
                        onChangeText={text => this.setState({ signIn: { password: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signInHandleSubmit}
                    />
                    <SubmitButton loading={loading} onPress={this.signInHandleSubmit}>
                        { loading ? (
                            <ActivityIndicator color="FFF" />
                        ) : (
                            <ButtonText>Sign in</ButtonText>)
                        }
                    </SubmitButton>
                </Form>

                <Form>
                    <FormText>Sign Up</FormText>
                    <Input
                        autoCorrect={false}
                        placeholder="Name"
                        value={signUp.name}
                        onChangeText={text => this.setState({ signUp: { name: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signUpHandleSubmit}
                    />
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="GitHub ID"
                        value={signUp.githubId}
                        onChangeText={text => this.setState({ signUp: { githubId: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signUpHandleSubmit}
                    />
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        type="email"
                        placeholder="Email"
                        value={signUp.email}
                        onChangeText={text => this.setState({ signUp: { email: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signUpHandleSubmit}
                    />
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        type="password"
                        placeholder="Password"
                        value={signUp.password}
                        onChangeText={text => this.setState({ signUp: { password: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signUpHandleSubmit}
                    />
                     <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        type="password"
                        placeholder="Confirm Password"
                        value={signUp.confirmPassword}
                        onChangeText={text => this.setState({ signUp: { confirmPassword: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signUpHandleSubmit}
                    />
                    <SubmitButton loading={loading} onPress={this.signUpHandleSubmit}>
                        { loading ? (
                            <ActivityIndicator color="FFF" />
                        ) : (
                            <ButtonText>Sign up for Github Stars</ButtonText>)
                        }
                    </SubmitButton>
                </Form>
            </KeyboardAwareScrollView>
        );
    }
};
