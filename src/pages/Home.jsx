import  { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";

const Home = () => {
  const [data, setData] = useState([]);
  const db = getDatabase();
  useEffect(() => {
    const userRef = ref(db, "users/");
    onValue(userRef, (snapshot) => {
      let array = [];
      snapshot.forEach((item) => {
        array.push(item.val());
        setData(array);
      });
    });
  }, []);
  return (
    <div>
   {data.map((item)=>(
    <h1>User Name: {item.username} and Email: {item.email}</h1>
   ))}
    </div>
  );
};

export default Home;
