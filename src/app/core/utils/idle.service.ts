import { Injectable, HostListener } from '@angular/core';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { Router, NavigationEnd } from '@angular/router';

@Injectable()
export class IdleService {
  lastActive: Date;

  constructor(private router: Router) {
    this.initLastActive();
    this.listenToRouteEvents();
  }

  initLastActive() {
    const last = localStorage.getItem('last_active');
    this.lastActive = new Date(parseInt(last, 10));
  }

  isIdle() {
    const lastActive = this.lastActive.getTime();
    const now = new Date().getTime();
    const diff = now - lastActive;
    const diffMinutes = Math.round(diff / 60000);

    return diffMinutes >= 15;
  }

  listenToRouteEvents() {
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.iamActive();
      }
    });
  }

  iamActive() {
    setTimeout(() => {
      this.lastActive = new Date();
      localStorage.setItem('last_active', this.lastActive.getTime().toString());
    }, 5000);
  }
}
