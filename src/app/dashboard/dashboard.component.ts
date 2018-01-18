import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HtmlParser, HtmlAstPath, HtmlTagDefinition, Text } from '@angular/compiler';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie-service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})

export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  myTemplate: any;
  cookieValue = 'UNKNOWN';
  user_ID = 'UNKNOWN';
  errorMessage = 'UNKNOWN'

  constructor(
    private heroService: HeroService,
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    private cookieService: CookieService,
    private message: MessageService
  ) { }

  ngOnInit()  {
    this.getHeroes();
    this.getIndexPageFromService();
    this.cookieValue = this.cookieService.get('userToken');
    this.user_ID = this.cookieService.get('user_ID');
    this.errorMessage = this.cookieService.get('errorMessage');
    console.log(this.cookieValue);
    console.log(this.user_ID);
    this.message.add(this.errorMessage);

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
        //console.log(data);
        this.myTemplate = this.sanitizer.bypassSecurityTrustHtml(data.toString());
      }
    );
  }

}
