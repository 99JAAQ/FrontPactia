import { HttpClient, HttpContext } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environments";
import { Alerts } from "../shared/Alerts/Errors";
import { Person } from "../shared/models/person/person";

@Injectable({
  providedIn: 'root'
})
export class PersonServices {
  url: string;
  tenantId: string | null = null;
  userProfileId: string | null = null;
  constructor(private http: HttpClient) {
    this.url = environment.url;
  }

  GetAll() {
    return new Promise<Person[]>((resolve, reject) => {
      this.http.get<Person[]>(`${environment.url}Person/GetAll`,
        {
        }
      ).subscribe({
        next: (data: any) => {
          resolve(data?.data);
        },
        error: (ex: any) => {
          var result = Alerts.GetErrors(ex);
          reject(result);
        }
      });
    });
  }

  GetById(id: string) {
    return new Promise<Person>((resolve, reject) => {
      this.http.get<Person>(`${environment.url}Person/${id}`,
        {
        }
      ).subscribe({
        next: (data: any) => {
          resolve(data?.data);
        },
        error: (ex: any) => {
          var result = Alerts.GetErrors(ex);
          reject(result);
        }
      });
    });
  }

  AddPerson(user: Person): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.post<void>(`${environment.url}Person/add`, user, {
      }).subscribe({
        next: () => {
          resolve(true);
        },
        error: (ex: any) => {
          const result = Alerts.GetErrors(ex);
          reject(result);
        }
      });
    });
  }

  UpdatePerson(user: Person): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.http.put<void>(`${environment.url}Person/update`, user, {
      }).subscribe({
        next: () => {
          resolve(true);
        },
        error: (ex: any) => {
          const result = Alerts.GetErrors(ex);
          reject(result);
        }
      });
    });
  }

  deletePerson(id: string | null = null): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.http.put<void>(`${environment.url}Person/delete/${id}`, {
      }).subscribe({
        next: () => {
          resolve();
        },
        error: (ex: any) => {
          const result = Alerts.GetErrors(ex);
          reject(result);
        }
      });
    });
  }

}