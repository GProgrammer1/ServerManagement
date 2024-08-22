import { HttpClient } from "@angular/common/http";
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ResponseBody, Server } from "../model/models.model";
import { catchError, map, Observable, of } from "rxjs";

export function IPAddressExists (http : HttpClient) : AsyncValidatorFn {
    return (control : AbstractControl) : Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
        const ip = control.value ;
        const apiURL = "http://localhost:8080/server/list"
        return http.get<ResponseBody<{servers: Server[]}>>(apiURL).pipe(
            map( //map the value inside the observable to a validation error or null
                (response : ResponseBody<{servers: Server[]}>) => {
                    const serverList : Server[] = response.data.servers;
                    for (let i = 0; i < serverList.length ; i++) {
                        const ipAddress = serverList[i].ipAddress ;
                        if (ipAddress === ip) return {ipExists : true} ;
                    }
                    return null ;
            }), //if an error happens with the response
            catchError (
                () => {
                return of(null) ;
            }
            )
        );
    }
}