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

function App() {
  const { data } = useQuery(
    "users",
    (): Promise<User> =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    }
  );
  console.log(data);

  return (
    <>
      {data?.map((user: User) => {
        return <div key={user.id}>{user.name}</div>;
      })}
    </>
  );
}

export default App;
