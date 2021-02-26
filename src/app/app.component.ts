import {Component, OnInit} from '@angular/core';
import {Apollo, gql} from 'apollo-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  rates: any = [];
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.apollo
      .watchQuery({
        query: gql`
        {
          books(limit:10){
            id
            title
            coverPage{
              url
            }
          }
        }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.rates = result?.data?.books;
        this.loading = result.loading;
        this.error = result.error;
      });
  }
}
