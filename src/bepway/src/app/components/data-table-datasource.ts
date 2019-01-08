import { DataSource } from '@angular/cdk/collections';
import { MatPaginator, MatSort } from '@angular/material';
import { Observable, of as observableOf } from 'rxjs';
import { Company, Zoning } from '../models/classes/Models';
import { CompanyService } from '../services/company.service';


// TODO: replace this with real data from your application
//var companiesToDispay: Array<Company>;

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<Company> {
  data: Array<Company>;
  dataTest: Array<Company>;
  NO_ZONING_SPECIFIED = -1;
  zoning:Zoning;

  constructor(private paginator: MatPaginator, private sort: MatSort, private myApi : CompanyService, zoning:Zoning) {
    super();
    this.data = new Array();
    this.zoning = zoning;
    //this.fillData();
  }



  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Array<Company>> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    
   
    //return this.myApi.getAllCompanies(this.paginator.pageIndex, this.paginator.pageSize);
      

    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    // Set the paginator's length
    this.paginator.length = (this.zoning != null) ? Math.trunc(this.zoning.nbImplantations / this.paginator.pageSize) + 1 : 100;

    return this.getPagedData();

    // return merge(...dataMutations).pipe(map(() => {
    //   return this.getPagedData(this.getSortedData(this.data));
    // }));

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

  /*private getPagedData(){
    this.data.length = 0;
    let companies = new Array();
    if(this.zoningId == this.NO_ZONING_SPECIFIED){
      this.myApi.getAllCompanies(this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(result => {
        for(let company of result){
          companies.push(company);
          //this.addCompany(company);
        }
      });
    }
    else{
      this.myApi.getAllCompaniesByZoning(this.zoningId, this.paginator.pageIndex, this.paginator.pageSize)
      .subscribe(result => {
        for(let company of result){
          companies.push(company);
          //this.addCompany(company);
        }
      });
    }
    this.setCompanies(companies);
    console.log(companies);
    return companies;
  }*/

  private getPagedData(/*data: Array<Company>*/) {
    console.log(this.paginator.pageSize);
    if(this.zoning == null) {
      return this.myApi.get(this.paginator.pageIndex, this.paginator.pageSize);
    } else {
      return this.myApi.get(this.paginator.pageIndex, this.paginator.pageSize, this.zoning.id);
    }
    // const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    // return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Array<Company>) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'address': return compare(+a.address, +b.address, isAsc);
        case 'sector': return compare(+a.activitySector.name, +b.activitySector.name, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
