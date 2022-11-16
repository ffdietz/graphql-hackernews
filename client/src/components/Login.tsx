import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { gql, useMutation } from '@apollo/client';
import { Button, HStack, Input, Text, VStack } from '@chakra-ui/react';
import { AUTH_TOKEN } from '../helpers/constants';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;


function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    login: true,
    email:'',
    password:'',
    name:''
  });

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      navigate('/');
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate('/');
    },
  });

  return (
    <VStack h="60vh" w="50vw" justifyContent="space-between">
      <Text fontWeight="bold" fontSize="xx-large">
        {formState.login ? "Login" : "Sign Up"}
      </Text>
      <VStack spacing="1rem" w="full">
        {!formState.login && (
          <Input
            value={formState.name}
            onChange={(e) =>
              setFormState({
                ...formState,
                name: e.target.value,
              })
            }
            type="text"
            placeholder="Your name"
          />
        )}
        <Input
          value={formState.email}
          onChange={(e) =>
            setFormState({
              ...formState,
              email: e.target.value,
            })
          }
          type="text"
          placeholder="Your email address"
        />
        <Input
          value={formState.password}
          onChange={(e) =>
            setFormState({
              ...formState,
              password: e.target.value,
            })
          }
          type="password"
          placeholder="Choose a safety password"
        />
      </VStack>
      <HStack>
        <Button onClick={() => formState.login ? login() : signup()}>
          {formState.login ? "login" : "create account"}
        </Button>
        <Button
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login,
            })
          }
        >
          {formState.login ?
            "need to create an account"
            :
            "already have an account?"}
        </Button>
      </HStack>
    </VStack>
  );
}

export default Login

// how to query the user list