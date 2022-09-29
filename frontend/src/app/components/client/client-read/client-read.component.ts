import { ClientService } from './../client.service';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Client } from '../client.model';
import { ClientReadDataSource,} from './client-read-datasource';

@Component({
  selector: 'client-read',
  templateUrl: './client-read.component.html',
  styleUrls: ['./client-read.component.css']
})
export class ClientReadComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Client>;
  dataSource: ClientReadDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  
  displayedColumns = ['id', 'name', 'cpf', 'dataNascimento','endereco','cep'];

  constructor() {
    this.dataSource = new ClientReadDataSource();
  }

  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
