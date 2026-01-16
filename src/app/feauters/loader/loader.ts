import { Component, output } from '@angular/core';
import { Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: false,
  templateUrl: './loader.html',
  styleUrl: './loader.css',
})
export class Loader {

  @Input () isLoading: boolean = false;

  @Output() cancelRequest = new EventEmitter<void>();

  onCancel(){
    this.cancelRequest.emit();
  }
}
