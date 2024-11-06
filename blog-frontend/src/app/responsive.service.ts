import { computed, inject, Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private readonly small= '(max-width:600px)';
  private readonly medium= '(min-width:601px) and(max-width:1000px)';
  private readonly large= '(min-width:1001px)';
  

  breakpointObserver = inject(BreakpointObserver);
  sreenWidth= toSignal(this.breakpointObserver.observe([this.small,this.medium, this.large]));

  smallWidth = computed(()=> this.sreenWidth()?.breakpoints[this.small]);
  mediumWidth = computed(()=> this.sreenWidth()?.breakpoints[this.medium]);
  largeWidth = computed(()=> this.sreenWidth()?.breakpoints[this.large]);
}
