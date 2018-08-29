import {Injectable} from '@angular/core'
import { HttpClient,HttpHeaders } from '@angular/common/http';


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
	
	getItemDetailsById(id: number, category: string) : Promise<Rows> {
		const baseUrl = 'https://www.swapi.co/api';
		const targetUrl = `${baseUrl}/${category}/${id}/`;

        return (this.http.get(targetUrl)
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
	
	// getItemImageById(id: number, category: string) : Promise<Images> {
		// const baseUrl = 'https://starwars-visualguide.com/assets/img';
		// const targetUrl = `${baseUrl}/${category}/${id+'.jpg'}`;
		
        // return (this.http.get(targetUrl,{ responseType: 'blob' })
            // .toPromise()
            // .then(data => {
                // let images:Images = {images: []};  
                // for (let key of Object.keys(data)) {
                    // images.images.push({
                        // label: key,
                        // url: data[key]
                    // })
                // }
				// console.log(images);
				// return images;
            // }));
    // }
}

interface Row {
    label: string;
    url: string;
}

// interface Image {
	// label: string;
    // url: string;
// }

// export interface Images {
    // images: Image[];
// }

export interface Rows {
    rows: Row[];
    next?: string;
    previous?: string;
}
