import React from 'react';
import Routes from './routes';
import gql from 'graphql-tag';

const GET_ME = gql`
  query GetMe {
    getMe {
      user {
        id
        portfolio {
          id
        }
      }
      loggedIn
    }
}
`;

export default function App () {
  // const client = useApolloClient();
  // const { data, loading, error } = useQuery(GET_ME);

  // console.log(data, loading, error)
  // if(!data) {
  //   client.writeData({ data: { isLoggedIn: false }});
  //   localStorage.clear();
  // }
  return (
    <Routes />
  );
}

