function MyButton() {
  return <button>my Custom component button</button>;
}

const myName = "shehzad";
const obj = { name: "ahmed", age: 34 };
const stylingObj = { color: "blue", fontSize: "30px" };

function App() {
  return (
    <div className="App">
      <p style={{ color: "blue" }}>myName</p>
      <p style={stylingObj}>{myName}</p>
      <p>[myName]</p>
      <p>(myName)</p>

      {/* <p>{obj}</p> error because object are not valid react child */}
      <p>{obj.name}</p>
      <p>{JSON.stringify(obj)}</p>

      <MyButton />
    </div>
  );
}

// function App() {
//   const isLoggedIn = true;

//   return <div>{isLoggedIn ? <p>Admin Panel</p> : <p>Login Form</p>}</div>;
// }

export default App;
