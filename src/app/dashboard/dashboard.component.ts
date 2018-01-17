import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HtmlParser, HtmlAstPath, HtmlTagDefinition, Text } from '@angular/compiler';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  myTemplate: any;

  constructor(
    private heroService: HeroService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.getHeroes();
    this.getIndexPageFromService();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe(
      heroes => {
        this.heroes = heroes.slice(1, 5);
      });
  }

  getIndexPageFromService(): void {
    this.heroService.getIndexPage().subscribe(
      data => {
        this.myTemplate = this.sanitizer.bypassSecurityTrustHtml(data.toString());
      }
    );
  }

}
