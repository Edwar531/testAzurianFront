import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-disable-enable',
  templateUrl: './modal-disable-enable.component.html',
  styleUrls: ['./modal-disable-enable.component.css'],
})
export class ModalDisableEnableComponent {
  constructor(private http: HttpClient) {}
  @Input() enable = true;
  @Input() url = '';
  @Input() edit_id = '';
  @Output()
  sendToF = new EventEmitter<any>();
  loading = false;

  sendToFather(action: string, value: any = false) {
    this.sendToF.emit({ action: action, value: value });
  }

  disable() {
    let action = this.enable ? 'habilitar' : 'deshabilitar';
    this.loading = true;
    this.http.post(`${this.url}/${action}/${this.edit_id}`, {}).subscribe(
      (response: any) => {
        this.sendToF.emit({
          action: 'success',
          value: response.cliente,
          message: response.message,

          delete: true,
        });
        this.loading = false;
      },
      (error) => {
        this.loading = false;
      }
    );
  }
}
