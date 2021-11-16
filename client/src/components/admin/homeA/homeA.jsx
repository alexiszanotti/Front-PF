import React from "react";
import NavBarA from "../navBarA/navBarA"
import { BrowserRouter, Route, Switch } from "react-router-dom";
import UpDataUsers from "../upDateUsers/upDateUsers";
import CreateProduct from "../createProductA/createProductA";
import EstadisticasA from "../estadisticasA/estadisticasA";
export default function Admin() {
    return (
        <div>
            <NavBarA />
            <Switch>
                <Route exact path="/admin">
                    <EstadisticasA />
                </Route>
                <Route exact path="/admin/userUpdata">
                    <UpDataUsers />
                </Route>
                <Route exact path="/admin/createProduct">
                    <CreateProduct />
                </Route>
            </Switch>

        </div>
    )
}