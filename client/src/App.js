import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Register from "./pages/Register";
import Header from "./components/Header";
import MenuBar from "./components/MenuBar";
import { useState } from "react";
import Backdrop from "./components/Backdrop";
import CreateProduct from "./pages/CreateProduct";
import EditProduct from "./pages/EditProduct";

import SingleEdit from "./components/SingleEdit";

function App() {
  const [sideToggle, setSideToggle] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/edit/:id">
          <Backdrop
            show={sideToggle}
            click={() => setSideToggle(!sideToggle)}
          />
          <MenuBar show={sideToggle} click={() => setSideToggle(!sideToggle)} />
          <Header showMenuBar={() => setSideToggle(!sideToggle)} />
          <SingleEdit />
        </Route>
        <Route path="/edit">
          <Backdrop
            show={sideToggle}
            click={() => setSideToggle(!sideToggle)}
          />
          <MenuBar show={sideToggle} click={() => setSideToggle(!sideToggle)} />
          <Header showMenuBar={() => setSideToggle(!sideToggle)} />
          <EditProduct />
        </Route>
        <Route path="/create">
          <Backdrop
            show={sideToggle}
            click={() => setSideToggle(!sideToggle)}
          />
          <MenuBar show={sideToggle} click={() => setSideToggle(!sideToggle)} />
          <Header showMenuBar={() => setSideToggle(!sideToggle)} />
          <CreateProduct />
        </Route>
        <Route path="/">
          <Backdrop
            show={sideToggle}
            click={() => setSideToggle(!sideToggle)}
          />
          <MenuBar show={sideToggle} click={() => setSideToggle(!sideToggle)} />
          <Header showMenuBar={() => setSideToggle(!sideToggle)} />
          <Homepage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
