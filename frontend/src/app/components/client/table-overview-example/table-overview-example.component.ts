import {Component, ViewChild,OnInit,AfterViewInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { map, merge, Observable } from 'rxjs';
import { Client } from '../client.model';
import { ClientService } from '../client.service';

@Component({
  selector: 'table-overview-example',
  styleUrls: ['table-overview-example.component.css'],
  templateUrl: 'table-overview-example.component.html',
})
export class TableOverviewExampleComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'name', 'dataNascimento', 'cpf', 'endereco', 'cep','acoes'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  clients1: Client[];

  constructor(private clientService: ClientService) {
  }

  ngAfterViewInit(): void {
    this.clientService.read().subscribe(clients=>{
      this.clients1= clients;
      console.log(clients)
      this.dataSource = new MatTableDataSource(this.clients1);
    })
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  connect(): Observable<Client[]> {

    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.dataSource), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.clients1 ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Client[]): Client[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Client[]): Client[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


function observableOf(dataSource: MatTableDataSource<Client>): import("rxjs").ObservableInput<unknown> {
  throw new Error('Function not implemented.');
}
