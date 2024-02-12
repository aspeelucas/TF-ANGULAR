import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { NotFoundComponent } from "./not-found.component";

const routesNotFound = [
    {
        path: '',
        component: NotFoundComponent
    }
]



@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(routesNotFound)],
    exports: [RouterModule]
    })
export class NotFoundRoutingModule {}