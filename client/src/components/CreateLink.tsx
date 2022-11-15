import { ChangeEvent, FormEvent, useState } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Container, Flex, Input } from "@chakra-ui/react";

interface FormState {
  description: string;
  url: string;
}

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation($description: String!, $url: String!) {
    post(description: $description, url: $url) {
      id
      createdAt
      url
      description
    }
  }
`;

function CreateLink() {
  const [formState, setFormState] = useState<FormState>({
    description: "",
    url: "",
  });

  /* 
  When we use the useMutation hook, we need to destructure out a function that can be used to call the mutation. 
  That’s what createLink is in the code block above. 
  We’re now free to call the function whenever we need to when the component renders.
  */

  const [createLink] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      description: formState.description,
      url: formState.url
    }
  });

  console.log(formState);

  return (
    <Container>
      <form
        onSubmit={(e: FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          createLink();
        }}
      >
        <Flex>
          <Input
            value={formState.description}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormState({
                ...formState,
                description: e.target.value,
              })
            }
            type="text"
            placeholder="A description for the link"
          />
          <Input
            value={formState.url}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFormState({
                ...formState,
                url: e.target.value,
              })
            }
            type="text"
            placeholder="The URL for the link"
          />
          <Button type="submit">Submit</Button>
        </Flex>
      </form>
    </Container>
  );
}

export default CreateLink