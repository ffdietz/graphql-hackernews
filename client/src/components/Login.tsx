import { Button, Container, Flex, Input, Spacer, Text, VStack } from '@chakra-ui/react';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  const navigate = useNavigate;
  const [ formState, setFormState] = useState({
    login: true,
    email:'',
    password:'',
    name:''
  });

  return (
    <VStack h="60vh" w="50vw" justifyContent="space-between">
      <Text fontWeight="bold" fontSize="xx-large">{formState.login ? "Login" : "Sign Up"}</Text>
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
      <VStack bottom="0px">
        <Button onClick={() => console.log("onClick")}>
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
          {formState.login
            ? "need to create an account"
            : "already have an account?"}
        </Button>
      </VStack>
    </VStack>
  );
}

export default Login