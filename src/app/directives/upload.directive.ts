import { Directive, Output, EventEmitter, HostBinding, HostListener, HostBindingDecorator } from '@angular/core';
@Directive({
  selector: '[appUpload]'
})
export class UploadDirective {
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onFileDropped = new EventEmitter<any>();
  // tslint:disable-next-line:no-output-on-prefix
  @Output() onChnageFile = new EventEmitter<any>();
  @HostBinding('style.background-color') public background = '#fff';
  @HostBinding('style.opacity') public opacity = '1';

  // Dragover, l'utilisateur glisse quelque chose sur notre élément  Host element
  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  @HostListener('dragover', ['$event']) onDragOver(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#9ecbec';
    this.opacity = '0.8';
  }
// Dragleave, l'utilisateur glisse quelque chose hors de notre élément Host
  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  @HostListener('dragleave', ['$event']) public onDragLeave(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#fff';
    this.opacity = '1';
  }
  // @ts-ignore
  // tslint:disable-next-line:typedef
  @HostListener('drop', ['$event']) public ondrop(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      this.onFileDropped.emit(files);
    }
  }

  // tslint:disable-next-line:typedef
  // @ts-ignore
  // tslint:disable-next-line:typedef
  @HostListener('change', ['$event']) public onchange(evt) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#f5fcff';
    this.opacity = '1';
    const files = (evt.target.files as File);
    this.onChnageFile.emit(files);
  }
  constructor() { }
}
