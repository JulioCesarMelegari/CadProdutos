import { ProductService } from './../../product/product.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ClientService } from '../client.service';
import { Client } from '../client.model';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {

  client: Client ={
    name:'',
    cpf: '',
    dataNascimento: '',
    endereco: '',
    cep: ''
  }

  constructor(private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
  }

  createClient():void{
    this.clientService.create(this.client).subscribe(()=>{
      this.clientService.showMessage('cliente criado');
      this.router.navigate(['/clients']);
    });
    
  }

  cancel():void{
    this.router.navigate(['/clients']);
  }

}
