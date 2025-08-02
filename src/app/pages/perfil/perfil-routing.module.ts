import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PerfilPage } from "./perfil.page";

const routes: Routes = [
    {
        path: '',
        component: PerfilPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class PerfilPageRoutingModule {}