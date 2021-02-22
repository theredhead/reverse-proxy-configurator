import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
})
export class LinkComponent {
  @Input() href = 'about:blank';
  get appearsValid(): boolean {
    try {
      const url = new URL(this.href);
      return url.protocol != null && url.host != null;
    } catch (error) {
      return false;
    }
  }
  get disabled(): boolean {
    return !this.appearsValid;
  }
  openInNewWindow(): void {
    window.open(this.href);
  }
}
