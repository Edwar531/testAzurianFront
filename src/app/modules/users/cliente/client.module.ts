import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ClientRoutingModule } from './client-routing.module';

import { AddClienteComponent } from './components/add-cliente/add-cliente.component';
import { ClientsComponent } from './components/clients.component';
import { FiltrosClientesComponent } from './components/filtros-clientes/filtros-clientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalDeleteComponent } from 'src/app/components/shared/modals/modal-delete/modal-delete.component';
import { ModalDisableEnableComponent } from 'src/app/components/shared/modals/modal-disable-enable/modal-disable-enable.component';
import { TableComponent } from 'src/app/components/shared/table/table.component';

@NgModule({
  declarations: [
    ClientsComponent,
    TableComponent,
    AddClienteComponent,
    FiltrosClientesComponent,
    ModalDisableEnableComponent,
    ModalDeleteComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    ClientRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
})
export class ClientModule {}
