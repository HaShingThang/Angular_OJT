import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, DoCheck, ElementRef, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChange, SimpleChanges, ViewChild } from '@angular/core';

@Component({
    selector: 'app-child',
    templateUrl: './child.component.html',
    styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked, OnDestroy {
   
    @Input() userName = ''
    @ViewChild('wrapper') wrapper!: ElementRef;
    @ContentChild('contentWrapper') content!: ElementRef;
   

    constructor() {
    }
    @HostListener(`window:beforeunload`)
    ngOnDestroy() {
        console.log('Child component is destroyed!');
    }
    ngOnInit() {
        console.log('ngOnInit from the child component');
    }
    ngAfterContentInit() {
        console.log('ngAfterContentInit - wrapper', this.wrapper);
        console.log('ngAfterContentInit - contentWrapper', this.content);
    }
    ngDoCheck(): void {
        console.log('ngDoCheck triggered');
    }

    ngOnChanges(changes: SimpleChanges) {
        if (!changes['userName'].firstChange) {
            if (changes['userName'].currentValue === "Joseph") {
                this.userName = "Real " + this.userName
            } else {
                this.userName = changes['userName'].previousValue
            }
        }
    }
    ngAfterViewInit(): void {
        console.log('ngAfterViewInit - wrapper', this.wrapper);
    }
    ngAfterViewChecked(): void {
        console.log('ngAfterViewChecked triggered');
    }
    ngAfterContentChecked(): void {
        console.log('ngAfterContentChecked triggered');
    }
}
