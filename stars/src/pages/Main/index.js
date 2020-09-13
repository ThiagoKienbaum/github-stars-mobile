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
    }

    signInHandleSubmit = async () => {
        this.setState({ loading: 1 });
        const {email, password} = this.state.signIn;

        await api.post('/sessions', {
            email,
            password
        }).then(res => {
            const user = {
                id: res.data.user.id,
                name: res.data.user.name,
                githubId: res.data.user.github_id,
                email: res.data.user.email,
                token: res.data.token,
            }

            this.setState({ loading: 0 });

            Keyboard.dismiss();

            this.handleNavigate(user);
        })
    }

    signUpHandleSubmit = async () => {
        this.setState({ loading: 1 });
        const { name, githubId, email, password, confirmPassword } = this.state.signUp;

        await api.post('/users', {
            name,
            github_id: githubId,
            email,
            password,
            confirmPassword
        }).then(res => {
            this.setState({
                signIn: {
                    email,
                    password,
                },
                loading: 0
            });

            this.signInHandleSubmit();
        })
    }

    handleNavigate = (user) => {
        const { navigate } = this.props.navigation;

        navigate('Repository', { user: user });
    };

    render() {
        const { signIn, signUp, loading } = this.state;

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
                        autoCompleteType="email"
                        placeholder="Email"
                        value={signIn.email}
                        onChangeText={text => this.setState({ signIn: { ...this.state.signIn, email: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signInHandleSubmit}
                    />
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Password"
                        value={signIn.password}
                        onChangeText={text => this.setState({ signIn: { ...this.state.signIn, password: text } })}
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
                        onChangeText={text => this.setState({ signUp: { ...this.state.signUp, name: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signUpHandleSubmit}
                    />
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        placeholder="GitHub ID"
                        value={signUp.githubId}
                        onChangeText={text => this.setState({ signUp: { ...this.state.signUp, githubId: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signUpHandleSubmit}
                    />
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        autoCompleteType="email"
                        placeholder="Email"
                        value={signUp.email}
                        onChangeText={text => this.setState({ signUp: { ...this.state.signUp, email: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signUpHandleSubmit}
                    />
                    <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Password"
                        value={signUp.password}
                        onChangeText={text => this.setState({ signUp: { ...this.state.signUp, password: text } })}
                        returnKeyType="send"
                        onSubmitEditing={this.signUpHandleSubmit}
                    />
                     <Input
                        autoCorrect={false}
                        autoCapitalize="none"
                        secureTextEntry={true}
                        placeholder="Confirm Password"
                        value={signUp.confirmPassword}
                        onChangeText={text => this.setState({ signUp: { ...this.state.signUp, confirmPassword: text } })}
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
