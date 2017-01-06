import { Subscription } from 'rxjs';


export class Disposer {
  private subs: Subscription[] = []


  set disposable(sub: Subscription) {
    this.subs.push(sub)
  }


  disposeSubscription(): void {
    this.subs.forEach(sub => sub.unsubscribe())
  }

}
