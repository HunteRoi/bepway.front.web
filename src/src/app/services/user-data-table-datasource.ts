import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { User } from '../model/classes/Models';
import { BepwayService } from '../services/bepway.service';


// TODO: replace this with real data from your application
//var companiesToDispay: Array<Company>;

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class UserDataTable extends DataSource<User> {
  data: User[];

  constructor(private paginator: MatPaginator, private sort: MatSort, private myApi : BepwayService) {
    super();
    this.data = new Array();
  }

  addUser(user:User){
    this.data.push(user);
  }
  
  getTotalUsers(){
    let promise = new Promise((resolve, reject)=>{
      this.myApi.getUsers(this.paginator.pageIndex, 100)
        .toPromise()
        .then(res => {
          this.paginator.length = res.length
          for(let user of res) this.data.push(user);
        });
        resolve();
      });
  }

  // getUsers(){
  //   let promise = new Promise((resolve, reject)=>{
  //     this.myApi.getUsers(this.paginator.pageIndex, this.)
  //       .toPromise()
  //       .then(res => this.paginator.length = res.length);
  //       resolve();
  //     });
  // }


  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
    connect(): Observable<User[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.

    
    
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.getTotalUsers();

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]))
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */

  private getPagedData(data: Array<User>) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Array<User>) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'login': return compare(a.login, b.login, isAsc);
        case 'email': return compare(+a.email, +b.email, isAsc);
        case 'roles': return compare(+a.roles, +b.roles, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
