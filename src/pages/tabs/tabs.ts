import { Component } from '@angular/core';

import { BooksPage } from '../books/books';
import { PublishPage } from '../publish/publish';
import { HomePage } from '../home/home';
import {TopicsPage} from "../topics/topics";
import {PersonCenterPage} from "../person-center/person-center";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = BooksPage;
  tab3Root = PublishPage;
  tab4Root = TopicsPage;
  tab5Root = PersonCenterPage;

  constructor() {

  }
}
