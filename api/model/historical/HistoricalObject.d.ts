import {HistoricalElement} from "./HistoricalElement";
import {HistoricalContainerElement} from "./HistoricalContainerElement";
import {ObservableObject} from "../observable/ObservableObject";

export declare class HistoricalObject extends HistoricalElement<Map<string, any>>
  implements HistoricalContainerElement<Map<string, any>>, ObservableObject {

  public get(key: string): HistoricalElement<any>;

  public keys(): string[];

  public hasKey(key: string): boolean;

  public forEach(callback: (model: HistoricalElement<any>, key?: string) => void): void;

  public elementAt(pathArgs: any): HistoricalElement<any>;
}
