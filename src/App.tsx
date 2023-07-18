import "./App.css";
import { useQuery } from "react-query";

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};

type UserKeys = (keyof Pick<User, "id" | "name" | "username" | "email">)[];

const headers: UserKeys = ["id", "name", "username", "email"];

function App() {
  const { data, isLoading, isError } = useQuery(
    "users",
    (): Promise<User[]> =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading || isError || !data) return <span>Loading...</span>;

  return (
    <table>
      <thead>
        <tr>
          {headers.map((header) => {
            return <th key={header}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((user) => {
          return (
            <tr key={user.id}>
              {headers.map((header) => {
                return <td key={header}>{user[header]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default App;
