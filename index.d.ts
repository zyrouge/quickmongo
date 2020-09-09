import * as Mongoose from "mongoose";
import { EventEmitter } from "events";

export class Base extends EventEmitter {
    public dbURL: string | null;
    public options: Mongoose.ConnectionOptions;
    public readyAt: Date | undefined;

    constructor(mongodbURL: string, connectionOptions?: Mongoose.ConnectionOptions);

    private _create(url: string): Promise<void>;
    private _destroyDatabase(): Promise<void>;
    public get url(): string | null;

    public on(event: "ready", listener: () => void): this;
    public on(event: "error", listener: (e: Error) => void): this;
    public on(event: "debug", listener: (msg: string) => void): this;
}

export interface DatabaseLatency {
    read: number;
    write: number;
    average: number;
}

export interface UtilSort {
    sort: string;
}

export interface UtilKey {
    key?: string;
    target?: string;
}

export type ModelReturn = Mongoose.Model<Mongoose.Document, {}>;

export class Database extends Base {
    public schema: ModelReturn;

    constructor(mongodbURL: string, name?: string, connectionOptions?: Mongoose.ConnectionOptions);

    public set(key: string, value: any): Promise<any>;
    public delete(key: string): Promise<any>;
    public exists(key: string): Promise<boolean>;
    public has(key: string): Promise<boolean>;
    public get(key: string): Promise<any>;
    public fetch(key: string): Promise<any>;
    public all(): Promise<any[]>;
    public deleteAll(): Promise<true>;
    public math(key: string, operator: string, value: number): Promise<any>;
    public add(key: string, value: number): Promise<any>;
    public subtract(key: string, value: number): Promise<any>;
    public get uptime(): number;
    public export(fileName?: string, path?: string): Promise<string>;
    public import(data?: any[]): Promise<void>;
    public disconnect(): Promise<void>;
    public connect(url: string): Promise<void>;
    public get name(): string;
    private _read(): Promise<number>;
    private _write(): Promise<number>;
    public fetchLatency(): Promise<DatabaseLatency>;
    public ping(): Promise<DatabaseLatency>;
    public startsWith(key: string, ops: UtilSort): Promise<any[]>;
    public type(key: string): Promise<"string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "array">;
    public keyArray(): Promise<any[]>;
    public valueArray(): Promise<any[]>;
    public push(key: string, value: any | any[]): Promise<any>;
    public pull(key: string, value: any | any[]): Promise<any>;
    public toString(): string;
    public _eval(code: string): any;
}

export class MemoryStorage {
    public obj: any[];
    public set(key: string, value: any): any;
    public delete(key: string): false | any[];
    public exists(key: string): boolean;
    public has(key: string): boolean;
    public get(key: string): any;
    public fetch(key: string): any;
    public all(): any[];
    public deleteAll(): any[];
    public export(fileName?: string, path?: string): Promise<string>;
    public startsWith(key: string, ops: UtilSort): any[];
}

export function name(name: any): ModelReturn;

export class Util {
    static isKey(str: any): boolean;
    static isValue(data: any): boolean;
    static parseKey(key: string): UtilKey;
    static sort(key: string, data: any[], ops: UtilSort): any[];
    static setData(key: string, data: any, value: any): any;
    static unsetData(key: string, data: any): any;
    static getData(key: string, data: any): any;
}

export const version: string;