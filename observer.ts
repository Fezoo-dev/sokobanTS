interface IObservable<T>{
    subscribe(observer: IObserver<T>): void;
    unsubscribe(observer: IObserver<T>): void;
}

interface IObserver<T>{
    notify(observable: T): void;
}