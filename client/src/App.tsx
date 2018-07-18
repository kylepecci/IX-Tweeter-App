import * as React from "react"
import { hot } from "react-hot-loader"
import { Switch, Route } from "react-router-dom"
import HomePage from "./components/home-page/home-page"
import ProfilePage from "./components/profile-page/profiles-page"
import LoginPage from "./components/Authenticate/login"
import SignUp from "./components/Authenticate/signup"
import MyProfile from "./components/myProfile/myProfile"
import Settings from "./components/settings/settings"

import "./App.css"

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <Switch>
          <Route exact={true} path="/" component={HomePage} />
          <Route exact={true} path="/login" component={LoginPage} />
          <Route exact={true} path="/settings" component={Settings} />
          <Route exact={true} path="/myprofile" component={MyProfile} />
          <Route exact={true} path="/signup" component={SignUp} />
          <Route exact={true} path="/:username" component={ProfilePage} />
        </Switch>
      </div>
    )
  }
}

export default hot(module)(App)
