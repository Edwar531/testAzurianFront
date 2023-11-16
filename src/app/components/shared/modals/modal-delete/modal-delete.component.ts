import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-delete',
  templateUrl: './modal-delete.component.html',
  styleUrls: ['./modal-delete.component.css'],
})
export class ModalDeleteComponent {
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

  delete() {
    this.loading = true;
    this.http.delete(`${this.url}/${this.edit_id}`, {}).subscribe(
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
