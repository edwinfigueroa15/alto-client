import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild, signal } from '@angular/core';
import Modules from 'app/shared/modules';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [Modules],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent  implements OnInit {
  @Output() close = new EventEmitter<boolean>();

  @ViewChild('header', { static: false }) header!: ElementRef<HTMLElement>;
  @ViewChild('content', { static: false }) content!: ElementRef<HTMLElement>;
  @ViewChild('footer', { static: false }) footer!: ElementRef<HTMLElement>;

  headerExist = signal<boolean>(true);
  contentExist = signal<boolean>(true);
  footerExist = signal<boolean>(true);
  
  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    if(!this.header.nativeElement.childNodes.length) {
      this.headerExist.set(false);
    }

    if(!this.content.nativeElement.childNodes.length) {
      this.contentExist.set(false);
    }

    if(!this.footer.nativeElement.childNodes.length) {
      this.footerExist.set(false);
    }
  }

  closeModal() {
    this.close.emit(true);
  }

}
