import { NgModule, Component, enableProdMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { DxDataGridModule } from 'devextreme-angular';
import CustomStore from 'devextreme/data/custom_store';
import 'rxjs/add/operator/toPromise';


@Component({
    styleUrls: ['./app.component.css'],
    selector: 'demo-app',
    templateUrl: './app.component.html'
})
export class AppComponent {
    dataSource: any = {};

    constructor(http: HttpClient) {
        this.dataSource.store = new CustomStore({
            load: function (loadOptions: any) {
                var params = '?';

                params += 'skip=' + loadOptions.skip || 0;
                params += '&take=' + loadOptions.take || 12;

                if(loadOptions.sort) {
                    params += '&orderby=' + loadOptions.sort[0].selector;
                    if(loadOptions.sort[0].desc) {
                        params += ' desc';
                    }
                }
                return http.get('https://js.devexpress.com/Demos/WidgetsGallery/data/orderItems' + params)
                    .toPromise()
                    .then((data: any) => {
                        return {
                            data: data.items,
                            totalCount: data.totalCount
                        }
                    })
                    .catch(error => { throw 'Data Loading Error' });
            }
        });
    }
}

@NgModule({
    imports: [
        BrowserModule,
        DxDataGridModule,
        HttpClientModule
    ],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }

platformBrowserDynamic().bootstrapModule(AppModule);