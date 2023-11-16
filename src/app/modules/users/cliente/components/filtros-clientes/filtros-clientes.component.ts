import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filtros-clientes',
  templateUrl: './filtros-clientes.component.html',
  styleUrls: ['./filtros-clientes.component.css'],
})
export class FiltrosClientesComponent {
  @Input() filtros: any = {};
  @Input() filtrosDefault: any;
  @Output()
  sendToF = new EventEmitter<any>();

  ngOnInit() {
    this.filtrosDefault = Object.assign({}, this.filtros);
  }

  restoreFiltros() {
    this.filtros = this.filtrosDefault;
    this.filtrar();
  }
  
  filtrar() {
    this.sendToF.emit({
      action: 'filtrar',
      value: { estado: this.filtros.estado, busqueda: this.filtros.busqueda },
    });
  }
}
