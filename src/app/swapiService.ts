import {Injectable} from '@angular/core'
import { HttpClient } from '@angular/common/http';

@Injectable()
export class swapiService {
    constructor(private http: HttpClient) {}

    getCategories() : Promise<Rows> {
        return (this.http.get('https://www.swapi.co/api/')
            .toPromise()
            .then(data => {
                let rows:Rows = {rows: []};  
                for (let key of Object.keys(data)) {
                    rows.rows.push({
                        label: key,
                        url: data[key]
                    })
                }
                return rows;
            }));
    }
}

interface Row {
    label: string;
    url: string;
}

export interface Rows {
    rows: Row[];
    next?: string;
    previous?: string;
}
