import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";
import { IonicModule } from "@ionic/angular";
import { SharedModule } from "src/app/shared/shared.module";
import { PerfilPageRoutingModule } from "./perfil-routing.module";
import { PerfilPage } from "./perfil.page";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedModule,
        PerfilPageRoutingModule
    ],
    declarations: [PerfilPage]
})
export class PerfilPageModule {}