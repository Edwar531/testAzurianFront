import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ClientsService } from 'src/app/services/users/clients.service';
import { ToastrService } from 'ngx-toastr';
import { TableComponent } from 'src/app/components/shared/table/table.component';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
})

export class ClientsComponent {
  constructor(
    private modalService: NgbModal,
    private clienteS: ClientsService,
    private toastrS: ToastrService
  ) {}
  
  @ViewChild('modalAdd') modalAdd!: ElementRef;
  @ViewChild('modalDelete') modalDelete!: ElementRef;
  @ViewChild('modalEnableDisable') modalEnableDisable!: ElementRef;
  @ViewChild(TableComponent) childTable: any;

  filtros = {
    estado: 'Habilitado',
  };

  loading = false;
  table = {
    url: this.clienteS.url,
    columns: [
      { name: 'Acc.', field: 'actions', type: '' },
      { name: 'Razón Social', field: 'razon_social', type: '' },
      { name: 'Tipo I.', field: 'tipo_ident', type: '' },
      { name: 'Identificación', field: 'identificacion', type: '' },
    ],
    actions: [
      {
        nombre: '',
        ico: 'fas fa-edit',
        tooltip: 'Editar',
        class: 'btn-primary',
        function: 'modalEdit',
      },
      {
        nombre: '',
        ico: 'fas fa-ban',
        tooltip: 'Deshabilitar',
        class: 'btn-warning',
        function: 'modalDisable',
      },
      {
        nombre: '',
        ico: 'fas fa-check',
        tooltip: 'Habilitar',
        class: 'btn-success',
        function: 'modalEnable',
      },
      {
        nombre: '',
        ico: 'fas fa-times',
        tooltip: 'Eliminar',
        class: 'btn-danger',
        function: 'modalDelete',
      },
    ],
  };
  edit: any = {};
  enable = false;

  openModal(modalAdd: any, edit: any = false, size: any = 'xl') {
    if (edit) {
      this.edit = edit;
    } else {
      this.edit = {};
    }
    this.modalService.open(modalAdd, { size });
  }

  receivedToChild(e: any) {
    if (e.action == 'closeModal') {
      this.modalService.dismissAll();
    } else if (e.action == 'modalEdit') {
      this.openModal(this.modalAdd, e.value);
    } else if (e.action == 'modalDisable') {
      this.enable = false;
      this.openModal(this.modalEnableDisable, e.value, 'md');
    } else if (e.action == 'modalEnable') {
      this.enable = true;
      this.openModal(this.modalEnableDisable, e.value, 'md');
    } else if (e.action == 'modalDelete') {
      this.openModal(this.modalDelete, e.value, 'md');
    } else if (e.action == 'success') {
      this.success(e);
    } else if (e.action == 'filtrar') {
      this.filtros = e.value;
      this.childTable.getData(e.value,true);
    }
  }

  success(e:any) {
    this.toastrS.success(e.message);
    this.modalService.dismissAll();
    if (e.update) {
      this.childTable.update(e.value);
    } else if(e.delete){  
      this.childTable.delete(e.value);
    } else {
      this.childTable.new(e.value);
    }
  }

}
