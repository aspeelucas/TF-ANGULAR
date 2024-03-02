import { ICON_REGISTRY_PROVIDER } from "@angular/material/icon";
import { ICourse } from "../../courses/models/course.model";
import { IUsers } from "../../users/models/users.interface";

export interface IInscription {
    id: string | number;
    userId: string | number;
    courseId: string | number;
    user?: IUsers;
    course?: ICourse;
}

export interface ICreateInscriptionData{
    userId: string | number;
    courseId: string | number;
    
}